"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import AirportSelect from "@/components/claim/AirportSelect";
import { Link } from "@/i18n/routing";
import type { AirportOption } from "@/lib/airport-option";
import {
  estimateCompensationFromIatas,
  euroAmountForDistanceBand,
  formatEstimateDistance,
  prefersEuroCompensationDisplay,
  type CompensationDistanceBand,
} from "@/lib/compensation-estimate";
import { gtmClaimCta } from "@/lib/gtm";
import { formatEuroAmount } from "@/lib/public-copy";

const BANDS = ["short", "medium", "long"] as const;
const GBP_FOR_BAND = { short: 220, medium: 350, long: 520 } as const;
const MAX_PASSENGERS = 10;

function formatGbp(amount: number): string {
  return `£${amount}`;
}

function bandLabelKey(band: CompensationDistanceBand): "250" | "400" | "600" {
  switch (band) {
    case "short":
      return "250";
    case "medium":
      return "400";
    case "long":
      return "600";
    default: {
      const exhaustive: never = band;
      return exhaustive;
    }
  }
}

export default function CompensationCalculator() {
  const t = useTranslations("calculator");
  const tTiers = useTranslations("passengerRights.tiers.ec261");
  const locale = useLocale();
  const [from, setFrom] = useState<AirportOption | null>(null);
  const [to, setTo] = useState<AirportOption | null>(null);
  const [passengers, setPassengers] = useState(1);

  const estimate = useMemo(() => {
    if (!from || !to) return null;
    return estimateCompensationFromIatas(from.iata, to.iata, {
      preferEuroDisplay: prefersEuroCompensationDisplay(locale),
      locale,
    });
  }, [from, to, locale]);

  const unitLabel = estimate
    ? estimate.currency === "GBP"
      ? formatGbp(estimate.amount)
      : formatEuroAmount(estimate.amount, locale)
    : formatEuroAmount(0, locale);
  const totalLabel = estimate
    ? estimate.currency === "GBP"
      ? formatGbp(estimate.amount * passengers)
      : formatEuroAmount(estimate.amount * passengers, locale)
    : formatEuroAmount(0, locale);

  return (
    <div className="overflow-hidden rounded-[28px] border-2 border-[#d5e0f9] bg-white text-left shadow-[0_16px_40px_rgba(31,54,100,0.06)] lg:grid lg:grid-cols-2">
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <h3 className="font-bold text-[#1f3664] text-2xl leading-tight">{t("title")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#7b8094]">{t("subtitle")}</p>

        <div className="mt-6 space-y-4">
          <div>
            <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[#7b8094]">{t("from")}</p>
            <AirportSelect
              id="calculator-from"
              variant="field"
              placeholder={t("departure")}
              value={from}
              excludeAirportId={to?.id}
              onChange={setFrom}
            />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[#7b8094]">{t("to")}</p>
            <AirportSelect
              id="calculator-to"
              variant="field"
              placeholder={t("arrival")}
              value={to}
              excludeAirportId={from?.id}
              onChange={setTo}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-sm font-bold uppercase tracking-wide text-[#7b8094]">{t("passengers")}</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5e0f9] text-lg font-bold text-[#1f3664] hover:border-[#2669f3] disabled:opacity-40"
              aria-label={t("fewerPassengers")}
              disabled={passengers <= 1}
              onClick={() => setPassengers((count) => Math.max(1, count - 1))}
            >
              −
            </button>
            <span className="w-6 text-center font-bold text-[#1f3664]">{passengers}</span>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5e0f9] text-lg font-bold text-[#1f3664] hover:border-[#2669f3] disabled:opacity-40"
              aria-label={t("morePassengers")}
              disabled={passengers >= MAX_PASSENGERS}
              onClick={() => setPassengers((count) => Math.min(MAX_PASSENGERS, count + 1))}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-[#1f3664] px-5 py-6 text-white sm:px-8 sm:py-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{t("distance")}</p>
        <p className="mt-1 text-sm text-white/80">
          {estimate ? formatEstimateDistance(estimate.distanceKm) : t("distanceEmpty")}
        </p>
        <p className="mt-4 font-bold text-5xl leading-none tracking-tight">{totalLabel}</p>
        <p className="mt-2 text-sm text-white/70">
          {passengers > 1 ? t("totalForPassengers", { count: passengers, amount: unitLabel }) : t("perPerson")}
        </p>

        <ul className="mt-6 space-y-2">
          {BANDS.map((band) => {
            const active = estimate?.band === band;
            const euro = formatEuroAmount(euroAmountForDistanceBand(band), locale);
            const amount = locale === "en" ? `${formatGbp(GBP_FOR_BAND[band])} · ${euro}` : euro;
            return (
              <li
                key={band}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm ${
                  active ? "bg-white text-[#1f3664]" : "bg-white/10 text-white"
                }`}
              >
                <span className="min-w-0">{tTiers(`${bandLabelKey(band)}.label`)}</span>
                <span className="shrink-0 font-bold">{amount}</span>
              </li>
            );
          })}
        </ul>

        <Link
          href="/#claim"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-[11px] bg-white px-5 text-center text-sm font-bold text-[#1f3664] hover:bg-[#f4f7ff]"
          {...gtmClaimCta("home_calculator")}
        >
          {t("check")}
        </Link>
      </div>
    </div>
  );
}
