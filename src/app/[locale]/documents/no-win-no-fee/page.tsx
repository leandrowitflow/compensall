import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalDocumentContent from "@/components/legal/LegalDocumentContent";
import LegalPageShell from "@/components/legal/LegalPageShell";
import type { AppLocale } from "@/i18n/routing";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";

type NoWinNoFeePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: NoWinNoFeePageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/documents/no-win-no-fee", "noWinNoFee", {
    noIndex: true,
  });
}

export default async function NoWinNoFeePage({ params }: NoWinNoFeePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("noWinNoFeePage");

  return (
    <LegalPageShell title={t("pageTitle")} breadcrumbLabel={t("breadcrumb")} summary={t("summary")}>
      <LegalDocumentContent document="no-win-no-fee" locale={locale as AppLocale} />
    </LegalPageShell>
  );
}
