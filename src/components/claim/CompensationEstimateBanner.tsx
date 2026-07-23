"use client";

import { useTranslations } from "next-intl";
import {
  estimateCompensationFromRoute,
  formatEstimateDistance,
  type CompensationEstimate,
} from "@/lib/compensation-estimate";

type CompensationEstimateBannerProps = {
  routeFrom: string;
  routeTo: string;
  estimate?: CompensationEstimate | null;
  className?: string;
};

export default function CompensationEstimateBanner({
  routeFrom,
  routeTo,
  estimate: estimateProp,
  className = "",
}: CompensationEstimateBannerProps) {
  const t = useTranslations("claim.compensationEstimate");
  const estimate = estimateProp ?? estimateCompensationFromRoute(routeFrom, routeTo);

  if (!estimate) {
    return null;
  }

  return (
    <div
      className={`rounded-[14px] border border-[#d5e0f9] bg-[#f5f8ff] px-4 py-4 ${className}`.trim()}
      role="status"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-[#2669f3] mb-1">
        {t("label")}
      </p>
      <p className="font-bold text-[#1f3664] text-2xl sm:text-[28px] leading-none mb-2">
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
