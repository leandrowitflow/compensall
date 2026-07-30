import type {
  ClaimEntryMode,
  ClaimFlightData,
  ClaimPassenger,
  ClaimVerification,
  FlightStatus,
} from "@/lib/claim-types";
import { lookupAirlineByCarrierCode } from "@/lib/lookup-airline";
import { toDateInputValue } from "@/lib/resolve-boarding-pass-references";
import {
  getOdooConfig,
  isOdooConfigured,
  odooAttachFilesToHelpdeskTicket,
  odooCreateCrmLead,
  odooCreateHelpdeskTicket,
  odooFindHelpdeskTicketByTrackingNumber,
  odooFindLeadBySessionId,
  odooFindOrCreatePartner,
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
  /** Extra supporting docs (legacy / misc attachments). */
  additionalDocuments?: Array<{
    fileName: string;
    mimeType: string;
    base64: string;
  }> | null;
  claimDocuments?: {
    passportCopy?: { fileName: string; mimeType: string; base64: string } | null;
    bookingConfirmation?: { fileName: string; mimeType: string; base64: string } | null;
    expensesReceipts?: { fileName: string; mimeType: string; base64: string } | null;
    otherDocuments?: Array<{ fileName: string; mimeType: string; base64: string }> | null;
  } | null;
  additionalPassengers?: Array<
    ClaimPassenger & {
      signaturePngBase64?: string | null;
      signedPoaHtmlBase64?: string | null;
    }
  > | null;
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

function toOdooDate(value: string): string | undefined {
  const iso = toDateInputValue(value);
  return iso || undefined;
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

function mapDelayDuration(flight: ClaimFlightData): string | undefined {
  if (flight.status === "Cancelled" || flight.status === "Denied boarding") {
    return "more_than_3";
  }

  if (flight.delayDuration === "more_than_3" || flight.delayDuration === "less_than_3") {
    return flight.delayDuration;
  }

  const delay = flight.delay;
  if (delay === "more_than_3" || delay === "less_than_3") {
    return delay;
  }

  const hoursMatch = delay.match(/(\d+(?:[.,]\d+)?)\s*h/i);
  const hours = hoursMatch ? Number.parseFloat(hoursMatch[1]!.replace(",", ".")) : Number.NaN;
  if (Number.isFinite(hours)) {
    return hours >= 3 ? "more_than_3" : "less_than_3";
  }

  const minutesMatch = delay.match(/(\d+)\s*m/i);
  const minutes = minutesMatch ? Number.parseInt(minutesMatch[1]!, 10) : Number.NaN;
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
  const delayDuration = mapDelayDuration(input.flight);
  const airline = resolveAirlineName(input.flight.flight);
  const trackUrl = `${input.siteUrl.replace(/\/$/, "")}/track/${input.trackingNumber}`;
  const phone = input.contactPhone?.trim() || "";
  const extraPassengers = (input.additionalPassengers ?? []).slice(0, 9);
  const passengerCount = Math.min(10, 1 + extraPassengers.length);

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
    x_studio_number_of_passengers: String(passengerCount),
    x_studio_poa_confirm: true,
    // Keep description empty of ops-email HTML — case data lives in studio fields.
    description: `<p><a href="${trackUrl}">Track ${input.trackingNumber}</a></p>`,
  };

  if (phone) {
    values.partner_phone = phone;
    values.x_studio_phone = phone;
  }

  const bookingReference = input.flight.bookingReference?.trim();
  if (bookingReference) {
    values.x_studio_booking_reference = bookingReference;
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
  if (typeof input.flight.hadConnectingFlight === "boolean") {
    values.x_studio_connecting_flights = input.flight.hadConnectingFlight;
  }
  if (input.flight.cancellationNotice) {
    values.x_studio_information_days_before_departure = input.flight.cancellationNotice;
  }
  if (input.flight.disruptionReason) {
    values.x_studio_reason_detail = input.flight.disruptionReason;
    values.x_studio_did_airline_provide_a_reason = "yes";
  } else if (input.verification.summary.trim()) {
    values.x_studio_reason_detail = input.verification.summary.trim();
  }

  const signature = input.signaturePngBase64?.trim();
  if (signature) {
    values.x_studio_signature = signature;
    values.x_studio_signature_filename = `signature-${input.trackingNumber}.png`;
  }
  if (input.signedPoaHtmlBase64?.trim()) {
    values.x_studio_poa_report = input.signedPoaHtmlBase64.trim();
    values.x_studio_poa_report_filename = `Power-of-Attorney-${input.trackingNumber}.html`;
  }

  for (const [index, passenger] of extraPassengers.entries()) {
    const n = index + 2;
    const fullName = `${passenger.firstName} ${passenger.lastName}`.trim();
    values[`x_studio_name_passenger_${n}`] = fullName;
    if (passenger.email.trim()) {
      values[`x_studio_email_passenger_${n}`] = passenger.email.trim();
    }
    if (passenger.phone.trim()) {
      values[`x_studio_phone_passenger_${n}`] = passenger.phone.trim();
    }
    const passengerSignature = passenger.signaturePngBase64?.trim();
    if (passengerSignature) {
      values[`x_studio_signature_${n}`] = passengerSignature;
    }
    const passengerPoa = passenger.signedPoaHtmlBase64?.trim();
    if (passengerPoa) {
      values[`x_studio_poa_report_${n}`] = passengerPoa;
      values[`x_studio_poa_report_${n}_filename`] = `Power-of-Attorney-${input.trackingNumber}-pax${n}.html`;
    }
  }

  const passport = input.claimDocuments?.passportCopy;
  if (passport?.base64.trim()) {
    values.x_studio_passport_copy = passport.base64.trim();
    values.x_studio_passport_copy_filename = passport.fileName || "passport-copy";
    values.x_studio_passport_copy_send = true;
  }

  const bookingConfirmation = input.claimDocuments?.bookingConfirmation;
  if (bookingConfirmation?.base64.trim()) {
    values.x_studio_booking_confirmation = bookingConfirmation.base64.trim();
    values.x_studio_booking_confirmation_filename =
      bookingConfirmation.fileName || "booking-confirmation";
    values.x_studio_booking_confirmation_send = true;
  }

  const expenses = input.claimDocuments?.expensesReceipts;
  if (expenses?.base64.trim()) {
    values.x_studio_expenses_receipts = expenses.base64.trim();
    values.x_studio_expenses_receipts_filename = expenses.fileName || "expenses-receipts";
    values.x_studio_expenses_receipts_send = true;
  }

  const otherDocs = [
    ...(input.claimDocuments?.otherDocuments ?? []),
    ...(input.additionalDocuments ?? []),
  ].filter((doc) => doc.base64.trim());
  if (otherDocs[0]) {
    values.x_studio_other_documents = otherDocs[0].base64;
    values.x_studio_other_documents_filename = otherDocs[0].fileName || "supporting-document";
    values.x_studio_other_documents_send = true;
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

  const categorizedDocs = [
    input.claimDocuments?.passportCopy
      ? { ...input.claimDocuments.passportCopy, prefix: "passport" }
      : null,
    input.claimDocuments?.bookingConfirmation
      ? { ...input.claimDocuments.bookingConfirmation, prefix: "booking-confirmation" }
      : null,
    input.claimDocuments?.expensesReceipts
      ? { ...input.claimDocuments.expensesReceipts, prefix: "expenses-receipts" }
      : null,
    ...(input.claimDocuments?.otherDocuments ?? []).map((doc) => ({ ...doc, prefix: "other" })),
    ...(input.additionalDocuments ?? []).map((doc) => ({ ...doc, prefix: "other" })),
  ].filter((doc): doc is NonNullable<typeof doc> => Boolean(doc?.base64.trim()));

  for (const [index, doc] of categorizedDocs.entries()) {
    const original = doc.fileName.trim() || `${doc.prefix}-${index + 1}`;
    const hasExtension = /\.[a-z0-9]+$/i.test(original);
    attachments.push({
      name: hasExtension ? original : `${original}.bin`,
      mimetype: doc.mimeType || "application/octet-stream",
      datas: doc.base64,
    });
  }

  for (const [index, passenger] of (input.additionalPassengers ?? []).entries()) {
    const n = index + 2;
    if (passenger.signedPoaHtmlBase64?.trim()) {
      attachments.push({
        name: `Power-of-Attorney-${input.trackingNumber}-pax${n}.html`,
        mimetype: "text/html",
        datas: passenger.signedPoaHtmlBase64.trim(),
      });
    }
    if (passenger.signaturePngBase64?.trim()) {
      attachments.push({
        name: `signature-${input.trackingNumber}-pax${n}.png`,
        mimetype: "image/png",
        datas: passenger.signaturePngBase64.trim(),
      });
    }
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

  try {
    const partnerId = await odooFindOrCreatePartner({
      name: input.signedName.trim(),
      email: input.contactEmail.trim(),
      phone: input.contactPhone,
    });
    values.partner_id = partnerId;
  } catch (error) {
    console.error("Odoo partner sync failed:", error);
  }

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
