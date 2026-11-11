"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  estimateCompensationFromRoute,
  formatEstimateDistance,
  prefersEuroCompensationDisplay,
  type CompensationEstimate,
} from "@/lib/compensation-estimate";
import { normalizeIata } from "@/lib/iata";
import { isBrazilianLocale } from "@/lib/public-copy";
import { getWorldAirportByIata } from "@/lib/world-airports";

type CompensationEstimateBannerProps = {
  routeFrom: string;
  routeTo: string;
  estimate?: CompensationEstimate | null;
  className?: string;
  prominent?: boolean;
};

type BrazilRouteScope = "domestic" | "international" | "outside" | "unknown";

function brazilRouteScope(routeFrom: string, routeTo: string): BrazilRouteScope {
  const fromCode = normalizeIata(routeFrom);
  const toCode = normalizeIata(routeTo);
  if (!fromCode || !toCode) return "unknown";
  const from = getWorldAirportByIata(fromCode);
  const to = getWorldAirportByIata(toCode);
  if (!from || !to) return "unknown";
  const fromBrazil = from.country === "BR";
  const toBrazil = to.country === "BR";
  if (fromBrazil && toBrazil) return "domestic";
  if (fromBrazil || toBrazil) return "international";
  return "outside";
}

export default function CompensationEstimateBanner({
  routeFrom,
  routeTo,
  estimate: estimateProp,
  className = "",
  prominent = false,
}: CompensationEstimateBannerProps) {
  const t = useTranslations("claim.compensationEstimate");
  const tClaim = useTranslations("claim");
  const locale = useLocale();

  if (isBrazilianLocale(locale)) {
    const scope = brazilRouteScope(routeFrom, routeTo);
    const headline =
      scope === "domestic" ? "250 DES" : scope === "international" ? "500 DES" : tClaim("anac.noFixedAmount");
    return (
      <div
        className={`rounded-[14px] border bg-[#f5f8ff] px-4 py-4 ${
          prominent ? "border-2 border-[#2669f3] shadow-[0_8px_24px_rgba(38,105,243,0.12)]" : "border-[#d5e0f9]"
        } ${className}`.trim()}
        role="status"
      >
        <p className="text-xs font-bold uppercase tracking-wide text-[#2669f3] mb-1">{tClaim("anac.label")}</p>
        <p className={`font-bold text-[#1f3664] leading-tight mb-2 ${prominent ? "text-3xl sm:text-4xl" : "text-2xl sm:text-[28px]"}`}>
          {headline}
        </p>
        <p className="text-[#5a6d8f] text-sm leading-relaxed">{tClaim(`anac.${scope}`)}</p>
        <p className="text-[#5a6d8f] text-sm leading-relaxed mt-2">{tClaim("anac.assistance")}</p>
        <p className="text-[#5a6d8f] text-sm leading-relaxed mt-2">{tClaim("anac.choice")}</p>
        <p className="text-[#7b8094] text-xs leading-relaxed mt-2">{tClaim("anac.desNote")}</p>
      </div>
    );
  }

  const preferEuroDisplay = prefersEuroCompensationDisplay(locale);
  const estimate =
    estimateCompensationFromRoute(routeFrom, routeTo, { preferEuroDisplay, locale }) ??
    (preferEuroDisplay ? null : (estimateProp ?? null));

  if (!estimate) {
    return null;
  }

  return (
    <div
      className={`rounded-[14px] border bg-[#f5f8ff] px-4 py-4 ${
        prominent ? "border-2 border-[#2669f3] shadow-[0_8px_24px_rgba(38,105,243,0.12)]" : "border-[#d5e0f9]"
      } ${className}`.trim()}
      role="status"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-[#2669f3] mb-1">
        {t("label")}
      </p>
      <p className={`font-bold text-[#1f3664] leading-none mb-2 ${prominent ? "text-3xl sm:text-4xl" : "text-2xl sm:text-[28px]"}`}>
        {t("upTo", { amount: estimate.amountLabel })}
      </p>
      <p className="text-[#5a6d8f] text-sm leading-relaxed">
        {t("detail", {
          regulation: estimate.regulation,
          distance: formatEstimateDistance(estimate.distanceKm),
        })}
      </p>
      <p className="text-[#7b8094] text-xs leading-relaxed mt-2">{t("disclaimer")}</p>
    </div>
  );
}
