import type { AirportBadge } from "@/lib/airport-badges";

function labelTextClass(label: string): string {
  if (label.length > 18) return "text-[9px]";
  if (label.length > 14) return "text-[10px]";
  return "text-[11px]";
}

type AirportBadgeProps = AirportBadge;

export default function AirportBadge({ iata, label }: AirportBadgeProps) {
  return (
    <div
      aria-hidden
      className="h-full w-full max-w-[200px] inline-flex items-center gap-3 rounded-[10px] border-2 border-[#d5e0f9] bg-[#f0f5fe] px-3"
    >
      <span className="shrink-0 font-bold text-[26px] leading-none tracking-[0.14em] text-[#2669f3]">
        {iata}
      </span>
      <div className="min-w-0 flex flex-col gap-0.5">
        <span className={`font-bold leading-tight tracking-[0.04em] text-[#1f3664] ${labelTextClass(label)}`}>
          {label}
        </span>
        <span className="text-[10px] tracking-[0.06em] text-[#7b8094]">Airport</span>
      </div>
    </div>
  );
}
