import { shouldUseAirportBadge } from "@/lib/airport-badges";

export type CatalogItem = {
  id: string;
  name: string;
  description: string;
  logo?: string;
  locales: string[];
  cta: string;
};

export const airlinesCatalog: CatalogItem[] = [
  {
    id: "ryanair",
    name: "Ryanair",
    logo: "/assets/airlines/ryanair.png",
    locales: ["en", "en-GB", "en-IE", "pt", "pt-PT", "es", "it", "pl", "de", "fr"],
    description:
      "Delayed, cancelled or denied boarding on a Ryanair flight? Check your eligibility in minutes.",
    cta: "Learn more",
  },
  {
    id: "easyjet",
    name: "easyJet",
    logo: "/assets/airlines/easyjet.png",
    locales: ["en", "en-GB", "fr", "de", "it", "es", "pt", "pt-PT", "nl"],
    description:
      "If your easyJet flight was disrupted, you may be entitled to compensation of up to €600.",
    cta: "Learn more",
  },
  {
    id: "british-airways",
    name: "British Airways",
    logo: "/assets/airlines/british-airways.png",
    locales: ["en", "en-GB"],
    description:
      "Check whether your British Airways flight delay, cancellation or missed connection is eligible.",
    cta: "Learn more",
  },
  {
    id: "wizz-air",
    name: "Wizz Air",
    logo: "/assets/airlines/wizz-air.png",
    locales: ["pl", "hu", "en", "en-GB", "ro", "bg", "it"],
    description: "Start a quick digital powered check for your Wizz Air disruption.",
    cta: "Learn more",
  },
  {
    id: "tap",
    name: "TAP Air Portugal",
    locales: ["pt", "pt-PT", "pt-BR"],
    description:
      "Delayed or cancelled TAP flight? You may be entitled to up to €600 under EU261.",
    cta: "Learn more",
  },
  {
    id: "lufthansa",
    name: "Lufthansa",
    locales: ["de", "de-DE", "de-AT", "de-CH"],
    description:
      "Flight disruption on Lufthansa? Check your delay or cancellation compensation rights.",
    cta: "Learn more",
  },
  {
    id: "eurowings",
    name: "Eurowings",
    locales: ["de", "de-DE", "de-AT"],
    description:
      "Eurowings delay or cancellation? Find out if your claim qualifies in minutes.",
    cta: "Learn more",
  },
  {
    id: "air-france",
    name: "Air France",
    locales: ["fr", "fr-FR", "fr-BE"],
    description:
      "Air France flight disrupted? You may be owed compensation of up to €600 per passenger.",
    cta: "Learn more",
  },
  {
    id: "transavia-france",
    name: "Transavia France",
    locales: ["fr", "fr-FR"],
    description:
      "Transavia France cancellation or long delay? Check your EU261 eligibility with Compensall.",
    cta: "Learn more",
  },
  {
    id: "klm",
    name: "KLM",
    locales: ["nl", "nl-NL", "nl-BE"],
    description:
      "KLM delay, cancellation or denied boarding? Start your compensation check today.",
    cta: "Learn more",
  },
  {
    id: "transavia",
    name: "Transavia",
    locales: ["nl", "nl-NL", "fr", "fr-FR"],
    description:
      "Transavia flight disrupted? See whether you can claim up to €600 compensation.",
    cta: "Learn more",
  },
  {
    id: "iberia",
    name: "Iberia",
    locales: ["es", "es-ES"],
    description:
      "Iberia delay or cancellation? EU261 may entitle you to fixed compensation.",
    cta: "Learn more",
  },
  {
    id: "iberia-express",
    name: "Iberia Express",
    locales: ["es", "es-ES"],
    description:
      "Iberia Express delay or cancellation? Check your EU261 compensation eligibility.",
    cta: "Learn more",
  },
  {
    id: "vueling",
    name: "Vueling",
    locales: ["es", "es-ES", "ca", "ca-ES"],
    description:
      "Vueling flight cancelled or delayed? Check your claim eligibility in minutes.",
    cta: "Learn more",
  },
  {
    id: "air-europa",
    name: "Air Europa",
    locales: ["es", "es-ES"],
    description:
      "Air Europa disruption on your route? You may have a valid compensation claim.",
    cta: "Learn more",
  },
  {
    id: "ita-airways",
    name: "ITA Airways",
    locales: ["it", "it-IT"],
    description:
      "ITA Airways delay or cancellation? Find out what EU261 entitles you to.",
    cta: "Learn more",
  },
  {
    id: "brussels-airlines",
    name: "Brussels Airlines",
    locales: ["fr", "fr-BE", "nl", "nl-BE", "de", "de-BE"],
    description:
      "Brussels Airlines flight disrupted? Check compensation for delays and cancellations.",
    cta: "Learn more",
  },
  {
    id: "aer-lingus",
    name: "Aer Lingus",
    locales: ["en", "en-IE", "ga"],
    description:
      "Aer Lingus delay or cancellation? See if your flight qualifies for up to €600.",
    cta: "Learn more",
  },
  {
    id: "jet2",
    name: "Jet2",
    locales: ["en", "en-GB"],
    description:
      "Jet2 flight cancelled or delayed? Check your passenger rights with Compensall.",
    cta: "Learn more",
  },
  {
    id: "eastern-airways",
    name: "Eastern Airways",
    locales: ["en", "en-GB"],
    description:
      "Eastern Airways disruption on a UK or European route? See if you can claim compensation.",
    cta: "Learn more",
  },
  {
    id: "tui-airways",
    name: "TUI Airways",
    locales: ["en", "en-GB", "de", "de-DE", "nl", "nl-NL"],
    description:
      "TUI Airways disruption? You may be entitled to EU261 compensation.",
    cta: "Learn more",
  },
  {
    id: "virgin-atlantic",
    name: "Virgin Atlantic",
    locales: ["en", "en-GB"],
    description:
      "Virgin Atlantic delay or cancellation? Start a no-win-no-fee eligibility check.",
    cta: "Learn more",
  },
  {
    id: "sas",
    name: "SAS",
    locales: ["sv", "sv-SE", "da", "da-DK", "no", "nb", "nn"],
    description:
      "SAS Scandinavian Airlines disrupted your plans? Check your compensation rights.",
    cta: "Learn more",
  },
  {
    id: "norwegian",
    name: "Norwegian",
    locales: ["no", "nb", "nn", "en", "en-GB"],
    description:
      "Norwegian delay or cancellation? See if EU261 applies to your journey.",
    cta: "Learn more",
  },
  {
    id: "finnair",
    name: "Finnair",
    locales: ["fi", "fi-FI", "sv", "sv-FI"],
    description:
      "Finnair flight disrupted? You may be able to claim up to €600 per passenger.",
    cta: "Learn more",
  },
  {
    id: "swiss",
    name: "Swiss International Air Lines",
    locales: ["de", "de-CH", "fr", "fr-CH", "it", "it-CH"],
    description:
      "Swiss flight delay or cancellation from an EU airport? Check your eligibility.",
    cta: "Learn more",
  },
  {
    id: "austrian",
    name: "Austrian Airlines",
    locales: ["de", "de-AT"],
    description:
      "Austrian Airlines disruption? EU261 may entitle you to fixed compensation.",
    cta: "Learn more",
  },
  {
    id: "lot",
    name: "LOT Polish Airlines",
    locales: ["pl", "pl-PL"],
    description:
      "LOT delay, cancellation or denied boarding? Check your claim in minutes.",
    cta: "Learn more",
  },
  {
    id: "aegean",
    name: "Aegean Airlines",
    locales: ["el", "el-GR"],
    description:
      "Aegean Airlines flight disrupted? Find out if you can claim compensation.",
    cta: "Learn more",
  },
  {
    id: "condor",
    name: "Condor",
    locales: ["de", "de-DE"],
    description:
      "Condor delay or cancellation? Start your EU261 compensation check today.",
    cta: "Learn more",
  },
  {
    id: "volotea",
    name: "Volotea",
    locales: ["es", "es-ES", "it", "it-IT", "fr", "fr-FR"],
    description:
      "Volotea flight cancelled or delayed? See whether you have a valid claim.",
    cta: "Learn more",
  },
  {
    id: "croatia-airlines",
    name: "Croatia Airlines",
    locales: ["hr", "hr-HR"],
    description:
      "Croatia Airlines disruption? Check compensation rights under EU261.",
    cta: "Learn more",
  },
  {
    id: "tarom",
    name: "Tarom",
    locales: ["ro", "ro-RO"],
    description:
      "Tarom delay or cancellation? You may be entitled to up to €600.",
    cta: "Learn more",
  },
  {
    id: "luxair",
    name: "Luxair",
    locales: ["fr", "fr-LU", "de", "de-LU", "lb"],
    description:
      "Luxair flight disrupted? Check your EU261 eligibility with Compensall.",
    cta: "Learn more",
  },
  {
    id: "icelandair",
    name: "Icelandair",
    locales: ["is", "is-IS", "en", "en-GB"],
    description:
      "Icelandair delay or cancellation from the EU? See if you can claim compensation.",
    cta: "Learn more",
  },
  {
    id: "air-baltic",
    name: "airBaltic",
    locales: ["lv", "lv-LV", "lt", "lt-LT", "et", "et-EE"],
    description:
      "airBaltic flight disrupted? Check whether EU261 covers your journey.",
    cta: "Learn more",
  },
  {
    id: "smartwings",
    name: "Smartwings",
    locales: ["cs", "cs-CZ", "sk", "sk-SK"],
    description:
      "Smartwings delay or cancellation? Find out what compensation you may be owed.",
    cta: "Learn more",
  },
  {
    id: "sunexpress",
    name: "SunExpress",
    locales: ["de", "de-DE", "tr"],
    description:
      "SunExpress flight disrupted? Check your passenger rights in minutes.",
    cta: "Learn more",
  },
];

export const airportsCatalog: CatalogItem[] = [
  {
    id: "heathrow",
    name: "London Heathrow Airport",
    logo: "/assets/airports/heathrow.svg",
    locales: ["en", "en-GB"],
    description:
      "Flight delayed, cancelled or disrupted at Heathrow? Check your compensation rights with Compensall.",
    cta: "Check claims",
  },
  {
    id: "gatwick",
    name: "London Gatwick Airport",
    logo: "/assets/airports/gatwick.svg",
    locales: ["en", "en-GB"],
    description:
      "If your flight from or to Gatwick was disrupted, you may be able to claim compensation.",
    cta: "Check claims",
  },
  {
    id: "manchester",
    name: "Manchester Airport",
    logo: "/assets/airports/manchester.svg",
    locales: ["en", "en-GB"],
    description:
      "Delayed, cancelled or denied boarding at Manchester? Find out if you may be eligible.",
    cta: "Check claims",
  },
  {
    id: "lisbon",
    name: "Lisbon Airport",
    logo: "/assets/airports/lisbon.png",
    locales: ["pt", "pt-PT", "pt-BR"],
    description: "Check your rights for flight disruptions involving Lisbon Airport.",
    cta: "Check claims",
  },
  {
    id: "stansted",
    name: "London Stansted Airport",
    locales: ["en", "en-GB"],
    description:
      "Stansted delay or cancellation? Start your EU261 compensation check.",
    cta: "Check claims",
  },
  {
    id: "luton",
    name: "London Luton Airport",
    locales: ["en", "en-GB"],
    description:
      "Flight disrupted at Luton? See if you can claim up to €600.",
    cta: "Check claims",
  },
  {
    id: "birmingham",
    name: "Birmingham Airport",
    locales: ["en", "en-GB"],
    description:
      "Birmingham Airport disruption? Check your compensation eligibility.",
    cta: "Check claims",
  },
  {
    id: "edinburgh",
    name: "Edinburgh Airport",
    logo: "/assets/airports/edinburgh.svg",
    locales: ["en", "en-GB", "gd"],
    description:
      "Delayed or cancelled flight at Edinburgh? Find out what you may be owed.",
    cta: "Check claims",
  },
  {
    id: "glasgow",
    name: "Glasgow Airport",
    locales: ["en", "en-GB", "gd"],
    description:
      "Glasgow flight disruption? Check your EU261 rights with Compensall.",
    cta: "Check claims",
  },
  {
    id: "bristol",
    name: "Bristol Airport",
    locales: ["en", "en-GB"],
    description:
      "Bristol delay or cancellation? You may be entitled to compensation.",
    cta: "Check claims",
  },
  {
    id: "porto",
    name: "Porto Airport",
    locales: ["pt", "pt-PT", "pt-BR"],
    description:
      "Flight disrupted at Porto? Check compensation for delays and cancellations.",
    cta: "Check claims",
  },
  {
    id: "faro",
    name: "Faro Airport",
    locales: ["pt", "pt-PT", "pt-BR"],
    description:
      "Faro Airport delay or cancellation? Start your claim check today.",
    cta: "Check claims",
  },
  {
    id: "madrid",
    name: "Madrid Barajas Airport",
    locales: ["es", "es-ES"],
    description:
      "Madrid flight disrupted? See if EU261 entitles you to compensation.",
    cta: "Check claims",
  },
  {
    id: "barcelona",
    name: "Barcelona El Prat Airport",
    locales: ["es", "es-ES", "ca", "ca-ES"],
    description:
      "Barcelona delay or cancellation? Check your passenger rights in minutes.",
    cta: "Check claims",
  },
  {
    id: "malaga",
    name: "Malaga Airport",
    locales: ["es", "es-ES"],
    description:
      "Malaga Airport disruption? Find out if you can claim up to €600.",
    cta: "Check claims",
  },
  {
    id: "palma",
    name: "Palma de Mallorca Airport",
    locales: ["es", "es-ES", "ca", "ca-ES"],
    description:
      "Palma flight cancelled or delayed? Check your compensation eligibility.",
    cta: "Check claims",
  },
  {
    id: "paris-cdg",
    name: "Paris Charles de Gaulle Airport",
    locales: ["fr", "fr-FR"],
    description:
      "CDG delay or cancellation? Check your EU261 compensation rights.",
    cta: "Check claims",
  },
  {
    id: "paris-orly",
    name: "Paris Orly Airport",
    locales: ["fr", "fr-FR"],
    description:
      "Orly flight disrupted? You may be entitled to up to €600 per passenger.",
    cta: "Check claims",
  },
  {
    id: "nice",
    name: "Nice Côte d'Azur Airport",
    locales: ["fr", "fr-FR"],
    description:
      "Nice Airport disruption? Start your no-win-no-fee claim check.",
    cta: "Check claims",
  },
  {
    id: "lyon",
    name: "Lyon Saint-Exupéry Airport",
    locales: ["fr", "fr-FR"],
    description:
      "Lyon flight delayed or cancelled? See whether you have a valid claim.",
    cta: "Check claims",
  },
  {
    id: "frankfurt",
    name: "Frankfurt Airport",
    locales: ["de", "de-DE"],
    description:
      "Frankfurt disruption? Check compensation for delays and cancellations.",
    cta: "Check claims",
  },
  {
    id: "munich",
    name: "Munich Airport",
    locales: ["de", "de-DE"],
    description:
      "Munich delay or cancellation? Find out what EU261 entitles you to.",
    cta: "Check claims",
  },
  {
    id: "berlin",
    name: "Berlin Brandenburg Airport",
    locales: ["de", "de-DE"],
    description:
      "Berlin flight disrupted? Check your compensation eligibility today.",
    cta: "Check claims",
  },
  {
    id: "dusseldorf",
    name: "Düsseldorf Airport",
    locales: ["de", "de-DE"],
    description:
      "Düsseldorf delay or cancellation? Start your claim check with Compensall.",
    cta: "Check claims",
  },
  {
    id: "hamburg",
    name: "Hamburg Airport",
    locales: ["de", "de-DE"],
    description:
      "Hamburg Airport disruption? You may be owed EU261 compensation.",
    cta: "Check claims",
  },
  {
    id: "rome-fiumicino",
    name: "Rome Fiumicino Airport",
    locales: ["it", "it-IT"],
    description:
      "Fiumicino delay or cancellation? Check your passenger rights in minutes.",
    cta: "Check claims",
  },
  {
    id: "milan-malpensa",
    name: "Milan Malpensa Airport",
    locales: ["it", "it-IT"],
    description:
      "Malpensa flight disrupted? See if you can claim up to €600.",
    cta: "Check claims",
  },
  {
    id: "milan-linate",
    name: "Milan Linate Airport",
    locales: ["it", "it-IT"],
    description:
      "Linate delay or cancellation? Find out if your claim qualifies.",
    cta: "Check claims",
  },
  {
    id: "venice",
    name: "Venice Marco Polo Airport",
    locales: ["it", "it-IT"],
    description:
      "Venice Airport disruption? Check your EU261 eligibility.",
    cta: "Check claims",
  },
  {
    id: "amsterdam",
    name: "Amsterdam Schiphol Airport",
    locales: ["nl", "nl-NL"],
    description:
      "Schiphol delay or cancellation? Start your compensation check today.",
    cta: "Check claims",
  },
  {
    id: "brussels",
    name: "Brussels Airport",
    locales: ["fr", "fr-BE", "nl", "nl-BE", "de", "de-BE"],
    description:
      "Brussels flight disrupted? You may be entitled to fixed compensation.",
    cta: "Check claims",
  },
  {
    id: "dublin",
    name: "Dublin Airport",
    locales: ["en", "en-IE", "ga"],
    description:
      "Dublin delay or cancellation? Check your EU261 rights with Compensall.",
    cta: "Check claims",
  },
  {
    id: "warsaw",
    name: "Warsaw Chopin Airport",
    locales: ["pl", "pl-PL"],
    description:
      "Warsaw Airport disruption? Find out what compensation you may be owed.",
    cta: "Check claims",
  },
  {
    id: "krakow",
    name: "Kraków Airport",
    locales: ["pl", "pl-PL"],
    description:
      "Kraków delay or cancellation? Check your claim eligibility in minutes.",
    cta: "Check claims",
  },
  {
    id: "athens",
    name: "Athens International Airport",
    locales: ["el", "el-GR"],
    description:
      "Athens flight disrupted? See whether EU261 covers your journey.",
    cta: "Check claims",
  },
  {
    id: "vienna",
    name: "Vienna Airport",
    locales: ["de", "de-AT"],
    description:
      "Vienna delay or cancellation? Start your no-win-no-fee claim check.",
    cta: "Check claims",
  },
  {
    id: "zurich",
    name: "Zurich Airport",
    locales: ["de", "de-CH", "fr", "fr-CH", "it", "it-CH"],
    description:
      "Zurich Airport disruption from the EU? Check your compensation rights.",
    cta: "Check claims",
  },
  {
    id: "geneva",
    name: "Geneva Airport",
    locales: ["fr", "fr-CH", "de", "de-CH"],
    description:
      "Geneva flight delayed or cancelled? Find out if you can claim.",
    cta: "Check claims",
  },
  {
    id: "copenhagen",
    name: "Copenhagen Airport",
    locales: ["da", "da-DK"],
    description:
      "Copenhagen disruption? Check compensation for delays and cancellations.",
    cta: "Check claims",
  },
  {
    id: "oslo",
    name: "Oslo Gardermoen Airport",
    locales: ["no", "nb", "nn"],
    description:
      "Oslo delay or cancellation? See if EU261 entitles you to compensation.",
    cta: "Check claims",
  },
  {
    id: "stockholm",
    name: "Stockholm Arlanda Airport",
    locales: ["sv", "sv-SE"],
    description:
      "Arlanda flight disrupted? Check your passenger rights today.",
    cta: "Check claims",
  },
  {
    id: "helsinki",
    name: "Helsinki Airport",
    locales: ["fi", "fi-FI", "sv", "sv-FI"],
    description:
      "Helsinki delay or cancellation? Start your claim check with Compensall.",
    cta: "Check claims",
  },
  {
    id: "prague",
    name: "Prague Airport",
    locales: ["cs", "cs-CZ"],
    description:
      "Prague Airport disruption? You may be entitled to up to €600.",
    cta: "Check claims",
  },
  {
    id: "budapest",
    name: "Budapest Airport",
    locales: ["hu", "hu-HU"],
    description:
      "Budapest flight delayed or cancelled? Check your EU261 eligibility.",
    cta: "Check claims",
  },
  {
    id: "bucharest",
    name: "Bucharest Henri Coandă Airport",
    locales: ["ro", "ro-RO"],
    description:
      "Bucharest disruption? Find out if you have a valid compensation claim.",
    cta: "Check claims",
  },
];

export function catalogLogoPath(
  item: Pick<CatalogItem, "id"> & { logo?: string },
  kind: "airlines" | "airports",
): string {
  if (item.logo) {
    return item.logo;
  }

  if (kind === "airports") {
    if (shouldUseAirportBadge(item.id)) {
      return `/assets/airports/${item.id}.svg`;
    }

    return `/assets/airports/${item.id}.png`;
  }

  return `/assets/${kind}/${item.id}.png`;
}

export function catalogLogoSvgFallback(
  item: Pick<CatalogItem, "id">,
  kind: "airlines" | "airports",
): string | undefined {
  if (kind === "airports") {
    return `/assets/airports/${item.id}.svg`;
  }

  return undefined;
}
