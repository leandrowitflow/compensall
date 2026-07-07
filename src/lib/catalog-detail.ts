import {
  airlinesCatalog,
  airportsCatalog,
  type CatalogItem,
} from "@/lib/catalog";

export type CatalogKind = "airlines" | "airports";

export type CatalogFaq = {
  question: string;
  answer: string;
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

export function buildCatalogTitle(item: CatalogItem, kind: CatalogKind): string {
  if (kind === "airlines") {
    return `${item.name} flight compensation`;
  }
  return `${item.name} compensation claims`;
}

export function buildCatalogIntro(item: CatalogItem, kind: CatalogKind): string[] {
  if (kind === "airlines") {
    return [
      `If your ${item.name} flight was delayed, cancelled, or you were denied boarding, you may be entitled to compensation under EU regulation EC 261/2004, up to €600 per passenger depending on flight distance. This applies to qualifying flights departing from EU airports and flights arriving in the EU on an EU-based carrier, regardless of your nationality.`,
      `Airlines often delay responses, reject valid claims, or cite extraordinary circumstances that do not apply. Compensall checks your eligibility in minutes, handles paperwork and negotiations with ${item.name}, and pursues your case when needed on a no win, no fee basis.`,
    ];
  }

  return [
    `If your flight was delayed, cancelled, or disrupted at ${item.name}, you may be entitled to compensation under EU regulation EC 261/2004, up to €600 per passenger depending on flight distance. The regulation covers flights departing from EU airports and flights arriving in the EU on an EU-based carrier.`,
    `Disruptions at busy airports are common, and airlines do not always make claiming straightforward. Compensall helps you check eligibility quickly, gather the right evidence, and handle the airline on your behalf with our assistant and human support, and no upfront cost.`,
  ];
}

export function buildCatalogFaqs(item: CatalogItem, kind: CatalogKind): CatalogFaq[] {
  const entityLabel = kind === "airlines" ? `${item.name} flight` : `flight at ${item.name}`;

  return [
    {
      question: `Can I claim compensation for a delayed ${entityLabel}?`,
      answer:
        "You may be entitled to compensation if your flight arrived at its final destination three or more hours late and the delay was the airline's responsibility. Upload your boarding pass to Compensall and our assistant will check your eligibility under EC 261/2004 in minutes.",
    },
    {
      question: "How much compensation can I receive?",
      answer:
        "Compensation is fixed by distance: up to €250 for flights under 1,500 km, €400 for routes between 1,500 and 3,500 km, and €600 for flights over 3,500 km. Each eligible passenger on the booking can claim.",
    },
    {
      question:
        kind === "airlines"
          ? `What if ${item.name} already rejected my claim?`
          : "What if the airline already rejected my claim?",
      answer:
        "You can still submit your case to Compensall. Airlines often reject valid claims. Send us any correspondence from the airline so we are fully aware of what happened. Our team specialises in passenger rights and will pursue your claim when the law supports it.",
    },
    {
      question: "How long do I have to claim?",
      answer:
        "In most EU countries you have up to three years from the flight date to submit a claim. In the UK, you generally have six years (five years in Scotland). Submit your case as soon as you can and we will analyse the deadline for your route.",
    },
    {
      question: "Is it safe to upload my boarding pass?",
      answer:
        "Yes. Your boarding pass is encrypted and stored securely. We only use the information necessary to process your claim and never share it with third parties without your consent.",
    },
  ];
}

export function buildCatalogMetadataDescription(item: CatalogItem, kind: CatalogKind): string {
  const intro = buildCatalogIntro(item, kind)[0];
  return intro.length > 160 ? `${intro.slice(0, 157)}...` : intro;
}
