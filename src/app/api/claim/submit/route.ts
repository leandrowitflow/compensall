import { z } from "zod";
import { inferMimeType, isAllowedBoardingPassMime } from "@/lib/boarding-pass-file";
import { consumeSignatureToken, getSignatureToken } from "@/lib/claim-signature-tokens";
import { CLAIM_DOCUMENTS } from "@/lib/claim-documents";
import { saveClaim } from "@/lib/claim-store";
import { generateTrackingNumber } from "@/lib/claim-tracking";
import { sendClaimEmails } from "@/lib/send-claim-email";
import { syncClaimToOdoo } from "@/lib/odoo-crm-lead";
import { normalizeFlightData, type ClaimRecord } from "@/lib/claim-types";
import { dataUrlToBase64, getClientIp, hasSignatureInk, hashSignature } from "@/lib/signature-utils";
import { verifyBoardingPassClaim } from "@/lib/verify-boarding-pass";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const REQUIRED_DOCUMENT_IDS = CLAIM_DOCUMENTS.map((doc) => doc.id);

const flightSchema = z.object({
  passenger: z.string().min(1),
  flight: z.string().min(1),
  routeFrom: z.string().min(1),
  routeTo: z.string().min(1),
  date: z.string().min(1),
  status: z.enum(["Delayed", "Cancelled", "Denied boarding", "Unknown"]),
  delay: z.string(),
});

const documentSignatureSchema = z.object({
  documentId: z.enum(REQUIRED_DOCUMENT_IDS as [string, ...string[]]),
  signatureDataUrl: z.string().min(1),
  signedAt: z.string().min(1),
  token: z.string().min(1),
  signatureHash: z.string().min(1),
});

function parseDocumentSignatures(raw: FormDataEntryValue | null): z.infer<typeof documentSignatureSchema>[] {
  if (typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => documentSignatureSchema.safeParse(item))
      .filter((result): result is { success: true; data: z.infer<typeof documentSignatureSchema> } => result.success)
      .map((result) => result.data);
  } catch {
    return [];
  }
}

function getSiteUrl(request: Request): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "https://compensall.com"
  );
}

function getRequestLocale(request: Request, formData: FormData): string | null {
  const localeRaw = formData.get("locale");
  if (typeof localeRaw === "string" && /^[a-z]{2}$/i.test(localeRaw.trim())) {
    return localeRaw.trim().toLowerCase();
  }

  const referer = request.headers.get("referer");
  if (!referer) {
    return null;
  }

  try {
    const pathname = new URL(referer).pathname;
    const match = pathname.match(/^\/([a-z]{2})(?:\/|$)/i);
    return match?.[1]?.toLowerCase() ?? null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const entryModeRaw = formData.get("entryMode");
    const signedNameRaw = formData.get("signedName");
    const contactEmailRaw = formData.get("contactEmail");
    const userAgentRaw = formData.get("userAgent");
    const flightRaw = formData.get("flight");
    const documentSignatures = parseDocumentSignatures(formData.get("documentSignatures"));
    const file = formData.get("file");

    if (entryModeRaw !== "upload" && entryModeRaw !== "manual") {
      return Response.json({ error: "Invalid entry mode." }, { status: 400 });
    }

    if (typeof signedNameRaw !== "string" || !signedNameRaw.trim()) {
      return Response.json({ error: "Signed name is required." }, { status: 400 });
    }

    const parsedContactEmail = z.string().trim().email().safeParse(contactEmailRaw);
    if (!parsedContactEmail.success) {
      return Response.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (typeof flightRaw !== "string") {
      return Response.json({ error: "Flight details are required." }, { status: 400 });
    }

    let flightJson: unknown;
    try {
      flightJson = JSON.parse(flightRaw);
    } catch {
      return Response.json({ error: "Invalid flight details." }, { status: 400 });
    }

    const flightResult = flightSchema.safeParse(flightJson);
    if (!flightResult.success) {
      return Response.json({ error: "Flight details are incomplete." }, { status: 400 });
    }

    const signedDocumentIds = new Set(documentSignatures.map((signature) => signature.documentId));
    const missingDocuments = REQUIRED_DOCUMENT_IDS.filter((id) => !signedDocumentIds.has(id));
    if (missingDocuments.length > 0) {
      return Response.json({ error: "Every document must be signed." }, { status: 400 });
    }

    const unsignedDocuments = documentSignatures.filter((signature) => !hasSignatureInk(signature.signatureDataUrl));
    if (unsignedDocuments.length > 0) {
      return Response.json(
        { error: "Draw a signature for every document before submitting." },
        { status: 400 },
      );
    }

    for (const signature of documentSignatures) {
      const storedToken = await getSignatureToken(signature.token);
      if (
        !storedToken ||
        storedToken.consumedByTrackingNumber ||
        storedToken.documentId !== signature.documentId ||
        storedToken.signatureHash !== signature.signatureHash ||
        storedToken.signatureHash !== hashSignature(signature.signatureDataUrl)
      ) {
        return Response.json(
          { error: "One of your signatures could not be verified. Please sign the documents again." },
          { status: 400 },
        );
      }
    }

    const contactEmail = parsedContactEmail.data;
    const userAgent = typeof userAgentRaw === "string" && userAgentRaw.trim() ? userAgentRaw.trim() : null;

    let boardingPassBuffer: Buffer | null = null;
    let boardingPassMime: string | null = null;
    let boardingPassFileName: string | null = null;

    if (file instanceof File && file.size > 0) {
      const mimeType = inferMimeType(file.name, file.type);
      if (!isAllowedBoardingPassMime(mimeType)) {
        return Response.json({ error: "Unsupported boarding pass file type." }, { status: 400 });
      }
      if (file.size > MAX_FILE_SIZE) {
        return Response.json({ error: "Boarding pass file is too large." }, { status: 400 });
      }
      boardingPassBuffer = Buffer.from(await file.arrayBuffer());
      boardingPassMime = mimeType;
      boardingPassFileName = file.name;
    }

    if (entryModeRaw === "upload" && !boardingPassBuffer) {
      return Response.json({ error: "Boarding pass file is required for upload claims." }, { status: 400 });
    }

    const flight = normalizeFlightData(flightResult.data);
    const verification = await verifyBoardingPassClaim(
      flight,
      boardingPassBuffer,
      boardingPassMime,
    );

    const trackingNumber = generateTrackingNumber();
    const createdAt = new Date().toISOString();

    const record: ClaimRecord = {
      trackingNumber,
      status: "submitted",
      entryMode: entryModeRaw,
      flight,
      signedName: signedNameRaw.trim(),
      contactEmail,
      acceptedDocuments: documentSignatures.map((signature) => signature.documentId),
      documentSignatures: documentSignatures.map((signature) => ({
        documentId: signature.documentId,
        signedAt: signature.signedAt,
        token: signature.token,
        signatureHash: signature.signatureHash,
      })),
      auditTrail: { ipAddress: getClientIp(request), userAgent },
      verification,
      createdAt,
    };

    await saveClaim(record);
    await Promise.all(
      documentSignatures.map((signature) => consumeSignatureToken(signature.token, trackingNumber)),
    );

    const siteUrl = getSiteUrl(request);
    const locale = getRequestLocale(request, formData);
    const landingPage = locale ? `/${locale}/#claim` : "/#claim";

    const odooLeadIdRaw = formData.get("odooLeadId");
    const formSessionIdRaw = formData.get("formSessionId");
    const odooLeadId =
      typeof odooLeadIdRaw === "string" && odooLeadIdRaw.trim()
        ? Number.parseInt(odooLeadIdRaw, 10)
        : null;
    const formSessionId =
      typeof formSessionIdRaw === "string" && formSessionIdRaw.trim() ? formSessionIdRaw.trim() : null;

    const odooLead = await syncClaimToOdoo({
      trackingNumber,
      signedName: signedNameRaw.trim(),
      contactEmail,
      entryMode: entryModeRaw,
      flight,
      verification,
      siteUrl,
      locale,
      landingPage,
      odooLeadId: Number.isFinite(odooLeadId) ? odooLeadId : null,
      formSessionId,
    });

    if (odooLead) {
      record.odooLeadId = odooLead.id;
      record.odooLeadName = odooLead.name;
    }

    const emailResult = await sendClaimEmails(
      {
        trackingNumber,
        flight,
        signedName: signedNameRaw.trim(),
        contactEmail,
        entryMode: entryModeRaw,
        verification,
        auditTrail: record.auditTrail,
        odooLead,
        boardingPass:
          boardingPassBuffer && boardingPassMime && boardingPassFileName
            ? {
                fileName: boardingPassFileName,
                mimeType: boardingPassMime,
                base64: boardingPassBuffer.toString("base64"),
              }
            : null,
        signatures: documentSignatures.map((signature) => ({
          documentId: signature.documentId,
          signedAt: signature.signedAt,
          token: signature.token,
          fileName: `signature-${signature.documentId}.png`,
          base64: dataUrlToBase64(signature.signatureDataUrl) ?? "",
        })),
      },
      siteUrl,
    );

    return Response.json({
      trackingNumber,
      status: record.status,
      verificationResult: verification.result,
      odooLeadId: odooLead?.id ?? null,
      emailsSent: emailResult,
    });
  } catch (error) {
    console.error("Claim submission failed:", error);
    return Response.json(
      { error: "We could not submit your claim. Please try again." },
      { status: 500 },
    );
  }
}
