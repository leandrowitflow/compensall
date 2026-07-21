import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import LegalDocumentContent from "@/components/legal/LegalDocumentContent";

import LegalPageShell from "@/components/legal/LegalPageShell";

import type { AppLocale } from "@/i18n/routing";

import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";



type TermsPageProps = {

  params: Promise<{ locale: string }>;

};



export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {

  const { locale } = await params;

  return buildLocalizedPageMetadata(locale as AppLocale, "/terms", "terms");

}



export default async function TermsPage({ params }: TermsPageProps) {

  const { locale } = await params;

  setRequestLocale(locale);



  const t = await getTranslations("terms");



  return (

    <LegalPageShell title={t("pageTitle")} breadcrumbLabel={t("breadcrumb")} summary={t("summary")}>

      <LegalDocumentContent document="terms" locale={locale as AppLocale} />

    </LegalPageShell>

  );

}


