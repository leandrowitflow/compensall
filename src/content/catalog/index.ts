import type { AppLocale } from "@/i18n/routing";
import { polishPublicCopy } from "@/lib/public-copy";
import { airlinesContentA } from "./airlines-content-a";
import { airlinesContentB } from "./airlines-content-b";
import { airlinesContentC } from "./airlines-content-c";
import { airportsContentA } from "./airports-content-a";
import { airportsContentB } from "./airports-content-b";
import { airportsContentC } from "./airports-content-c";
import type { CatalogContentMap, CatalogEntityContent, CatalogLocale } from "./types";

export type { CatalogEntityContent, CatalogLocale, LocalizedText } from "./types";

export const airlinesContent: CatalogContentMap = {
  ...airlinesContentA,
  ...airlinesContentB,
  ...airlinesContentC,
};

export const airportsContent: CatalogContentMap = {
  ...airportsContentA,
  ...airportsContentB,
  ...airportsContentC,
};

export function getCatalogEntityContent(
  kind: "airlines" | "airports",
  id: string,
): CatalogEntityContent | undefined {
  return kind === "airlines" ? airlinesContent[id] : airportsContent[id];
}

export function toCatalogLocale(locale: string): CatalogLocale {
  if (locale === "pt" || locale === "fr") return locale;
  return "en";
}

export function pickLocalized(
  localized: Record<CatalogLocale, string>,
  locale: string | AppLocale,
): string {
  const catalogLocale = toCatalogLocale(locale);
  return polishPublicCopy(localized[catalogLocale], catalogLocale);
}
