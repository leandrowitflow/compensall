import {
  airportsCatalog,
  catalogLogoPath,
  catalogLogoSvgFallback,
  type CatalogItem,
} from "@/lib/catalog";
import type { AirportOption } from "@/lib/airport-option";
import { sortCatalogByLocale } from "@/lib/localize-catalog";

export type { AirportOption } from "@/lib/airport-option";
export { formatAirportRouteLabel } from "@/lib/airport-option";

const AIRPORT_IATA: Record<string, string> = {
  heathrow: "LHR",
  gatwick: "LGW",
  manchester: "MAN",
  lisbon: "LIS",
  stansted: "STN",
  luton: "LTN",
  birmingham: "BHX",
  edinburgh: "EDI",
  glasgow: "GLA",
  bristol: "BRS",
  porto: "OPO",
  faro: "FAO",
  madrid: "MAD",
  barcelona: "BCN",
  malaga: "AGP",
  palma: "PMI",
  "paris-cdg": "CDG",
  "paris-orly": "ORY",
  nice: "NCE",
  lyon: "LYS",
  frankfurt: "FRA",
  munich: "MUC",
  berlin: "BER",
  dusseldorf: "DUS",
  hamburg: "HAM",
  "rome-fiumicino": "FCO",
  "milan-malpensa": "MXP",
  "milan-linate": "LIN",
  venice: "VCE",
  amsterdam: "AMS",
  brussels: "BRU",
  dublin: "DUB",
  warsaw: "WAW",
  krakow: "KRK",
  athens: "ATH",
  vienna: "VIE",
  zurich: "ZRH",
  geneva: "GVA",
  copenhagen: "CPH",
  oslo: "OSL",
  stockholm: "ARN",
  helsinki: "HEL",
  prague: "PRG",
  budapest: "BUD",
  bucharest: "OTP",
};

function cityFromName(name: string): string {
  return name
    .replace(/\s*Airport\s*$/i, "")
    .replace(/\s*(International|El Prat|Barajas|Heathrow|Gatwick|Stansted|Luton|Fiumicino|Malpensa|Linate)\s*/gi, " ")
    .trim();
}

export function toAirportOption(item: CatalogItem): AirportOption {
  const iata = AIRPORT_IATA[item.id] ?? item.id.slice(0, 3).toUpperCase();
  return {
    id: item.id,
    name: item.name,
    city: cityFromName(item.name),
    iata,
    logo: catalogLogoPath(item, "airports"),
    logoFallback: catalogLogoSvgFallback(item, "airports"),
  };
}

export const airportOptionsList = airportsCatalog.map(toAirportOption);

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

function scoreAirport(airport: AirportOption, query: string): number {
  const q = normalizeQuery(query);
  if (!q) return 0;

  if (airport.iata.toLowerCase() === q) return 100;
  if (airport.name.toLowerCase().startsWith(q)) return 90;
  if (airport.city.toLowerCase().startsWith(q)) return 85;
  if (airport.iata.toLowerCase().startsWith(q)) return 80;
  if (airport.name.toLowerCase().includes(q)) return 70;
  if (airport.city.toLowerCase().includes(q)) return 65;
  if (airport.id.replace(/-/g, " ").includes(q)) return 50;
  return 0;
}

export function getAllAirportsSorted(language: string): AirportOption[] {
  return sortCatalogByLocale(airportsCatalog, language, "airports").map(toAirportOption);
}

export function getPopularAirports(language: string, limit = 4): AirportOption[] {
  return getAllAirportsSorted(language).slice(0, limit);
}

export type SearchAirportsOptions = {
  excludeId?: string;
};

export function searchAirports(
  query: string,
  language: string,
  options: SearchAirportsOptions = {},
): AirportOption[] {
  const { excludeId } = options;
  let airports = getAllAirportsSorted(language);

  if (excludeId) {
    airports = airports.filter((airport) => airport.id !== excludeId);
  }

  const normalized = normalizeQuery(query);

  if (!normalized) {
    return airports;
  }

  return airports
    .map((airport) => ({ airport, score: scoreAirport(airport, normalized) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.airport.name.localeCompare(b.airport.name);
    })
    .map((entry) => entry.airport);
}

export function findAirportById(id: string): AirportOption | null {
  const item = airportsCatalog.find((airport) => airport.id === id);
  return item ? toAirportOption(item) : null;
}
