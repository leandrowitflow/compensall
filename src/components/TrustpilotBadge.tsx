import Image from "next/image";

type TrustpilotBadgeProps = {
  priority?: boolean;
  className?: string;
};

export default function TrustpilotBadge({ priority = false, className = "" }: TrustpilotBadgeProps) {
  return (
    <Image
      src="/assets/icons/trustpilot-score.png"
      alt="Excellent Trustpilot 4.8 out of 5"
      width={1451}
      height={114}
      priority={priority}
      sizes="(max-width: 640px) 480px, (max-width: 1280px) 480px, 520px"
      className={`w-[min(100%,480px)] sm:w-[480px] xl:w-[520px] h-auto shrink-0 object-contain ${className}`.trim()}
    />
  );
}
