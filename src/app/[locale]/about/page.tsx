import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import type { AppLocale } from "@/i18n/routing";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";
import { buildProfessionalServiceSchema } from "@/lib/structured-data";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

const VALUE_ICONS = [
  { key: "fastRiskFree", image: "/assets/about/about-fast-risk-free.svg" },
  { key: "humanSupport", image: "/assets/about/about-human-support.svg" },
  { key: "security", image: "/assets/about/about-security.svg" },
] as const;

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/about", "about");
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");
  const whyChooseItems = t.raw("whyChoose") as string[];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <JsonLd data={buildProfessionalServiceSchema()} />
      <Header />

      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start mb-12 xl:mb-16">
            <div>
              <h2 className="font-bold text-2xl lg:text-[28px] xl:text-[36px] text-[#1f3664] mb-4 leading-[1.2]">
                {t("missionTitle")}
              </h2>
              <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-4">{t("missionP1")}</p>
              <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed">{t("missionP2")}</p>
            </div>

            <div className="bg-[#f0f5fe] border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8">
              <h3 className="font-bold text-[#1f3664] text-lg xl:text-xl mb-4">{t("whyChooseTitle")}</h3>
              <ul className="space-y-3 text-[#1f3664] text-sm xl:text-base leading-relaxed">
                {whyChooseItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[#2669f3] font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/#claim"
                className="inline-flex mt-6 bg-[#2669f3] text-white font-bold text-base px-6 h-11 items-center rounded-[11px] hover:bg-[#1a55d4] transition-colors"
              >
                {tCommon("checkCompensation")}
              </Link>
            </div>
          </div>

          <h2 className="font-bold text-2xl lg:text-[28px] xl:text-[36px] text-[#1f3664] text-center mb-8 xl:mb-10 leading-[1.2]">
            {t("valuesTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 xl:gap-6">
            {VALUE_ICONS.map(({ key, image }) => (
              <div
                key={key}
                className="bg-white border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8 text-center"
              >
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  width={112}
                  height={112}
                  loading="lazy"
                  className="w-24 h-24 xl:w-28 xl:h-28 mx-auto mb-4 object-contain"
                />
                <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[18px] mb-2">
                  {t(`values.${key}.title`)}
                </h3>
                <p className="text-[#1f3664] text-sm xl:text-[15px] leading-relaxed">
                  {t(`values.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 lg:mt-10 xl:mt-[89px] pb-12 lg:pb-14 xl:pb-20">
        <CTABanner />
      </div>
      <Footer />
    </div>
  );
}
