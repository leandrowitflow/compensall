import { z } from "zod";
import { touchClaimDraftBySessionId } from "@/lib/claim-drafts";

const bodySchema = z.object({
  formSessionId: z.string().trim().min(8).max(80),
});

export async function POST(request: Request) {
  try {
    const parsed = bodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return Response.json({ error: "Invalid heartbeat payload." }, { status: 400 });
    }

    await touchClaimDraftBySessionId(parsed.data.formSessionId);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Claim draft heartbeat failed:", error);
    return Response.json({ error: "Could not update claim draft." }, { status: 500 });
  }
}
