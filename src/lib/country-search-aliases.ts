/**
 * Colloquial / localized country names → ISO 3166-1 alpha-2 codes.
 * Used by airport search so "Inglaterra", "England", "UK", etc. resolve to GB.
 */
const COUNTRY_ALIASES: Record<string, string[]> = {
  // United Kingdom
  "united kingdom": ["GB"],
  uk: ["GB"],
  "u.k.": ["GB"],
  "u.k": ["GB"],
  britain: ["GB"],
  "great britain": ["GB"],
  england: ["GB"],
  scotland: ["GB"],
  wales: ["GB"],
  "northern ireland": ["GB"],
  inglaterra: ["GB"],
  escocia: ["GB"],
  "país de gales": ["GB"],
  "pais de gales": ["GB"],
  "reino unido": ["GB"],
  "royaume-uni": ["GB"],
  "royaume uni": ["GB"],
  angleterre: ["GB"],
  ecosse: ["GB"],
  galles: ["GB"],

  // Portugal
  portugal: ["PT"],
  portuguesa: ["PT"],
  portugais: ["PT"],

  // Spain
  spain: ["ES"],
  espana: ["ES"],
  espanha: ["ES"],
  espagne: ["ES"],

  // France
  france: ["FR"],
  francia: ["FR"],
  frankreich: ["FR"],

  // Germany
  germany: ["DE"],
  alemanha: ["DE"],
  allemagne: ["DE"],
  deutschland: ["DE"],

  // Italy
  italy: ["IT"],
  italia: ["IT"],
  italie: ["IT"],

  // Netherlands
  netherlands: ["NL"],
  holland: ["NL"],
  holanda: ["NL"],
  "pays-bas": ["NL"],
  "pays bas": ["NL"],

  // Belgium
  belgium: ["BE"],
  belgica: ["BE"],
  belgique: ["BE"],

  // Ireland
  ireland: ["IE"],
  irlanda: ["IE"],
  irlande: ["IE"],
  eire: ["IE"],

  // Switzerland
  switzerland: ["CH"],
  suica: ["CH"],
  suisse: ["CH"],
  schweiz: ["CH"],

  // Austria
  austria: ["AT"],
  autriche: ["AT"],

  // Greece
  greece: ["GR"],
  grecia: ["GR"],
  grece: ["GR"],

  // Poland
  poland: ["PL"],
  polonia: ["PL"],
  pologne: ["PL"],

  // Czechia
  czechia: ["CZ"],
  "czech republic": ["CZ"],
  "republica checa": ["CZ"],
  "republique tcheque": ["CZ"],
  chequia: ["CZ"],

  // United States
  "united states": ["US"],
  usa: ["US"],
  "u.s.": ["US"],
  "u.s.a.": ["US"],
  america: ["US"],
  "estados unidos": ["US"],
  "etats-unis": ["US"],
  "etats unis": ["US"],

  // Brazil
  brazil: ["BR"],
  brasil: ["BR"],
  bresil: ["BR"],

  // Canada
  canada: ["CA"],

  // Mexico
  mexico: ["MX"],
  mexique: ["MX"],

  // Turkey
  turkey: ["TR"],
  turquia: ["TR"],
  turquie: ["TR"],
  turkiye: ["TR"],

  // Morocco
  morocco: ["MA"],
  marrocos: ["MA"],
  maroc: ["MA"],

  // United Arab Emirates
  uae: ["AE"],
  "united arab emirates": ["AE"],
  "emirados arabes unidos": ["AE"],
  "emirats arabes unis": ["AE"],
  dubai: ["AE"],

  // China
  china: ["CN"],
  chine: ["CN"],

  // Japan
  japan: ["JP"],
  japao: ["JP"],
  japon: ["JP"],

  // India
  india: ["IN"],
  inde: ["IN"],

  // Australia
  australia: ["AU"],
  australie: ["AU"],

  // Norway / Sweden / Denmark / Finland
  norway: ["NO"],
  noruega: ["NO"],
  norvege: ["NO"],
  sweden: ["SE"],
  suecia: ["SE"],
  suede: ["SE"],
  denmark: ["DK"],
  dinamarca: ["DK"],
  danemark: ["DK"],
  finland: ["FI"],
  finlandia: ["FI"],
  finlande: ["FI"],

  // Hungary / Romania / Croatia / Portugal neighbors
  hungary: ["HU"],
  hungria: ["HU"],
  hongrie: ["HU"],
  romania: ["RO"],
  romenia: ["RO"],
  roumanie: ["RO"],
  croatia: ["HR"],
  croacia: ["HR"],
  croatie: ["HR"],
};

function normalizeAlias(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/['’]/g, "")
    .replace(/\s+/g, " ");
}

/** Resolve a free-text country query to ISO country codes, if known. */
export function resolveCountryCodesFromQuery(query: string): string[] {
  const normalized = normalizeAlias(query);
  if (!normalized || normalized.length < 2) return [];

  const exact = COUNTRY_ALIASES[normalized];
  if (exact) return exact;

  // Prefix match for longer aliases (e.g. "inglater" → Inglaterra)
  if (normalized.length >= 4) {
    const matches = new Set<string>();
    for (const [alias, codes] of Object.entries(COUNTRY_ALIASES)) {
      if (alias.startsWith(normalized) || normalized.startsWith(alias)) {
        for (const code of codes) matches.add(code);
      }
    }
    if (matches.size > 0 && matches.size <= 3) {
      return [...matches];
    }
  }

  return [];
}

export function airportMatchesCountryQuery(
  countryCode: string,
  countryName: string,
  query: string,
): boolean {
  const normalized = normalizeAlias(query);
  if (!normalized) return false;

  const code = countryCode.trim().toUpperCase();
  const name = normalizeAlias(countryName);
  if (code && normalizeAlias(code) === normalized) return true;
  if (name && (name === normalized || (normalized.length >= 4 && name.startsWith(normalized)))) {
    return true;
  }

  const resolved = resolveCountryCodesFromQuery(normalized);
  return resolved.includes(code);
}
