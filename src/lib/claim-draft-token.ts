export const CLAIM_RESUME_QUERY = "resume";

export function isClaimResumeToken(value: string | null | undefined): boolean {
  return Boolean(value && /^[a-f0-9]{64}$/i.test(value));
}

/** Client-only. Avoids `useSearchParams()`, which forces a Suspense fallback and CLS. */
export function readClaimResumeTokenFromLocation(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  const value = new URLSearchParams(window.location.search).get(CLAIM_RESUME_QUERY);
  return isClaimResumeToken(value) ? value : null;
}
