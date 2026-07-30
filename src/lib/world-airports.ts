import type { AirportOption } from "@/lib/airport-option";
import worldAirportsJson from "@/data/world-airports.json";

export type WorldAirport = {
  iata: string;
  name: string;
  city: string;
  country: string;
  countryName?: string;
  lat: number;
  lon: number;
  cities?: string[];
  keywords?: string;
};

const worldAirports = worldAirportsJson as WorldAirport[];

const byIata = new Map<string, WorldAirport>();
for (const airport of worldAirports) {
  byIata.set(airport.iata.toUpperCase(), airport);
}

const POPULAR_IATAS = [
  "LHR",
  "LGW",
  "STN",
  "LTN",
  "MAN",
  "LIS",
  "OPO",
  "FAO",
  "CDG",
  "AMS",
  "MAD",
  "BCN",
  "FRA",
  "MUC",
  "FCO",
  "DUB",
] as const;

function toOption(airport: WorldAirport): AirportOption {
  const cities = airport.cities?.length
    ? airport.cities
    : [airport.city || airport.name].filter(Boolean);

  return {
    id: airport.iata.toLowerCase(),
    name: airport.name,
    city: airport.city || airport.name,
    iata: airport.iata.toUpperCase(),
    country: (airport.country || "").toUpperCase(),
    countryName: airport.countryName || airport.country || "",
    cities,
    keywords: airport.keywords || "",
    logo: "",
  };
}

export function getWorldAirportByIata(iata: string): WorldAirport | null {
  return byIata.get(iata.trim().toUpperCase()) ?? null;
}

export function getWorldAirportCoords(iata: string): { lat: number; lon: number } | null {
  const airport = getWorldAirportByIata(iata);
  if (!airport || !Number.isFinite(airport.lat) || !Number.isFinite(airport.lon)) {
    return null;
  }
  return { lat: airport.lat, lon: airport.lon };
}

export function getAllWorldAirportOptions(): AirportOption[] {
  return worldAirports.map(toOption);
}

export function getPopularWorldAirportOptions(limit = 8): AirportOption[] {
  const popular: AirportOption[] = [];
  for (const iata of POPULAR_IATAS) {
    const airport = byIata.get(iata);
    if (airport) {
      popular.push(toOption(airport));
    }
    if (popular.length >= limit) break;
  }
  return popular;
}

export function findWorldAirportOptionById(id: string): AirportOption | null {
  const byCode = byIata.get(id.trim().toUpperCase());
  if (byCode) return toOption(byCode);
  const lower = id.trim().toLowerCase();
  const match = worldAirports.find((airport) => airport.iata.toLowerCase() === lower);
  return match ? toOption(match) : null;
}

export { worldAirports };
