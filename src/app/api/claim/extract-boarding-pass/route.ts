import { extractBoardingPassFromFile } from "@/lib/extract-boarding-pass";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "No boarding pass file provided." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return Response.json(
        { error: "Unsupported file type. Upload a PDF, JPG, or PNG boarding pass." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json({ error: "File is too large. Maximum size is 10 MB." }, { status: 400 });
    }

    if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) {
      return Response.json(
        {
          error:
            "AI extraction is not configured. Use manual entry or add AI_GATEWAY_API_KEY to your environment.",
        },
        { status: 503 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const flight = await extractBoardingPassFromFile(buffer, file.type);

    return Response.json({ flight });
  } catch (error) {
    console.error("Boarding pass extraction failed:", error);
    return Response.json(
      {
        error:
          "We could not read this boarding pass. Try a clearer photo or use manual entry.",
      },
      { status: 500 },
    );
  }
}
