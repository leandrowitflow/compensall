import {
  getClaimDraftByToken,
  isClaimDraftActive,
  isClaimResumeToken,
  toPublicClaimDraft,
} from "@/lib/claim-drafts";

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  if (!isClaimResumeToken(token)) {
    return Response.json({ error: "Invalid resume link." }, { status: 400 });
  }

  const draft = await getClaimDraftByToken(token);
  if (!draft || !isClaimDraftActive(draft)) {
    return Response.json({ error: "This resume link has expired or already been used." }, { status: 410 });
  }

  return Response.json({ draft: toPublicClaimDraft(draft) });
}
