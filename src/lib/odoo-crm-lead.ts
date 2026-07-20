import type { ClaimEntryMode, ClaimFlightData, ClaimVerification } from "@/lib/claim-types";
import {
  getOdooConfig,
  isOdooConfigured,
  odooCreateCrmLead,
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
};

function buildLeadDescription(input: OdooClaimLeadInput): string {
  const lines = [
    `Tracking number: ${input.trackingNumber}`,
    `Entry mode: ${input.entryMode}`,
    `Passenger: ${input.flight.passenger}`,
    `Flight: ${input.flight.flight}`,
    `Route: ${input.flight.routeFrom} → ${input.flight.routeTo}`,
    `Date: ${input.flight.date}`,
    `Status: ${input.flight.status}`,
    input.flight.delay ? `Delay: ${input.flight.delay}` : null,
    `Verification: ${input.verification.result}`,
    `Verification summary: ${input.verification.summary}`,
    input.locale ? `Locale: ${input.locale}` : null,
    input.landingPage ? `Landing page: ${input.landingPage}` : null,
    `Track claim: ${input.siteUrl.replace(/\/$/, "")}/track/${input.trackingNumber}`,
  ].filter(Boolean);

  return lines.join("\n");
}

export async function createOdooCrmLeadFromClaim(
  input: OdooClaimLeadInput,
): Promise<OdooCrmLeadSummary | null> {
  if (!isOdooConfigured()) {
    return null;
  }

  const leadName = `Compensall claim ${input.trackingNumber} — ${input.flight.flight}`;

  return odooCreateCrmLead({
    name: leadName,
    contact_name: input.signedName,
    email_from: input.contactEmail,
    description: buildLeadDescription(input),
    website: input.landingPage ?? `${input.siteUrl.replace(/\/$/, "")}/#claim`,
  });
}

export async function syncClaimToOdoo(input: OdooClaimLeadInput): Promise<OdooCrmLeadSummary | null> {
  try {
    return await createOdooCrmLeadFromClaim(input);
  } catch (error) {
    console.error("Odoo CRM lead sync failed:", error);
    return null;
  }
}
