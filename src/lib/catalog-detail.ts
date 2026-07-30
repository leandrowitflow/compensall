import {
  airlinesCatalog,
  airportsCatalog,
  type CatalogItem,
} from "@/lib/catalog";
import type { FaqItem } from "@/lib/faq-items";

export type CatalogKind = "airlines" | "airports";

export type CatalogFaq = FaqItem;

export type CatalogTranslator = {
  (key: string, values?: Record<string, string | number | Date>): string;
};

export const airlinesBySlug = Object.fromEntries(
  airlinesCatalog.map((item) => [item.id, item]),
) as Record<string, CatalogItem>;

export const airportsBySlug = Object.fromEntries(
  airportsCatalog.map((item) => [item.id, item]),
) as Record<string, CatalogItem>;

export function getCatalogItem(kind: CatalogKind, slug: string): CatalogItem | undefined {
  if (kind === "airlines") {
    return airlinesBySlug[slug];
  }
  return airportsBySlug[slug];
}

export function buildCatalogTitle(
  t: CatalogTranslator,
  item: CatalogItem,
  kind: CatalogKind,
): string {
  if (kind === "airlines") {
    return t("airlineTitle", { name: item.name });
  }
  return t("airportTitle", { name: item.name });
}

export function buildCatalogIntro(
  t: CatalogTranslator,
  item: CatalogItem,
  kind: CatalogKind,
): string[] {
  if (kind === "airlines") {
    return [t("airlineIntroP1", { name: item.name }), t("airlineIntroP2", { name: item.name })];
  }

  return [t("airportIntroP1", { name: item.name }), t("airportIntroP2", { name: item.name })];
}

export function buildCatalogFaqs(
  t: CatalogTranslator,
  item: CatalogItem,
  kind: CatalogKind,
): CatalogFaq[] {
  const entityLabel =
    kind === "airlines" ? t("entityAirlineFlight", { name: item.name }) : t("entityAirportFlight", { name: item.name });

  return [
    {
      question: t("faqDelayQuestion", { entity: entityLabel }),
      answer: t("faqDelayAnswer"),
    },
    {
      question: t("faqAmountQuestion"),
      answer: t("faqAmountAnswer"),
    },
    {
      question:
        kind === "airlines"
          ? t("faqRejectedAirlineQuestion", { name: item.name })
          : t("faqRejectedAirportQuestion"),
      answer: t("faqRejectedAnswer"),
    },
    {
      question: t("faqDeadlineQuestion"),
      answer: t("faqDeadlineAnswer"),
    },
    {
      question: t("faqSafeQuestion"),
      answer: t("faqSafeAnswer"),
    },
  ];
}

export function buildCatalogMetadataDescription(
  t: CatalogTranslator,
  item: CatalogItem,
  kind: CatalogKind,
): string {
  const intro = buildCatalogIntro(t, item, kind)[0] ?? "";
  return intro.length > 160 ? `${intro.slice(0, 157)}...` : intro;
}

export function buildCatalogCardDescription(
  t: CatalogTranslator,
  item: CatalogItem,
  kind: CatalogKind,
): string {
  if (kind === "airlines") {
    return t("airlineCardDescription", { name: item.name });
  }
  return t("airportCardDescription", { name: item.name });
}
