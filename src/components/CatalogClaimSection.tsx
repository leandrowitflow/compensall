import Image from "next/image";
import Link from "next/link";
import HeroBackgroundImage from "@/components/HeroBackgroundImage";

type CatalogClaimSectionProps = {
  headline: string;
  subheadline?: string;
  ctaLabel?: string;
};

export default function CatalogClaimSection({
  headline,
  subheadline,
  ctaLabel = "Check compensation",
}: CatalogClaimSectionProps) {
  return (
    <section className="px-4 md:px-8 lg:px-8 xl:px-12 pb-0">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1100px] mx-auto">
        <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
            <HeroBackgroundImage variant="home" />
          </div>

          <div className="relative max-w-full mx-auto px-4 sm:px-6 pt-8 lg:pt-8 xl:pt-10 pb-6 lg:pb-8 xl:pb-10 text-center">
            <div className="flex justify-center mb-5">
              <Image
                src="/assets/icons/trustpilot-score.png"
                alt="Excellent Trustpilot 4.8 out of 5"
                width={200}
                height={36}
                className="h-9 w-auto object-contain"
              />
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
                className="inline-block bg-[#DDF444] text-[#1f3664] font-bold px-10 py-5 rounded-xl hover:bg-[#c8df2e] transition-colors text-base shadow-[0_4px_20px_rgba(221,244,68,0.45)]"
              >
                {ctaLabel}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[860px] mx-auto pb-2">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <img src="/assets/icons/lightning-charge.svg" alt="" className="w-10 h-10 object-contain" />
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Fast &amp; risk-free</p>
                  <p className="text-white/60 text-xs">No hidden fees</p>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <img src="/assets/icons/headset.svg" alt="" className="w-10 h-10 object-contain" />
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Talk to us</p>
                  <p className="text-white/60 text-xs">Human support available</p>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <img src="/assets/icons/secured.svg" alt="" className="w-10 h-10 object-contain" />
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Highest security</p>
                  <p className="text-white/60 text-xs">Your data is always protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
