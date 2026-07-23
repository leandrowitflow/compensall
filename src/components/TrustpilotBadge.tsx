type TrustpilotBadgeProps = {
  priority?: boolean;
  className?: string;
};

/** Display width matches CSS max; intrinsic attrs match the optimized WebP asset. */
const TRUSTPILOT_SRC = "/assets/icons/trustpilot-score.webp";
const TRUSTPILOT_WIDTH = 1040;
const TRUSTPILOT_HEIGHT = 82;

export default function TrustpilotBadge({ priority = false, className = "" }: TrustpilotBadgeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={TRUSTPILOT_SRC}
      alt="Excellent Trustpilot 4.8 out of 5"
      width={TRUSTPILOT_WIDTH}
      height={TRUSTPILOT_HEIGHT}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={`w-[min(100%,480px)] sm:w-[480px] xl:w-[520px] h-auto shrink-0 object-contain ${className}`.trim()}
    />
  );
}
