import type {
  ClaimEntryMode,
  ClaimFlightData,
  ClaimVerification,
  FlightStatus,
} from "@/lib/claim-types";
import { lookupAirlineByCarrierCode } from "@/lib/lookup-airline";
import {
  getOdooConfig,
  isOdooConfigured,
  odooAttachFilesToHelpdeskTicket,
  odooCreateCrmLead,
  odooCreateHelpdeskTicket,
  odooFindHelpdeskTicketByTrackingNumber,
  odooFindLeadBySessionId,
  odooUpdateCrmLead,
  odooUpdateHelpdeskTicket,
  type OdooAttachmentInput,
  type OdooCrmLeadSummary,
  type OdooHelpdeskTicketSummary,
} from "@/lib/odoo-client";

export type { OdooCrmLeadSummary, OdooHelpdeskTicketSummary };

export type OdooClaimLeadInput = {
  trackingNumber: string;
  signedName: string;
  contactEmail: string;
  contactPhone?: string | null;
  entryMode: ClaimEntryMode;
  flight: ClaimFlightData;
  verification: ClaimVerification;
  siteUrl: string;
  locale?: string | null;
  landingPage?: string | null;
  odooLeadId?: number | null;
  formSessionId?: string | null;
  /** PNG signature as raw base64 (no data: prefix). */
  signaturePngBase64?: string | null;
  /** Signed PoA HTML as UTF-8 base64. */
  signedPoaHtmlBase64?: string | null;
  boardingPass?: {
    fileName: string;
    mimeType: string;
    base64: string;
  } | null;
};

export type OdooPartialClaimLeadInput = {
  formSessionId: string;
  signedName: string;
  contactEmail: string;
  contactPhone?: string | null;
  entryMode: ClaimEntryMode;
  flight: ClaimFlightData;
  siteUrl: string;
  locale?: string | null;
  landingPage?: string | null;
  odooLeadId?: number | null;
  step?: string;
};

export type OdooClaimSyncResult = {
  lead: OdooCrmLeadSummary | null;
  ticket: OdooHelpdeskTicketSummary | null;
};

const MONTH_INDEX: Record<string, number> = {
  january: 1,
  jan: 1,
  february: 2,
  feb: 2,
  march: 3,
  mar: 3,
  april: 4,
  apr: 4,
  may: 5,
  june: 6,
  jun: 6,
  july: 7,
  jul: 7,
  august: 8,
  aug: 8,
  september: 9,
  sep: 9,
  sept: 9,
  october: 10,
  oct: 10,
  november: 11,
  nov: 11,
  december: 12,
  dec: 12,
  janeiro: 1,
  fevereiro: 2,
  marco: 3,
  março: 3,
  abril: 4,
  maio: 5,
  junho: 6,
  julho: 7,
  agosto: 8,
  setembro: 9,
  outubro: 10,
  novembro: 11,
  dezembro: 12,
  janvier: 1,
  fevrier: 2,
  février: 2,
  mars: 3,
  avril: 4,
  mai: 5,
  juin: 6,
  juillet: 7,
  aout: 8,
  août: 8,
  septembre: 9,
  octobre: 10,
  novembre: 11,
  decembre: 12,
  décembre: 12,
};

function stripNameTitle(value: string): string {
  return value.replace(/\b(MR|MRS|MS|MISS|DR|M|MME|MLLE)\b\.?/gi, "").replace(/\s+/g, " ").trim();
}

function splitPassengerName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  if (trimmed.includes("/")) {
    const [lastName, firstName] = trimmed.split("/").map((part) => part.trim());
    return {
      firstName: stripNameTitle(firstName || trimmed),
      lastName: lastName || "",
    };
  }

  // Boarding-pass style: "COELHO, FERNANDO MR"
  if (trimmed.includes(",")) {
    const [lastName, firstPart = ""] = trimmed.split(",").map((part) => part.trim());
    return {
      firstName: stripNameTitle(firstPart) || firstPart,
      lastName: lastName || "",
    };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: stripNameTitle(parts[0]), lastName: "" };
  }

  return {
    firstName: stripNameTitle(parts[0]),
    lastName: parts.slice(1).join(" "),
  };
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function toOdooDate(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const dmy = trimmed.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
  if (dmy) {
    const day = Number(dmy[1]);
    const month = Number(dmy[2]);
    const year = Number(dmy[3]);
    if (year >= 2000 && year <= 2100 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return `${year}-${pad2(month)}-${pad2(day)}`;
    }
  }

  const named = trimmed.match(/^(\d{1,2})\s+([A-Za-zà-úÀ-Ú.]+)\s+(\d{4})$/u);
  if (named) {
    const day = Number(named[1]);
    const year = Number(named[3]);
    const monthKey = named[2].replace(/\./g, "").toLowerCase();
    const month = MONTH_INDEX[monthKey];
    if (month && year >= 2000 && year <= 2100 && day >= 1 && day <= 31) {
      return `${year}-${pad2(month)}-${pad2(day)}`;
    }
  }

  const parsed = Date.parse(trimmed);
  if (Number.isNaN(parsed)) {
    return undefined;
  }

  const date = new Date(parsed);
  const year = date.getUTCFullYear();
  if (year < 2000 || year > 2100) {
    return undefined;
  }

  return `${year}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
}

function mapDisruptionType(status: FlightStatus): string | undefined {
  switch (status) {
    case "Delayed":
      return "delayed";
    case "Cancelled":
      return "cancelled";
    case "Denied boarding":
      return "denied_boarding";
    case "Unknown":
      return undefined;
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

function mapDelayDuration(delay: string, status: FlightStatus): string | undefined {
  if (status === "Cancelled" || status === "Denied boarding") {
    return "more_than_3";
  }

  const hoursMatch = delay.match(/(\d+(?:[.,]\d+)?)\s*h/i);
  const hours = hoursMatch ? Number.parseFloat(hoursMatch[1].replace(",", ".")) : Number.NaN;
  if (Number.isFinite(hours)) {
    return hours >= 3 ? "more_than_3" : "less_than_3";
  }

  const minutesMatch = delay.match(/(\d+)\s*m/i);
  const minutes = minutesMatch ? Number.parseInt(minutesMatch[1], 10) : Number.NaN;
  if (Number.isFinite(minutes)) {
    return minutes >= 180 ? "more_than_3" : "less_than_3";
  }

  return undefined;
}

function resolveAirlineName(flightNumber: string): string | undefined {
  const upper = flightNumber.trim().toUpperCase().replace(/\s+/g, "");
  const three = upper.match(/^([A-Z]{3})(\d+)/);
  if (three) {
    const named = lookupAirlineByCarrierCode(three[1]);
    if (named) return named;
  }

  const two = upper.match(/^([A-Z0-9]{2})(\d+)/);
  if (!two) {
    return undefined;
  }

  return lookupAirlineByCarrierCode(two[1]) ?? two[1];
}

function buildHelpdeskTicketValues(input: OdooClaimLeadInput): Record<string, unknown> {
  const { firstName, lastName } = splitPassengerName(input.signedName || input.flight.passenger);
  const flightDate = toOdooDate(input.flight.date);
  const disruptionType = mapDisruptionType(input.flight.status);
  const delayDuration = mapDelayDuration(input.flight.delay, input.flight.status);
  const airline = resolveAirlineName(input.flight.flight);
  const trackUrl = `${input.siteUrl.replace(/\/$/, "")}/track/${input.trackingNumber}`;
  const phone = input.contactPhone?.trim() || "";

  const teamIdRaw = process.env.ODOO_HELPDESK_TEAM_ID?.trim();
  const teamId = teamIdRaw ? Number.parseInt(teamIdRaw, 10) : 2;

  const values: Record<string, unknown> = {
    name: `Compensall claim ${input.trackingNumber} — ${input.flight.flight}`,
    partner_name: input.signedName.trim(),
    partner_email: input.contactEmail.trim(),
    // Compensall Helpdesk team (not Aireclaim team_id 1).
    team_id: Number.isFinite(teamId) ? teamId : 2,
    x_studio_first_name: firstName,
    x_studio_last_name: lastName,
    x_studio_email: input.contactEmail.trim(),
    x_studio_flight_number: input.flight.flight.trim(),
    x_studio_departed_from: input.flight.routeFrom.trim(),
    x_studio_final_destination: input.flight.routeTo.trim(),
    x_studio_number_of_passengers: "1",
    // Keep description minimal — case data lives in dedicated fields.
    description: `<p>Compensall website claim ${input.trackingNumber}.</p><p><a href="${trackUrl}">${trackUrl}</a></p>`,
  };

  if (phone) {
    values.partner_phone = phone;
    values.x_studio_phone = phone;
  }

  if (flightDate) {
    values.x_studio_flight_date = flightDate;
  }
  if (disruptionType) {
    values.x_studio_disruption_type = disruptionType;
  }
  if (delayDuration) {
    values.x_studio_delay_duration = delayDuration;
  }
  if (airline) {
    values.x_studio_airline = airline;
  }
  if (input.verification.summary.trim()) {
    values.x_studio_reason_detail = input.verification.summary.trim();
  }

  const signature = input.signaturePngBase64?.trim();
  if (signature) {
    values.x_studio_signature = signature;
    values.x_studio_signature_filename = `signature-${input.trackingNumber}.png`;
  }

  return values;
}

function buildTicketAttachments(input: OdooClaimLeadInput): OdooAttachmentInput[] {
  const attachments: OdooAttachmentInput[] = [];

  if (input.signedPoaHtmlBase64?.trim()) {
    attachments.push({
      name: `Power-of-Attorney-${input.trackingNumber}.html`,
      mimetype: "text/html",
      datas: input.signedPoaHtmlBase64.trim(),
    });
  }

  if (input.signaturePngBase64?.trim()) {
    attachments.push({
      name: `signature-${input.trackingNumber}.png`,
      mimetype: "image/png",
      datas: input.signaturePngBase64.trim(),
    });
  }

  if (input.boardingPass?.base64) {
    const original = input.boardingPass.fileName.trim() || "boarding-pass";
    const hasExtension = /\.[a-z0-9]+$/i.test(original);
    attachments.push({
      name: hasExtension ? original : `${original}.bin`,
      mimetype: input.boardingPass.mimeType,
      datas: input.boardingPass.base64,
    });
  }

  return attachments;
}

function buildSubmittedLeadDescription(input: OdooClaimLeadInput): string {
  const lines = [
    "Form status: Submitted",
    input.formSessionId ? `Session: ${input.formSessionId}` : null,
    `Tracking number: ${input.trackingNumber}`,
    input.contactPhone?.trim() ? `Phone: ${input.contactPhone.trim()}` : null,
    input.locale ? `Locale: ${input.locale}` : null,
    input.landingPage ? `Landing page: ${input.landingPage}` : null,
    `Track claim: ${input.siteUrl.replace(/\/$/, "")}/track/${input.trackingNumber}`,
  ].filter(Boolean);

  return lines.join("\n");
}

function buildPartialLeadDescription(input: OdooPartialClaimLeadInput): string {
  const lines = [
    "Form status: Incomplete",
    `Session: ${input.formSessionId}`,
    `Step: ${input.step ?? "contact_confirmed"}`,
    input.contactPhone?.trim() ? `Phone: ${input.contactPhone.trim()}` : null,
    input.locale ? `Locale: ${input.locale}` : null,
    input.landingPage ? `Landing page: ${input.landingPage}` : null,
    `Resume claim: ${input.siteUrl.replace(/\/$/, "")}/#claim`,
  ].filter(Boolean);

  return lines.join("\n");
}

async function syncHelpdeskTicket(
  input: OdooClaimLeadInput,
): Promise<OdooHelpdeskTicketSummary | null> {
  const config = getOdooConfig();
  if (!config) {
    return null;
  }

  const values = buildHelpdeskTicketValues(input);
  const existingTicketId = await odooFindHelpdeskTicketByTrackingNumber(input.trackingNumber);

  const ticket = existingTicketId
    ? await odooUpdateHelpdeskTicket(existingTicketId, values, {
        extraTagNames: [config.submittedTagName],
      })
    : await odooCreateHelpdeskTicket(values, {
        extraTagNames: [config.submittedTagName],
      });

  try {
    await odooAttachFilesToHelpdeskTicket(ticket.id, buildTicketAttachments(input));
  } catch (error) {
    console.error("Odoo Helpdesk ticket attachments failed:", error);
  }

  return ticket;
}

export async function syncPartialClaimToOdoo(
  input: OdooPartialClaimLeadInput,
): Promise<OdooCrmLeadSummary | null> {
  if (!isOdooConfigured()) {
    return null;
  }

  const config = getOdooConfig();
  const leadName = `Compensall incomplete — ${input.flight.flight} — ${input.signedName.trim()}`;
  const phone = input.contactPhone?.trim() || "";
  const values: Record<string, unknown> = {
    name: leadName,
    contact_name: input.signedName.trim(),
    email_from: input.contactEmail.trim(),
    description: buildPartialLeadDescription(input),
    website: input.landingPage ?? `${input.siteUrl.replace(/\/$/, "")}/#claim`,
  };
  if (phone) {
    values.phone = phone;
  }

  const existingLeadId =
    input.odooLeadId ??
    (await odooFindLeadBySessionId(input.formSessionId));

  if (existingLeadId) {
    return odooUpdateCrmLead(existingLeadId, values, {
      extraTagNames: [config?.incompleteTagName],
    });
  }

  return odooCreateCrmLead(values, {
    utmMediumName: config?.utmMediumIncompleteName,
    extraTagNames: [config?.incompleteTagName],
  });
}

export async function syncClaimToOdoo(input: OdooClaimLeadInput): Promise<OdooCrmLeadSummary | null> {
  const result = await syncClaimCaseToOdoo(input);
  return result.lead;
}

export async function syncClaimCaseToOdoo(input: OdooClaimLeadInput): Promise<OdooClaimSyncResult> {
  if (!isOdooConfigured()) {
    return { lead: null, ticket: null };
  }

  let lead: OdooCrmLeadSummary | null = null;
  let ticket: OdooHelpdeskTicketSummary | null = null;

  try {
    const config = getOdooConfig();
    const leadName = `Compensall claim ${input.trackingNumber} — ${input.flight.flight}`;
    const phone = input.contactPhone?.trim() || "";
    const values: Record<string, unknown> = {
      name: leadName,
      contact_name: input.signedName,
      email_from: input.contactEmail,
      description: buildSubmittedLeadDescription(input),
      website: input.landingPage ?? `${input.siteUrl.replace(/\/$/, "")}/#claim`,
    };
    if (phone) {
      values.phone = phone;
    }

    const existingLeadId =
      input.odooLeadId ??
      (input.formSessionId ? await odooFindLeadBySessionId(input.formSessionId) : null);

    lead = existingLeadId
      ? await odooUpdateCrmLead(existingLeadId, values, {
          extraTagNames: [config?.submittedTagName],
        })
      : await odooCreateCrmLead(values, {
          extraTagNames: [config?.submittedTagName],
        });
  } catch (error) {
    console.error("Odoo CRM lead sync failed:", error);
  }

  try {
    ticket = await syncHelpdeskTicket(input);
  } catch (error) {
    console.error("Odoo Helpdesk ticket sync failed:", error);
  }

  return { lead, ticket };
}

export async function safeSyncPartialClaimToOdoo(
  input: OdooPartialClaimLeadInput,
): Promise<OdooCrmLeadSummary | null> {
  try {
    return await syncPartialClaimToOdoo(input);
  } catch (error) {
    console.error("Odoo partial CRM lead sync failed:", error);
    return null;
  }
}
