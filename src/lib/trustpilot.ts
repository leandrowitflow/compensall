/** Shared Trustpilot TrustBox config — safe for server and client. */

export function getTrustpilotBusinessUnitId(): string {
  return process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID?.trim() || "";
}

export function getTrustpilotTemplateId(): string {
  return process.env.NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID?.trim() || "";
}

export function getTrustpilotReviewUrl(): string {
  return (
    process.env.NEXT_PUBLIC_TRUSTPILOT_REVIEW_URL?.trim() ||
    "https://www.trustpilot.com/review/www.compensall.com"
  );
}

export function isTrustpilotTrustBoxConfigured(): boolean {
  return Boolean(getTrustpilotBusinessUnitId() && getTrustpilotTemplateId());
}
