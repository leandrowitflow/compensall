import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ClaimFlightData } from "@/lib/claim-types";
import {
  POA_CONTACT_EMAIL,
  POA_CONTACT_PHONE_DISPLAY,
  POWER_OF_ATTORNEY_BODY,
} from "@/lib/poa-content";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatSigningDateDisplay(date: string): string {
  if (!date) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const parsed = Date.parse(date);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return date;
}

function readPublicAssetAsDataUrl(relativePath: string, mimeType: string): string | null {
  try {
    const absolute = resolve(process.cwd(), "public", relativePath.replace(/^\//, ""));
    const bytes = readFileSync(absolute);
    return `data:${mimeType};base64,${bytes.toString("base64")}`;
  } catch {
    return null;
  }
}

function toSignatureDataUrl(signatureBase64OrDataUrl: string): string {
  if (signatureBase64OrDataUrl.startsWith("data:")) {
    return signatureBase64OrDataUrl;
  }
  return `data:image/png;base64,${signatureBase64OrDataUrl}`;
}

function fieldRow(label: string, value: string): string {
  return `
    <div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:8px;margin:0 0 14px 0;font-size:14px;color:#1f3664;">
      <span style="font-weight:700;white-space:nowrap;">${escapeHtml(label)}</span>
      <span style="flex:1;min-width:140px;border-bottom:1px solid rgba(31,54,100,0.35);padding-bottom:2px;font-weight:500;">
        ${escapeHtml(value || " ")}
      </span>
    </div>
  `;
}

export type SignedPoaInput = {
  trackingNumber: string;
  signedName: string;
  flight: ClaimFlightData;
  signingDate: string;
  signatureBase64OrDataUrl: string;
};

export function buildSignedPowerOfAttorneyHtml(input: SignedPoaInput): string {
  const logo = readPublicAssetAsDataUrl("assets/logo.svg", "image/svg+xml");
  const qr = readPublicAssetAsDataUrl("assets/documents/poa-qr.png", "image/png");
  const euFlag = readPublicAssetAsDataUrl("assets/documents/eu-flag.svg", "image/svg+xml");
  const signatureUrl = toSignatureDataUrl(input.signatureBase64OrDataUrl);
  const signingDate = formatSigningDateDisplay(input.signingDate);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Power of Attorney — ${escapeHtml(input.trackingNumber)}</title>
</head>
<body style="margin:0;padding:24px;background:#eef3fb;font-family:Arial,Helvetica,sans-serif;color:#1f3664;">
  <article style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #d5e0f9;border-radius:12px;padding:32px 28px;">
    <header style="border-bottom:1px solid #c5c5c5;padding-bottom:16px;margin-bottom:24px;">
      ${
        logo
          ? `<img src="${logo}" alt="Compensall" style="height:36px;width:auto;" />`
          : `<div style="font-size:22px;font-weight:700;">Compensall</div>`
      }
    </header>

    <h1 style="text-align:center;font-size:28px;line-height:1.2;margin:0 0 24px 0;color:#000000;">Power of Attorney</h1>

    <p style="font-size:15px;line-height:1.6;text-align:justify;margin:0 0 28px 0;">
      ${escapeHtml(POWER_OF_ATTORNEY_BODY)}
    </p>

    ${fieldRow("Name:", input.signedName)}

    <div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:8px;margin:0 0 14px 0;font-size:14px;color:#1f3664;">
      <span style="font-weight:700;">Flight(s):</span>
      <span style="font-weight:500;">${escapeHtml(input.flight.flight)}</span>
      <span style="font-weight:700;">from</span>
      <span style="flex:1;min-width:80px;border-bottom:1px solid rgba(31,54,100,0.35);padding-bottom:2px;font-weight:500;">
        ${escapeHtml(input.flight.routeFrom)}
      </span>
      <span style="font-weight:700;">to</span>
      <span style="flex:1;min-width:80px;border-bottom:1px solid rgba(31,54,100,0.35);padding-bottom:2px;font-weight:500;">
        ${escapeHtml(input.flight.routeTo)}
      </span>
    </div>

    ${fieldRow("Flight(s) Date:", input.flight.date)}

    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:24px;margin:28px 0;">
      <div style="flex:1;min-width:220px;">
        <div style="font-size:14px;font-weight:700;margin-bottom:8px;">The passenger:</div>
        <div style="min-height:72px;border-bottom:1px solid rgba(31,54,100,0.35);display:flex;align-items:flex-end;padding-bottom:4px;">
          <img src="${signatureUrl}" alt="Passenger signature" style="max-height:68px;max-width:100%;object-fit:contain;" />
        </div>
        ${fieldRow("Date:", signingDate)}
      </div>

      <div style="width:140px;text-align:center;flex-shrink:0;">
        ${
          qr
            ? `<img src="${qr}" alt="EU QR code" style="width:112px;height:112px;object-fit:contain;" />`
            : ""
        }
        ${
          euFlag
            ? `<img src="${euFlag}" alt="Flag of Europe" style="width:80px;height:auto;margin-top:12px;" />`
            : ""
        }
        <div style="font-size:11px;font-weight:700;margin-top:8px;">European Union</div>
        <div style="font-size:9px;opacity:0.8;line-height:1.3;margin-top:2px;">
          European Structural<br />and Investment Funds
        </div>
      </div>
    </div>

    <footer style="border-top:1px solid #d5e0f9;padding-top:14px;font-size:12px;opacity:0.75;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;">
      <span>${escapeHtml(POA_CONTACT_EMAIL)}</span>
      <span>${escapeHtml(POA_CONTACT_PHONE_DISPLAY)}</span>
      <span>Claim ${escapeHtml(input.trackingNumber)}</span>
    </footer>
  </article>
</body>
</html>`;
}

export function buildSignedPowerOfAttorneyAttachment(input: SignedPoaInput): {
  filename: string;
  content: string;
} {
  const html = buildSignedPowerOfAttorneyHtml(input);
  return {
    filename: `Power-of-Attorney-${input.trackingNumber}.html`,
    content: Buffer.from(html, "utf8").toString("base64"),
  };
}
