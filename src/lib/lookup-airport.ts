import {
  airportOptionsList,
  formatAirportRouteLabel,
  type AirportOption,
} from "@/lib/airport-search";

const iataIndex = new Map<string, AirportOption>();

for (const airport of airportOptionsList) {
  iataIndex.set(airport.iata.toUpperCase(), airport);
}

/** Common IATA codes that may not be in our catalog yet. */
const FALLBACK_IATA_CITIES: Record<string, string> = {
  CDG: "Paris",
  ORY: "Paris",
  FCO: "Rome",
  MXP: "Milan",
  LIN: "Milan",
  VCE: "Venice",
  BER: "Berlin",
  DUS: "Düsseldorf",
  HAM: "Hamburg",
  NCE: "Nice",
  LYS: "Lyon",
  AGP: "Málaga",
  PMI: "Palma",
  OPO: "Porto",
  FAO: "Faro",
  WAW: "Warsaw",
  KRK: "Kraków",
  ATH: "Athens",
  VIE: "Vienna",
  ZRH: "Zurich",
  GVA: "Geneva",
  CPH: "Copenhagen",
  OSL: "Oslo",
  ARN: "Stockholm",
  HEL: "Helsinki",
  PRG: "Prague",
  BUD: "Budapest",
  OTP: "Bucharest",
  BRU: "Brussels",
  GLA: "Glasgow",
  BRS: "Bristol",
  STN: "London",
  LTN: "London",
  LGW: "London",
  LHR: "London",
  MAN: "Manchester",
  BHX: "Birmingham",
  EDI: "Edinburgh",
  LIS: "Lisbon",
  MAD: "Madrid",
  BCN: "Barcelona",
  AMS: "Amsterdam",
  FRA: "Frankfurt",
  MUC: "Munich",
  DUB: "Dublin",
};

export function lookupAirportByIata(iata: string): AirportOption | null {
  const code = iata.trim().toUpperCase();
  if (code.length !== 3) return null;
  return iataIndex.get(code) ?? null;
}

export function formatRouteFromIata(iata: string): string {
  const code = iata.trim().toUpperCase();
  const airport = lookupAirportByIata(code);
  if (airport) return formatAirportRouteLabel(airport);

  const city = FALLBACK_IATA_CITIES[code];
  if (city) return `${city} (${code})`;

  return code;
}

export function normalizeIata(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim().toUpperCase();

  const parenthesized = trimmed.match(/\(([A-Z]{3})\)/);
  if (parenthesized) return parenthesized[1];

  if (/^[A-Z]{3}$/.test(trimmed)) return trimmed;

  const match = trimmed.match(/\b([A-Z]{3})\b/);
  return match?.[1] ?? null;
}
