import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ClaimThankYouPage from "@/components/claim/ClaimThankYouPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { AppLocale } from "@/i18n/routing";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";

type ThankYouPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    ref?: string | string[];
    mode?: string | string[];
    flight?: string | string[];
  }>;
};

function firstQueryValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }
  return value?.trim() ?? "";
}

export async function generateMetadata({ params }: ThankYouPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/claim/thank-you", "thankYou", {
    noIndex: true,
  });
}

export default async function ThankYouRoutePage({ params, searchParams }: ThankYouPageProps) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const trackingNumber = firstQueryValue(query.ref);
  const mode = firstQueryValue(query.mode);
  const flightNumber = firstQueryValue(query.flight);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <ClaimThankYouPage
        trackingNumber={trackingNumber}
        entryMode={mode === "manual" ? "manual" : "upload"}
        flightNumber={flightNumber}
      />
      <Footer />
    </div>
  );
}
