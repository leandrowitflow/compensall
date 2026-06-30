import type { CatalogItem } from "@/lib/catalog";

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

export function sortCatalogByLocale(items: CatalogItem[], language: string): CatalogItem[] {
  return [...items].sort((a, b) => {
    const scoreDiff = localeScore(b, language) - localeScore(a, language);
    if (scoreDiff !== 0) {
      return scoreDiff;
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
