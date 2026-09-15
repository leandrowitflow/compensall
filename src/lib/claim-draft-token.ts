export const CLAIM_RESUME_QUERY = "resume";

export function isClaimResumeToken(value: string | null | undefined): boolean {
  return Boolean(value && /^[a-f0-9]{64}$/i.test(value));
}
