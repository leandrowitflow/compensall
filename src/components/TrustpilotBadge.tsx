import Image from "next/image";

export default function TrustpilotBadge() {
  return (
    <div className="flex items-center gap-2" aria-label="Excellent Trustpilot 4.8 out of 5">
      <Image
        src="/assets/icons/trustpilot-stars.svg"
        alt=""
        width={120}
        height={24}
        className="h-5 w-auto object-contain"
      />
      <span className="text-white/90 text-sm font-semibold hidden sm:inline">4.8 out of 5</span>
    </div>
  );
}
