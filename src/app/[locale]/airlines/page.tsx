import type { Metadata } from "next";
import TrustpilotBadge from "@/components/TrustpilotBadge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import AirlinesCatalog from "@/components/AirlinesCatalog";
import HeroBackgroundImage from "@/components/HeroBackgroundImage";
import JsonLd from "@/components/seo/JsonLd";
import type { AppLocale } from "@/i18n/routing";
import { DEFAULT_FAQS } from "@/lib/default-faqs";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";
import { buildFaqPageSchema } from "@/lib/structured-data";

type AirlinesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AirlinesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/airlines", "airlines");
}

export default function AirlinesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <JsonLd data={buildFaqPageSchema(DEFAULT_FAQS)} />
      <Header />

      <section className="px-4 md:px-8 lg:px-8 xl:px-12 pt-0 pb-0">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
              <HeroBackgroundImage variant="airlines" priority />
            </div>

            <div className="relative px-4 sm:px-6 pt-10 lg:pt-10 xl:pt-12 pb-10 lg:pb-12 xl:pb-14 text-center">
              <div className="flex justify-center mb-5">
                <TrustpilotBadge priority />
              </div>

              <h1 className="font-bold text-4xl md:text-5xl lg:text-[34px] xl:text-[57px] text-white leading-[1.2] mb-4 max-w-[1010px] mx-auto">
                Airports &amp; Airlines
              </h1>
              <p className="text-white font-bold text-base lg:text-[17px] xl:text-[19px] leading-relaxed max-w-[642px] mx-auto">
                Find your airline or airport.
                <br />
                Check your claim in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AirlinesCatalog />

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
