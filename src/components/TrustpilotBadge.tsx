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
      sizes="(max-width: 640px) 360px, (max-width: 1280px) 260px, 200px"
      className={`w-[min(100%,360px)] sm:w-[260px] xl:w-[200px] h-auto shrink-0 object-contain ${className}`.trim()}
    />
  );
}
