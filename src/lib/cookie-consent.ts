export const COOKIE_CONSENT_STORAGE_KEY = "compensall-cookie-consent";

export type CookieConsentChoice = "essential" | "all";

export function isCookieConsentChoice(value: string | null): value is CookieConsentChoice {
  return value === "essential" || value === "all";
}

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  return isCookieConsentChoice(stored) ? stored : null;
}

export function writeCookieConsent(choice: CookieConsentChoice): void {
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
}

export function hasAnalyticsConsent(): boolean {
  return readCookieConsent() === "all";
}
