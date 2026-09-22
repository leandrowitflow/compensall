import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DocumentPageHeader from "@/components/legal/DocumentPageHeader";
import { PrivacyDataConsentContent } from "@/components/claim/legal-document-content";
import { Link } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import { gtmClaimCta } from "@/lib/gtm";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";

type PrivacyDataConsentPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyDataConsentPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/documents/privacy-data-consent", "privacyDataConsent", {
    noIndex: true,
  });
}

export default async function PrivacyDataConsentPage({ params }: PrivacyDataConsentPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("documentPage");

  return (
    <div className="min-h-screen bg-[#f8faff] flex flex-col">
      <Header />

      <div className="max-w-[900px] mx-auto px-6 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-[#2669f3] transition-colors">
            {t("home")}
          </Link>
          <span>/</span>
          <Link href="/#claim" className="hover:text-[#2669f3] transition-colors" {...gtmClaimCta("docs_breadcrumb")}>
            {t("claim")}
          </Link>
          <span>/</span>
          <span className="text-[#1f3664] font-medium">{t("privacyDataConsent")}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-[#d5e0f9] overflow-hidden shadow-sm">
          <DocumentPageHeader title={t("privacyDataConsent")} />

          <div className="px-8 py-8 text-[#1f3664]">
            <PrivacyDataConsentContent locale={locale as AppLocale} />

            <div className="mt-8 pt-6 border-t border-[#d5e0f9] flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <p className="text-xs text-[#1f3664]/50">{t("copyright")}</p>
              <Link
                href="/#claim"
                className="bg-[#2669f3] text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-[#1a55d4] transition-colors whitespace-nowrap"
                {...gtmClaimCta("docs")}
              >
                {t("backToClaim")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
