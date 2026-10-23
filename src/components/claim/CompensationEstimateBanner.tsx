"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  estimateCompensationFromRoute,
  formatEstimateDistance,
  prefersEuroCompensationDisplay,
  type CompensationEstimate,
} from "@/lib/compensation-estimate";

type CompensationEstimateBannerProps = {
  routeFrom: string;
  routeTo: string;
  estimate?: CompensationEstimate | null;
  className?: string;
  prominent?: boolean;
};

export default function CompensationEstimateBanner({
  routeFrom,
  routeTo,
  estimate: estimateProp,
  className = "",
  prominent = false,
}: CompensationEstimateBannerProps) {
  const t = useTranslations("claim.compensationEstimate");
  const locale = useLocale();
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
