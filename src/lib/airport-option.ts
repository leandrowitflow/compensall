export type AirportOption = {
  id: string;
  name: string;
  city: string;
  iata: string;
  logo: string;
  logoFallback?: string;
};

/** Lightweight helper — keep out of modules that import the full airport catalog. */
export function formatAirportRouteLabel(airport: AirportOption): string {
  return `${airport.city} (${airport.iata})`;
}
