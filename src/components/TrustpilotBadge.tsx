type TrustpilotBadgeProps = {
  priority?: boolean;
  className?: string;
};

/** Display width matches CSS max; intrinsic attrs match the optimized WebP asset. */
const TRUSTPILOT_SRC = "/assets/icons/trustpilot-score.webp";
const TRUSTPILOT_SRC_520 = "/assets/icons/trustpilot-score-520.webp";
const TRUSTPILOT_WIDTH = 1040;
const TRUSTPILOT_HEIGHT = 82;
const TRUSTPILOT_SRCSET = `${TRUSTPILOT_SRC_520} 520w, ${TRUSTPILOT_SRC} 1040w`;
/** Matches className display widths: full-bleed on small screens, 480–520px from sm up. */
const TRUSTPILOT_SIZES = "(max-width: 640px) 100vw, 520px";

export default function TrustpilotBadge({ priority = false, className = "" }: TrustpilotBadgeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={TRUSTPILOT_SRC}
      srcSet={TRUSTPILOT_SRCSET}
      sizes={TRUSTPILOT_SIZES}
      alt="Excellent Trustpilot 4.8 out of 5"
      width={TRUSTPILOT_WIDTH}
      height={TRUSTPILOT_HEIGHT}
      decoding="async"
      // Keep hero LCP uncontested — badge is above-fold but not the LCP element.
      fetchPriority={priority ? "high" : "low"}
      className={`w-[min(100%,480px)] sm:w-[480px] xl:w-[520px] h-auto shrink-0 object-contain ${className}`.trim()}
    />
  );
}
