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
  odooCreateCrmLead,
  odooCreateHelpdeskTicket,
  odooFindHelpdeskTicketByTrackingNumber,
  odooFindLeadBySessionId,
  odooUpdateCrmLead,
  odooUpdateHelpdeskTicket,
  type OdooCrmLeadSummary,
  type OdooHelpdeskTicketSummary,
} from "@/lib/odoo-client";

export type { OdooCrmLeadSummary, OdooHelpdeskTicketSummary };

export type OdooClaimLeadInput = {
  trackingNumber: string;
  signedName: string;
  contactEmail: string;
  entryMode: ClaimEntryMode;
  flight: ClaimFlightData;
  verification: ClaimVerification;
  siteUrl: string;
  locale?: string | null;
  landingPage?: string | null;
  odooLeadId?: number | null;
  formSessionId?: string | null;
};

export type OdooPartialClaimLeadInput = {
  formSessionId: string;
  signedName: string;
  contactEmail: string;
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

function splitPassengerName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  if (trimmed.includes("/")) {
    const [lastName, firstName] = trimmed.split("/").map((part) => part.trim());
    return {
      firstName: firstName || trimmed,
      lastName: lastName || "",
    };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function toOdooDate(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const parsed = Date.parse(trimmed);
  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return new Date(parsed).toISOString().slice(0, 10);
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
  const match = flightNumber.trim().toUpperCase().match(/^([A-Z]{2})\d/);
  if (!match) {
    return undefined;
  }

  return lookupAirlineByCarrierCode(match[1]) ?? match[1];
}

function buildHelpdeskTicketValues(input: OdooClaimLeadInput): Record<string, unknown> {
  const { firstName, lastName } = splitPassengerName(input.signedName || input.flight.passenger);
  const flightDate = toOdooDate(input.flight.date);
  const disruptionType = mapDisruptionType(input.flight.status);
  const delayDuration = mapDelayDuration(input.flight.delay, input.flight.status);
  const airline = resolveAirlineName(input.flight.flight);
  const trackUrl = `${input.siteUrl.replace(/\/$/, "")}/track/${input.trackingNumber}`;

  const values: Record<string, unknown> = {
    name: `Compensall claim ${input.trackingNumber} — ${input.flight.flight}`,
    partner_name: input.signedName.trim(),
    partner_email: input.contactEmail.trim(),
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

  return values;
}

function buildSubmittedLeadDescription(input: OdooClaimLeadInput): string {
  const lines = [
    "Form status: Submitted",
    input.formSessionId ? `Session: ${input.formSessionId}` : null,
    `Tracking number: ${input.trackingNumber}`,
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

  if (existingTicketId) {
    return odooUpdateHelpdeskTicket(existingTicketId, values, {
      extraTagNames: [config.submittedTagName],
    });
  }

  return odooCreateHelpdeskTicket(values, {
    extraTagNames: [config.submittedTagName],
  });
}

export async function syncPartialClaimToOdoo(
  input: OdooPartialClaimLeadInput,
): Promise<OdooCrmLeadSummary | null> {
  if (!isOdooConfigured()) {
    return null;
  }

  const config = getOdooConfig();
  const leadName = `Compensall incomplete — ${input.flight.flight} — ${input.signedName.trim()}`;
  const values = {
    name: leadName,
    contact_name: input.signedName.trim(),
    email_from: input.contactEmail.trim(),
    description: buildPartialLeadDescription(input),
    website: input.landingPage ?? `${input.siteUrl.replace(/\/$/, "")}/#claim`,
  };

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
    const values = {
      name: leadName,
      contact_name: input.signedName,
      email_from: input.contactEmail,
      description: buildSubmittedLeadDescription(input),
      website: input.landingPage ?? `${input.siteUrl.replace(/\/$/, "")}/#claim`,
    };

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
