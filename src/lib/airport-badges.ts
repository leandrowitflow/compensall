export type AirportBadge = {
  iata: string;
  label: string;
};

export const AIRPORT_BADGES: Record<string, AirportBadge> = {
  heathrow: { iata: "LHR", label: "London Heathrow" },
  gatwick: { iata: "LGW", label: "London Gatwick" },
  manchester: { iata: "MAN", label: "Manchester" },
  stansted: { iata: "STN", label: "London Stansted" },
  luton: { iata: "LTN", label: "London Luton" },
  birmingham: { iata: "BHX", label: "Birmingham" },
  edinburgh: { iata: "EDI", label: "Edinburgh" },
  glasgow: { iata: "GLA", label: "Glasgow" },
  bristol: { iata: "BRS", label: "Bristol" },
  madrid: { iata: "MAD", label: "Madrid Barajas" },
  barcelona: { iata: "BCN", label: "Barcelona El Prat" },
  malaga: { iata: "AGP", label: "Malaga" },
  palma: { iata: "PMI", label: "Palma de Mallorca" },
  munich: { iata: "MUC", label: "Munich" },
  berlin: { iata: "BER", label: "Berlin Brandenburg" },
  dusseldorf: { iata: "DUS", label: "Düsseldorf" },
  hamburg: { iata: "HAM", label: "Hamburg" },
  "rome-fiumicino": { iata: "FCO", label: "Rome Fiumicino" },
  "milan-malpensa": { iata: "MXP", label: "Milan Malpensa" },
  "milan-linate": { iata: "LIN", label: "Milan Linate" },
  venice: { iata: "VCE", label: "Venice Marco Polo" },
  brussels: { iata: "BRU", label: "Brussels" },
  dublin: { iata: "DUB", label: "Dublin" },
  warsaw: { iata: "WAW", label: "Warsaw Chopin" },
  krakow: { iata: "KRK", label: "Kraków" },
  athens: { iata: "ATH", label: "Athens" },
  vienna: { iata: "VIE", label: "Vienna" },
  zurich: { iata: "ZRH", label: "Zurich" },
  geneva: { iata: "GVA", label: "Geneva" },
  copenhagen: { iata: "CPH", label: "Copenhagen" },
  oslo: { iata: "OSL", label: "Oslo Gardermoen" },
  stockholm: { iata: "ARN", label: "Stockholm Arlanda" },
  helsinki: { iata: "HEL", label: "Helsinki" },
  prague: { iata: "PRG", label: "Prague" },
  budapest: { iata: "BUD", label: "Budapest" },
  bucharest: { iata: "OTP", label: "Bucharest" },
};

/** Airports with a downloaded PNG logo in /public/assets/airports. */
export const AIRPORTS_WITH_RASTER_LOGO = new Set([
  "lisbon",
  "porto",
  "faro",
  "madrid",
  "barcelona",
  "malaga",
  "palma",
  "paris-cdg",
  "paris-orly",
  "nice",
  "lyon",
  "frankfurt",
  "berlin",
  "dusseldorf",
  "hamburg",
  "milan-malpensa",
  "milan-linate",
  "amsterdam",
  "brussels",
  "warsaw",
  "krakow",
  "vienna",
  "geneva",
  "copenhagen",
  "helsinki",
  "prague",
  "budapest",
  "bucharest",
]);

export function getAirportBadge(id: string): AirportBadge | undefined {
  return AIRPORT_BADGES[id];
}

export function shouldUseAirportBadge(id: string, logo?: string): boolean {
  if (logo?.endsWith(".png")) {
    return false;
  }

  const badge = getAirportBadge(id);
  if (!badge) {
    return false;
  }

  if (logo?.endsWith(".svg")) {
    return true;
  }

  return !AIRPORTS_WITH_RASTER_LOGO.has(id);
}
