import { generateText, Output } from "ai";
import { z } from "zod";
import { normalizeFlightData, type ClaimFlightData, type FlightStatus } from "@/lib/claim-types";

const boardingPassSchema = z.object({
  passenger: z.string().nullable(),
  flight: z.string().nullable(),
  routeFrom: z.string().nullable(),
  routeTo: z.string().nullable(),
  date: z.string().nullable(),
  status: z.enum(["Delayed", "Cancelled", "Denied boarding", "Unknown"]).nullable(),
  delay: z.string().nullable(),
});

const EXTRACTION_PROMPT = `You are extracting structured flight information from a boarding pass image or PDF.
Return only fields you can read clearly from the document.
Use readable city names with IATA codes when visible, e.g. "London (LHR)".
For status and delay: boarding passes usually do NOT include disruption info — return status "Unknown" and delay as empty string unless explicitly shown.
Date should be human-readable, e.g. "14 May 2026".`;

export async function extractBoardingPassFromFile(
  fileBuffer: Buffer,
  mimeType: string,
): Promise<ClaimFlightData> {
  const { output } = await generateText({
    model: "openai/gpt-5.4",
    output: Output.object({ schema: boardingPassSchema }),
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: EXTRACTION_PROMPT },
          {
            type: "file",
            data: { type: "data", data: fileBuffer },
            mediaType: mimeType,
          },
        ],
      },
    ],
  });

  return normalizeFlightData({
    passenger: output.passenger ?? "",
    flight: output.flight ?? "",
    routeFrom: output.routeFrom ?? "",
    routeTo: output.routeTo ?? "",
    date: output.date ?? "",
    status: (output.status ?? "Unknown") as FlightStatus,
    delay: output.delay ?? "",
  });
}
