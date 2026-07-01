import { generateText, Output } from "ai";
import { z } from "zod";
import {
  buildGeminiDocumentPart,
  GEMINI_VISION_PROVIDER_OPTIONS,
} from "@/lib/gemini-document";
import { getGeminiVisionModel, isGeminiConfigured } from "@/lib/gemini";
import type { ClaimFlightData, ClaimVerification } from "@/lib/claim-types";

const verificationSchema = z.object({
  result: z.enum(["pass", "needs_review", "fail"]),
  summary: z.string(),
  mismatches: z.array(
    z.object({
      field: z.string(),
      documentValue: z.string().nullable(),
      confirmedValue: z.string(),
    }),
  ),
});

const VERIFICATION_PROMPT = `You are verifying a flight compensation claim.
Compare the user-confirmed flight details against what you can read on the boarding pass document.
Flag any mismatches, unclear fields, or signs the document may not match the claim.
Return result:
- "pass" when the document clearly supports the confirmed details
- "needs_review" when details are mostly consistent but some fields differ slightly, are unreadable, or disruption info is only on the form (not the pass)
- "fail" when major mismatches suggest the wrong document or unreliable data

Be practical: minor formatting differences (e.g. "London LHR" vs "London (LHR)") should not fail verification.`;

function skippedVerification(summary: string): ClaimVerification {
  return {
    result: "needs_review",
    summary,
    mismatches: [],
  };
}

export async function verifyBoardingPassClaim(
  confirmedFlight: ClaimFlightData,
  fileBuffer: Buffer | null,
  mimeType: string | null,
): Promise<ClaimVerification> {
  if (!isGeminiConfigured()) {
    return skippedVerification(
      "Assistant verification skipped — GEMINI_API_KEY is not configured. Claim queued for manual review.",
    );
  }

  if (!fileBuffer || !mimeType) {
    return skippedVerification(
      "No boarding pass uploaded. Manual entry will be reviewed by our team.",
    );
  }

  const confirmedDetails = JSON.stringify(confirmedFlight, null, 2);

  try {
    const { output } = await generateText({
      model: getGeminiVisionModel(),
      providerOptions: GEMINI_VISION_PROVIDER_OPTIONS,
      output: Output.object({ schema: verificationSchema }),
      messages: [
        {
          role: "user",
          content: [
            buildGeminiDocumentPart(fileBuffer, mimeType),
            {
              type: "text",
              text: `${VERIFICATION_PROMPT}\n\nUser-confirmed details:\n${confirmedDetails}`,
            },
          ],
        },
      ],
    });

    return {
      result: output.result,
      summary: output.summary,
      mismatches: output.mismatches,
    };
  } catch (error) {
    console.error("Boarding pass verification failed:", error);
    return skippedVerification(
      "Assistant verification could not complete. Claim queued for manual review.",
    );
  }
}
