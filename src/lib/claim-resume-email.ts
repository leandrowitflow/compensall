import {
  CLAIM_RESUME_EMAIL_IDLE_MS,
  buildClaimResumeUrl,
  getClaimDraftBySessionId,
  isClaimDraftActive,
  listClaimDraftsPendingResumeEmail,
  markClaimDraftEmailSent,
  type ClaimDraft,
} from "@/lib/claim-drafts";
import { sendResumeClaimEmail } from "@/lib/send-claim-email";

export { CLAIM_RESUME_EMAIL_IDLE_MS };

export async function sendResumeEmailForDraft(
  draft: ClaimDraft,
  siteUrl: string,
): Promise<boolean> {
  if (draft.resumeEmailSentAt || !isClaimDraftActive(draft)) {
    return false;
  }

  const sent = await sendResumeClaimEmail({
    signedName: draft.signedName,
    contactEmail: draft.contactEmail,
    flight: draft.flight,
    resumeUrl: buildClaimResumeUrl(siteUrl, draft.token, draft.locale),
    siteUrl,
    locale: draft.locale,
  });

  if (sent) {
    await markClaimDraftEmailSent(draft.token);
  }

  return sent;
}

export async function sendResumeEmailForSession(
  formSessionId: string,
  siteUrl: string,
): Promise<boolean> {
  const draft = await getClaimDraftBySessionId(formSessionId);
  if (!draft) {
    return false;
  }
  return sendResumeEmailForDraft(draft, siteUrl);
}

export async function sendPendingResumeClaimEmails(siteUrl: string): Promise<{
  sent: number;
  failed: number;
  checked: number;
}> {
  const idleSince = new Date(Date.now() - CLAIM_RESUME_EMAIL_IDLE_MS);
  const drafts = await listClaimDraftsPendingResumeEmail(idleSince);

  let sent = 0;
  let failed = 0;

  for (const draft of drafts) {
    try {
      if (await sendResumeEmailForDraft(draft, siteUrl)) {
        sent += 1;
      }
    } catch (error) {
      failed += 1;
      console.error("Resume claim email failed:", draft.token, error);
    }
  }

  return { sent, failed, checked: drafts.length };
}
