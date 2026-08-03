import type { CatalogItem } from "@/lib/catalog";
import { getCatalogHomeCountries } from "@/lib/catalog-countries";
import {
  POPULAR_AIRLINE_IDS,
  POPULAR_AIRPORT_IDS,
  appLanguage,
  localePopularIds,
} from "@/lib/catalog-popular-ids";
import { resolveCountryCodesFromQuery } from "@/lib/country-search-aliases";
import { getWorldAirportByIata } from "@/lib/world-airports";

/** Locale language → ISO countries treated as “home” for that site language. */
const LOCALE_HOME_COUNTRIES: Record<string, string[]> = {
  en: ["GB", "IE"],
  pt: ["PT"],
  fr: ["FR", "BE", "CH", "LU"],
};

function popularRank(id: string, kind: "airlines" | "airports"): number {
  const order = kind === "airlines" ? POPULAR_AIRLINE_IDS : POPULAR_AIRPORT_IDS;
  const index = order.indexOf(id);
  return index === -1 ? order.length : index;
}

function normalizeLocale(locale: string): string {
  return locale.toLowerCase();
}

function localePopularRank(id: string, language: string, kind: "airlines" | "airports"): number {
  const order = localePopularIds(language, kind);
  const index = order.indexOf(id);
  return index === -1 ? order.length + popularRank(id, kind) : index;
}

export function catalogItemCountries(item: CatalogItem): Set<string> {
  const homes = getCatalogHomeCountries(item.id);
  if (homes.length > 0) {
    return new Set(homes);
  }

  const world = getWorldAirportByIata(item.id);
  if (world?.country) {
    return new Set([world.country.toUpperCase()]);
  }

  return new Set();
}

/**
 * Prefer home-market carriers/airports for the active site language.
 * Pan-EU brands that list every locale score lower than local specialists.
 */
function homeMarketScore(item: CatalogItem, language: string): number {
  const lang = appLanguage(language);
  const homeCountries = LOCALE_HOME_COUNTRIES[lang] ?? [];
  const countries = catalogItemCountries(item);
  if (countries.size === 0) return 0;

  const homeHits = homeCountries.filter((code) => countries.has(code)).length;
  if (homeHits === 0) return 0;

  const normalized = item.locales.map(normalizeLocale);
  const langHits = normalized.filter(
    (locale) => locale === lang || locale.startsWith(`${lang}-`),
  ).length;
  const ratio = langHits / Math.max(normalized.length, 1);

  // Specialist home-market item (e.g. TAP for PT, Air France for FR).
  if (ratio >= 0.75) return 100;
  // Strong regional presence.
  if (ratio >= 0.4) return 70;
  // Pan-European brand that also serves this market.
  return 35;
}

function localeScore(item: CatalogItem, language: string): number {
  const normalized = normalizeLocale(language);
  const lang = normalized.split("-")[0] ?? "en";
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
    const popularDiff =
      localePopularRank(a.id, language, kind) - localePopularRank(b.id, language, kind);
    if (popularDiff !== 0) {
      return popularDiff;
    }

    const homeDiff = homeMarketScore(b, language) - homeMarketScore(a, language);
    if (homeDiff !== 0) {
      return homeDiff;
    }

    const scoreDiff = localeScore(b, language) - localeScore(a, language);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    const fallbackPopular = popularRank(a.id, kind) - popularRank(b.id, kind);
    if (fallbackPopular !== 0) {
      return fallbackPopular;
    }

    return a.name.localeCompare(b.name);
  });
}

export function getPopularCatalogItems(
  items: CatalogItem[],
  language: string,
  kind: "airlines" | "airports",
  limit = 6,
): CatalogItem[] {
  return sortCatalogByLocale(items, language, kind).slice(0, limit);
}

function itemMatchesCountryCodes(item: CatalogItem, codes: Set<string>): boolean {
  if (codes.size === 0) return false;
  const countries = catalogItemCountries(item);
  for (const code of codes) {
    if (countries.has(code)) return true;
  }
  return false;
}

export function filterCatalog(items: CatalogItem[], query: string): CatalogItem[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return items;
  }

  const normalizedQuery = trimmed.toLowerCase();
  const countryCodes = new Set(resolveCountryCodesFromQuery(trimmed));
  if (/^[a-z]{2}$/i.test(trimmed)) {
    countryCodes.add(trimmed.toUpperCase());
  }

  const matched = items.filter((item) => {
    if (item.name.toLowerCase().includes(normalizedQuery)) return true;
    if (item.id.toLowerCase().includes(normalizedQuery)) return true;
    if (item.description?.toLowerCase().includes(normalizedQuery)) return true;
    if (itemMatchesCountryCodes(item, countryCodes)) return true;
    return false;
  });

  // Country searches: keep home-country hits first, then name matches.
  if (countryCodes.size === 0) {
    return matched;
  }

  return [...matched].sort((a, b) => {
    const aCountry = itemMatchesCountryCodes(a, countryCodes) ? 0 : 1;
    const bCountry = itemMatchesCountryCodes(b, countryCodes) ? 0 : 1;
    if (aCountry !== bCountry) return aCountry - bCountry;
    return a.name.localeCompare(b.name);
  });
}

export function resolveBrowserLanguage(): string {
  if (typeof navigator === "undefined") {
    return "en";
  }

  return navigator.language || "en";
}
