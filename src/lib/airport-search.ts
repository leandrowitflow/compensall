import type { AirportOption } from "@/lib/airport-option";
import {
  findWorldAirportOptionById,
  getAllWorldAirportOptions,
  getPopularWorldAirportOptions,
} from "@/lib/world-airports";

export type { AirportOption } from "@/lib/airport-option";
export { formatAirportRouteLabel } from "@/lib/airport-option";

/** Full worldwide list used by the claim form search. */
export const airportOptionsList = getAllWorldAirportOptions();

function normalizeQuery(query: string): string {
  return query
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function scoreAirport(airport: AirportOption, query: string): number {
  const q = normalizeQuery(query);
  if (!q) return 0;

  const iata = airport.iata.toLowerCase();
  const name = normalizeQuery(airport.name);
  const city = normalizeQuery(airport.city);

  if (iata === q) return 100;
  if (iata.startsWith(q)) return 95;
  if (city === q) return 90;
  if (name.startsWith(q)) return 88;
  if (city.startsWith(q)) return 86;
  if (name.includes(q)) return 75;
  if (city.includes(q)) return 72;
  // Multi-word: match any word in airport name or city (e.g. "Heathrow", "Humberto")
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length > 1 && tokens.every((token) => name.includes(token) || city.includes(token))) {
    return 70;
  }
  return 0;
}

export function getAllAirportsSorted(_language?: string): AirportOption[] {
  return [...airportOptionsList].sort((a, b) => a.name.localeCompare(b.name));
}

export function getPopularAirports(_language?: string, limit = 8): AirportOption[] {
  return getPopularWorldAirportOptions(limit);
}

export type SearchAirportsOptions = {
  excludeId?: string;
};

export function searchAirports(
  query: string,
  _language?: string,
  options: SearchAirportsOptions = {},
): AirportOption[] {
  const { excludeId } = options;
  let airports = airportOptionsList;

  if (excludeId) {
    airports = airports.filter((airport) => airport.id !== excludeId && airport.iata !== excludeId);
  }

  const normalized = normalizeQuery(query);
  if (!normalized) {
    return getPopularAirports(undefined, 12);
  }

  return airports
    .map((airport) => ({ airport, score: scoreAirport(airport, normalized) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.airport.name.localeCompare(b.airport.name);
    })
    .slice(0, 40)
    .map((entry) => entry.airport);
}

export function findAirportById(id: string): AirportOption | null {
  return findWorldAirportOptionById(id);
}
