import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import LegalDocumentContent from "@/components/legal/LegalDocumentContent";

import LegalPageShell from "@/components/legal/LegalPageShell";

import type { AppLocale } from "@/i18n/routing";

import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";



type CookiesPageProps = {

  params: Promise<{ locale: string }>;

};



export async function generateMetadata({ params }: CookiesPageProps): Promise<Metadata> {

  const { locale } = await params;

  return buildLocalizedPageMetadata(locale as AppLocale, "/cookies", "cookies");

}



export default async function CookiesPage({ params }: CookiesPageProps) {

  const { locale } = await params;

  setRequestLocale(locale);



  const t = await getTranslations("cookies");



  return (

    <LegalPageShell title={t("pageTitle")} breadcrumbLabel={t("breadcrumb")} summary={t("summary")}>

      <LegalDocumentContent document="cookies" locale={locale as AppLocale} />

    </LegalPageShell>

  );

}


