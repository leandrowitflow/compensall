/** Shared “most popular” ID order for nav + catalog sorting (no world-airports dependency). */

export const POPULAR_AIRLINE_IDS: readonly string[] = [
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

export const POPULAR_AIRPORT_IDS: readonly string[] = [
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

/** Site-locale → country-first “Most popular” order. */
export const LOCALE_POPULAR_AIRLINES: Record<string, readonly string[]> = {
  en: [
    "british-airways",
    "ryanair",
    "easyjet",
    "jet2",
    "wizz-air",
    "virgin-atlantic",
    "eastern-airways",
    "lufthansa",
    "klm",
    "air-france",
    "tap",
  ],
  pt: [
    "tap",
    "ryanair",
    "easyjet",
    "iberia",
    "vueling",
    "air-france",
    "lufthansa",
    "british-airways",
    "klm",
    "wizz-air",
    "transavia",
  ],
  fr: [
    "air-france",
    "transavia-france",
    "easyjet",
    "ryanair",
    "vueling",
    "brussels-airlines",
    "british-airways",
    "lufthansa",
    "klm",
    "tap",
    "swiss",
  ],
};

export const LOCALE_POPULAR_AIRPORTS: Record<string, readonly string[]> = {
  en: [
    "heathrow",
    "gatwick",
    "manchester",
    "stansted",
    "luton",
    "edinburgh",
    "birmingham",
    "bristol",
    "glasgow",
    "dublin",
    "amsterdam",
    "paris-cdg",
  ],
  pt: [
    "lisbon",
    "porto",
    "faro",
    "madrid",
    "barcelona",
    "paris-cdg",
    "heathrow",
    "amsterdam",
    "frankfurt",
    "brussels",
  ],
  fr: [
    "paris-cdg",
    "paris-orly",
    "nice",
    "lyon",
    "brussels",
    "geneva",
    "amsterdam",
    "barcelona",
    "madrid",
    "heathrow",
    "frankfurt",
  ],
};

export function appLanguage(language: string): string {
  return language.toLowerCase().split("-")[0] ?? "en";
}

export function localePopularIds(language: string, kind: "airlines" | "airports"): readonly string[] {
  const lang = appLanguage(language);
  const map = kind === "airlines" ? LOCALE_POPULAR_AIRLINES : LOCALE_POPULAR_AIRPORTS;
  return map[lang] ?? (kind === "airlines" ? POPULAR_AIRLINE_IDS : POPULAR_AIRPORT_IDS);
}
