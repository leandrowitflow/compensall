import type {
  ClaimAuditTrail,
  ClaimFlightData,
  ClaimStatus,
  ClaimVerification,
} from "@/lib/claim-types";
import { CLAIM_STATUS_LABELS, CLAIM_STATUS_MESSAGES } from "@/lib/claim-types";
import { CLAIM_DOCUMENTS } from "@/lib/claim-documents";
import { buildSignedPowerOfAttorneyAttachment } from "@/lib/build-signed-poa-html";
import type { OdooCrmLeadSummary } from "@/lib/odoo-client";

type ClaimEmailPayload = {
  trackingNumber: string;
  flight: ClaimFlightData;
  signedName: string;
  contactEmail: string;
  entryMode: "upload" | "manual";
  verification: ClaimVerification;
  auditTrail: ClaimAuditTrail;
  locale?: string | null;
  odooLead?: OdooCrmLeadSummary | null;
  boardingPass?: {
    fileName: string;
    mimeType: string;
    base64: string;
  } | null;
  signatures: Array<{
    documentId: string;
    signedAt: string;
    token: string;
    fileName: string;
    base64: string;
  }>;
};

const DEFAULT_OPS_EMAIL = "leandro@witflow.co";

const BRAND = {
  navy: "#1f3664",
  blue: "#2669f3",
  soft: "#f5f8ff",
  border: "#d5e0f9",
  muted: "#5a6d8f",
  white: "#ffffff",
  success: "#0f7b4a",
  warning: "#9a6700",
  danger: "#b42318",
};

function getOpsEmail(): string {
  return process.env.CLAIM_OPS_EMAIL ?? DEFAULT_OPS_EMAIL;
}

function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL ?? "Compensall <claims@compensall.com>";
}

export function buildTrackUrl(
  siteUrl: string,
  trackingNumber: string,
  locale?: string | null,
): string {
  const base = siteUrl.replace(/\/$/, "");
  const localeSegment = locale && /^[a-z]{2}$/i.test(locale) ? locale.toLowerCase() : "en";
  return `${base}/${localeSegment}/track/${trackingNumber}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function documentTitle(documentId: string): string {
  return CLAIM_DOCUMENTS.find((doc) => doc.id === documentId)?.title ?? documentId;
}

function verificationColor(result: ClaimVerification["result"]): string {
  switch (result) {
    case "pass":
      return BRAND.success;
    case "needs_review":
      return BRAND.warning;
    case "fail":
      return BRAND.danger;
    default: {
      const exhaustive: never = result;
      return exhaustive;
    }
  }
}

function verificationLabel(result: ClaimVerification["result"]): string {
  switch (result) {
    case "pass":
      return "Verified";
    case "needs_review":
      return "Needs review";
    case "fail":
      return "Failed checks";
    default: {
      const exhaustive: never = result;
      return exhaustive;
    }
  }
}

function detailRows(rows: Array<[string, string | null | undefined]>): string {
  return rows
    .filter(([, value]) => Boolean(value && String(value).trim()))
    .map(
      ([label, value], index) => `
      <tr>
        <td style="padding:12px 0;border-top:${index === 0 ? "none" : `1px solid ${BRAND.border}`};width:38%;font-size:13px;line-height:1.4;color:${BRAND.muted};vertical-align:top;">
          ${escapeHtml(label)}
        </td>
        <td style="padding:12px 0;border-top:${index === 0 ? "none" : `1px solid ${BRAND.border}`};font-size:15px;line-height:1.45;color:${BRAND.navy};font-weight:600;vertical-align:top;">
          ${escapeHtml(String(value))}
        </td>
      </tr>`,
    )
    .join("");
}

function flightSummaryTable(flight: ClaimFlightData): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${detailRows([
        ["Passenger", flight.passenger],
        ["Flight", flight.flight],
        ["Route", `${flight.routeFrom} → ${flight.routeTo}`],
        ["Date", flight.date],
        ["Status", flight.status],
        ["Delay", flight.delay || null],
      ])}
    </table>
  `;
}

function getLogoUrl(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, "")}/assets/logo-email.png`;
}

function emailShell(options: {
  preheader: string;
  title: string;
  eyebrow?: string;
  bodyHtml: string;
  siteUrl: string;
}): string {
  const logoUrl = getLogoUrl(options.siteUrl);
  const homeUrl = options.siteUrl.replace(/\/$/, "");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(options.title)}</title>
</head>
<body style="margin:0;padding:0;background:#eef3fb;font-family:Arial,Helvetica,sans-serif;color:${BRAND.navy};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(options.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#eef3fb;">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:600px;width:100%;">
          <tr>
            <td style="padding:0 8px 18px 8px;text-align:left;">
              <a href="${escapeHtml(homeUrl)}" style="display:inline-block;text-decoration:none;">
                <img
                  src="${escapeHtml(logoUrl)}"
                  alt="Compensall"
                  width="160"
                  height="30"
                  style="display:block;border:0;outline:none;text-decoration:none;height:30px;width:auto;max-width:160px;"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td style="background:${BRAND.white};border:1px solid ${BRAND.border};border-radius:18px;overflow:hidden;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="background:linear-gradient(135deg, ${BRAND.blue} 0%, #1f4fd0 100%);background-color:${BRAND.blue};padding:28px 28px 24px 28px;">
                    ${
                      options.eyebrow
                        ? `<div style="margin-bottom:8px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.8);">${escapeHtml(options.eyebrow)}</div>`
                        : ""
                    }
                    <div style="font-size:24px;line-height:1.25;font-weight:700;color:${BRAND.white};">${escapeHtml(options.title)}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px;">
                    ${options.bodyHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 8px 0 8px;text-align:center;font-size:12px;line-height:1.5;color:${BRAND.muted};">
              Compensall · No win, no fee · Secure claim support
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function sectionCard(title: string, contentHtml: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 18px 0;background:${BRAND.soft};border:1px solid ${BRAND.border};border-radius:14px;">
      <tr>
        <td style="padding:18px 18px 8px 18px;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:${BRAND.blue};">
          ${escapeHtml(title)}
        </td>
      </tr>
      <tr>
        <td style="padding:0 18px 10px 18px;">
          ${contentHtml}
        </td>
      </tr>
    </table>
  `;
}

function ctaButton(label: string, href: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0 4px 0;">
      <tr>
        <td style="border-radius:12px;background:${BRAND.blue};">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 22px;font-size:15px;font-weight:700;color:${BRAND.white};text-decoration:none;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `;
}

export function buildOpsHtml(
  payload: ClaimEmailPayload,
  attachmentNames: string[] = [],
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.compensall.com",
): string {
  const signedDocs =
    payload.signatures.length > 0
      ? payload.signatures.map((signature) => documentTitle(signature.documentId)).join(", ")
      : "None";

  const attachmentsList =
    attachmentNames.length > 0
      ? attachmentNames.map((name) => `<li style="margin:0 0 6px 0;">${escapeHtml(name)}</li>`).join("")
      : "<li>None</li>";

  const bodyHtml = `
    <p style="margin:0 0 18px 0;font-size:15px;line-height:1.55;color:${BRAND.navy};">
      A new Compensall claim was submitted and is ready to review. Signed documents and the uploaded file are attached when available.
    </p>
    ${sectionCard(
      "Claim",
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${detailRows([
          ["Tracking", payload.trackingNumber],
          ["Passenger", payload.signedName],
          ["Email", payload.contactEmail],
          ["Entry", payload.entryMode === "upload" ? "Boarding pass upload" : "Manual entry"],
          ["Documents signed", signedDocs],
        ])}
      </table>`,
    )}
    ${sectionCard("Flight", flightSummaryTable(payload.flight))}
    ${sectionCard(
      "Verification",
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${detailRows([
          ["Result", verificationLabel(payload.verification.result)],
          ["Summary", payload.verification.summary],
        ])}
      </table>
      <div style="margin:4px 0 12px 0;">
        <span style="display:inline-block;padding:6px 10px;border-radius:999px;background:${verificationColor(payload.verification.result)};color:${BRAND.white};font-size:12px;font-weight:700;">
          ${escapeHtml(verificationLabel(payload.verification.result))}
        </span>
      </div>`,
    )}
    ${sectionCard(
      "Attachments",
      `<ul style="margin:0;padding:0 0 12px 18px;color:${BRAND.navy};font-size:14px;line-height:1.5;">${attachmentsList}</ul>`,
    )}
  `;

  return emailShell({
    preheader: `New claim ${payload.trackingNumber} · ${payload.flight.flight}`,
    eyebrow: "Operations",
    title: `New claim ${payload.trackingNumber}`,
    bodyHtml,
    siteUrl,
  });
}

export function buildUserHtml(
  payload: ClaimEmailPayload,
  trackUrl: string,
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.compensall.com",
): string {
  const firstName = payload.signedName.trim().split(/\s+/)[0] || payload.signedName;

  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:16px;line-height:1.55;color:${BRAND.navy};">
      Hi ${escapeHtml(firstName)},
    </p>
    <p style="margin:0 0 22px 0;font-size:15px;line-height:1.55;color:${BRAND.muted};">
      We’ve received your claim. Keep your tracking number handy to follow progress anytime.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 18px 0;background:${BRAND.soft};border:1px solid ${BRAND.border};border-radius:14px;">
      <tr>
        <td style="padding:20px;text-align:center;">
          <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${BRAND.blue};margin-bottom:8px;">Tracking number</div>
          <div style="font-size:26px;line-height:1.2;font-weight:700;letter-spacing:0.04em;color:${BRAND.navy};">${escapeHtml(payload.trackingNumber)}</div>
        </td>
      </tr>
    </table>
    ${sectionCard("Your flight", flightSummaryTable(payload.flight))}
    <div style="text-align:center;margin:8px 0 6px 0;">
      ${ctaButton("Track your claim", trackUrl)}
    </div>
    <p style="margin:18px 0 0 0;font-size:13px;line-height:1.55;color:${BRAND.muted};text-align:center;">
      We’ll email you when there’s an update on your case.
    </p>
  `;

  return emailShell({
    preheader: `Your claim ${payload.trackingNumber} is submitted`,
    eyebrow: "Claim submitted",
    title: "We’ve got your claim",
    bodyHtml,
    siteUrl,
  });
}

export function buildStatusUpdateHtml(options: {
  trackingNumber: string;
  signedName: string;
  flight: ClaimFlightData;
  status: ClaimStatus;
  trackUrl: string;
  siteUrl: string;
}): string {
  const firstName = options.signedName.trim().split(/\s+/)[0] || options.signedName;
  const statusLabel = CLAIM_STATUS_LABELS[options.status];
  const statusMessage = CLAIM_STATUS_MESSAGES[options.status];

  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:16px;line-height:1.55;color:${BRAND.navy};">
      Hi ${escapeHtml(firstName)},
    </p>
    <p style="margin:0 0 22px 0;font-size:15px;line-height:1.55;color:${BRAND.muted};">
      There’s an update on your Compensall claim.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 18px 0;background:${BRAND.soft};border:1px solid ${BRAND.border};border-radius:14px;">
      <tr>
        <td style="padding:20px;text-align:center;">
          <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${BRAND.blue};margin-bottom:8px;">New status</div>
          <div style="font-size:24px;line-height:1.25;font-weight:700;color:${BRAND.navy};margin-bottom:10px;">${escapeHtml(statusLabel)}</div>
          <div style="font-size:14px;line-height:1.5;color:${BRAND.muted};">${escapeHtml(statusMessage)}</div>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 18px 0;background:${BRAND.white};border:1px solid ${BRAND.border};border-radius:14px;">
      <tr>
        <td style="padding:16px 18px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${detailRows([
              ["Tracking", options.trackingNumber],
              ["Flight", options.flight.flight],
              ["Route", `${options.flight.routeFrom} → ${options.flight.routeTo}`],
            ])}
          </table>
        </td>
      </tr>
    </table>
    <div style="text-align:center;margin:8px 0 6px 0;">
      ${ctaButton("Track your claim", options.trackUrl)}
    </div>
  `;

  return emailShell({
    preheader: `Claim ${options.trackingNumber} is now ${statusLabel}`,
    eyebrow: "Claim update",
    title: `Status: ${statusLabel}`,
    bodyHtml,
    siteUrl: options.siteUrl,
  });
}

async function sendViaResend(options: {
  to: string[];
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: string }>;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured — email not sent.");
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getFromEmail(),
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Resend email failed:", response.status, body);
    return false;
  }

  return true;
}

function extensionFromMime(mimeType: string, fallback = "bin"): string {
  switch (mimeType) {
    case "image/png":
      return "png";
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
    case "application/pdf":
      return "pdf";
    default:
      return fallback;
  }
}

function buildOpsAttachments(payload: ClaimEmailPayload): Array<{ filename: string; content: string }> {
  const attachments: Array<{ filename: string; content: string }> = [];

  if (payload.boardingPass?.base64) {
    const original = payload.boardingPass.fileName.trim();
    const hasExtension = /\.[a-z0-9]+$/i.test(original);
    const filename = hasExtension
      ? `boarding-pass-${original}`
      : `boarding-pass-${original || "upload"}.${extensionFromMime(payload.boardingPass.mimeType)}`;

    attachments.push({
      filename,
      content: payload.boardingPass.base64,
    });
  }

  for (const signature of payload.signatures) {
    if (!signature.base64) continue;

    if (signature.documentId === "authority-to-act") {
      attachments.push(
        buildSignedPowerOfAttorneyAttachment({
          trackingNumber: payload.trackingNumber,
          signedName: payload.signedName,
          flight: payload.flight,
          signingDate: signature.signedAt || payload.flight.date,
          signatureBase64OrDataUrl: signature.base64,
        }),
      );
      continue;
    }

    const title = documentTitle(signature.documentId)
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "");
    attachments.push({
      filename: `${title || signature.documentId}-signed.png`,
      content: signature.base64,
    });
  }

  return attachments;
}

export async function sendClaimEmails(
  payload: ClaimEmailPayload,
  siteUrl: string,
): Promise<{ opsSent: boolean; userSent: boolean }> {
  const trackUrl = buildTrackUrl(siteUrl, payload.trackingNumber, payload.locale);
  const attachments = buildOpsAttachments(payload);
  const attachmentNames = attachments.map((item) => item.filename);

  const opsSent = await sendViaResend({
    to: [getOpsEmail()],
    subject: `[Compensall] New claim ${payload.trackingNumber}: ${payload.flight.flight}`,
    html: buildOpsHtml(payload, attachmentNames, siteUrl),
    attachments: attachments.length > 0 ? attachments : undefined,
  });

  const userSent = await sendViaResend({
    to: [payload.contactEmail],
    subject: `Your Compensall claim ${payload.trackingNumber}`,
    html: buildUserHtml(payload, trackUrl, siteUrl),
  });

  return { opsSent, userSent };
}

export async function sendClaimStatusEmail(options: {
  trackingNumber: string;
  signedName: string;
  contactEmail: string;
  flight: ClaimFlightData;
  status: ClaimStatus;
  siteUrl: string;
  locale?: string | null;
}): Promise<boolean> {
  if (!options.contactEmail.trim()) {
    return false;
  }

  const trackUrl = buildTrackUrl(options.siteUrl, options.trackingNumber, options.locale);
  const statusLabel = CLAIM_STATUS_LABELS[options.status];

  return sendViaResend({
    to: [options.contactEmail],
    subject: `Update on your Compensall claim ${options.trackingNumber}: ${statusLabel}`,
    html: buildStatusUpdateHtml({
      trackingNumber: options.trackingNumber,
      signedName: options.signedName,
      flight: options.flight,
      status: options.status,
      trackUrl,
      siteUrl: options.siteUrl,
    }),
  });
}
