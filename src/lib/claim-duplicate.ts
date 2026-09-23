import { findClaimsByContactEmail } from "@/lib/claim-store";
import { odooSearchHelpdeskTicketsByEmailAndDate } from "@/lib/odoo-client";
import { toDateInputValue } from "@/lib/resolve-boarding-pass-references";

export const DUPLICATE_CLAIM_ERROR = "duplicate_claim";

export type ClaimIdentity = {
  name: string;
  email: string;
  flightNumber: string;
  flightDate: string;
};

export function normalizeClaimEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizeClaimName(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function normalizeClaimFlightNumber(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function claimIdentitiesMatch(left: ClaimIdentity, right: ClaimIdentity): boolean {
  const leftDate = toDateInputValue(left.flightDate);
  const rightDate = toDateInputValue(right.flightDate);
  if (!leftDate || leftDate !== rightDate) {
    return false;
  }

  const leftFlight = normalizeClaimFlightNumber(left.flightNumber);
  const rightFlight = normalizeClaimFlightNumber(right.flightNumber);
  if (!leftFlight || leftFlight !== rightFlight) {
    return false;
  }

  const leftEmail = normalizeClaimEmail(left.email);
  const rightEmail = normalizeClaimEmail(right.email);
  if (!leftEmail || leftEmail !== rightEmail) {
    return false;
  }

  const leftName = normalizeClaimName(left.name);
  const rightName = normalizeClaimName(right.name);
  return Boolean(leftName) && leftName === rightName;
}

export async function findDuplicateClaim(identity: ClaimIdentity): Promise<boolean> {
  const flightDate = toDateInputValue(identity.flightDate);
  const email = normalizeClaimEmail(identity.email);
  const name = identity.name.trim();
  const flightNumber = identity.flightNumber.trim();
  if (!flightDate || !email || !name || !flightNumber) {
    return false;
  }

  const wanted: ClaimIdentity = { name, email, flightNumber, flightDate };

  try {
    const claims = await findClaimsByContactEmail(email);
    if (
      claims.some((claim) =>
        claimIdentitiesMatch(wanted, {
          name: claim.signedName,
          email: claim.contactEmail,
          flightNumber: claim.flight.flight,
          flightDate: claim.flight.date,
        }),
      )
    ) {
      return true;
    }
  } catch (error) {
    console.error("Duplicate claim lookup in stored claims failed:", error);
  }

  try {
    const tickets = await odooSearchHelpdeskTicketsByEmailAndDate(email, flightDate);
    return tickets.some((ticket) => {
      const names = [ticket.partnerName, ticket.passengerName].filter(
        (value): value is string => Boolean(value?.trim()),
      );
      return names.some((ticketName) =>
        claimIdentitiesMatch(wanted, {
          name: ticketName,
          email: ticket.email || email,
          flightNumber: ticket.flightNumber || "",
          flightDate,
        }),
      );
    });
  } catch (error) {
    console.error("Duplicate claim lookup in Odoo failed:", error);
    return false;
  }
}
