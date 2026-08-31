/** IATA/ICAO operating carrier codes common on European boarding passes. */
const CARRIER_NAMES: Record<string, string> = {
  FR: "Ryanair",
  RK: "Ryanair",
  U2: "easyJet",
  EZY: "easyJet",
  EJU: "easyJet",
  BA: "British Airways",
  W6: "Wizz Air",
  W9: "Wizz Air",
  W4: "Wizz Air",
  TP: "TAP Air Portugal",
  LH: "Lufthansa",
  EW: "Eurowings",
  AF: "Air France",
  KL: "KLM",
  IB: "Iberia",
  I2: "Iberia Express",
  UX: "Air Europa",
  VY: "Vueling",
  AZ: "ITA Airways",
  SN: "Brussels Airlines",
  EI: "Aer Lingus",
  LS: "Jet2",
  BY: "TUI Airways",
  VS: "Virgin Atlantic",
  SK: "SAS",
  DY: "Norwegian",
  AY: "Finnair",
  LX: "Swiss",
  OS: "Austrian Airlines",
  PC: "Pegasus Airlines",
  HV: "Transavia",
  TO: "Transavia France",
  XQ: "SunExpress",
  TU: "Tunisair",
  BJ: "Nouvelair",
  AT: "Royal Air Maroc",
  TB: "TUI fly",
  OR: "TUI fly Netherlands",
  DE: "Condor",
  X3: "TUI fly Deutschland",
  A3: "Aegean Airlines",
  OA: "Olympic Air",
  LO: "LOT Polish Airlines",
  BT: "Air Baltic",
  RO: "TAROM",
  JU: "Air Serbia",
  OK: "Czech Airlines",
  QS: "Smartwings",
  QR: "Qatar Airways",
  EK: "Emirates",
  EY: "Etihad Airways",
  TK: "Turkish Airlines",
  MS: "EgyptAir",
  ET: "Ethiopian Airlines",
  DL: "Delta Air Lines",
  AA: "American Airlines",
  UA: "United Airlines",
  AC: "Air Canada",
};

export function lookupAirlineByCarrierCode(code: string): string | null {
  const normalized = code.trim().toUpperCase();
  if (normalized.length < 2 || normalized.length > 3) return null;
  return CARRIER_NAMES[normalized] ?? null;
}

export function normalizeCarrierCode(value: string | null | undefined): string | null {
  if (!value) return null;
  const match = value.trim().toUpperCase().match(/\b([A-Z0-9]{2,3})\b/);
  return match?.[1] ?? null;
}
