import { extractBoardingPassReferences } from "@/lib/extract-boarding-pass-references";
import {
  lookupFlightStatusFromWeb,
  mapWebLookupToFlightStatus,
} from "@/lib/lookup-flight-status-web";
import { normalizeBoardingPassReferences } from "@/lib/normalize-boarding-pass-references";
import { countCoreFields, mergeFlightData } from "@/lib/parse-boarding-pass-ocr";
import {
  resolveFromReferences,
  toClaimFlightData,
} from "@/lib/resolve-boarding-pass-references";
import type { ClaimFlightData } from "@/lib/claim-types";

export type BoardingPassExtractionResult = {
  flight: ClaimFlightData;
  /** Set when extraction succeeded but key flight details (flight no., route, date) are missing. */
  warning: string | null;
};

function buildMissingDetailsWarning(flight: ClaimFlightData, recordLocator: string): string | null {
  const hasCoreFlightInfo = Boolean(flight.flight || flight.routeFrom || flight.routeTo || flight.date);
  if (hasCoreFlightInfo) return null;

  if (recordLocator) {
    return `We found your booking reference (${recordLocator}) and name, but this screen doesn't show your flight number, route, or date. That often happens with an app's "boarding cards" list view. Please upload the actual boarding pass screen, or fill in your flight details manually below.`;
  }

  if (flight.passenger) {
    return "We could only read your name from this image. Please upload the full boarding pass, or fill in your flight details manually below.";
  }

  return "We couldn't read your flight details from this image. Please upload a clearer boarding pass, or fill in the details manually below.";
}

export async function extractBoardingPassFromFile(
  fileBuffer: Buffer,
  mimeType: string,
): Promise<BoardingPassExtractionResult> {
  // 1. Vision pass reads printed reference codes (PNR, IATA, flight designator, date, name)
  const rawReferences = await extractBoardingPassReferences(fileBuffer, mimeType);

  // 2. Normalize and validate codes (IATA lookup, flight designator format, PNR pattern)
  const references = normalizeBoardingPassReferences(rawReferences);

  // 3. Resolve IATA → city labels, carrier code → airline name
  const resolved = resolveFromReferences(references);
  let flight = toClaimFlightData(resolved);

  // 4. Gemini searches the web (Flightradar24, airline pages, etc.) for delay/cancellation
  const webLookup = await lookupFlightStatusFromWeb({
    flightDesignator: references.flightDesignator ?? flight.flight,
    flightDate: flight.date || references.flightDate || "",
    departureIata: references.departureIata,
    arrivalIata: references.arrivalIata,
    airlineName: resolved.airlineName,
  });

  if (webLookup) {
    const { status, delay } = mapWebLookupToFlightStatus(webLookup);
    flight = mergeFlightData(flight, { status, delay });

    if (process.env.NODE_ENV === "development") {
      console.info("[boarding-pass] web flight lookup:", {
        found: webLookup.found,
        status: webLookup.status,
        delay: webLookup.delay,
        source: webLookup.sourceWebsite,
        confidence: webLookup.confidence,
      });
    }
  }

  const warning = buildMissingDetailsWarning(flight, resolved.recordLocator);

  if (process.env.NODE_ENV === "development") {
    console.info("[boarding-pass] references resolved:", {
      recordLocator: resolved.recordLocator || null,
      airline: resolved.airlineName || null,
      fields: countCoreFields(flight),
      warning,
      refs: {
        dep: references.departureIata,
        arr: references.arrivalIata,
        flight: references.flightDesignator,
        pnr: references.recordLocator,
      },
    });
  }

  return { flight, warning };
}

export function formatExtractionError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();

  if (lower.includes("api key") || lower.includes("403") || lower.includes("permission")) {
    return "Boarding pass assistant is not configured correctly. Use manual entry below.";
  }

  if (lower.includes("quota") || lower.includes("rate limit") || lower.includes("429")) {
    return "The assistant is busy right now. Please try again in a moment or use manual entry.";
  }

  if (lower.includes("not found") && lower.includes("model")) {
    return "Vision model is unavailable. Check GEMINI_VISION_MODEL in your environment.";
  }

  return "We couldn't read every detail automatically. You can still continue and fill in your flight details manually.";
}
