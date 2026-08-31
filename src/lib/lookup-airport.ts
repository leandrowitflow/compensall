import {
  airportOptionsList,
  formatAirportRouteLabel,
  type AirportOption,
} from "@/lib/airport-search";
import { normalizeIata } from "@/lib/iata";

export { normalizeIata };

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
  MRS: "Marseille",
  MIR: "Monastir",
  TUN: "Tunis",
  DJE: "Djerba",
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
  BCM: "Bacău",
  SXF: "Berlin",
  TXL: "Berlin",
};

export function lookupAirportByIata(iata: string): AirportOption | null {
  const code = iata.trim().toUpperCase();
  if (code.length !== 3) return null;
  const catalog = iataIndex.get(code);
  if (catalog) return catalog;

  const city = FALLBACK_IATA_CITIES[code];
  if (!city) return null;

  return {
    id: `fallback-${code}`,
    name: `${city} Airport`,
    city,
    iata: code,
    country: "",
    countryName: "",
    cities: [city],
    keywords: `${city} ${code}`.toLowerCase(),
    logo: "",
  };
}

export function formatRouteFromIata(iata: string): string {
  const code = iata.trim().toUpperCase();
  const airport = lookupAirportByIata(code);
  if (airport) return formatAirportRouteLabel(airport);

  const city = FALLBACK_IATA_CITIES[code];
  if (city) return `${city} (${code})`;

  return code;
}

/** Prefer "City (IATA)" when we can resolve the code; keep richer labels as-is. */
export function formatRouteLabel(route: string): string {
  const trimmed = route.trim();
  if (!trimmed) return "";
  if (/\([A-Za-z]{3}\)\s*$/.test(trimmed)) return trimmed;
  const iata = normalizeIata(trimmed);
  if (!iata) return trimmed;
  return formatRouteFromIata(iata);
}

