import type { ClaimAuditTrail, ClaimFlightData, ClaimVerification } from "@/lib/claim-types";
import type { OdooCrmLeadSummary } from "@/lib/odoo-client";

type ClaimEmailPayload = {
  trackingNumber: string;
  flight: ClaimFlightData;
  signedName: string;
  contactEmail: string;
  entryMode: "upload" | "manual";
  verification: ClaimVerification;
  auditTrail: ClaimAuditTrail;
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

function getOpsEmail(): string {
  return process.env.CLAIM_OPS_EMAIL ?? DEFAULT_OPS_EMAIL;
}

function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL ?? "Compensall <claims@compensall.com>";
}

function formatFlightDetails(flight: ClaimFlightData): string {
  return [
    `Passenger: ${flight.passenger}`,
    `Flight: ${flight.flight}`,
    `Route: ${flight.routeFrom} → ${flight.routeTo}`,
    `Date: ${flight.date}`,
    `Status: ${flight.status}`,
    flight.delay ? `Delay: ${flight.delay}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildOpsHtml(payload: ClaimEmailPayload): string {
  const mismatchRows =
    payload.verification.mismatches.length > 0
      ? payload.verification.mismatches
          .map(
            (item) =>
              `<li><strong>${item.field}</strong>: document "${item.documentValue ?? "N/A"}" vs confirmed "${item.confirmedValue}"</li>`,
          )
          .join("")
      : "<li>None flagged</li>";

  const signatureRows =
    payload.signatures.length > 0
      ? payload.signatures
          .map(
            (signature) =>
              `<li>${signature.documentId}: signed ${signature.signedAt}, token <code>${signature.token}</code></li>`,
          )
          .join("")
      : "<li>None</li>";

  return `
    <h2>New claim submitted: ${payload.trackingNumber}</h2>
    <p><strong>Signed name:</strong> ${payload.signedName}</p>
    <p><strong>Contact email:</strong> ${payload.contactEmail}</p>
    <p><strong>Entry mode:</strong> ${payload.entryMode}</p>
    <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
    <h3>Documents signed</h3>
    <ul>${signatureRows}</ul>
    <h3>Audit trail</h3>
    <p><strong>IP address:</strong> ${payload.auditTrail.ipAddress ?? "Unknown"}</p>
    <p><strong>User agent:</strong> ${payload.auditTrail.userAgent ?? "Unknown"}</p>
    <h3>Flight details</h3>
    <pre>${formatFlightDetails(payload.flight)}</pre>
    <h3>Assistant verification</h3>
    <p><strong>Result:</strong> ${payload.verification.result}</p>
    <p>${payload.verification.summary}</p>
    <ul>${mismatchRows}</ul>
    ${
      payload.odooLead
        ? `<h3>Odoo CRM</h3>
    <p><strong>Lead ID:</strong> ${payload.odooLead.id}</p>
    <p><strong>Lead name:</strong> ${payload.odooLead.name}</p>
    <p><strong>Stage:</strong> ${payload.odooLead.stageName ?? "New"}</p>
    <p><a href="${payload.odooLead.crmUrl}">${payload.odooLead.crmUrl}</a></p>`
        : ""
    }
  `;
}

function buildUserHtml(payload: ClaimEmailPayload, trackUrl: string): string {
  const odooSection = payload.odooLead
    ? `<p><strong>Case reference (Odoo):</strong> #${payload.odooLead.id}</p>
    <p><strong>Case name:</strong> ${payload.odooLead.name}</p>
    ${payload.odooLead.stageName ? `<p><strong>Status:</strong> ${payload.odooLead.stageName}</p>` : ""}`
    : "";

  return `
    <h2>Your Compensall claim is submitted</h2>
    <p>Hi ${payload.signedName},</p>
    <p>We've received your signed documents for flight <strong>${payload.flight.flight}</strong> (${payload.flight.routeFrom} → ${payload.flight.routeTo}).</p>
    <p><strong>Tracking number:</strong> ${payload.trackingNumber}</p>
    ${odooSection}
    <p>Use your tracking number to follow your claim status:</p>
    <p><a href="${trackUrl}">${trackUrl}</a></p>
    <p>We'll keep you updated as your case progresses.</p>
  `;
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

export async function sendClaimEmails(
  payload: ClaimEmailPayload,
  siteUrl: string,
): Promise<{ opsSent: boolean; userSent: boolean }> {
  const trackUrl = `${siteUrl.replace(/\/$/, "")}/track/${payload.trackingNumber}`;
  const attachments: Array<{ filename: string; content: string }> = [];

  if (payload.boardingPass) {
    attachments.push({
      filename: payload.boardingPass.fileName,
      content: payload.boardingPass.base64,
    });
  }

  for (const signature of payload.signatures) {
    if (!signature.base64) continue;
    attachments.push({
      filename: signature.fileName,
      content: signature.base64,
    });
  }

  const opsSent = await sendViaResend({
    to: [getOpsEmail()],
    subject: `[Compensall] New claim ${payload.trackingNumber}: ${payload.flight.flight}`,
    html: buildOpsHtml(payload),
    attachments: attachments.length > 0 ? attachments : undefined,
  });

  const userSent = await sendViaResend({
    to: [payload.contactEmail],
    subject: `Your Compensall claim ${payload.trackingNumber}`,
    html: buildUserHtml(payload, trackUrl),
  });

  return { opsSent, userSent };
}
