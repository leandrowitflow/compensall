import type { CatalogItem } from "@/lib/catalog";

/** Default popularity when locale scores tie (informed by industry claim-volume patterns). */
const POPULAR_AIRLINE_IDS = [
  "ryanair",
  "easyjet",
  "wizz-air",
  "lufthansa",
  "british-airways",
  "tap",
  "klm",
  "air-france",
  "jet2",
  "virgin-atlantic",
  "vueling",
  "iberia",
  "iberia-express",
  "air-europa",
  "sas",
  "finnair",
  "norwegian",
  "eastern-airways",
  "eurowings",
  "ita-airways",
];

const POPULAR_AIRPORT_IDS = [
  "heathrow",
  "gatwick",
  "manchester",
  "lisbon",
  "porto",
  "frankfurt",
  "amsterdam",
  "paris-cdg",
  "madrid",
  "barcelona",
  "dublin",
  "stansted",
  "munich",
  "rome-fiumicino",
  "malaga",
  "palma",
  "edinburgh",
  "birmingham",
  "brussels",
  "warsaw",
];

function popularRank(id: string, kind: "airlines" | "airports"): number {
  const order = kind === "airlines" ? POPULAR_AIRLINE_IDS : POPULAR_AIRPORT_IDS;
  const index = order.indexOf(id);
  return index === -1 ? order.length : index;
}

function normalizeLocale(locale: string): string {
  return locale.toLowerCase();
}

function localeScore(item: CatalogItem, language: string): number {
  const normalized = normalizeLocale(language);
  const lang = normalized.split("-")[0];
  const region = normalized.split("-")[1];

  const locales = item.locales.map(normalizeLocale);

  if (region && locales.includes(`${lang}-${region}`)) {
    return 100;
  }

  if (locales.includes(normalized)) {
    return 90;
  }

  if (locales.some((locale) => locale === lang || locale.startsWith(`${lang}-`))) {
    return 80;
  }

  return 0;
}

export function sortCatalogByLocale(
  items: CatalogItem[],
  language: string,
  kind: "airlines" | "airports" = "airlines",
): CatalogItem[] {
  return [...items].sort((a, b) => {
    const scoreDiff = localeScore(b, language) - localeScore(a, language);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    const popularDiff = popularRank(a.id, kind) - popularRank(b.id, kind);
    if (popularDiff !== 0) {
      return popularDiff;
    }

    return a.name.localeCompare(b.name);
  });
}

export function filterCatalog(items: CatalogItem[], query: string): CatalogItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return items;
  }

  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(trimmed) ||
      item.description.toLowerCase().includes(trimmed),
  );
}

export function resolveBrowserLanguage(): string {
  if (typeof navigator === "undefined") {
    return "en";
  }

  return navigator.language || "en";
}
