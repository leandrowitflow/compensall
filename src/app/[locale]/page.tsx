import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TrustpilotBadge from "@/components/TrustpilotBadge";
import ClaimBentoIcon, { CLAIM_BENTO_ICON_FRAMES } from "@/components/ClaimBentoIcon";
import Header from "@/components/Header";
import HeroBackgroundImage from "@/components/HeroBackgroundImage";
import CTABanner from "@/components/CTABanner";
import HomePassengerRightsSection from "@/components/HomePassengerRightsSection";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import { FAQSection, Footer } from "@/components/home/HomeDeferredSections";
import JsonLd from "@/components/seo/JsonLd";
import type { AppLocale } from "@/i18n/routing";
import { DEFAULT_FAQS } from "@/lib/default-faqs";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";
import { EC261_TIERS, UK261_TIERS } from "@/lib/passenger-rights";
import { buildFaqPageSchema, buildHowToSchema } from "@/lib/structured-data";

const HeroClaimForm = dynamic(() => import("@/components/HeroClaimForm"));

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/", "home");
}

function CompensationTierCard({
  amount,
  image,
  label,
  desc,
  tierAlt,
}: {
  amount: string;
  image?: string;
  label: string;
  desc: string;
  tierAlt: string;
}) {
  return (
    <div className="relative bg-white/28 border-2 border-[#d5e0f9] rounded-2xl overflow-hidden text-center pt-6 pb-8 px-6">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element -- pre-optimized WebP; avoid /_next/image competing with LCP
        <img
          src={image}
          alt={tierAlt}
          width={208}
          height={208}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="w-28 h-28 lg:w-28 lg:h-28 xl:w-52 xl:h-52 mx-auto object-contain mb-2"
        />
      )}
      <p className="font-bold text-[#2669f3] mb-2 text-4xl lg:text-[36px] xl:text-[80px] leading-none">
        {amount}
      </p>
      <p className="text-[#1f3664] font-bold text-base xl:text-lg mb-1">{label}</p>
      <p className="text-muted text-sm">{desc}</p>
    </div>
  );
}

function tierTranslationKey(amount: string): string {
  return amount.replace(/[£€]/g, "");
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tTiers = await getTranslations("passengerRights");

  const trustItems = [
    { icon: "/assets/icons/trust-star.svg", title: t("trustBar.trustpilotRated"), sub: t("trustBar.trustpilotScore") },
    { icon: "/assets/icons/trust-gdpr.svg", title: t("trustBar.gdprFirst"), sub: t("trustBar.privacyByDesign") },
    { icon: "/assets/icons/trust-lock.svg", title: t("trustBar.deleteYourData"), sub: t("trustBar.fullControl") },
    { icon: "/assets/icons/trust-headset.svg", title: t("trustBar.humanSupport"), sub: t("trustBar.realPeopleHelp") },
  ];

  const ukTiers = UK261_TIERS.map((tier) => {
    const key = tierTranslationKey(tier.amount);
    return {
      ...tier,
      label: tTiers(`tiers.uk261.${key}.label`),
      desc: tTiers(`tiers.uk261.${key}.desc`),
    };
  });

  const ecTiers = EC261_TIERS.map((tier) => {
    const key = tierTranslationKey(tier.amount);
    return {
      ...tier,
      label: tTiers(`tiers.ec261.${key}.label`),
      desc: tTiers(`tiers.ec261.${key}.desc`),
    };
  });

  const howToSchema = buildHowToSchema([
    {
      name: t("howItWorks.steps.upload.title"),
      text: t("howItWorks.steps.upload.description"),
    },
    {
      name: t("howItWorks.steps.assistant.title"),
      text: t("howItWorks.steps.assistant.description"),
    },
    {
      name: t("howItWorks.steps.airline.title"),
      text: t("howItWorks.steps.airline.description"),
    },
  ]);

  return (
    <div className="min-h-screen bg-white overflow-x-clip flex flex-col">
      {/* Hoisted to <head> — discover LCP hero early without waiting on CSS/JS. */}
      <link
        rel="preload"
        as="image"
        href="/assets/hero-bg-900.webp"
        type="image/webp"
        fetchPriority="high"
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        as="image"
        href="/assets/hero-bg.webp"
        type="image/webp"
        fetchPriority="high"
        media="(min-width: 768px)"
      />
      <JsonLd data={[buildFaqPageSchema(DEFAULT_FAQS), howToSchema]} />
      <Header />

      <section className="px-4 md:px-8 lg:px-8 xl:px-12 pt-0 pb-0">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
              <HeroBackgroundImage variant="home" priority />
            </div>

            <div
              id="claim"
              className="relative max-w-full mx-auto px-4 sm:px-6 pt-8 lg:pt-8 xl:pt-12 pb-6 lg:pb-8 xl:pb-10 text-center scroll-mt-16 xl:scroll-mt-[90px]"
            >
              <div className="flex justify-center mb-5">
                <TrustpilotBadge />
              </div>

              <h1 className="font-bold text-[28px] sm:text-4xl md:text-5xl lg:text-[34px] xl:text-[57px] text-white leading-[1.15] sm:leading-[1.2] mb-4 max-w-[760px] mx-auto">
                {t("hero.title")}
                <br />
                {t("hero.titleLine2")}
              </h1>
              <p className="text-white/80 text-base md:text-lg font-semibold mb-8 max-w-[640px] mx-auto">
                {t("hero.subtitle")}
              </p>

              <HeroClaimForm />

              <div className="flex flex-col items-start text-left sm:flex-row sm:items-center sm:justify-center gap-8 sm:gap-10 xl:gap-12 mt-12 sm:mt-14 xl:mt-16 max-w-[1100px] w-full mx-auto px-6 sm:px-10 xl:px-14 pb-6 xl:pb-10">
                <div className="flex items-center gap-4 justify-start sm:justify-center min-w-0 w-full sm:w-auto">
                  <img src="/assets/icons/lightning-charge.svg" alt="" aria-hidden="true" width={46} height={46} loading="lazy" className="w-12 h-12 xl:w-[46px] xl:h-[46px] object-contain flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-white font-bold text-base xl:text-[17px] leading-snug">{t("hero.fastRiskFree")}</p>
                    <p className="text-white/60 text-sm xl:text-[15px] leading-relaxed">{t("hero.noHiddenFees")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-start sm:justify-center min-w-0 w-full sm:w-auto">
                  <img src="/assets/icons/headset.svg" alt="" aria-hidden="true" width={46} height={46} loading="lazy" className="w-12 h-12 xl:w-[46px] xl:h-[46px] object-contain flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-white font-bold text-base xl:text-[17px] leading-snug">{t("hero.talkToUs")}</p>
                    <p className="text-white/60 text-sm xl:text-[15px] leading-relaxed">{t("hero.humanSupportAvailable")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-start sm:justify-center min-w-0 w-full sm:w-auto">
                  <img src="/assets/icons/secured.svg" alt="" aria-hidden="true" width={46} height={46} loading="lazy" className="w-12 h-12 xl:w-[46px] xl:h-[46px] object-contain flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-white font-bold text-base xl:text-[17px] leading-snug">{t("hero.highestSecurity")}</p>
                    <p className="text-white/60 text-sm xl:text-[15px] leading-relaxed">{t("hero.dataProtected")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 lg:pt-8 xl:pt-[60px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto">
          <div className="xl:hidden border-2 border-[#d5e0f9] rounded-[21px] p-4 md:p-5">
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {trustItems.map((item) => (
                <div key={item.title} className="flex items-center gap-2 md:gap-3">
                  <img src={item.icon} alt="" aria-hidden="true" width={40} height={40} loading="lazy" className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 object-contain" />
                  <div className="min-w-0">
                    <p className="font-bold text-[#1f3664] text-sm md:text-base leading-[1.4]">{item.title}</p>
                    <p className="text-[#1f3664] text-xs md:text-sm leading-[1.5]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-[21px] overflow-hidden hidden xl:block">
            <img
              src="/assets/trust-bar-bg.svg"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ objectFit: "fill" }}
            />
            <div className="relative flex flex-wrap items-stretch xl:items-center">
              {trustItems.map((item) => (
                <div key={item.title} className="flex-1 min-w-[220px] xl:min-w-0 flex items-center gap-3 px-4 xl:px-6 py-6 xl:py-[33px]">
                  <img src={item.icon} alt="" aria-hidden="true" width={40} height={40} loading="lazy" className="w-10 h-10 flex-shrink-0 object-contain" />
                  <div className="min-w-0">
                    <p className="font-bold text-[#1f3664] text-base xl:text-[17px] 2xl:text-[19px] leading-[1.4]">{item.title}</p>
                    <p className="text-[#1f3664] text-sm xl:text-[15px] 2xl:text-base leading-[1.5] 2xl:leading-[1.7]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 lg:pt-8 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] text-center mb-4 leading-[1.2]">
            {t("claimCards.title")}{" "}
            <span className="text-[#0060fe]">{t("claimCards.titleAccent")}</span>
          </h2>
          <p className="text-[#1f3664] text-center text-base mb-6 lg:mb-6 xl:mb-12 max-w-[646px] mx-auto">
            {t("claimCards.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[729fr_374fr_374fr] gap-6 lg:gap-7 xl:gap-9">
            <div className="relative md:col-span-2 xl:col-span-1 xl:row-span-2 rounded-[21px] overflow-hidden border-2 border-[#d5e0f9] bg-[#f5f8ff] min-h-[300px] lg:min-h-[340px] xl:min-h-[520px] flex flex-col items-start">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element -- tiny WebP; skip image optimizer on critical path */}
                <img
                  src="/assets/icons/flight-delay-bg.webp"
                  alt=""
                  aria-hidden="true"
                  width={1466}
                  height={1226}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="absolute inset-0 h-full w-full object-cover pointer-events-none scale-[1.12]"
                />
              </div>
              <div className="relative z-10 flex flex-col flex-1 items-start w-full p-5 lg:p-6 xl:pt-[92px] xl:pl-[67px] xl:pr-8 xl:pb-[74px]">
                <ClaimBentoIcon
                  src="/assets/icons/flight-delay-home.png"
                  alt={t("claimCards.flightDelay.iconAlt")}
                  {...CLAIM_BENTO_ICON_FRAMES.flightDelay}
                />
                <div className="mt-auto pt-4 xl:pt-0">
                  <h3 className="font-bold text-[#1f3664] text-xl lg:text-xl xl:text-[30px] xl:leading-[43px] mb-2 xl:mb-3">
                    {t("claimCards.flightDelay.title")}
                  </h3>
                  <p className="text-[#1f3664] text-sm lg:text-sm xl:text-[20px] xl:leading-[32px] xl:max-w-[482px]">
                    {t("claimCards.flightDelay.description")}
                  </p>
                </div>
              </div>
            </div>

            {(
              [
                ["flightCancellation", "/assets/icons/flight-cancellation-home.png", CLAIM_BENTO_ICON_FRAMES.flightCancellation],
                ["deniedBoarding", "/assets/icons/denied-boarding-home.png", CLAIM_BENTO_ICON_FRAMES.deniedBoarding],
                ["missedConnection", "/assets/icons/missed-connection-home.png", CLAIM_BENTO_ICON_FRAMES.missedConnection],
                ["airlineStrike", "/assets/icons/airline-strike-home.png", CLAIM_BENTO_ICON_FRAMES.airlineStrike],
              ] as const
            ).map(([cardKey, iconSrc, frame]) => (
              <div key={cardKey} className="bg-white border-2 border-[#d5e0f9] rounded-[21px] p-5 lg:p-6 xl:p-9 flex flex-col items-start min-h-[200px] lg:min-h-[220px] xl:min-h-[288px]">
                <ClaimBentoIcon src={iconSrc} alt={t(`claimCards.${cardKey}.iconAlt`)} {...frame} />
                <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[19px] xl:leading-[27px] mb-2">
                  {t(`claimCards.${cardKey}.title`)}
                </h3>
                <p className="text-[#1f3664] text-sm xl:text-[16px] xl:leading-[28px] xl:max-w-[300px]">
                  {t(`claimCards.${cardKey}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-8 lg:pt-8 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto text-center">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] mb-4 leading-[1.2]">
            {t("howItWorks.title")}{" "}
            <span className="text-[#005ffe]">{t("howItWorks.titleAccent")}</span>
          </h2>
          <p className="text-[#1f3664] text-base mb-6 lg:mb-6 xl:mb-14 max-w-[968px] mx-auto">
            {t("howItWorks.subtitle")}
          </p>

          <HowItWorksSteps />
        </div>
      </section>

      <section className="pt-8 lg:pt-8 xl:pt-[89px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto text-center">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] mb-4 leading-[1.2]">
            {t("compensation.title")}{" "}
            <span className="text-[#005ffe]">{t("compensation.titleAccent")}</span>
          </h2>
          <p className="text-[#1f3664] text-base mb-6 lg:mb-6 xl:mb-4 max-w-[968px] mx-auto">
            {t("compensation.ukIntro")}
          </p>

          <h3 className="font-bold text-[#1f3664] text-lg xl:text-xl mb-6">{t("compensation.ukHeading")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 xl:mb-14">
            {ukTiers.map((tier) => (
              <CompensationTierCard
                key={tier.amount}
                {...tier}
                tierAlt={t("compensation.tierAlt", { amount: tier.amount })}
              />
            ))}
          </div>

          <h3 className="font-bold text-[#1f3664] text-lg xl:text-xl mb-2">{t("compensation.ecHeading")}</h3>
          <p className="text-muted text-sm mb-6 max-w-[768px] mx-auto">{tTiers("ec261Note")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ecTiers.map((tier) => (
              <CompensationTierCard
                key={tier.amount}
                {...tier}
                tierAlt={t("compensation.tierAlt", { amount: tier.amount })}
              />
            ))}
          </div>
        </div>
      </section>

      <HomePassengerRightsSection />

      <div className="mt-8 lg:mt-8 xl:mt-[89px]">
        <CTABanner />
      </div>
      <div className="mt-10 lg:mt-10 xl:mt-[109px]">
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
}
