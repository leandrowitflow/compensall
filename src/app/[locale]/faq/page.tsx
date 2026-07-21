import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/seo/JsonLd";
import type { AppLocale } from "@/i18n/routing";
import { ALL_FAQS } from "@/lib/default-faqs";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";
import { buildFaqPageSchema } from "@/lib/structured-data";

type FaqPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/faq", "faq");
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={buildFaqPageSchema(ALL_FAQS)} />
      <Header />

      <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-10 pb-4 text-center">
        <h1 className="font-bold text-3xl md:text-4xl xl:text-[48px] text-[#1f3664] mb-4 leading-[1.2]">
          {t("pageTitle")}{" "}
          <span className="text-[#2669f3]">{t("pageTitleAccent")}</span>
        </h1>
        <p className="text-[#1f3664] text-base max-w-[640px] mx-auto leading-relaxed">{t("pageIntro")}</p>
      </div>

      <FAQSection faqs={ALL_FAQS} includeUkFaqs />
      <Footer />
    </div>
  );
}
