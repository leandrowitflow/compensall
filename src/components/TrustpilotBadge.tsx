type TrustpilotBadgeProps = {
  priority?: boolean;
  className?: string;
};

export default function TrustpilotBadge({ priority = false, className = "" }: TrustpilotBadgeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/icons/trustpilot-score.png"
      alt="Excellent Trustpilot 4.8 out of 5"
      width={1451}
      height={114}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={`w-[min(100%,480px)] sm:w-[480px] xl:w-[520px] h-auto shrink-0 object-contain ${className}`.trim()}
    />
  );
}
