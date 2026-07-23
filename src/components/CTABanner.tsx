"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { BRAND_NAME } from "@/lib/passenger-rights";

const CTA_FEATURE_KEYS = ["fastRiskFree", "talkToUs", "highestSecurity"] as const;
const CTA_SUBTITLE_KEYS = ["noHiddenFees", "humanSupportAvailable", "dataProtected"] as const;
const CTA_ICONS = [
  "/assets/icons/lightning-charge.svg",
  "/assets/icons/headset.svg",
  "/assets/icons/secured.svg",
] as const;

export default function CTABanner() {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");

  return (
    <section className="px-4 md:px-8 lg:px-8 xl:px-12 pb-0 bg-white">
      <div className="relative w-full max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto overflow-clip rounded-[28px] xl:rounded-[34px]">
        <Image
          src="/assets/cta-banner-bg.webp"
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 1550px"
          quality={75}
          loading="lazy"
          className="object-cover pointer-events-none rounded-[28px] xl:rounded-[34px]"
        />

        <div className="relative z-10 flex w-full max-w-[1189px] mx-auto flex-col items-center text-center px-6 pt-14 pb-12 sm:px-8 sm:pt-16 sm:pb-14 md:pt-20 md:pb-16 xl:px-8 xl:pt-16 xl:pb-16 2xl:h-full 2xl:justify-center 2xl:pt-[72px] 2xl:pb-[74px] gap-5 sm:gap-6 xl:gap-6 2xl:gap-8">
          <h2 className="shrink-0 font-bold text-3xl md:text-4xl lg:text-[40px] xl:text-[48px] 2xl:text-[57px] text-white leading-[1.2] w-full">
            {t("title")}
            <br />
            {t("titleLine2")}
          </h2>

          <p className="shrink-0 text-white text-base md:text-lg xl:text-[17px] xl:leading-[26px] 2xl:text-[19px] 2xl:leading-[27px] max-w-[740px]">
            {t("subtitle")}
            <br className="hidden sm:block" />
            {t("subtitleLine2")}
          </p>

          <p className="shrink-0 text-white text-sm md:text-base xl:text-[17px] xl:leading-[26px] 2xl:text-[19px] 2xl:leading-[27px] max-w-[856px]">
            {t.rich("body", {
              brandName: () => <strong className="font-bold">{BRAND_NAME}</strong>,
            })}
          </p>

          <Link
            href="/#claim"
            className="inline-flex shrink-0 items-center justify-center bg-[#2669f3] text-white font-bold h-12 lg:h-14 xl:h-[60px] 2xl:h-[73px] px-6 sm:px-8 lg:px-10 xl:px-12 rounded-[11px] hover:bg-[#1f5ae0] transition-colors text-sm sm:text-base lg:text-lg xl:text-[18px] 2xl:text-[19px] min-w-0 max-w-full text-center leading-tight"
          >
            <span className="xl:hidden">{tCommon("checkCompensationShort")}</span>
            <span className="hidden xl:inline">{tCommon("checkCompensation")}</span>
          </Link>

          <div className="flex w-full shrink-0 flex-col items-start text-left gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:max-w-[1280px] xl:gap-10 2xl:gap-12 2xl:mt-2 xl:px-6 2xl:px-14">
            {CTA_FEATURE_KEYS.map((key, index) => (
              <div key={key} className="flex items-center gap-4 justify-start min-w-0 w-full lg:w-auto">
                <img
                  src={CTA_ICONS[index]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="w-12 h-12 xl:w-[46px] xl:h-[46px] object-contain flex-shrink-0"
                />
                <div className="text-left min-w-0">
                  <p className="text-white font-bold text-base xl:text-[19px] xl:leading-[27px] leading-snug">{t(key)}</p>
                  <p className="text-white/60 text-sm xl:text-[16px] xl:leading-[28px] leading-relaxed">{t(CTA_SUBTITLE_KEYS[index])}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
