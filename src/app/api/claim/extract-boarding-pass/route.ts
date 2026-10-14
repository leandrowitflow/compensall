import { extractBoardingPassFromFile, formatExtractionError } from "@/lib/extract-boarding-pass";
import { inferMimeType, isAllowedBoardingPassMime, MAX_BOARDING_PASS_SIZE } from "@/lib/boarding-pass-file";
import { isGeminiConfigured } from "@/lib/gemini";

export const maxDuration = 60;

const MAX_FILE_SIZE = MAX_BOARDING_PASS_SIZE;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "No boarding pass file provided." }, { status: 400 });
    }

    const mimeType = inferMimeType(file.name, file.type);

    if (!isAllowedBoardingPassMime(mimeType)) {
      return Response.json(
        { error: "unsupported_type" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json({ error: "file_too_large" }, { status: 400 });
    }

    if (!isGeminiConfigured()) {
      return Response.json(
        {
          error:
            "Boarding pass assistant is not configured. Use manual entry or add GEMINI_API_KEY to your environment.",
        },
        { status: 503 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { flight, warning } = await extractBoardingPassFromFile(buffer, mimeType);

    return Response.json({ flight, warning });
  } catch (error) {
    console.error("Boarding pass extraction failed:", error);
    return Response.json({ error: formatExtractionError(error) }, { status: 422 });
  }
}
