export type CatalogLocale = "en" | "pt" | "fr";

export type LocalizedText = Record<CatalogLocale, string>;

export type CatalogEntityContent = {
  /** Short factual bullets (hub, IATA/ICAO, network focus, etc.). */
  facts: LocalizedText[];
  /** Who they are / what the airport is. */
  about: LocalizedText;
  /** How EC 261 / UK261 typically applies for this entity. */
  rights: LocalizedText;
  /** Practical tips when claiming for this airline/airport. */
  tips: LocalizedText;
};

export type CatalogContentMap = Record<string, CatalogEntityContent>;
