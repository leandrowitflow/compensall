import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { generateTrackingNumber } from "../src/lib/claim-tracking";
import { buildSignedPowerOfAttorneyHtml } from "../src/lib/build-signed-poa-html";
import { buildOpsHtml, sendClaimEmails } from "../src/lib/send-claim-email";

function loadEnvLocal(): void {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // optional
  }
}

loadEnvLocal();

/** Minimal valid 1x1 PNG */
const SAMPLE_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5fY2sAAAAASUVORK5CYII=";

/** Tiny PDF-like bytes labeled as PDF for attachment testing */
const SAMPLE_PDF_BASE64 = Buffer.from(
  "%PDF-1.1\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\nCompensall boarding pass sample\n",
).toString("base64");

async function main() {
  const trackingNumber = generateTrackingNumber();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://compensall.com";
  const previewTo =
    process.argv[2]?.trim() ||
    process.env.CLAIM_OPS_EMAIL ||
    "leandro@witflow.co";

  const payload = {
    trackingNumber,
    signedName: "Alex Morgan",
    contactEmail: previewTo,
    entryMode: "upload" as const,
    flight: {
      passenger: "Alex Morgan",
      flight: "BA123",
      routeFrom: "London Heathrow - LHR",
      routeTo: "Lisbon - LIS",
      date: "17 Jul 2026",
      status: "Delayed" as const,
      delay: "3h 20m",
    },
    verification: {
      result: "needs_review" as const,
      summary: "Boarding pass matches the route. Delay duration needs a quick human check.",
      mismatches: [],
    },
    auditTrail: {
      ipAddress: null,
      userAgent: null,
    },
    locale: "en",
    odooLead: null,
    boardingPass: {
      fileName: "boarding-pass-sample.pdf",
      mimeType: "application/pdf",
      base64: SAMPLE_PDF_BASE64,
    },
    signatures: [
      {
        documentId: "authority-to-act",
        signedAt: new Date().toISOString(),
        token: "preview-token",
        fileName: "signature-authority-to-act.png",
        base64: SAMPLE_PNG_BASE64,
      },
    ],
  };

  const outDir = resolve(process.cwd(), "tmp/email-previews");
  mkdirSync(outDir, { recursive: true });
  const opsPath = resolve(outDir, "claim-ops-preview.html");
  const poaFilename = `Power-of-Attorney-${trackingNumber}.html`;
  const poaHtml = buildSignedPowerOfAttorneyHtml({
    trackingNumber,
    signedName: payload.signedName,
    flight: payload.flight,
    signingDate: payload.signatures[0].signedAt,
    signatureBase64OrDataUrl: SAMPLE_PNG_BASE64,
  });
  const poaPath = resolve(outDir, poaFilename);
  writeFileSync(poaPath, poaHtml, "utf8");
  writeFileSync(
    opsPath,
    buildOpsHtml(
      payload,
      ["boarding-pass-boarding-pass-sample.pdf", poaFilename],
      siteUrl,
    ),
    "utf8",
  );

  console.log("Ops preview:", opsPath);
  console.log("PoA attachment preview:", poaPath);
  console.log("Sending NEW CLAIM emails (ops + client) to:", previewTo);
  console.log("Attachments included: boarding pass PDF + full Power of Attorney HTML");

  const result = await sendClaimEmails(payload, siteUrl);
  console.log("Ops email sent:", result.opsSent);
  console.log("Client email sent:", result.userSent);
  console.log("Tracking number:", trackingNumber);

  if (!result.opsSent) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
