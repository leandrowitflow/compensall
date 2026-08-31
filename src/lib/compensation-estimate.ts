import { getAirportCoordinates, isUk261Departure } from "@/lib/airport-coordinates";
import { normalizeIata } from "@/lib/iata";
import type {
  ClaimFlightData,
  CompensationEstimate,
} from "@/lib/claim-types";

export type { CompensationEstimate };
export type CompensationRegulation = CompensationEstimate["regulation"];
export type CompensationDistanceBand = CompensationEstimate["band"];

const EARTH_RADIUS_KM = 6371;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/** Great-circle distance in kilometres (haversine). */
export function haversineDistanceKm(
  from: { lat: number; lon: number },
  to: { lat: number; lon: number },
): number {
  const dLat = toRadians(to.lat - from.lat);
  const dLon = toRadians(to.lon - from.lon);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

export function distanceBand(distanceKm: number): CompensationDistanceBand {
  if (distanceKm <= 1500) return "short";
  if (distanceKm <= 3500) return "medium";
  return "long";
}

function tierForBand(
  regulation: CompensationRegulation,
  band: CompensationDistanceBand,
): Pick<CompensationEstimate, "amount" | "amountLabel" | "currency"> {
  if (regulation === "UK261") {
    switch (band) {
      case "short":
        return { amount: 220, amountLabel: "£220", currency: "GBP" };
      case "medium":
        return { amount: 350, amountLabel: "£350", currency: "GBP" };
      case "long":
        return { amount: 520, amountLabel: "£520", currency: "GBP" };
      default: {
        const exhaustive: never = band;
        return exhaustive;
      }
    }
  }

  switch (band) {
    case "short":
      return { amount: 250, amountLabel: "€250", currency: "EUR" };
    case "medium":
      return { amount: 400, amountLabel: "€400", currency: "EUR" };
    case "long":
      return { amount: 600, amountLabel: "€600", currency: "EUR" };
    default: {
      const exhaustive: never = band;
      return exhaustive;
    }
  }
}

export function estimateCompensationFromIatas(
  fromIata: string,
  toIata: string,
  options?: { preferEuroDisplay?: boolean },
): CompensationEstimate | null {
  const from = fromIata.trim().toUpperCase();
  const to = toIata.trim().toUpperCase();
  if (from.length !== 3 || to.length !== 3 || from === to) {
    return null;
  }

  const fromCoords = getAirportCoordinates(from);
  const toCoords = getAirportCoordinates(to);
  if (!fromCoords || !toCoords) {
    return null;
  }

  const distanceKm = Math.round(haversineDistanceKm(fromCoords, toCoords));
  const band = distanceBand(distanceKm);
  const routeRegulation: CompensationRegulation = isUk261Departure(from) ? "UK261" : "EC261";
  // Non-English UI shows EUR only (Francisca ops request).
  const regulation: CompensationRegulation = options?.preferEuroDisplay ? "EC261" : routeRegulation;
  const tier = tierForBand(regulation, band);

  return {
    distanceKm,
    ...tier,
    regulation,
    band,
    fromIata: from,
    toIata: to,
  };
}

export function estimateCompensationFromRoute(
  routeFrom: string,
  routeTo: string,
  options?: { preferEuroDisplay?: boolean },
): CompensationEstimate | null {
  const fromIata = normalizeIata(routeFrom);
  const toIata = normalizeIata(routeTo);
  if (!fromIata || !toIata) {
    return null;
  }
  return estimateCompensationFromIatas(fromIata, toIata, options);
}

export function prefersEuroCompensationDisplay(locale?: string | null): boolean {
  if (!locale) return false;
  const normalized = locale.trim().toLowerCase();
  return normalized !== "en" && !normalized.startsWith("en-");
}

export function estimateCompensationForFlight(
  flight: Pick<ClaimFlightData, "routeFrom" | "routeTo" | "compensationEstimate">,
  locale?: string | null,
): CompensationEstimate | null {
  const preferEuroDisplay = prefersEuroCompensationDisplay(locale);
  if (flight.compensationEstimate && !preferEuroDisplay) {
    return flight.compensationEstimate;
  }
  if (flight.compensationEstimate && preferEuroDisplay) {
    return (
      estimateCompensationFromRoute(flight.routeFrom, flight.routeTo, { preferEuroDisplay: true }) ??
      flight.compensationEstimate
    );
  }
  return estimateCompensationFromRoute(flight.routeFrom, flight.routeTo, { preferEuroDisplay });
}

export function withCompensationEstimate(
  flight: ClaimFlightData,
  locale?: string | null,
): ClaimFlightData {
  const estimate = estimateCompensationFromRoute(flight.routeFrom, flight.routeTo, {
    preferEuroDisplay: prefersEuroCompensationDisplay(locale),
  });
  return {
    ...flight,
    compensationEstimate: estimate,
  };
}

export function formatEstimateDistance(distanceKm: number): string {
  return `${distanceKm.toLocaleString("en-GB")} km`;
}
