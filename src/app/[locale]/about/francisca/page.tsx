import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import JsonLd from "@/components/seo/JsonLd";
import { AuthorMonogram } from "@/components/BlogAuthor";
import { Link } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import { gtmClaimCta, gtmId } from "@/lib/gtm";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";
import { localizedPath } from "@/lib/site-metadata";
import { buildBreadcrumbSchema, buildFounderSchema } from "@/lib/structured-data";

type AuthorPageProps = {
  params: Promise<{ locale: string }>;
};

type TitledPoint = {
  title: string;
  body: string;
};

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/about/francisca", "author");
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const appLocale = locale as AppLocale;
  const t = await getTranslations("authorPage");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const tHero = await getTranslations("home.hero");
  const checks = t.raw("checks") as TitledPoint[];
  const principles = t.raw("principles") as TitledPoint[];
  const path = localizedPath("/about/francisca", appLocale);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <JsonLd
        data={[
          buildFounderSchema({
            jobTitle: t("role"),
            description: t("lead"),
            path,
          }),
          buildBreadcrumbSchema([
            { name: tCommon("home"), path: localizedPath("/", appLocale) },
            { name: tNav("aboutUs"), path: localizedPath("/about", appLocale) },
            { name: t("name"), path },
          ]),
        ]}
      />
      <Header />

      <PageHero title={t("greeting")} subtitle={t("lead")} trustpilotAlt={tHero("trustpilotAlt")} />

      <article className="px-4 md:px-8 lg:px-8 xl:px-12 pt-8 lg:pt-10 xl:pt-[80px] pb-0">
        <div className="max-w-[760px] lg:max-w-[860px] mx-auto">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-sm mb-8 hover:opacity-80"
            {...gtmId("author_back_to_about")}
          >
            ← {tNav("aboutUs")}
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <AuthorMonogram size="lg" />
            <div>
              <p className="font-bold text-[#1f3664] text-xl xl:text-2xl leading-snug">{t("name")}</p>
              <p className="text-[#2669f3] font-bold">{t("role")}</p>
            </div>
          </div>

          <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-10">{t("intro")}</p>

          <h2 className="font-bold text-2xl xl:text-[32px] text-[#1f3664] leading-[1.2] mb-4">
            {t("decadeTitle")}
          </h2>
          <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-6">{t("decadeBody")}</p>
          <blockquote className="bg-[#f0f5fe] border-l-4 border-[#2669f3] rounded-r-xl px-5 py-4 mb-6 text-[#1f3664] text-base xl:text-[17px] leading-relaxed font-semibold">
            {t("quote")}
          </blockquote>
          <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-10">{t("decadeAfter")}</p>

          <h2 className="font-bold text-2xl xl:text-[32px] text-[#1f3664] leading-[1.2] mb-4">
            {t("whyTitle")}
          </h2>
          <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-4">{t("whyP1")}</p>
          <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-10">{t("whyP2")}</p>

          <h2 className="font-bold text-2xl xl:text-[32px] text-[#1f3664] leading-[1.2] mb-4">
            {t("checksTitle")}
          </h2>
          <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-4">{t("checksIntro")}</p>
          <ul className="space-y-4 mb-6">
            {checks.map((item) => (
              <li key={item.title} className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed">
                <span className="font-bold">{item.title}. </span>
                {item.body}
              </li>
            ))}
          </ul>
          <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-10">{t("checksClose")}</p>

          <h2 className="font-bold text-2xl xl:text-[32px] text-[#1f3664] leading-[1.2] mb-6">
            {t("principlesTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-4 mb-10">
            {principles.map((item) => (
              <div key={item.title} className="border-2 border-[#d5e0f9] rounded-[20px] p-5 xl:p-6">
                <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[18px] mb-2">{item.title}</h3>
                <p className="text-[#1f3664] text-sm xl:text-[15px] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 className="font-bold text-2xl xl:text-[32px] text-[#1f3664] leading-[1.2] mb-4">
            {t("scopeTitle")}
          </h2>
          <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-8">{t("scopeBody")}</p>

          <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-6">{t("cta")}</p>
          <Link
            href="/#claim"
            className="inline-flex bg-[#2669f3] text-white font-bold text-base px-6 h-11 items-center rounded-[11px] hover:bg-[#1a55d4] transition-colors"
            {...gtmClaimCta("about")}
          >
            {t("ctaButton")}
          </Link>

          <p className="mt-12 text-[#1f3664] leading-snug">
            <span className="block font-bold text-lg">{t("name")}</span>
            <span className="block text-[#2669f3] font-bold">{t("role")}</span>
          </p>
        </div>
      </article>

      <div className="mt-8 lg:mt-10 xl:mt-[89px] pb-12 lg:pb-14 xl:pb-20">
        <CTABanner />
      </div>
      <Footer />
    </div>
  );
}
