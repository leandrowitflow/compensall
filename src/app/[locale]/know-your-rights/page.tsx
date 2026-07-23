import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TrustpilotBadge from "@/components/TrustpilotBadge";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import HeroBackgroundImage from "@/components/HeroBackgroundImage";
import JsonLd from "@/components/seo/JsonLd";
import { Link } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import { DEFAULT_FAQS } from "@/lib/default-faqs";
import { COMPENSALL_GUIDE_SLUGS } from "@/lib/blog/guide-slugs";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";
import { buildFaqPageSchema } from "@/lib/structured-data";

type KnowYourRightsPageProps = {
  params: Promise<{ locale: string }>;
};

const FLIGHT_ISSUE_DEFS = [
  { slug: COMPENSALL_GUIDE_SLUGS[0], key: "flightCancellation", image: "/assets/icons/flight-cancellation.png" },
  { slug: COMPENSALL_GUIDE_SLUGS[1], key: "deniedBoarding", image: "/assets/icons/denied-boarding.png" },
  { slug: COMPENSALL_GUIDE_SLUGS[2], key: "flightDelay", image: "/assets/icons/flight-delay.png" },
  { slug: COMPENSALL_GUIDE_SLUGS[3], key: "missedConnection", image: "/assets/icons/missed-connection.png" },
  { slug: COMPENSALL_GUIDE_SLUGS[4], key: "overbooking", image: "/assets/icons/overbooking.png" },
  { slug: COMPENSALL_GUIDE_SLUGS[5], key: "airlineStrike", image: "/assets/icons/airline-strike.png" },
  { slug: COMPENSALL_GUIDE_SLUGS[6], key: "passengerRights", image: "/assets/icons/passenger-rights.png" },
  {
    slug: COMPENSALL_GUIDE_SLUGS[7],
    key: "passengersWithDisabilities",
    image: "/assets/icons/passengers-with-disabilities.png",
  },
] as const;

export async function generateMetadata({ params }: KnowYourRightsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/know-your-rights", "knowYourRights");
}

export default async function KnowYourRightsPage({ params }: KnowYourRightsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("knowYourRights");
  const tCommon = await getTranslations("common");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <JsonLd data={buildFaqPageSchema(DEFAULT_FAQS)} />
      <Header />

      <section className="px-4 md:px-8 lg:px-8 xl:px-12 pt-0 pb-0">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
              <HeroBackgroundImage variant="banner" priority />
            </div>

            <div className="relative px-4 sm:px-6 pt-10 lg:pt-10 xl:pt-12 pb-10 lg:pb-12 xl:pb-14 text-center">
              <div className="flex justify-center mb-5">
                <TrustpilotBadge priority />
              </div>

              <h1 className="font-bold text-4xl md:text-5xl lg:text-[34px] xl:text-[57px] text-white leading-[1.2] mb-4 max-w-[1010px] mx-auto">
                {t("heroTitle")}
              </h1>
              <p className="text-white font-bold text-base lg:text-[17px] xl:text-[19px] leading-relaxed max-w-[642px] mx-auto">
                {t("heroSubtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] text-center mb-8 lg:mb-10 xl:mb-14 leading-[1.2]">
            {t("whatHappenedTitle")}{" "}
            <span className="text-[#2669f3]">{t("whatHappenedAccent")}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
            {FLIGHT_ISSUE_DEFS.map((issue) => (
              <div
                key={issue.slug}
                className="bg-white border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8 flex flex-col min-h-[280px] xl:min-h-[312px]"
              >
                <div className="h-16 xl:h-[87px] mb-5 flex items-start">
                  <img
                    src={issue.image}
                    alt={`${t(`flightIssues.${issue.key}.title`)} icon`}
                    className="h-full w-auto max-w-[109px] object-contain object-left"
                  />
                </div>
                <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[18px] mb-3 leading-snug">
                  {t(`flightIssues.${issue.key}.title`)}
                </h3>
                <p className="text-[#1f3664] text-sm xl:text-[15px] leading-[1.7] flex-1">
                  {t(`flightIssues.${issue.key}.description`)}
                </p>
                <Link
                  href={`/blog/${issue.slug}`}
                  className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-[17px] xl:text-[18px] mt-5 hover:opacity-80 transition-opacity"
                >
                  {tCommon("learnMore")}
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                    <path
                      d="M1 6h14M10 1l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto text-center">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] mb-4 leading-[1.2]">
            {t("howItWorksTitle")}{" "}
            <span className="text-[#005ffe]">{t("howItWorksAccent")}</span>
          </h2>
          <p className="text-[#1f3664] text-base xl:text-[19px] mb-6 lg:mb-8 xl:mb-14 max-w-[740px] mx-auto leading-relaxed">
            {t("howItWorksSubtitle")}
          </p>

          <HowItWorksSteps />
        </div>
      </section>

      <div className="mt-8 lg:mt-10 xl:mt-[89px]">
        <CTABanner />
      </div>
      <div className="mt-10 lg:mt-12 xl:mt-[109px]">
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
}
