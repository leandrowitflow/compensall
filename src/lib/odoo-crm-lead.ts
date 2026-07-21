import type { ClaimEntryMode, ClaimFlightData, ClaimVerification } from "@/lib/claim-types";
import {
  getOdooConfig,
  isOdooConfigured,
  odooCreateCrmLead,
  odooFindLeadBySessionId,
  odooUpdateCrmLead,
  resolveOdooTagId,
  type OdooCrmLeadSummary,
} from "@/lib/odoo-client";

export type { OdooCrmLeadSummary };

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

function buildFlightLines(flight: ClaimFlightData): string[] {
  return [
    `Passenger: ${flight.passenger}`,
    `Flight: ${flight.flight}`,
    `Route: ${flight.routeFrom} → ${flight.routeTo}`,
    `Date: ${flight.date}`,
    `Status: ${flight.status}`,
    flight.delay ? `Delay: ${flight.delay}` : null,
  ].filter((line): line is string => Boolean(line));
}

function buildSubmittedLeadDescription(input: OdooClaimLeadInput): string {
  const lines = [
    "Form status: Submitted",
    input.formSessionId ? `Session: ${input.formSessionId}` : null,
    `Tracking number: ${input.trackingNumber}`,
    `Entry mode: ${input.entryMode}`,
    ...buildFlightLines(input.flight),
    `Verification: ${input.verification.result}`,
    `Verification summary: ${input.verification.summary}`,
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
    `Entry mode: ${input.entryMode}`,
    ...buildFlightLines(input.flight),
    input.locale ? `Locale: ${input.locale}` : null,
    input.landingPage ? `Landing page: ${input.landingPage}` : null,
    `Resume claim: ${input.siteUrl.replace(/\/$/, "")}/#claim`,
  ].filter(Boolean);

  return lines.join("\n");
}

async function getSubmittedTagId(): Promise<number | undefined> {
  const config = getOdooConfig();
  return resolveOdooTagId(config?.submittedTagName);
}

async function getIncompleteTagId(): Promise<number | undefined> {
  const config = getOdooConfig();
  return resolveOdooTagId(config?.incompleteTagName);
}

export async function syncPartialClaimToOdoo(
  input: OdooPartialClaimLeadInput,
): Promise<OdooCrmLeadSummary | null> {
  if (!isOdooConfigured()) {
    return null;
  }

  const config = getOdooConfig();
  const incompleteTagId = await getIncompleteTagId();
  const leadName = `Compensall incomplete — ${input.flight.flight} — ${input.signedName.trim()}`;
  const values = {
    name: leadName,
    contact_name: input.signedName.trim(),
    email_from: input.contactEmail.trim(),
    description: buildPartialLeadDescription(input),
    website: input.landingPage ?? `${input.siteUrl.replace(/\/$/, "")}/#claim`,
    ...(incompleteTagId ? { tag_ids: [[6, 0, [incompleteTagId]]] } : {}),
  };

  const existingLeadId =
    input.odooLeadId ??
    (await odooFindLeadBySessionId(input.formSessionId));

  if (existingLeadId) {
    return odooUpdateCrmLead(existingLeadId, values);
  }

  return odooCreateCrmLead(values, {
    utmMediumName: config?.utmMediumIncompleteName,
    tagIds: incompleteTagId ? [incompleteTagId] : undefined,
  });
}

export async function syncClaimToOdoo(input: OdooClaimLeadInput): Promise<OdooCrmLeadSummary | null> {
  if (!isOdooConfigured()) {
    return null;
  }

  try {
    const submittedTagId = await getSubmittedTagId();
    const leadName = `Compensall claim ${input.trackingNumber} — ${input.flight.flight}`;
    const values = {
      name: leadName,
      contact_name: input.signedName,
      email_from: input.contactEmail,
      description: buildSubmittedLeadDescription(input),
      website: input.landingPage ?? `${input.siteUrl.replace(/\/$/, "")}/#claim`,
      ...(submittedTagId ? { tag_ids: [[6, 0, [submittedTagId]]] } : {}),
    };

    const existingLeadId =
      input.odooLeadId ??
      (input.formSessionId ? await odooFindLeadBySessionId(input.formSessionId) : null);

    if (existingLeadId) {
      return odooUpdateCrmLead(existingLeadId, values);
    }

    return odooCreateCrmLead(values, {
      tagIds: submittedTagId ? [submittedTagId] : undefined,
    });
  } catch (error) {
    console.error("Odoo CRM lead sync failed:", error);
    return null;
  }
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
