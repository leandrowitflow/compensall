import { hasAnalyticsConsent } from "@/lib/cookie-consent";

/** Fixed GTM click identifiers (`data-gtm` / `data-gtm-location`). See `docs/button-mapping.md`. */

export const GTM_CLAIM_CTA = "cta_claim" as const;
export const GTM_CLAIM_SUBMITTED = "claim_submitted" as const;

type DataLayerWindow = Window & { dataLayer?: Array<Record<string, unknown>> };

export type GtmClaimLocation =
  | "header"
  | "header_mobile"
  | "banner"
  | "about"
  | "catalog_detail"
  | "docs"
  | "docs_breadcrumb"
  | "track"
  | "thank_you"
  | "not_found";

/** Props for CTAs that open the claim form (`/#claim`). */
export function gtmClaimCta(location: GtmClaimLocation) {
  return {
    "data-gtm": GTM_CLAIM_CTA,
    "data-gtm-location": location,
  } as const;
}

/** Props for a single fixed GTM event name. */
export function gtmId(id: string) {
  return { "data-gtm": id } as const;
}

/** Paid conversion: fire only after a claim is submitted and a tracking number exists. */
export function trackClaimSubmitted(payload: {
  trackingNumber: string;
  locale: string;
  entryMode: "upload" | "manual";
  flightNumber?: string;
}): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) {
    return;
  }

  const target = window as DataLayerWindow;
  target.dataLayer = target.dataLayer ?? [];
  target.dataLayer.push({
    event: GTM_CLAIM_SUBMITTED,
    claim_tracking_number: payload.trackingNumber,
    claim_locale: payload.locale,
    claim_entry_mode: payload.entryMode,
    claim_flight_number: payload.flightNumber ?? "",
  });
}
