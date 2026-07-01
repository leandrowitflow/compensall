import type { BoardingPassReferences } from "@/lib/extract-boarding-pass-references";
import { lookupAirlineByCarrierCode } from "@/lib/lookup-airline";
import { formatRouteFromIata, normalizeIata } from "@/lib/lookup-airport";
import { normalizeFlightData, type ClaimFlightData } from "@/lib/claim-types";

function formatPassengerName(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed.includes("/")) return trimmed;
  const [last, first] = trimmed.split("/");
  return `${first?.trim() ?? ""} ${last?.trim() ?? ""}`.trim();
}

function buildFlightDesignator(refs: BoardingPassReferences): string {
  if (refs.flightDesignator?.trim()) {
    return refs.flightDesignator.replace(/\s+/g, "").toUpperCase();
  }

  const carrier = refs.operatingCarrier?.trim().toUpperCase() ?? "";
  const number = refs.flightNumber?.trim() ?? "";
  if (carrier && number) return `${carrier}${number}`;
  return "";
}

function parseIsoDate(value: string): Date | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const [, year, month, day] = match;
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
}

/**
 * Boarding passes almost always print dates as day/month/year (international standard),
 * never month/day/year (US-only). JS `new Date("08/06/2026")` assumes US format and
 * silently misreads "8 June" as "August 6" — so we parse numeric dates ourselves.
 */
function parseNumericDate(value: string): Date | null {
  const match = value.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (!match) return null;

  let day = Number(match[1]);
  let month = Number(match[2]);
  const year = Number(match[3]);

  const dayLooksLikeMonth = day <= 12;
  const monthOutOfRange = month > 12;

  if (monthOutOfRange && dayLooksLikeMonth) {
    // Only valid reading is month/day/year — swap.
    [day, month] = [month, day];
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return new Date(Date.UTC(year, month - 1, day));
}

function normalizeFlightDate(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  const parsed =
    parseIsoDate(trimmed) ??
    parseNumericDate(trimmed) ??
    (() => {
      const fallback = new Date(trimmed);
      return Number.isNaN(fallback.getTime()) ? null : fallback;
    })();

  if (parsed) {
    return parsed.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  return trimmed;
}

export type ResolvedBoardingPass = ClaimFlightData & {
  recordLocator: string;
  airlineName: string;
  resolutionSource: "references";
};

export function resolveFromReferences(refs: BoardingPassReferences): ResolvedBoardingPass {
  const departureIata = normalizeIata(refs.departureIata);
  const arrivalIata = normalizeIata(refs.arrivalIata);
  const carrier = refs.operatingCarrier?.trim().toUpperCase() ?? "";

  return {
    ...normalizeFlightData({
      passenger: refs.passengerName ? formatPassengerName(refs.passengerName) : "",
      flight: buildFlightDesignator(refs),
      routeFrom: departureIata ? formatRouteFromIata(departureIata) : "",
      routeTo: arrivalIata ? formatRouteFromIata(arrivalIata) : "",
      date: refs.flightDate ? normalizeFlightDate(refs.flightDate) : "",
      status: "Unknown",
      delay: "",
    }),
    recordLocator: refs.recordLocator?.trim().toUpperCase() ?? "",
    airlineName: carrier ? (lookupAirlineByCarrierCode(carrier) ?? carrier) : "",
    resolutionSource: "references",
  };
}

export function toClaimFlightData(resolved: ResolvedBoardingPass): ClaimFlightData {
  return normalizeFlightData(resolved);
}
