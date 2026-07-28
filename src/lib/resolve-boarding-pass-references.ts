import type { BoardingPassReferences } from "@/lib/extract-boarding-pass-references";
import { lookupAirlineByCarrierCode } from "@/lib/lookup-airline";
import { formatRouteFromIata, normalizeIata } from "@/lib/lookup-airport";
import { normalizeFlightData, type ClaimFlightData } from "@/lib/claim-types";

const MONTH_INDEX: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
  // PT
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
  // FR
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

/** EC261 claims are recent; reject OCR years that are clearly wrong (e.g. 2001). */
const MIN_YEARS_BACK = 6;
const MAX_YEARS_FORWARD = 1;

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

function utcDate(year: number, month: number, day: number): Date | null {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  if (!isPlausibleFlightYear(year)) return null;
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

export function isPlausibleFlightYear(year: number): boolean {
  const currentYear = new Date().getUTCFullYear();
  return year >= currentYear - MIN_YEARS_BACK && year <= currentYear + MAX_YEARS_FORWARD;
}

/** Expand YY to a 20xx year nearest to today within the claim window. */
export function expandTwoDigitYear(yy: number): number | null {
  if (yy < 0 || yy > 99) return null;
  const currentYear = new Date().getUTCFullYear();
  const centuryBase = Math.floor(currentYear / 100) * 100;
  const candidates = [centuryBase + yy, centuryBase + yy - 100, centuryBase + yy + 100];
  let best: number | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const year of candidates) {
    if (!isPlausibleFlightYear(year)) continue;
    const distance = Math.abs(year - currentYear);
    if (distance < bestDistance) {
      best = year;
      bestDistance = distance;
    }
  }
  return best;
}

function parseIsoDate(value: string): Date | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  return utcDate(Number(match[1]), Number(match[2]), Number(match[3]));
}

/**
 * Boarding passes almost always print dates as day/month/year (international standard),
 * never month/day/year (US-only). JS `new Date("08/06/2026")` assumes US format and
 * silently misreads "8 June" as "August 6" — so we parse numeric dates ourselves.
 */
function parseNumericDate(value: string): Date | null {
  const fourDigit = value.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (fourDigit) {
    let day = Number(fourDigit[1]);
    let month = Number(fourDigit[2]);
    const year = Number(fourDigit[3]);

    const dayLooksLikeMonth = day <= 12;
    const monthOutOfRange = month > 12;

    if (monthOutOfRange && dayLooksLikeMonth) {
      [day, month] = [month, day];
    }

    return utcDate(year, month, day);
  }

  const twoDigit = value.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2})$/);
  if (!twoDigit) return null;

  let day = Number(twoDigit[1]);
  let month = Number(twoDigit[2]);
  const year = expandTwoDigitYear(Number(twoDigit[3]));
  if (year == null) return null;

  if (month > 12 && day <= 12) {
    [day, month] = [month, day];
  }

  return utcDate(year, month, day);
}

/** IATA / boarding-pass styles: 22JUL26, 22 JUL 2026, 22 July 2026. */
function parseNamedMonthDate(value: string): Date | null {
  const compact = value
    .trim()
    .replace(/,/g, " ")
    .replace(/\s+/g, " ");

  const match = compact.match(
    /^(\d{1,2})\s*([A-Za-z]{3,9})\.?\s*(\d{2}|\d{4})$/,
  );
  if (!match) return null;

  const day = Number(match[1]);
  const monthKey = match[2].toLowerCase();
  const month = MONTH_INDEX[monthKey] ?? MONTH_INDEX[monthKey.slice(0, 3)];
  if (!month) return null;

  const yearToken = match[3];
  const year =
    yearToken.length === 2 ? expandTwoDigitYear(Number(yearToken)) : Number(yearToken);
  if (year == null) return null;

  return utcDate(year, month, day);
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Convert stored display/ISO date to YYYY-MM-DD for <input type="date">. */
export function toDateInputValue(raw: string): string {
  const parsed = parseFlightDate(raw);
  if (!parsed) return "";
  const year = parsed.getUTCFullYear();
  const month = String(parsed.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsed.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseFlightDate(raw: string): Date | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  return (
    parseIsoDate(trimmed) ??
    parseNumericDate(trimmed) ??
    parseNamedMonthDate(trimmed.replace(/\s+/g, "")) ??
    parseNamedMonthDate(trimmed)
  );
}

/**
 * Normalize a printed boarding-pass date.
 * Never use bare `new Date(string)` — it turns `22JUL01` into 22 July 2001 on UTC servers.
 * Implausible years (OCR mistakes like 2001 for 2026) return "" so Step 2 forces a correction.
 */
export function normalizeFlightDate(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  const parsed = parseFlightDate(trimmed);
  if (!parsed) {
    return "";
  }

  return formatDisplayDate(parsed);
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
      bookingReference: refs.recordLocator?.trim().toUpperCase() || null,
    }),
    recordLocator: refs.recordLocator?.trim().toUpperCase() ?? "",
    airlineName: carrier ? (lookupAirlineByCarrierCode(carrier) ?? carrier) : "",
    resolutionSource: "references",
  };
}

export function toClaimFlightData(resolved: ResolvedBoardingPass): ClaimFlightData {
  return normalizeFlightData(resolved);
}
