import { z } from "zod";
import { sendResumeEmailForSession } from "@/lib/claim-resume-email";

const bodySchema = z.object({
  formSessionId: z.string().trim().min(8).max(80),
});

function getSiteUrl(request: Request): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "https://www.compensall.com"
  );
}

export async function POST(request: Request) {
  try {
    const parsed = bodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return Response.json({ error: "Invalid resume email payload." }, { status: 400 });
    }

    const sent = await sendResumeEmailForSession(parsed.data.formSessionId, getSiteUrl(request));
    return Response.json({ ok: true, sent });
  } catch (error) {
    console.error("Resume email on leave failed:", error);
    return Response.json({ error: "Could not send resume email." }, { status: 500 });
  }
}
