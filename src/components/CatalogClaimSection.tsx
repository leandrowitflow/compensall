"use client";

import { useTranslations } from "next-intl";
import TrustpilotBadge from "@/components/TrustpilotBadge";
import { Link } from "@/i18n/routing";
import HeroBackgroundImage from "@/components/HeroBackgroundImage";

type CatalogClaimSectionProps = {
  headline: string;
  subheadline?: string;
  ctaLabel?: string;
};

export default function CatalogClaimSection({
  headline,
  subheadline,
  ctaLabel,
}: CatalogClaimSectionProps) {
  const tHome = useTranslations("home.hero");
  const tCommon = useTranslations("common");
  const buttonLabel = ctaLabel ?? tCommon("checkCompensation");

  return (
    <section className="px-4 md:px-8 lg:px-8 xl:px-12 pb-0">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1100px] mx-auto">
        <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
            <HeroBackgroundImage variant="home" />
          </div>

          <div className="relative max-w-full mx-auto px-4 sm:px-6 pt-8 lg:pt-8 xl:pt-10 pb-6 lg:pb-8 xl:pb-10 text-center">
            <div className="flex justify-center mb-5">
              <TrustpilotBadge />
            </div>

            <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[44px] text-white leading-[1.2] mb-3 max-w-[760px] mx-auto">
              {headline}
            </h2>
            {subheadline && (
              <p className="text-white/80 text-base md:text-lg font-semibold max-w-[640px] mx-auto">
                {subheadline}
              </p>
            )}

            <div className="py-10 xl:py-12">
              <Link
                href="/#claim"
                className="inline-flex items-center justify-center bg-[#DDF444] text-[#1f3664] font-bold px-6 sm:px-10 py-4 sm:py-5 rounded-xl hover:bg-[#c8df2e] transition-colors text-sm sm:text-base text-center leading-tight max-w-full shadow-[0_4px_20px_rgba(221,244,68,0.45)]"
              >
                <span className="xl:hidden">{tCommon("checkCompensationShort")}</span>
                <span className="hidden xl:inline">{buttonLabel}</span>
              </Link>
            </div>

            <div className="flex flex-col items-start text-left lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10 xl:gap-12 max-w-full w-full mx-auto pb-6 xl:pb-8">
              <div className="flex items-center gap-4 justify-start min-w-0 w-full lg:w-auto">
                <img src="/assets/icons/lightning-charge.svg" alt="" aria-hidden="true" loading="lazy" className="w-12 h-12 xl:w-[46px] xl:h-[46px] object-contain flex-shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-white font-bold text-base xl:text-[17px] leading-snug">{tHome("fastRiskFree")}</p>
                  <p className="text-white/60 text-sm xl:text-[15px] leading-relaxed">{tHome("noHiddenFees")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-start min-w-0 w-full lg:w-auto">
                <img src="/assets/icons/headset.svg" alt="" aria-hidden="true" loading="lazy" className="w-12 h-12 xl:w-[46px] xl:h-[46px] object-contain flex-shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-white font-bold text-base xl:text-[17px] leading-snug">{tHome("talkToUs")}</p>
                  <p className="text-white/60 text-sm xl:text-[15px] leading-relaxed">{tHome("humanSupportAvailable")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-start min-w-0 w-full lg:w-auto">
                <img src="/assets/icons/secured.svg" alt="" aria-hidden="true" loading="lazy" className="w-12 h-12 xl:w-[46px] xl:h-[46px] object-contain flex-shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-white font-bold text-base xl:text-[17px] leading-snug">{tHome("highestSecurity")}</p>
                  <p className="text-white/60 text-sm xl:text-[15px] leading-relaxed">{tHome("dataProtected")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
