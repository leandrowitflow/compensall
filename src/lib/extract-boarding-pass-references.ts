import { generateText, Output } from "ai";

import { z } from "zod";

import {

  buildGeminiDocumentPart,

  GEMINI_VISION_PROVIDER_OPTIONS,

} from "@/lib/gemini-document";

import { getGeminiTextModel, getGeminiVisionModel } from "@/lib/gemini";



/** Raw reference codes printed on the boarding pass — not expanded city names. */

export const boardingPassReferencesSchema = z.object({

  passengerName: z.string().nullable(),

  recordLocator: z.string().nullable(),

  departureIata: z.string().nullable(),

  arrivalIata: z.string().nullable(),

  operatingCarrier: z.string().nullable(),

  flightNumber: z.string().nullable(),

  flightDesignator: z.string().nullable(),

  flightDate: z.string().nullable(),

});



export type BoardingPassReferences = z.infer<typeof boardingPassReferencesSchema>;



const EXTRACT_REFERENCES_PROMPT = `You extract PRINTED REFERENCE CODES from an airline boarding pass, e-ticket, or booking confirmation (mobile PDF, email screenshot, paper pass, or wallet pass).



Do NOT guess city names or expand codes — only read codes and labels exactly as shown.



If the document shows multiple flights (round-trip, "voo de ida/regresso", outbound/return), extract the OUTBOUND / first departure leg only.



Look for these printed fields (labels vary by airline and language — e.g. "Reserva", "Booking ref", "PNR", "Voo de ida"):



passengerName — traveller name (often "PASSENGER", "NAME", "PAX")

recordLocator — booking / PNR reference (often 5–7 alphanumeric: "Booking ref", "PNR", "Record locator", "Confirmation")

departureIata — 3-letter IATA departure airport code ONLY (e.g. STN, LHR). Often near "FROM", "DEP", "DEPARTURE", or shown as "STN" / "London Stansted (STN)"

arrivalIata — 3-letter IATA arrival airport code ONLY. Often near "TO", "ARR", "ARRIVAL", "DESTINATION"

operatingCarrier — 2-letter airline code (e.g. FR, U2, BA). May appear as "Operated by FR" or in the flight line

flightNumber — numeric part only (e.g. 8542 from "FR8542" or "Flight FR 8542")

flightDesignator — combined airline code + number as printed (e.g. FR8542, U2 1234 → U21234)

flightDate — date as printed (boarding date or departure date)



Rules:

- Return the IATA code only for airports, never the city name.

- If both carrier+number and flightDesignator are visible, fill both.

- Return null for any field you cannot clearly read.

- Do not invent or infer data that is not printed on the pass.`;



export async function extractBoardingPassReferences(

  fileBuffer: Buffer,

  mimeType: string,

): Promise<BoardingPassReferences> {

  const { output } = await generateText({

    model: getGeminiVisionModel(),

    providerOptions: GEMINI_VISION_PROVIDER_OPTIONS,

    output: Output.object({ schema: boardingPassReferencesSchema }),

    messages: [

      {

        role: "user",

        content: [

          buildGeminiDocumentPart(fileBuffer, mimeType),

          { type: "text", text: EXTRACT_REFERENCES_PROMPT },

        ],

      },

    ],

  });



  return output;

}



export async function extractBoardingPassReferencesFromText(

  transcription: string,

): Promise<BoardingPassReferences> {

  const { output } = await generateText({

    model: getGeminiTextModel(),

    output: Output.object({ schema: boardingPassReferencesSchema }),

    messages: [

      {

        role: "user",

        content: `${EXTRACT_REFERENCES_PROMPT}\n\nOCR text from boarding pass:\n${transcription}`,

      },

    ],

  });



  return output;

}


