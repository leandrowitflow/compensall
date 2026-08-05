/** Fixed GTM click identifiers (`data-gtm` / `data-gtm-location`). See `docs/button-mapping.md`. */

export const GTM_CLAIM_CTA = "cta_claim" as const;

export type GtmClaimLocation =
  | "header"
  | "header_mobile"
  | "banner"
  | "about"
  | "catalog_detail"
  | "docs"
  | "docs_breadcrumb"
  | "track"
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
