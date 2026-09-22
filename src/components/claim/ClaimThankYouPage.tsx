"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { gtmClaimCta, gtmId, trackClaimSubmitted } from "@/lib/gtm";

type ClaimThankYouPageProps = {
  trackingNumber: string;
  entryMode: "upload" | "manual";
  flightNumber: string;
};

export default function ClaimThankYouPage({
  trackingNumber,
  entryMode,
  flightNumber,
}: ClaimThankYouPageProps) {
  const t = useTranslations("thankYouPage");
  const locale = useLocale();
  const firedRef = useRef(false);

  useEffect(() => {
    if (!trackingNumber || firedRef.current) {
      return;
    }

    const storageKey = `compensall_claim_submitted:${trackingNumber}`;
    try {
      if (sessionStorage.getItem(storageKey)) {
        return;
      }
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // sessionStorage may be unavailable; still fire once per mount
    }

    firedRef.current = true;
    trackClaimSubmitted({
      trackingNumber,
      locale,
      entryMode,
      flightNumber,
    });
  }, [entryMode, flightNumber, locale, trackingNumber]);

  return (
    <main className="flex-1 px-4 md:px-8 py-16 md:py-24">
      <div
        className="max-w-[640px] mx-auto border border-[#d5e0f9] rounded-[21px] p-6 sm:p-8 flex flex-col items-center text-center bg-white"
        {...gtmId("claim_submitted")}
      >
        <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-14 h-14 mb-4 object-contain" />
        <h1 className="font-bold text-[#1f3664] text-xl sm:text-2xl mb-2">{t("title")}</h1>
        <p className="text-[#1f3664] text-sm sm:text-base max-w-md leading-relaxed mb-4">
          {flightNumber ? t("bodyWithFlight", { flight: flightNumber }) : t("body")}
        </p>
        {trackingNumber ? (
          <div className="bg-[#f0f3fe] rounded-[14px] px-5 py-4 mb-5 w-full max-w-md">
            <p className="text-[#7b8094] text-xs font-bold uppercase tracking-wide mb-1">{t("trackingNumber")}</p>
            <p className="font-bold text-[#1f3664] text-lg sm:text-xl tracking-wide">{trackingNumber}</p>
          </div>
        ) : null}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {trackingNumber ? (
            <Link
              href={`/track/${trackingNumber}`}
              className="bg-[#2669f3] text-white font-bold px-6 py-3 rounded-[11px] hover:bg-[#1a55d4] transition-colors text-sm sm:text-base"
              {...gtmId("claim_success_track_claim")}
            >
              {t("trackYourClaim")}
            </Link>
          ) : null}
          <Link
            href="/#claim"
            className="text-[#2669f3] font-bold px-6 py-3 rounded-[11px] hover:underline text-sm sm:text-base"
            {...gtmClaimCta("thank_you")}
          >
            {t("startNewClaim")}
          </Link>
        </div>
      </div>
    </main>
  );
}
