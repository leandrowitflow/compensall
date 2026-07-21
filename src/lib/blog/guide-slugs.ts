/** Legacy Compensall guide slugs — CMS is source of truth; kept for nav and know-your-rights links. */
export const COMPENSALL_GUIDE_SLUGS = [
  "flight-cancellation",
  "denied-boarding",
  "flight-delay",
  "missed-connection",
  "overbooking",
  "airline-strike",
  "passenger-rights",
  "passengers-with-disabilities",
] as const;

export type CompensallGuideSlug = (typeof COMPENSALL_GUIDE_SLUGS)[number];
