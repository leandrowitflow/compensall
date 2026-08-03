import { AIRPORT_BADGES } from "@/lib/airport-badges";
import { airportsCatalog, type CatalogItem } from "@/lib/catalog";
import { searchAirports } from "@/lib/airport-search";
import type { AirportOption } from "@/lib/airport-option";
import { getWorldAirportByIata, type WorldAirport } from "@/lib/world-airports";

/** Curated marketing slugs preferred over raw IATA when both exist. */
const EXTRA_IATA_TO_SLUG: Record<string, string> = {
  LIS: "lisbon",
  OPO: "porto",
  FAO: "faro",
  CDG: "paris-cdg",
  ORY: "paris-orly",
  NCE: "nice",
  LYS: "lyon",
  FRA: "frankfurt",
  AMS: "amsterdam",
};

const IATA_TO_CURATED_SLUG: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(AIRPORT_BADGES).map(([slug, badge]) => [badge.iata.toUpperCase(), slug]),
  ),
  ...EXTRA_IATA_TO_SLUG,
};

const curatedBySlug = Object.fromEntries(airportsCatalog.map((item) => [item.id, item])) as Record<
  string,
  CatalogItem
>;

const COUNTRY_LOCALES: Record<string, string[]> = {
  GB: ["en", "en-GB"],
  IE: ["en", "en-IE", "ga"],
  PT: ["pt", "pt-PT"],
  FR: ["fr", "fr-FR"],
  DE: ["de", "de-DE"],
  ES: ["es", "es-ES"],
  IT: ["it", "it-IT"],
  NL: ["nl", "nl-NL"],
  BE: ["fr", "fr-BE", "nl", "nl-BE", "de", "de-BE"],
  CH: ["de", "de-CH", "fr", "fr-CH", "it", "it-CH"],
  AT: ["de", "de-AT"],
  PL: ["pl", "pl-PL"],
  GR: ["el", "el-GR"],
  DK: ["da", "da-DK"],
  NO: ["no", "nb", "nn"],
  SE: ["sv", "sv-SE"],
  FI: ["fi", "fi-FI"],
  CZ: ["cs", "cs-CZ"],
  HU: ["hu", "hu-HU"],
  RO: ["ro", "ro-RO"],
  BR: ["pt", "pt-BR"],
  US: ["en"],
};

function localesForCountry(country: string): string[] {
  return COUNTRY_LOCALES[country.toUpperCase()] ?? ["en"];
}

function catalogNameForWorldAirport(airport: WorldAirport | AirportOption): string {
  const city = airport.city?.trim() || airport.name;
  const iata = airport.iata.toUpperCase();
  if (city.toUpperCase().includes(iata)) {
    return airport.name;
  }
  return `${city} (${iata})`;
}

export function worldAirportToCatalogItem(airport: WorldAirport | AirportOption): CatalogItem {
  const iata = airport.iata.toUpperCase();
  const curatedSlug = IATA_TO_CURATED_SLUG[iata];
  if (curatedSlug && curatedBySlug[curatedSlug]) {
    return curatedBySlug[curatedSlug]!;
  }

  return {
    id: iata.toLowerCase(),
    name: catalogNameForWorldAirport(airport),
    locales: localesForCountry(airport.country),
  };
}

export function resolveAirportCatalogItem(slug: string): CatalogItem | undefined {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) return undefined;

  if (curatedBySlug[normalized]) {
    return curatedBySlug[normalized];
  }

  const asIata = normalized.toUpperCase();
  const curatedFromIata = IATA_TO_CURATED_SLUG[asIata];
  if (curatedFromIata && curatedBySlug[curatedFromIata]) {
    return curatedBySlug[curatedFromIata];
  }

  const world = getWorldAirportByIata(normalized);
  if (!world) return undefined;
  return worldAirportToCatalogItem(world);
}

const CATALOG_SEARCH_LIMIT = 60;

/** Full Francisca airport list search for the catalog UI (country names, city, IATA). */
export function searchCatalogAirports(query: string, language: string): CatalogItem[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const results = searchAirports(trimmed, language).slice(0, CATALOG_SEARCH_LIMIT);
  const seen = new Set<string>();
  const items: CatalogItem[] = [];

  for (const airport of results) {
    const item = worldAirportToCatalogItem(airport);
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    items.push(item);
  }

  return items;
}

export function getCuratedSlugForIata(iata: string): string | undefined {
  return IATA_TO_CURATED_SLUG[iata.trim().toUpperCase()];
}
