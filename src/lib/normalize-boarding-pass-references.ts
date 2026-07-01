import type { BoardingPassReferences } from "@/lib/extract-boarding-pass-references";
import { normalizeCarrierCode } from "@/lib/lookup-airline";
import { normalizeIata } from "@/lib/lookup-airport";

const RECORD_LOCATOR_PATTERN = /^[A-Z0-9]{5,7}$/i;
const FLIGHT_DESIGNATOR_PATTERN = /^[A-Z0-9]{2,3}\d{1,4}[A-Z]?$/i;

function normalizeRecordLocator(value: string | null): string | null {
  if (!value) return null;
  const cleaned = value.replace(/\s+/g, "").toUpperCase();
  return RECORD_LOCATOR_PATTERN.test(cleaned) ? cleaned : null;
}

function normalizeFlightDesignator(value: string | null): string | null {
  if (!value) return null;
  const cleaned = value.replace(/\s+/g, "").toUpperCase();
  return FLIGHT_DESIGNATOR_PATTERN.test(cleaned) ? cleaned : null;
}

function splitFlightDesignator(designator: string): { carrier: string; number: string } | null {
  const match = designator.match(/^([A-Z0-9]{2,3})(\d{1,4}[A-Z]?)$/i);
  if (!match) return null;
  return { carrier: match[1].toUpperCase(), number: match[2] };
}

export function normalizeBoardingPassReferences(
  refs: BoardingPassReferences,
): BoardingPassReferences {
  const flightDesignator =
    normalizeFlightDesignator(refs.flightDesignator) ??
    (() => {
      const carrier = normalizeCarrierCode(refs.operatingCarrier);
      const number = refs.flightNumber?.replace(/\s+/g, "") ?? "";
      if (carrier && number) {
        return normalizeFlightDesignator(`${carrier}${number}`);
      }
      return null;
    })();

  const fromDesignator = flightDesignator ? splitFlightDesignator(flightDesignator) : null;

  return {
    passengerName: refs.passengerName?.trim() || null,
    recordLocator: normalizeRecordLocator(refs.recordLocator),
    departureIata: normalizeIata(refs.departureIata),
    arrivalIata: normalizeIata(refs.arrivalIata),
    operatingCarrier:
      normalizeCarrierCode(refs.operatingCarrier) ?? fromDesignator?.carrier ?? null,
    flightNumber: refs.flightNumber?.replace(/\s+/g, "") || fromDesignator?.number || null,
    flightDesignator,
    flightDate: refs.flightDate?.trim() || null,
  };
}
