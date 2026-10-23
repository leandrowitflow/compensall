import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToClaimLink from "@/components/claim/BackToClaimLink";
import PowerOfAttorneyDocument from "@/components/claim/PowerOfAttorneyDocument";
import { Link } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";
import { formatPoaDate } from "@/lib/poa-content";

type AuthorityToActPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    name?: string | string[];
    flight?: string | string[];
    from?: string | string[];
    to?: string | string[];
    flightDate?: string | string[];
    signed?: string | string[];
  }>;
};

function clipQuery(value: string | string[] | undefined, max = 160): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? "").replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}

export async function generateMetadata({ params }: AuthorityToActPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/documents/authority-to-act", "authorityToAct", {
    noIndex: true,
  });
}

export default async function AuthorityToActPage({ params, searchParams }: AuthorityToActPageProps) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("documentPage");
  const flightDate = clipQuery(query.flightDate);

  return (
    <div className="min-h-screen bg-[#f8faff] flex flex-col">
      <Header />

      <div className="max-w-[900px] mx-auto px-6 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-[#2669f3] transition-colors">
            {t("home")}
          </Link>
          <span>/</span>
          <BackToClaimLink location="docs_breadcrumb" className="hover:text-[#2669f3] transition-colors">
            {t("claim")}
          </BackToClaimLink>
          <span>/</span>
          <span className="text-[#1f3664] font-medium">{t("powerOfAttorney")}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-[#d5e0f9] overflow-hidden shadow-sm">
          <div className="px-8 py-10 text-[#1f3664]">
            <PowerOfAttorneyDocument
              locale={locale as AppLocale}
              name={clipQuery(query.name)}
              flight={clipQuery(query.flight, 40)}
              routeFrom={clipQuery(query.from)}
              routeTo={clipQuery(query.to)}
              flightDate={flightDate ? formatPoaDate(flightDate, locale) : ""}
              signingDate={clipQuery(query.signed, 40)}
            />

            <div className="mt-8 pt-6 border-t border-[#d5e0f9] flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <p className="text-xs text-[#1f3664]/50">{t("copyright")}</p>
              <BackToClaimLink
                location="docs"
                className="bg-[#2669f3] text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-[#1a55d4] transition-colors whitespace-nowrap"
              >
                {t("backToClaim")}
              </BackToClaimLink>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
