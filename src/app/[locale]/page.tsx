import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TrustpilotTrustBox from "@/components/TrustpilotTrustBox";
import { isTrustpilotTrustBoxConfigured } from "@/lib/trustpilot";
import CompensationCalculator from "@/components/CompensationCalculator";
import BrazilianRightsPanel from "@/components/BrazilianRightsPanel";
import Header from "@/components/Header";
import HeroBackgroundImage from "@/components/HeroBackgroundImage";
import HomeClaimFormSection from "@/components/HomeClaimFormSection";
import HomeFloatingClaimCta from "@/components/HomeFloatingClaimCta";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import MarkdownDownloadButton from "@/components/MarkdownDownloadButton";
import { FAQSection, Footer } from "@/components/home/HomeDeferredSections";
import JsonLd from "@/components/seo/JsonLd";
import { Link, type AppLocale } from "@/i18n/routing";
import { getLocalizedFaqs } from "@/lib/i18n-faqs";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";
import { localizeEuroAmountLabel } from "@/lib/public-copy";
import { EC261_TIERS, UK261_TIERS } from "@/lib/passenger-rights";
import { buildFaqPageSchema, buildHowToSchema } from "@/lib/structured-data";
import { gtmClaimCta, gtmId } from "@/lib/gtm";

const HOME_TITLE = "font-bold text-2xl sm:text-[28px] xl:text-4xl text-[#1f3664] text-center leading-[1.15] text-balance";
const HOME_INTRO = "mx-auto mt-2 max-w-[38rem] text-balance text-sm leading-relaxed text-[#5c6780] sm:text-base";
const ENTITLED_KEYS = ["route", "disruption", "airline"] as const;

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/", "home");
}

function tierTranslationKey(amount: string): string {
  return amount.replace(/[£€]/g, "");
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tAbout = await getTranslations("about");
  const tCommon = await getTranslations("common");
  const tTiers = await getTranslations("passengerRights");

  const trustItems = [
    { icon: "/assets/icons/trust-star.svg", title: t("trustBar.noWinNoFee") },
    { icon: "/assets/icons/trust-gdpr.svg", title: t("trustBar.gdprFirst") },
    { icon: "/assets/icons/trust-lock.svg", title: t("trustBar.deleteYourData") },
  ];
  const showTrustpilot = isTrustpilotTrustBoxConfigured();

  const showUkTiers = locale === "en";
  const compensationRows = EC261_TIERS.map((tier, index) => {
    const key = tierTranslationKey(tier.amount);
    return {
      distance: tTiers(`tiers.ec261.${key}.label`),
      euro: localizeEuroAmountLabel(tier.amount, locale),
      pound: UK261_TIERS[index]?.amount ?? "",
    };
  });

  const localizedFaqs = await getLocalizedFaqs(locale);
  const howToSchema = buildHowToSchema(
    [
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
    ],
    t("howItWorks.schemaName"),
  );

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
      <JsonLd data={[buildFaqPageSchema(localizedFaqs), howToSchema]} />
      <Header />

      <section className="px-4 md:px-8 lg:px-8 xl:px-12 pt-0 pb-0">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <div
            className="hero-lcp relative rounded-[28px] xl:rounded-[38px] overflow-clip"
            style={{ position: "relative", overflow: "hidden", backgroundColor: "#1d53cd", isolation: "isolate" }}
          >
            <div
              className="hero-lcp-media absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]"
              style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}
            >
              <HeroBackgroundImage variant="home" priority />
            </div>

            <div
              id="claim"
              className="relative max-w-full mx-auto px-4 sm:px-6 pt-8 lg:pt-8 xl:pt-12 pb-6 lg:pb-8 xl:pb-10 text-center scroll-mt-16 xl:scroll-mt-[90px]"
              style={{ position: "relative", zIndex: 1 }}
            >
              {showTrustpilot && (
                <div className="flex justify-center mb-5 min-h-[28px]">
                  <TrustpilotTrustBox />
                </div>
              )}

              <h1 className="font-bold text-[28px] sm:text-4xl md:text-5xl lg:text-[34px] xl:text-[57px] text-white leading-[1.15] sm:leading-[1.2] mb-4 max-w-[760px] mx-auto">
                {t("hero.title")}
                <br />
                {t("hero.titleLine2")}
                <MarkdownDownloadButton tone="onDark" />
              </h1>
              <p className="text-white/80 text-base md:text-lg font-semibold mb-8 max-w-[640px] mx-auto">
                {t("hero.subtitle")}
              </p>

              <HomeClaimFormSection />

              <div className="flex flex-col items-start text-left sm:flex-row sm:items-center sm:justify-center gap-8 sm:gap-10 xl:gap-12 mt-12 sm:mt-14 xl:mt-16 max-w-[1100px] w-full mx-auto px-6 sm:px-10 xl:px-14 pb-6 xl:pb-10">
                <div className="flex items-center gap-4 justify-start sm:justify-center min-w-0 w-full sm:w-auto">
                  <img src="/assets/icons/lightning-charge.svg" alt="" aria-hidden="true" width={46} height={46} loading="lazy" className="w-12 h-12 xl:w-[46px] xl:h-[46px] object-contain flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-white font-bold text-base xl:text-[17px] leading-snug">{t("hero.fastRiskFree")}</p>
                    <p className="text-white/60 text-sm xl:text-[15px] leading-relaxed">{t("hero.noHiddenFees")}</p>
                  </div>
                </div>
                <a
                  href="tel:+351923391980"
                  className="flex items-center gap-4 justify-start sm:justify-center min-w-0 w-full sm:w-auto text-inherit no-underline"
                  {...gtmId("hero_talk_to_us")}
                >
                  <img src="/assets/icons/headset.svg" alt="" aria-hidden="true" width={46} height={46} loading="lazy" className="w-12 h-12 xl:w-[46px] xl:h-[46px] object-contain flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-white font-bold text-base xl:text-[17px] leading-snug">{t("hero.talkToUs")}</p>
                    <p className="text-white/60 text-sm xl:text-[15px] leading-relaxed">{t("hero.humanSupportAvailable")}</p>
                  </div>
                </a>
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

      <section className="px-4 pt-6 md:px-8 xl:px-12 xl:pt-8">
        <ul className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl bg-[#f4f7ff] px-5 py-3.5">
          {trustItems.map((item) => (
            <li key={item.title} className="flex items-center gap-2.5">
              <img src={item.icon} alt="" aria-hidden="true" width={22} height={22} loading="lazy" className="h-5 w-5 shrink-0 object-contain" />
              <span className="text-sm font-semibold text-[#1f3664] leading-snug">{item.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 pt-10 md:px-8 xl:px-12 xl:pt-14">
        <div className="mx-auto max-w-[960px] text-center">
          <h2 className={HOME_TITLE}>
            {t("howItWorks.title")}{" "}
            <span className="text-[#005ffe]">{t("howItWorks.titleAccent")}</span>
          </h2>
          <div className="mt-6 text-left">
            <HowItWorksSteps compact />
          </div>
        </div>
      </section>

      <section className="px-4 pt-12 md:px-8 xl:px-12 xl:pt-16">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className={HOME_TITLE}>
            {t("compensation.title")}{" "}
            <span className="text-[#005ffe]">{t("compensation.titleAccent")}</span>
          </h2>
          <p className={`${HOME_INTRO} mb-6`}>{t("compensation.tableIntro")}</p>
          {locale === "pt-BR" ? (
            <BrazilianRightsPanel />
          ) : (
            <>
          <div className="text-left">
            <CompensationCalculator />
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#d5e0f9] text-left">
            <div
              className={`grid items-center gap-4 bg-[#f4f7ff] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#7b8094] sm:px-6 ${
                showUkTiers ? "grid-cols-[minmax(0,1fr)_5.5rem_5.5rem]" : "grid-cols-[minmax(0,1fr)_6.5rem]"
              }`}
            >
              <span>{t("compensation.tableDistance")}</span>
              {showUkTiers ? <span className="text-right">{t("compensation.tableUk")}</span> : null}
              <span className="text-right">
                {showUkTiers ? t("compensation.tableEu") : t("compensation.tableAmount")}
              </span>
            </div>
            {compensationRows.map((row) => (
              <Link
                key={row.distance}
                href="/#claim"
                className={`grid items-center gap-4 border-t border-[#e6edf8] bg-white px-5 py-3.5 text-[#1f3664] no-underline hover:bg-[#f8faff] sm:px-6 ${
                  showUkTiers ? "grid-cols-[minmax(0,1fr)_5.5rem_5.5rem]" : "grid-cols-[minmax(0,1fr)_6.5rem]"
                }`}
                {...gtmClaimCta("home_compensation")}
              >
                <span className="font-semibold text-sm sm:text-base">{row.distance}</span>
                {showUkTiers ? (
                  <span className="text-right font-bold text-[#2669f3] text-base sm:text-lg whitespace-nowrap">
                    {row.pound}
                  </span>
                ) : null}
                <span className="text-right font-bold text-[#2669f3] text-base sm:text-lg whitespace-nowrap">
                  {row.euro}
                </span>
              </Link>
            ))}
          </div>
            </>
          )}
        </div>
      </section>

      <section className="px-4 pt-12 md:px-8 xl:px-12 xl:pt-16">
        <div className="mx-auto max-w-[960px] text-center">
          <h2 className={HOME_TITLE}>
            {t("entitled.title")}{" "}
            <span className="text-[#005ffe]">{t("entitled.titleAccent")}</span>
          </h2>
          <div className="mt-6 overflow-hidden rounded-[24px] border border-[#d5e0f9] bg-white text-left sm:grid sm:grid-cols-3">
            {ENTITLED_KEYS.map((key, index) => (
              <div
                key={key}
                className={`flex gap-3 px-5 py-5 ${index > 0 ? "border-t border-[#e6edf8] sm:border-l sm:border-t-0" : ""}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8efff] text-sm font-bold text-[#2669f3]">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#1f3664] text-[15px] leading-snug sm:text-base">{t(`entitled.items.${key}.title`)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#5c6780]">{t(`entitled.items.${key}.body`)}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5">
            <Link href="/know-your-rights#passenger-rights" className="inline-flex items-center gap-1.5 font-bold text-[#2669f3] text-sm sm:text-base">
              {t("entitled.more")}
              <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      <section className="px-4 pt-10 md:px-8 xl:px-12 xl:pt-14">
        <div className="mx-auto max-w-[720px] rounded-[24px] bg-[#f4f7ff] px-6 py-8 text-center sm:px-10 sm:py-9">
          <h2 className={HOME_TITLE}>{tAbout("title")}</h2>
          <p className="mx-auto mt-3 max-w-[36rem] text-sm leading-relaxed text-[#3d4a6b] sm:text-base">{tAbout("subtitle")}</p>
          <div className="mt-5">
            <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2669f3] sm:text-base">
              {tCommon("learnMore")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-12 xl:mt-16">
        <FAQSection faqs={localizedFaqs.slice(0, 8)} compact moreHref="/faq" />
      </div>
      <Footer />
      <HomeFloatingClaimCta />
    </div>
  );
}
