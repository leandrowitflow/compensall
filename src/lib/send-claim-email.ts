import type {
  ClaimAuditTrail,
  ClaimFlightData,
  ClaimStatus,
  ClaimVerification,
} from "@/lib/claim-types";
import { CLAIM_STATUS_LABELS, CLAIM_STATUS_MESSAGES } from "@/lib/claim-types";
import { CLAIM_DOCUMENTS } from "@/lib/claim-documents";
import { buildSignedPowerOfAttorneyAttachment } from "@/lib/build-signed-poa-html";
import {
  estimateCompensationForFlight,
  formatEstimateDistance,
} from "@/lib/compensation-estimate";
import type { OdooCrmLeadSummary } from "@/lib/odoo-client";

type ClaimEmailPayload = {
  trackingNumber: string;
  flight: ClaimFlightData;
  signedName: string;
  contactEmail: string;
  contactPhone?: string | null;
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

const DEFAULT_OPS_EMAIL = "help@compensall.com";

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
  return process.env.RESEND_FROM_EMAIL ?? "Compensall <help@compensall.com>";
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

function flightSummaryTable(flight: ClaimFlightData, locale?: string | null): string {
  const estimate = estimateCompensationForFlight(flight, locale);
  const labels =
    locale === "es"
      ? {
          passenger: "Pasajero",
          flight: "Vuelo",
          route: "Ruta",
          date: "Fecha",
          status: "Estado",
          delay: "Retraso",
          estimated: "Compensación estimada",
          upTo: "Hasta",
        }
      : locale === "ro"
        ? {
            passenger: "Pasager",
            flight: "Zbor",
            route: "Rută",
            date: "Dată",
            status: "Stare",
            delay: "Întârziere",
            estimated: "Despăgubire estimată",
            upTo: "Până la",
          }
      : locale === "hu"
        ? {
            passenger: "Utas",
            flight: "Járat",
            route: "Útvonal",
            date: "Dátum",
            status: "Állapot",
            delay: "Késés",
            estimated: "Becsült kártérítés",
            upTo: "Akár",
          }
      : locale === "sq"
        ? {
            passenger: "Pasagjer",
            flight: "Fluturim",
            route: "Itinerar",
            date: "Datë",
            status: "Status",
            delay: "Vonesë",
            estimated: "Kompensim i vlerësuar",
            upTo: "Deri në",
          }
      : locale === "de"
        ? {
            passenger: "Passagier",
            flight: "Flug",
            route: "Strecke",
            date: "Datum",
            status: "Status",
            delay: "Verspätung",
            estimated: "Geschätzte Entschädigung",
            upTo: "Bis zu",
          }
      : locale === "nl"
        ? {
            passenger: "Passagier",
            flight: "Vlucht",
            route: "Traject",
            date: "Datum",
            status: "Status",
            delay: "Vertraging",
            estimated: "Geschatte compensatie",
            upTo: "Tot",
          }
      : {
          passenger: "Passenger",
          flight: "Flight",
          route: "Route",
          date: "Date",
          status: "Status",
          delay: "Delay",
          estimated: "Estimated compensation",
          upTo: "Up to",
        };

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${detailRows([
        [labels.passenger, flight.passenger],
        [labels.flight, flight.flight],
        [labels.route, `${flight.routeFrom} → ${flight.routeTo}`],
        [labels.date, flight.date],
        [labels.status, flight.status],
        [labels.delay, flight.delay || null],
        [
          labels.estimated,
          estimate
            ? `${labels.upTo} ${estimate.amountLabel} (${estimate.regulation}, ~${formatEstimateDistance(estimate.distanceKm)})`
            : null,
        ],
      ])}
    </table>
  `;
}

function compensationEstimateCard(flight: ClaimFlightData, locale?: string | null): string {
  const estimate = estimateCompensationForFlight(flight, locale);
  if (!estimate) {
    return "";
  }

  const labels =
    locale === "es"
      ? {
          title: "Compensación estimada",
          upTo: "Hasta",
          basedOn: "Según",
          forRoute: "para una ruta de unos",
          disclaimer:
            "Solo orientativo. El derecho definitivo depende de la duración del retraso, de la responsabilidad de la aerolínea y de las circunstancias extraordinarias.",
        }
      : locale === "ro"
        ? {
            title: "Despăgubire estimată",
            upTo: "Până la",
            basedOn: "Conform",
            forRoute: "pentru o rută de circa",
            disclaimer:
              "Doar orientativ. Dreptul definitiv depinde de durata întârzierii, de responsabilitatea companiei și de circumstanțele extraordinare.",
          }
      : locale === "hu"
        ? {
            title: "Becsült kártérítés",
            upTo: "Akár",
            basedOn: "Az",
            forRoute: "alapján, kb.",
            disclaimer:
              "Csak tájékoztató. A végső jogosultság a késés hosszától, a légitársaság felelősségétől és a rendkívüli körülményektől függ.",
          }
      : locale === "sq"
        ? {
            title: "Kompensim i vlerësuar",
            upTo: "Deri në",
            basedOn: "Sipas",
            forRoute: "për një itinerar rreth",
            disclaimer:
              "Vetëm orientues. E drejta përfundimtare varet nga kohëzgjatja e vonesës, përgjegjësia e kompanisë dhe rrethanat e jashtëzakonshme.",
          }
      : locale === "de"
        ? {
            title: "Geschätzte Entschädigung",
            upTo: "Bis zu",
            basedOn: "Nach",
            forRoute: "für eine Strecke von etwa",
            disclaimer:
              "Nur zur Orientierung. Der endgültige Anspruch hängt von der Verspätungsdauer, der Verantwortlichkeit der Fluggesellschaft und außergewöhnlichen Umständen ab.",
          }
      : locale === "nl"
        ? {
            title: "Geschatte compensatie",
            upTo: "Tot",
            basedOn: "Volgens",
            forRoute: "voor een traject van ongeveer",
            disclaimer:
              "Alleen ter oriëntatie. Het definitieve recht hangt af van de duur van de vertraging, de verantwoordelijkheid van de airline en buitengewone omstandigheden.",
          }
      : {
          title: "Estimated compensation",
          upTo: "Up to",
          basedOn: "Based on",
          forRoute: "for a route of about",
          disclaimer:
            "Indicative only. Final eligibility depends on delay length, airline responsibility, and extraordinary circumstances.",
        };

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 18px 0;background:${BRAND.soft};border:1px solid ${BRAND.border};border-radius:14px;">
      <tr>
        <td style="padding:20px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${BRAND.blue};margin-bottom:8px;">
            ${escapeHtml(labels.title)}
          </div>
          <div style="font-size:26px;line-height:1.2;font-weight:700;color:${BRAND.navy};margin-bottom:8px;">
            ${escapeHtml(labels.upTo)} ${escapeHtml(estimate.amountLabel)}
          </div>
          <div style="font-size:14px;line-height:1.5;color:${BRAND.muted};">
            ${escapeHtml(labels.basedOn)} ${escapeHtml(estimate.regulation)} ${escapeHtml(labels.forRoute)} ${escapeHtml(formatEstimateDistance(estimate.distanceKm))}.
          </div>
          <div style="font-size:12px;line-height:1.5;color:${BRAND.muted};margin-top:10px;">
            ${escapeHtml(labels.disclaimer)}
          </div>
        </td>
      </tr>
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
          ["Phone", payload.contactPhone?.trim() || "—"],
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

function submittedClaimCopy(locale?: string | null): {
  hello: (firstName: string) => string;
  body: string;
  trackingLabel: string;
  flightTitle: string;
  cta: string;
  note: string;
  preheader: (trackingNumber: string) => string;
  eyebrow: string;
  title: string;
  subject: (trackingNumber: string) => string;
} {
  switch (locale) {
    case "es":
      return {
        hello: (firstName) => `Hola ${firstName},`,
        body: "Hemos recibido tu reclamación. Guarda tu número de seguimiento para consultar el avance cuando quieras.",
        trackingLabel: "Número de seguimiento",
        flightTitle: "Tu vuelo",
        cta: "Seguir tu reclamación",
        note: "Te escribiremos cuando haya una novedad en tu caso.",
        preheader: (trackingNumber) => `Tu reclamación ${trackingNumber} está enviada`,
        eyebrow: "Reclamación enviada",
        title: "Ya tenemos tu reclamación",
        subject: (trackingNumber) => `Tu reclamación Compensall ${trackingNumber}`,
      };
    case "ro":
      return {
        hello: (firstName) => `Bună, ${firstName},`,
        body: "Am primit cererea ta. Păstrează numărul de urmărire ca să consulți oricând stadiul.",
        trackingLabel: "Număr de urmărire",
        flightTitle: "Zborul tău",
        cta: "Urmărește cererea",
        note: "Îți vom scrie când apare o noutate în dosar.",
        preheader: (trackingNumber) => `Cererea ta ${trackingNumber} a fost trimisă`,
        eyebrow: "Cerere trimisă",
        title: "Avem deja cererea ta",
        subject: (trackingNumber) => `Cererea ta Compensall ${trackingNumber}`,
      };
    case "hu":
      return {
        hello: (firstName) => `Szia ${firstName}!`,
        body: "Megkaptuk a kárigényed. Őrizd meg a nyomon követési számot, hogy bármikor megnézhesd az állást.",
        trackingLabel: "Nyomon követési szám",
        flightTitle: "A járatod",
        cta: "Kövesd a kárigényed",
        note: "Írunk, amint van újdonság az ügyedben.",
        preheader: (trackingNumber) => `A ${trackingNumber} kárigényed beérkezett`,
        eyebrow: "Kárigény beküldve",
        title: "Megvan a kárigényed",
        subject: (trackingNumber) => `A Compensall kárigényed: ${trackingNumber}`,
      };
    case "sq":
      return {
        hello: (firstName) => `Përshëndetje ${firstName},`,
        body: "E morëm kërkesën tënde. Ruaje numrin e ndjekjes që ta shohësh statusin kur të duash.",
        trackingLabel: "Numri i ndjekjes",
        flightTitle: "Fluturimi yt",
        cta: "Ndjek kërkesën",
        note: "Do të të shkruajmë sapo të ketë një lajm në dosje.",
        preheader: (trackingNumber) => `Kërkesa jote ${trackingNumber} u dërgua`,
        eyebrow: "Kërkesa u dërgua",
        title: "E kemi kërkesën tënde",
        subject: (trackingNumber) => `Kërkesa jote Compensall ${trackingNumber}`,
      };
    case "de":
      return {
        hello: (firstName) => `Guten Tag ${firstName},`,
        body: "Wir haben Ihren Antrag erhalten. Bewahren Sie Ihre Vorgangsnummer auf, damit Sie den Stand jederzeit einsehen können.",
        trackingLabel: "Vorgangsnummer",
        flightTitle: "Ihr Flug",
        cta: "Antrag verfolgen",
        note: "Wir schreiben Ihnen, sobald es Neuigkeiten zu Ihrem Fall gibt.",
        preheader: (trackingNumber) => `Ihr Antrag ${trackingNumber} ist eingegangen`,
        eyebrow: "Antrag eingereicht",
        title: "Wir haben Ihren Antrag",
        subject: (trackingNumber) => `Ihr Compensall-Antrag ${trackingNumber}`,
      };
    case "nl":
      return {
        hello: (firstName) => `Goedendag ${firstName},`,
        body: "Wij hebben uw claim ontvangen. Bewaar uw referentienummer, zodat u de status altijd kunt inzien.",
        trackingLabel: "Referentienummer",
        flightTitle: "Uw vlucht",
        cta: "Claim volgen",
        note: "Wij schrijven u zodra er nieuws is over uw dossier.",
        preheader: (trackingNumber) => `Uw claim ${trackingNumber} is ontvangen`,
        eyebrow: "Claim ingediend",
        title: "Wij hebben uw claim",
        subject: (trackingNumber) => `Uw Compensall-claim ${trackingNumber}`,
      };
    default:
      return {
        hello: (firstName) => `Hi ${firstName},`,
        body: "We’ve received your claim. Keep your tracking number handy to follow progress anytime.",
        trackingLabel: "Tracking number",
        flightTitle: "Your flight",
        cta: "Track your claim",
        note: "We’ll email you when there’s an update on your case.",
        preheader: (trackingNumber) => `Your claim ${trackingNumber} is submitted`,
        eyebrow: "Claim submitted",
        title: "We’ve got your claim",
        subject: (trackingNumber) => `Your Compensall claim ${trackingNumber}`,
      };
  }
}

export function buildUserHtml(
  payload: ClaimEmailPayload,
  trackUrl: string,
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.compensall.com",
): string {
  const firstName = payload.signedName.trim().split(/\s+/)[0] || payload.signedName;
  const copy = submittedClaimCopy(payload.locale);

  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:16px;line-height:1.55;color:${BRAND.navy};">
      ${escapeHtml(copy.hello(firstName))}
    </p>
    <p style="margin:0 0 22px 0;font-size:15px;line-height:1.55;color:${BRAND.muted};">
      ${escapeHtml(copy.body)}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 18px 0;background:${BRAND.soft};border:1px solid ${BRAND.border};border-radius:14px;">
      <tr>
        <td style="padding:20px;text-align:center;">
          <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${BRAND.blue};margin-bottom:8px;">${escapeHtml(copy.trackingLabel)}</div>
          <div style="font-size:26px;line-height:1.2;font-weight:700;letter-spacing:0.04em;color:${BRAND.navy};">${escapeHtml(payload.trackingNumber)}</div>
        </td>
      </tr>
    </table>
    ${sectionCard(copy.flightTitle, flightSummaryTable(payload.flight, payload.locale))}
    ${compensationEstimateCard(payload.flight, payload.locale)}
    <div style="text-align:center;margin:8px 0 6px 0;">
      ${ctaButton(copy.cta, trackUrl)}
    </div>
    <p style="margin:18px 0 0 0;font-size:13px;line-height:1.55;color:${BRAND.muted};text-align:center;">
      ${escapeHtml(copy.note)}
    </p>
  `;

  return emailShell({
    preheader: copy.preheader(payload.trackingNumber),
    eyebrow: copy.eyebrow,
    title: copy.title,
    bodyHtml,
    siteUrl,
  });
}

function statusUpdateCopy(locale: string | null | undefined, status: ClaimStatus): {
  hello: (firstName: string) => string;
  intro: string;
  newStatus: string;
  tracking: string;
  flight: string;
  route: string;
  cta: string;
  preheader: (trackingNumber: string, statusLabel: string) => string;
  eyebrow: string;
  title: (statusLabel: string) => string;
  subject: (trackingNumber: string, statusLabel: string) => string;
  statusLabel: string;
  statusMessage: string;
} {
  const statusLabel = CLAIM_STATUS_LABELS[status];
  const statusMessage = CLAIM_STATUS_MESSAGES[status];

  switch (locale) {
    case "es": {
      const es = spanishClaimStatusCopy(status);
      return {
        hello: (firstName) => `Hola ${firstName},`,
        intro: "Hay una novedad en tu reclamación Compensall.",
        newStatus: "Nuevo estado",
        tracking: "Seguimiento",
        flight: "Vuelo",
        route: "Ruta",
        cta: "Seguir tu reclamación",
        preheader: (trackingNumber, label) => `Tu reclamación ${trackingNumber} está ahora: ${label}`,
        eyebrow: "Actualización de la reclamación",
        title: (label) => `Estado: ${label}`,
        subject: (trackingNumber, label) =>
          `Novedad en tu reclamación Compensall ${trackingNumber}: ${label}`,
        statusLabel: es.label,
        statusMessage: es.message,
      };
    }
    case "ro": {
      const ro = romanianClaimStatusCopy(status);
      return {
        hello: (firstName) => `Bună, ${firstName},`,
        intro: "Există o noutate în cererea ta Compensall.",
        newStatus: "Stare nouă",
        tracking: "Urmărire",
        flight: "Zbor",
        route: "Rută",
        cta: "Urmărește cererea",
        preheader: (trackingNumber, label) => `Cererea ta ${trackingNumber} este acum: ${label}`,
        eyebrow: "Actualizare a cererii",
        title: (label) => `Stare: ${label}`,
        subject: (trackingNumber, label) =>
          `Noutate în cererea ta Compensall ${trackingNumber}: ${label}`,
        statusLabel: ro.label,
        statusMessage: ro.message,
      };
    }
    case "hu": {
      const hu = hungarianClaimStatusCopy(status);
      return {
        hello: (firstName) => `Szia ${firstName}!`,
        intro: "Van újdonság a Compensall kárigényedben.",
        newStatus: "Új állapot",
        tracking: "Nyomon követés",
        flight: "Járat",
        route: "Útvonal",
        cta: "Kövesd a kárigényed",
        preheader: (trackingNumber, label) => `A ${trackingNumber} kárigényed most: ${label}`,
        eyebrow: "Kárigény-frissítés",
        title: (label) => `Állapot: ${label}`,
        subject: (trackingNumber, label) =>
          `Újdonság a Compensall kárigényedben (${trackingNumber}): ${label}`,
        statusLabel: hu.label,
        statusMessage: hu.message,
      };
    }
    case "sq": {
      const sq = albanianClaimStatusCopy(status);
      return {
        hello: (firstName) => `Përshëndetje ${firstName},`,
        intro: "Ka një lajm të ri në kërkesën tënde Compensall.",
        newStatus: "Status i ri",
        tracking: "Ndjekje",
        flight: "Fluturim",
        route: "Itinerar",
        cta: "Ndjek kërkesën",
        preheader: (trackingNumber, label) => `Kërkesa jote ${trackingNumber} tani: ${label}`,
        eyebrow: "Përditësim i kërkesës",
        title: (label) => `Statusi: ${label}`,
        subject: (trackingNumber, label) =>
          `Lajm në kërkesën tënde Compensall ${trackingNumber}: ${label}`,
        statusLabel: sq.label,
        statusMessage: sq.message,
      };
    }
    case "de": {
      const de = germanClaimStatusCopy(status);
      return {
        hello: (firstName) => `Guten Tag ${firstName},`,
        intro: "Es gibt eine Neuigkeit zu Ihrem Compensall-Antrag.",
        newStatus: "Neuer Status",
        tracking: "Vorgang",
        flight: "Flug",
        route: "Strecke",
        cta: "Antrag verfolgen",
        preheader: (trackingNumber, label) => `Ihr Antrag ${trackingNumber} ist jetzt: ${label}`,
        eyebrow: "Aktualisierung des Antrags",
        title: (label) => `Status: ${label}`,
        subject: (trackingNumber, label) =>
          `Neuigkeit zu Ihrem Compensall-Antrag ${trackingNumber}: ${label}`,
        statusLabel: de.label,
        statusMessage: de.message,
      };
    }
    case "nl": {
      const nl = dutchClaimStatusCopy(status);
      return {
        hello: (firstName) => `Goedendag ${firstName},`,
        intro: "Er is nieuws over uw Compensall-claim.",
        newStatus: "Nieuwe status",
        tracking: "Dossier",
        flight: "Vlucht",
        route: "Traject",
        cta: "Claim volgen",
        preheader: (trackingNumber, label) => `Uw claim ${trackingNumber} is nu: ${label}`,
        eyebrow: "Update van de claim",
        title: (label) => `Status: ${label}`,
        subject: (trackingNumber, label) =>
          `Nieuws over uw Compensall-claim ${trackingNumber}: ${label}`,
        statusLabel: nl.label,
        statusMessage: nl.message,
      };
    }
    default:
      return {
        hello: (firstName) => `Hi ${firstName},`,
        intro: "There’s an update on your Compensall claim.",
        newStatus: "New status",
        tracking: "Tracking",
        flight: "Flight",
        route: "Route",
        cta: "Track your claim",
        preheader: (trackingNumber, label) => `Claim ${trackingNumber} is now ${label}`,
        eyebrow: "Claim update",
        title: (label) => `Status: ${label}`,
        subject: (trackingNumber, label) =>
          `Update on your Compensall claim ${trackingNumber}: ${label}`,
        statusLabel,
        statusMessage,
      };
  }
}

function spanishClaimStatusCopy(status: ClaimStatus): { label: string; message: string } {
  switch (status) {
    case "received":
    case "submitted":
    case "under_review":
      return {
        label: "Recibida",
        message:
          "Hemos recibido tu reclamación y nuestro equipo la está revisando. Te actualizaremos aquí en cuanto haya novedades.",
      };
    case "needs_documents":
      return {
        label: "Documentos necesarios",
        message:
          "Necesitamos algunos documentos más para seguir con tu reclamación. Revisa tu email o escríbenos al +351 923391980. Estaremos encantados de ayudarte.",
      };
    case "with_airline":
    case "airline_contacted":
      return {
        label: "Con la aerolínea",
        message:
          "Tu reclamación se ha presentado a la aerolínea. Estamos a la espera de su respuesta y te actualizaremos en cuanto sepamos algo.",
      };
    case "following_up":
      return {
        label: "En seguimiento",
        message:
          "La aerolínea ha respondido y estamos haciendo el seguimiento en tu nombre. Te mantendremos informado de cualquier novedad.",
      };
    case "payment_processing":
      return {
        label: "Pago en trámite",
        message:
          "Buenas noticias: la aerolínea ha aprobado tu compensación. Estamos tramitando el pago y te actualizaremos en breve.",
      };
    case "awaiting_fee":
      return {
        label: "Comisión del servicio",
        message:
          "¡Enhorabuena, tu reclamación ha tenido éxito! Completa el pago de nuestra comisión para que podamos cerrar el caso.",
      };
    case "paid":
    case "compensated":
      return {
        label: "Pagada",
        message:
          "¡Tu pago se ha completado! Gracias por confiar en nosotros. Si tienes cualquier duda, estamos aquí para ayudarte.",
      };
    case "closed_ntd":
      return {
        label: "Cerrada",
        message:
          "Lamentablemente no podemos seguir con tu reclamación y el caso se ha cerrado. Si tienes preguntas, no dudes en contactarnos.",
      };
    case "paused":
      return {
        label: "En pausa",
        message:
          "Tu caso está en pausa porque no hemos recibido respuesta tuya. Contáctanos en el +351 923391980 si quieres reactivarlo.",
      };
    case "closed_declined":
    case "closed":
      return {
        label: "Cerrada",
        message:
          "Lamentablemente la aerolínea ha rechazado tu reclamación y no podemos seguir adelante. El caso se ha cerrado: contáctanos si quieres hablar del resultado.",
      };
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function romanianClaimStatusCopy(status: ClaimStatus): { label: string; message: string } {
  switch (status) {
    case "received":
    case "submitted":
    case "under_review":
      return {
        label: "Primită",
        message:
          "Am primit cererea ta și echipa noastră o analizează. Te vom actualiza aici de îndată ce apar noutăți.",
      };
    case "needs_documents":
      return {
        label: "Documente necesare",
        message:
          "Avem nevoie de câteva documente în plus ca să continuăm cererea. Verifică e-mailul sau scrie-ne la +351 923391980. Te ajutăm cu plăcere.",
      };
    case "with_airline":
    case "airline_contacted":
      return {
        label: "La compania aeriană",
        message:
          "Cererea ta a fost depusă la compania aeriană. Așteptăm răspunsul lor și te actualizăm imediat ce știm ceva.",
      };
    case "following_up":
      return {
        label: "În urmărire",
        message:
          "Compania a răspuns și facem urmărirea în numele tău. Te ținem la curent cu orice noutate.",
      };
    case "payment_processing":
      return {
        label: "Plată în curs",
        message:
          "Veste bună: compania a aprobat despăgubirea. Procesăm plata și te actualizăm în scurt timp.",
      };
    case "awaiting_fee":
      return {
        label: "Comisionul serviciului",
        message:
          "Felicitări, cererea ta a avut succes! Finalizează plata comisionului nostru ca să putem închide dosarul.",
      };
    case "paid":
    case "compensated":
      return {
        label: "Plătită",
        message:
          "Plata ta este finalizată! Mulțumim pentru încredere. Dacă ai orice întrebare, suntem aici să te ajutăm.",
      };
    case "closed_ntd":
      return {
        label: "Închisă",
        message:
          "Din păcate nu putem continua cererea ta și dosarul a fost închis. Dacă ai întrebări, nu ezita să ne contactezi.",
      };
    case "paused":
      return {
        label: "În pauză",
        message:
          "Dosarul tău este în pauză pentru că nu am primit răspuns de la tine. Contactează-ne la +351 923391980 dacă vrei să-l reactivezi.",
      };
    case "closed_declined":
    case "closed":
      return {
        label: "Închisă",
        message:
          "Din păcate compania a respins cererea și nu putem merge mai departe. Dosarul a fost închis: contactează-ne dacă vrei să vorbim despre rezultat.",
      };
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function hungarianClaimStatusCopy(status: ClaimStatus): { label: string; message: string } {
  switch (status) {
    case "received":
    case "submitted":
    case "under_review":
      return {
        label: "Beérkezett",
        message:
          "Megkaptuk a kárigényed, a csapatunk átnézi. Itt frissítjük, amint van hír.",
      };
    case "needs_documents":
      return {
        label: "Iratok kellenek",
        message:
          "Még néhány iratra van szükségünk a folytatáshoz. Nézd meg az e-mailed, vagy írj nekünk a +351 923391980-as számon. Szívesen segítünk.",
      };
    case "with_airline":
    case "airline_contacted":
      return {
        label: "A légitársaságnál",
        message:
          "A kárigényed elment a légitársasághoz. Várjuk a válaszukat, és amint van hír, frissítjük.",
      };
    case "following_up":
      return {
        label: "Utánkövetés",
        message:
          "A légitársaság válaszolt, és a nevedben utánkövetjük. Minden fejleményről tájékoztatunk.",
      };
    case "payment_processing":
      return {
        label: "Kifizetés folyamatban",
        message:
          "Jó hír: a légitársaság jóváhagyta a kártérítést. Most a kifizetést intézzük, és hamarosan frissítjük.",
      };
    case "awaiting_fee":
      return {
        label: "Szolgáltatási díj",
        message:
          "Gratulálunk, a kárigényed sikeres volt! Teljesítsd a szolgáltatási díj kifizetését, hogy lezárhassuk az ügyet.",
      };
    case "paid":
    case "compensated":
      return {
        label: "Kifizetve",
        message:
          "A kifizetésed megtörtént! Köszönjük a bizalmat. Ha kérdésed van, mindig itt vagyunk.",
      };
    case "closed_ntd":
      return {
        label: "Lezárva",
        message:
          "Sajnos nem tudjuk tovább vinni a kárigényed, az ügyet lezártuk. Ha kérdésed van, nyugodtan keress minket.",
      };
    case "paused":
      return {
        label: "Szünetel",
        message:
          "Az ügyed szünetel, mert nem kaptunk tőled választ. Írj a +351 923391980-as számra, ha újra szeretnéd indítani.",
      };
    case "closed_declined":
    case "closed":
      return {
        label: "Lezárva",
        message:
          "Sajnos a légitársaság elutasította a kárigényed, és nem tudjuk tovább vinni. Az ügyet lezártuk: keress minket, ha meg szeretnéd beszélni az eredményt.",
      };
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function albanianClaimStatusCopy(status: ClaimStatus): { label: string; message: string } {
  switch (status) {
    case "received":
    case "submitted":
    case "under_review":
      return {
        label: "U mor",
        message:
          "E morëm kërkesën tënde dhe ekipi ynë po e shqyrton. Do ta përditësojmë këtu sapo të ketë lajm.",
      };
    case "needs_documents":
      return {
        label: "Duhet dokumentacion",
        message:
          "Na duhen edhe disa dokumente për të vazhduar. Shikoje emailin ose na shkruaj në +351 923391980. Jemi gati të ndihmojmë.",
      };
    case "with_airline":
    case "airline_contacted":
      return {
        label: "Te kompania ajrore",
        message:
          "Kërkesa shkoi te kompania ajrore. Po presim përgjigjen dhe do të përditësojmë sapo të ketë lajm.",
      };
    case "following_up":
      return {
        label: "Në ndjekje",
        message:
          "Kompania u përgjigj dhe po e ndjekim në emrin tënd. Do të të njoftojmë për çdo zhvillim.",
      };
    case "payment_processing":
      return {
        label: "Pagesa në proces",
        message:
          "Lajm i mirë: kompania e miratoi kompensimin. Tani po e përgatisim pagesën dhe së shpejti do të përditësojmë.",
      };
    case "awaiting_fee":
      return {
        label: "Tarifa e shërbimit",
        message:
          "Urime, kërkesa jote doli me sukses! Përfundo pagesën e tarifës së shërbimit që ta mbyllim dosjen.",
      };
    case "paid":
    case "compensated":
      return {
        label: "U pagua",
        message:
          "Pagesa u krye! Faleminderit për besimin. Nëse ke pyetje, jemi këtu.",
      };
    case "closed_ntd":
      return {
        label: "U mbyll",
        message:
          "Fatkeqësisht nuk mund ta çojmë më tej kërkesën; dosja u mbyll. Nëse ke pyetje, na shkruaj pa hezitim.",
      };
    case "paused":
      return {
        label: "Në pauzë",
        message:
          "Dosja është në pauzë sepse nuk morëm përgjigje prej teje. Shkruaji +351 923391980 nëse do ta rinisësh.",
      };
    case "closed_declined":
    case "closed":
      return {
        label: "U mbyll",
        message:
          "Fatkeqësisht kompania e refuzoi kërkesën dhe nuk mund ta çojmë më tej. Dosja u mbyll: na shkruaj nëse do ta diskutojmë rezultatin.",
      };
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function germanClaimStatusCopy(status: ClaimStatus): { label: string; message: string } {
  switch (status) {
    case "received":
    case "submitted":
    case "under_review":
      return {
        label: "Eingegangen",
        message:
          "Wir haben Ihren Antrag erhalten und unser Team prüft ihn. Wir aktualisieren den Stand hier, sobald es Neuigkeiten gibt.",
      };
    case "needs_documents":
      return {
        label: "Unterlagen erforderlich",
        message:
          "Wir benötigen noch einige Unterlagen, um Ihren Antrag fortzusetzen. Prüfen Sie Ihre E-Mails oder schreiben Sie uns unter +351 923391980. Wir helfen Ihnen gern.",
      };
    case "with_airline":
    case "airline_contacted":
      return {
        label: "Bei der Fluggesellschaft",
        message:
          "Ihr Antrag liegt bei der Fluggesellschaft. Wir warten auf die Antwort und informieren Sie, sobald wir etwas wissen.",
      };
    case "following_up":
      return {
        label: "In Nachverfolgung",
        message:
          "Die Fluggesellschaft hat geantwortet, und wir verfolgen den Fall in Ihrem Namen. Wir halten Sie über jede Entwicklung auf dem Laufenden.",
      };
    case "payment_processing":
      return {
        label: "Zahlung in Bearbeitung",
        message:
          "Gute Nachrichten: Die Fluggesellschaft hat Ihre Entschädigung genehmigt. Wir bereiten die Auszahlung vor und aktualisieren den Stand in Kürze.",
      };
    case "awaiting_fee":
      return {
        label: "Servicegebühr",
        message:
          "Herzlichen Glückwunsch, Ihr Antrag war erfolgreich! Zahlen Sie bitte unsere Servicegebühr, damit wir den Fall abschließen können.",
      };
    case "paid":
    case "compensated":
      return {
        label: "Ausgezahlt",
        message:
          "Ihre Auszahlung ist erfolgt! Danke für Ihr Vertrauen. Wenn Sie Fragen haben, sind wir für Sie da.",
      };
    case "closed_ntd":
      return {
        label: "Geschlossen",
        message:
          "Leider können wir Ihren Antrag nicht weiterverfolgen; der Fall wurde geschlossen. Bei Fragen schreiben Sie uns gern.",
      };
    case "paused":
      return {
        label: "Pausiert",
        message:
          "Ihr Fall ist pausiert, weil wir keine Rückmeldung von Ihnen erhalten haben. Schreiben Sie uns unter +351 923391980, wenn Sie ihn wieder aufnehmen möchten.",
      };
    case "closed_declined":
    case "closed":
      return {
        label: "Geschlossen",
        message:
          "Leider hat die Fluggesellschaft Ihren Antrag abgelehnt, und wir können ihn nicht weiterverfolgen. Der Fall wurde geschlossen: Schreiben Sie uns, wenn Sie das Ergebnis besprechen möchten.",
      };
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function dutchClaimStatusCopy(status: ClaimStatus): { label: string; message: string } {
  switch (status) {
    case "received":
    case "submitted":
    case "under_review":
      return {
        label: "Ontvangen",
        message:
          "Wij hebben uw claim ontvangen en ons team toetst deze. Wij werken de status hier bij zodra er nieuws is.",
      };
    case "needs_documents":
      return {
        label: "Stukken vereist",
        message:
          "Wij hebben nog enkele stukken nodig om uw claim voort te zetten. Controleer uw e-mail of schrijf ons op +351 923391980. Wij helpen u graag.",
      };
    case "with_airline":
    case "airline_contacted":
      return {
        label: "Bij de airline",
        message:
          "Uw claim ligt bij de airline. Wij wachten op het antwoord en informeren u zodra wij iets weten.",
      };
    case "following_up":
      return {
        label: "In opvolging",
        message:
          "De airline heeft geantwoord en wij volgen de zaak namens u. Wij houden u op de hoogte van elke ontwikkeling.",
      };
    case "payment_processing":
      return {
        label: "Betaling in behandeling",
        message:
          "Goed nieuws: de airline heeft uw compensatie goedgekeurd. Wij bereiden de uitbetaling voor en werken de status binnenkort bij.",
      };
    case "awaiting_fee":
      return {
        label: "Servicefee",
        message:
          "Gefeliciteerd, uw claim is geslaagd! Betaal onze servicefee, zodat wij het dossier kunnen afronden.",
      };
    case "paid":
    case "compensated":
      return {
        label: "Uitbetaald",
        message:
          "Uw uitbetaling is gedaan! Dank u voor uw vertrouwen. Als u vragen hebt, zijn wij er voor u.",
      };
    case "closed_ntd":
      return {
        label: "Gesloten",
        message:
          "Helaas kunnen wij uw claim niet verder vervolgen; het dossier is gesloten. Bij vragen schrijft u ons gerust.",
      };
    case "paused":
      return {
        label: "Gepauzeerd",
        message:
          "Uw dossier is gepauzeerd omdat wij geen reactie van u hebben ontvangen. Schrijf ons op +351 923391980 als u het wilt hervatten.",
      };
    case "closed_declined":
    case "closed":
      return {
        label: "Gesloten",
        message:
          "Helaas heeft de airline uw claim afgewezen en kunnen wij deze niet verder vervolgen. Het dossier is gesloten: schrijf ons als u de uitkomst wilt bespreken.",
      };
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export function buildStatusUpdateHtml(options: {
  trackingNumber: string;
  signedName: string;
  flight: ClaimFlightData;
  status: ClaimStatus;
  trackUrl: string;
  siteUrl: string;
  locale?: string | null;
}): string {
  const firstName = options.signedName.trim().split(/\s+/)[0] || options.signedName;
  const copy = statusUpdateCopy(options.locale, options.status);

  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:16px;line-height:1.55;color:${BRAND.navy};">
      ${escapeHtml(copy.hello(firstName))}
    </p>
    <p style="margin:0 0 22px 0;font-size:15px;line-height:1.55;color:${BRAND.muted};">
      ${escapeHtml(copy.intro)}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 18px 0;background:${BRAND.soft};border:1px solid ${BRAND.border};border-radius:14px;">
      <tr>
        <td style="padding:20px;text-align:center;">
          <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${BRAND.blue};margin-bottom:8px;">${escapeHtml(copy.newStatus)}</div>
          <div style="font-size:24px;line-height:1.25;font-weight:700;color:${BRAND.navy};margin-bottom:10px;">${escapeHtml(copy.statusLabel)}</div>
          <div style="font-size:14px;line-height:1.5;color:${BRAND.muted};">${escapeHtml(copy.statusMessage)}</div>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 18px 0;background:${BRAND.white};border:1px solid ${BRAND.border};border-radius:14px;">
      <tr>
        <td style="padding:16px 18px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${detailRows([
              [copy.tracking, options.trackingNumber],
              [copy.flight, options.flight.flight],
              [copy.route, `${options.flight.routeFrom} → ${options.flight.routeTo}`],
            ])}
          </table>
        </td>
      </tr>
    </table>
    ${compensationEstimateCard(options.flight, options.locale)}
    <div style="text-align:center;margin:8px 0 6px 0;">
      ${ctaButton(copy.cta, options.trackUrl)}
    </div>
  `;

  return emailShell({
    preheader: copy.preheader(options.trackingNumber, copy.statusLabel),
    eyebrow: copy.eyebrow,
    title: copy.title(copy.statusLabel),
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
          locale: payload.locale,
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
  options: { skipOpsEmail?: boolean } = {},
): Promise<{ opsSent: boolean; userSent: boolean }> {
  const trackUrl = buildTrackUrl(siteUrl, payload.trackingNumber, payload.locale);
  const attachments = buildOpsAttachments(payload);
  const attachmentNames = attachments.map((item) => item.filename);

  // Ops email to help@ is skipped by default — Odoo IMAP would create a duplicate ticket.
  // Pass skipOpsEmail: false only for explicit internal testing.
  const opsSent = options.skipOpsEmail === false
    ? await sendViaResend({
        to: [getOpsEmail()],
        subject: `[Compensall] New claim ${payload.trackingNumber}: ${payload.flight.flight}`,
        html: buildOpsHtml(payload, attachmentNames, siteUrl),
        attachments: attachments.length > 0 ? attachments : undefined,
      })
    : false;

  const userCopy = submittedClaimCopy(payload.locale);
  const userSent = await sendViaResend({
    to: [payload.contactEmail],
    subject: userCopy.subject(payload.trackingNumber),
    html: buildUserHtml(payload, trackUrl, siteUrl),
  });

  return { opsSent, userSent };
}

function resumeClaimCopy(locale?: string | null): {
  subject: string;
  preheader: string;
  eyebrow: string;
  title: string;
  hello: (firstName: string) => string;
  body: (flightNumber: string) => string;
  cta: string;
  note: string;
  flightTitle: string;
} {
  switch (locale) {
    case "pt":
      return {
        subject: "Conclua o seu pedido Compensall",
        preheader: "Os seus dados estão guardados. Só falta assinar e enviar.",
        eyebrow: "Pedido incompleto",
        title: "Continue o seu pedido",
        hello: (firstName) => `Olá ${firstName},`,
        body: (flightNumber) =>
          `Começou um pedido de compensação para o voo ${flightNumber}. Guardámos os dados do voo e do contacto para não ter de preencher tudo outra vez.`,
        cta: "Continuar o pedido",
        note: "O link é pessoal e é válido durante 30 dias. Só precisa de assinar a procuração e enviar.",
        flightTitle: "O seu voo",
      };
    case "fr":
      return {
        subject: "Terminez votre dossier Compensall",
        preheader: "Vos informations sont enregistrées. Il reste à signer et envoyer.",
        eyebrow: "Dossier incomplet",
        title: "Reprendre votre réclamation",
        hello: (firstName) => `Bonjour ${firstName},`,
        body: (flightNumber) =>
          `Vous avez commencé une réclamation pour le vol ${flightNumber}. Nous avons enregistré les détails du vol et vos coordonnées pour éviter de tout ressaisir.`,
        cta: "Continuer la réclamation",
        note: "Ce lien est personnel et reste valable 30 jours. Il ne reste qu'à signer la procuration et envoyer.",
        flightTitle: "Votre vol",
      };
    case "es":
      return {
        subject: "Termina tu reclamación Compensall",
        preheader: "Tus datos están guardados. Solo falta firmar y enviar.",
        eyebrow: "Reclamación incompleta",
        title: "Continúa tu reclamación",
        hello: (firstName) => `Hola ${firstName},`,
        body: (flightNumber) =>
          `Empezaste una reclamación de compensación para el vuelo ${flightNumber}. Guardamos los datos del vuelo y de contacto para que no tengas que empezar de nuevo.`,
        cta: "Continuar la reclamación",
        note: "Este enlace es personal y es válido durante 30 días. Solo tienes que firmar el poder de representación y enviar.",
        flightTitle: "Tu vuelo",
      };
    case "ro":
      return {
        subject: "Finalizează cererea ta Compensall",
        preheader: "Datele tale sunt salvate. Mai rămâne să semnezi și să trimiți.",
        eyebrow: "Cerere incompletă",
        title: "Continuă cererea",
        hello: (firstName) => `Bună, ${firstName},`,
        body: (flightNumber) =>
          `Ai început o cerere de despăgubire pentru zborul ${flightNumber}. Am salvat datele zborului și ale contactului ca să nu o iei de la capăt.`,
        cta: "Continuă cererea",
        note: "Acest link este personal și rămâne valabil 30 de zile. Mai trebuie doar să semnezi împuternicirea și să trimiți.",
        flightTitle: "Zborul tău",
      };
    case "hu":
      return {
        subject: "Fejezd be a Compensall kárigényed",
        preheader: "Az adataid el vannak mentve. Már csak aláírni és beküldeni kell.",
        eyebrow: "Befejezetlen kárigény",
        title: "Folytasd a kárigényed",
        hello: (firstName) => `Szia ${firstName}!`,
        body: (flightNumber) =>
          `Kártérítési kárigényt indítottál a ${flightNumber} járatra. Elmentettük a járat- és kapcsolattartási adatokat, hogy ne kelljen elölről kezdened.`,
        cta: "Kárigény folytatása",
        note: "Ez a link személyes, és 30 napig érvényes. Már csak a meghatalmazást kell aláírnod, majd beküldened.",
        flightTitle: "A járatod",
      };
    case "sq":
      return {
        subject: "Përfundo kërkesën tënde Compensall",
        preheader: "Të dhënat e tua janë ruajtur. Mbetet të nënshkruash dhe të dërgosh.",
        eyebrow: "Kërkesë e papërfunduar",
        title: "Vazhdo kërkesën",
        hello: (firstName) => `Përshëndetje ${firstName},`,
        body: (flightNumber) =>
          `Ke nisur një kërkesë kompensimi për fluturimin ${flightNumber}. I ruajtëm të dhënat e fluturimit dhe kontaktit, që të mos fillosh nga e para.`,
        cta: "Vazhdo kërkesën",
        note: "Ky lidhje është personale dhe vlen 30 ditë. Të mbetet të nënshkruash prokurën dhe ta dërgosh.",
        flightTitle: "Fluturimi yt",
      };
    case "de":
      return {
        subject: "Schließen Sie Ihren Compensall-Antrag ab",
        preheader: "Ihre Angaben sind gespeichert. Es fehlt nur noch die Unterschrift und das Absenden.",
        eyebrow: "Unvollständiger Antrag",
        title: "Antrag fortsetzen",
        hello: (firstName) => `Guten Tag ${firstName},`,
        body: (flightNumber) =>
          `Sie haben einen Entschädigungsantrag für den Flug ${flightNumber} begonnen. Wir haben Flug- und Kontaktdaten gespeichert, damit Sie nicht von vorn beginnen müssen.`,
        cta: "Antrag fortsetzen",
        note: "Dieser Link ist persönlich und 30 Tage gültig. Sie müssen nur noch die Vollmacht unterschreiben und den Antrag absenden.",
        flightTitle: "Ihr Flug",
      };
    case "nl":
      return {
        subject: "Rond uw Compensall-claim af",
        preheader: "Uw gegevens zijn opgeslagen. Alleen ondertekenen en indienen ontbreekt nog.",
        eyebrow: "Onvolledige claim",
        title: "Claim hervatten",
        hello: (firstName) => `Goedendag ${firstName},`,
        body: (flightNumber) =>
          `U hebt een compensatieclaim voor vlucht ${flightNumber} gestart. Wij hebben vlucht- en contactgegevens opgeslagen, zodat u niet opnieuw hoeft te beginnen.`,
        cta: "Claim hervatten",
        note: "Deze link is persoonlijk en 30 dagen geldig. U hoeft alleen nog de volmacht te ondertekenen en de claim in te dienen.",
        flightTitle: "Uw vlucht",
      };
    default:
      return {
        subject: "Finish your Compensall claim",
        preheader: "Your details are saved. You only need to sign and send.",
        eyebrow: "Incomplete claim",
        title: "Continue your claim",
        hello: (firstName) => `Hi ${firstName},`,
        body: (flightNumber) =>
          `You started a compensation claim for flight ${flightNumber}. We saved your flight and contact details so you don’t have to start again.`,
        cta: "Continue your claim",
        note: "This link is personal and stays valid for 30 days. You only need to sign the Power of Attorney and submit.",
        flightTitle: "Your flight",
      };
  }
}

export async function sendResumeClaimEmail(options: {
  signedName: string;
  contactEmail: string;
  flight: ClaimFlightData;
  resumeUrl: string;
  siteUrl: string;
  locale?: string | null;
}): Promise<boolean> {
  if (!options.contactEmail.trim()) {
    return false;
  }

  const copy = resumeClaimCopy(options.locale);
  const firstName = options.signedName.trim().split(/\s+/)[0] || options.signedName;

  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:16px;line-height:1.55;color:${BRAND.navy};">
      ${escapeHtml(copy.hello(firstName))}
    </p>
    <p style="margin:0 0 22px 0;font-size:15px;line-height:1.55;color:${BRAND.muted};">
      ${escapeHtml(copy.body(options.flight.flight))}
    </p>
    ${sectionCard(copy.flightTitle, flightSummaryTable(options.flight, options.locale))}
    <div style="text-align:center;margin:8px 0 6px 0;">
      ${ctaButton(copy.cta, options.resumeUrl)}
    </div>
    <p style="margin:18px 0 0 0;font-size:13px;line-height:1.55;color:${BRAND.muted};text-align:center;">
      ${escapeHtml(copy.note)}
    </p>
  `;

  return sendViaResend({
    to: [options.contactEmail],
    subject: copy.subject,
    html: emailShell({
      preheader: copy.preheader,
      eyebrow: copy.eyebrow,
      title: copy.title,
      bodyHtml,
      siteUrl: options.siteUrl,
    }),
  });
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
  const copy = statusUpdateCopy(options.locale, options.status);

  return sendViaResend({
    to: [options.contactEmail],
    subject: copy.subject(options.trackingNumber, copy.statusLabel),
    html: buildStatusUpdateHtml({
      trackingNumber: options.trackingNumber,
      signedName: options.signedName,
      flight: options.flight,
      status: options.status,
      trackUrl,
      siteUrl: options.siteUrl,
      locale: options.locale,
    }),
  });
}
