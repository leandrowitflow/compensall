import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, isStepCount, Output } from "ai";
import { z } from "zod";
import type { FlightStatus } from "@/lib/claim-types";
import { getGeminiApiKey } from "@/lib/gemini";
import { parseJsonFromModelText } from "@/lib/gemini-document";

export const flightWebLookupSchema = z.object({
  found: z.boolean(),
  status: z.enum(["Delayed", "Cancelled", "Denied boarding", "On time", "Unknown"]),
  delay: z.string().nullable(),
  sourceWebsite: z.string().nullable(),
  confidence: z.enum(["high", "medium", "low"]),
  summary: z.string().nullable(),
});

export type FlightWebLookupResult = z.infer<typeof flightWebLookupSchema>;

export type FlightWebLookupQuery = {
  flightDesignator: string;
  flightDate: string;
  departureIata?: string | null;
  arrivalIata?: string | null;
  airlineName?: string | null;
};

const LOOKUP_MODEL = process.env.GEMINI_FLIGHT_LOOKUP_MODEL ?? "gemini-2.5-flash";
const LOOKUP_MODEL_FALLBACK = "gemini-2.5-pro";

function isRetryableModelError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("503") ||
    message.includes("high demand") ||
    message.includes("429") ||
    message.includes("rate limit")
  );
}

function createGoogleProvider() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return createGoogleGenerativeAI({ apiKey });
}

export function isFlightWebLookupEnabled(): boolean {
  if (!getGeminiApiKey()) return false;
  const flag = process.env.GEMINI_FLIGHT_WEB_LOOKUP ?? "true";
  return flag !== "false" && flag !== "0";
}

function normalizeFlightDesignatorForSearch(designator: string): string {
  return designator.replace(/\s+/g, "").toUpperCase();
}

function flightradarHistoryUrl(designator: string): string {
  return `https://www.flightradar24.com/data/flights/${normalizeFlightDesignatorForSearch(designator).toLowerCase()}`;
}

function buildResearchPrompt(query: FlightWebLookupQuery): string {
  const designator = normalizeFlightDesignatorForSearch(query.flightDesignator);
  const fr24Url = flightradarHistoryUrl(designator);
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const lines = [
    `Flight designator: ${designator} (also written X3 2138 for TUI fly)`,
    `Date: ${query.flightDate}`,
    `Today's date: ${today}`,
  ];
  if (query.departureIata) lines.push(`Departure IATA: ${query.departureIata}`);
  if (query.arrivalIata) lines.push(`Arrival IATA: ${query.arrivalIata}`);
  if (query.airlineName) lines.push(`Airline: ${query.airlineName}`);

  return `Research the operational status of this specific flight on the exact date below.

${lines.join("\n")}

Instructions:
1. Search the web for "${designator} ${query.flightDate}" and "X3 2138 ${query.flightDate}".
2. Open with url_context: ${fr24Url}
   Find the history table row for ${query.flightDate}. Copy STD, ATD, STA, and status exactly.
3. Open with url_context: https://www.fra-airport.com/en/arrivals/X32138-flight-status if useful.
4. If ATD is later than STD, calculate delay minutes (even if the site says "on time").
5. If the flight was cancelled or diverted, say so explicitly.
6. Report only facts from pages. Include the source URL.

Write a research note with the table row, times, delay calculation, and source URLs.`;
}

function buildStructurePrompt(researchNotes: string, query: FlightWebLookupQuery): string {
  return `Convert these flight research notes into JSON for flight ${query.flightDesignator} on ${query.flightDate}.

Research notes:
${researchNotes}

Rules:
- found=true if the notes confirm this flight existed/operated on this date OR was cancelled that day
- status=Delayed if ATD is later than STD or notes mention a delay (even if a site says "on time")
- status=Cancelled if cancelled
- status=On time only if operated with no material delay (>15 min)
- status=Unknown only if the date/flight could not be matched at all
- delay: duration string if Delayed, else null
- sourceWebsite: main source URL or domain
- confidence: high if Flightradar24 or official airport; medium if one source; low if uncertain
- summary: one sentence

Return JSON only.`;
}

export function mapWebLookupToFlightStatus(result: FlightWebLookupResult): {
  status: FlightStatus;
  delay: string;
} {
  if (!result.found || result.status === "Unknown" || result.status === "On time") {
    return { status: "Unknown", delay: "" };
  }

  return {
    status: result.status,
    delay: result.status === "Delayed" ? (result.delay?.trim() ?? "") : "",
  };
}

async function researchFlightOnWeb(query: FlightWebLookupQuery): Promise<string> {
  const googleProvider = createGoogleProvider();

  const run = (modelId: string) =>
    generateText({
      model: googleProvider(modelId),
      tools: {
        google_search: googleProvider.tools.googleSearch({}),
        url_context: googleProvider.tools.urlContext({}),
      },
      stopWhen: isStepCount(8),
      prompt: buildResearchPrompt(query),
    });

  try {
    const { text } = await run(LOOKUP_MODEL);
    return text.trim();
  } catch (error) {
    if (LOOKUP_MODEL !== LOOKUP_MODEL_FALLBACK && isRetryableModelError(error)) {
      const { text } = await run(LOOKUP_MODEL_FALLBACK);
      return text.trim();
    }
    throw error;
  }
}

async function structureResearchNotes(
  researchNotes: string,
  query: FlightWebLookupQuery,
): Promise<FlightWebLookupResult> {
  const googleProvider = createGoogleProvider();

  const { output } = await generateText({
    model: googleProvider(LOOKUP_MODEL),
    output: Output.object({ schema: flightWebLookupSchema }),
    prompt: buildStructurePrompt(researchNotes, query),
  });

  return output;
}

function parseResearchAsJson(text: string): FlightWebLookupResult {
  const raw = parseJsonFromModelText(text) as Record<string, unknown>;
  return flightWebLookupSchema.parse({
    found: Boolean(raw.found),
    status: raw.status ?? "Unknown",
    delay: typeof raw.delay === "string" ? raw.delay : typeof raw.delay_duration === "string" ? raw.delay_duration : null,
    sourceWebsite:
      typeof raw.sourceWebsite === "string"
        ? raw.sourceWebsite
        : typeof raw.source === "string"
          ? raw.source
          : null,
    confidence: raw.confidence ?? "low",
    summary: typeof raw.summary === "string" ? raw.summary : null,
  });
}

export async function lookupFlightStatusFromWeb(
  query: FlightWebLookupQuery,
): Promise<FlightWebLookupResult | null> {
  if (!isFlightWebLookupEnabled()) return null;
  if (!query.flightDesignator.trim() || !query.flightDate.trim()) return null;

  try {
    const researchNotes = await researchFlightOnWeb(query);

    if (!researchNotes) {
      return null;
    }

    try {
      const structured = await structureResearchNotes(researchNotes, query);

      if (process.env.NODE_ENV === "development") {
        console.info("[flight-web-lookup] research notes:", researchNotes.slice(0, 800));
      }

      return structured;
    } catch (structureError) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[flight-web-lookup] structure step failed, parsing research text:", structureError);
      }

      try {
        return parseResearchAsJson(researchNotes);
      } catch {
        const googleProvider = createGoogleProvider();
        const { text } = await generateText({
          model: googleProvider(LOOKUP_MODEL),
          prompt: `${buildStructurePrompt(researchNotes, query)}

Schema:
{
  "found": boolean,
  "status": "Delayed" | "Cancelled" | "Denied boarding" | "On time" | "Unknown",
  "delay": string | null,
  "sourceWebsite": string | null,
  "confidence": "high" | "medium" | "low",
  "summary": string | null
}`,
        });
        return parseResearchAsJson(text);
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[flight-web-lookup] failed:", error);
    }
    return null;
  }
}
