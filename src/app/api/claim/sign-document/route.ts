import { randomBytes } from "node:crypto";
import { z } from "zod";
import { CLAIM_DOCUMENTS } from "@/lib/claim-documents";
import { saveSignatureToken } from "@/lib/claim-signature-tokens";
import { dataUrlToBase64, getClientIp, hasSignatureInk, hashSignature } from "@/lib/signature-utils";

const DOCUMENT_IDS = CLAIM_DOCUMENTS.map((doc) => doc.id) as [string, ...string[]];

const bodySchema = z.object({
  sessionId: z.string().min(1),
  documentId: z.enum(DOCUMENT_IDS),
  signatureDataUrl: z.string().min(1),
  signedAt: z.string().min(1),
});

function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => null);
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return Response.json({ error: "Invalid signature payload." }, { status: 400 });
    }

    const { sessionId, documentId, signatureDataUrl, signedAt } = parsed.data;

    if (!hasSignatureInk(signatureDataUrl) || !dataUrlToBase64(signatureDataUrl)) {
      return Response.json({ error: "Draw a signature before continuing." }, { status: 400 });
    }

    const token = generateToken();
    const signatureHash = hashSignature(signatureDataUrl);
    const createdAt = new Date().toISOString();

    await saveSignatureToken({
      token,
      sessionId,
      documentId,
      signatureHash,
      signedAt,
      ipAddress: getClientIp(request),
      userAgent: request.headers.get("user-agent"),
      createdAt,
      consumedByTrackingNumber: null,
      consumedAt: null,
    });

    return Response.json({ token, signatureHash });
  } catch (error) {
    console.error("Signature tokenization failed:", error);
    return Response.json({ error: "Could not record your signature. Please try again." }, { status: 500 });
  }
}
