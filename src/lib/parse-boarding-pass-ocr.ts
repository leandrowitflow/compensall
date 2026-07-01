import type { ClaimFlightData, FlightStatus } from "@/lib/claim-types";
import { normalizeFlightData } from "@/lib/claim-types";

const NOT_VISIBLE = /not visible|n\/a|unknown/i;

function readLabeledField(text: string, labels: string[]): string {
  for (const label of labels) {
    const pattern = new RegExp(`(?:^|\\n)\\s*${label}\\s*[:\\-]\\s*(.+?)\\s*(?:\\n|$)`, "i");
    const match = text.match(pattern);
    if (match?.[1] && !NOT_VISIBLE.test(match[1])) {
      return match[1].trim();
    }
  }
  return "";
}

function extractFlightNumber(text: string): string {
  const labeled = readLabeledField(text, ["FLIGHT", "FLT"]);
  if (labeled) return labeled.replace(/\s+/g, " ").trim();

  const flightPatterns = [
    /\b(?:FLIGHT|FLT)\s*[#:]?\s*([A-Z0-9]{2,3}\s?\d{2,4}[A-Z]?)\b/i,
    /\b([A-Z]{2,3})\s*(\d{2,4})\b/,
  ];

  for (const pattern of flightPatterns) {
    const match = text.match(pattern);
    if (match) {
      if (match[2]) return `${match[1]}${match[2]}`.replace(/\s/g, "");
      return match[1].trim();
    }
  }

  return "";
}

function extractIataCodes(text: string): string[] {
  const codes = new Set<string>();
  const blacklist = new Set(["PDF", "PNG", "JPG", "API", "UTC", "GMT", "EST", "NOT", "THE", "AND", "FOR"]);

  for (const match of text.matchAll(/\(([A-Z]{3})\)/g)) {
    if (!blacklist.has(match[1])) codes.add(match[1]);
  }

  for (const match of text.matchAll(/\b(?:FROM|DEP|DEPARTURE|ORIGIN|TO|ARR|ARRIVAL|DEST)[:\s-]+([A-Z]{3})\b/gi)) {
    if (!blacklist.has(match[1])) codes.add(match[1].toUpperCase());
  }

  for (const match of text.matchAll(/\b([A-Z]{3})\b/g)) {
    if (!blacklist.has(match[1])) codes.add(match[1]);
  }

  return [...codes];
}

function formatRoute(iata: string, context: string): string {
  const cityPattern = new RegExp(
    `([A-Za-z][A-Za-z\\s'-]{2,40}?)\\s*\\(${iata}\\)|\\(${iata}\\)|(?:FROM|TO|DEP|ARR)[^\\n]*${iata}[^\\n]*`,
    "i",
  );
  const cityMatch = context.match(cityPattern);
  if (cityMatch?.[1]) {
    return `${cityMatch[1].trim()} (${iata})`;
  }
  return iata;
}

function extractRoutes(text: string): { routeFrom: string; routeTo: string } {
  const dep = readLabeledField(text, ["DEPARTURE", "FROM", "ORIGIN", "DEP"]);
  const arr = readLabeledField(text, ["ARRIVAL", "TO", "DESTINATION", "ARR"]);

  if (dep && arr) {
    return { routeFrom: dep, routeTo: arr };
  }

  const arrow = text.match(/([A-Za-z0-9()\s-]{3,40})\s*(?:→|->|—|-)\s*([A-Za-z0-9()\s-]{3,40})/);
  if (arrow) {
    return { routeFrom: arrow[1].trim(), routeTo: arrow[2].trim() };
  }

  const codes = extractIataCodes(text);
  if (codes.length >= 2) {
    return {
      routeFrom: formatRoute(codes[0], text),
      routeTo: formatRoute(codes[1], text),
    };
  }

  if (codes.length === 1) {
    return { routeFrom: formatRoute(codes[0], text), routeTo: "" };
  }

  return { routeFrom: "", routeTo: "" };
}

function extractDate(text: string): string {
  const labeled = readLabeledField(text, ["DATE", "DEPARTURE DATE", "BOARDING", "FLIGHT DATE"]);
  if (labeled) return labeled;

  const patterns = [
    /\b(\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4})\b/,
    /\b(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})\b/i,
    /\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4})\b/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return match[1].trim();
  }

  return "";
}

export function parseBoardingPassFromOcr(text: string): ClaimFlightData {
  const routes = extractRoutes(text);

  return normalizeFlightData({
    passenger: readLabeledField(text, ["PASSENGER", "NAME", "PAX"]),
    flight: extractFlightNumber(text),
    routeFrom: routes.routeFrom,
    routeTo: routes.routeTo,
    date: extractDate(text),
    status: "Unknown" as FlightStatus,
    delay: "",
  });
}

export function mergeFlightData(
  primary: ClaimFlightData,
  ...fallbacks: Partial<ClaimFlightData>[]
): ClaimFlightData {
  const merged: ClaimFlightData = { ...primary };

  for (const fallback of fallbacks) {
    if (!merged.passenger && fallback.passenger) merged.passenger = fallback.passenger;
    if (!merged.flight && fallback.flight) merged.flight = fallback.flight;
    if (!merged.routeFrom && fallback.routeFrom) merged.routeFrom = fallback.routeFrom;
    if (!merged.routeTo && fallback.routeTo) merged.routeTo = fallback.routeTo;
    if (!merged.date && fallback.date) merged.date = fallback.date;
    if (merged.status === "Unknown" && fallback.status && fallback.status !== "Unknown") {
      merged.status = fallback.status;
    }
    if (!merged.delay && fallback.delay) merged.delay = fallback.delay;
  }

  return normalizeFlightData(merged);
}

export function countCoreFields(flight: ClaimFlightData): number {
  return [flight.passenger, flight.flight, flight.routeFrom, flight.routeTo, flight.date].filter(Boolean).length;
}
