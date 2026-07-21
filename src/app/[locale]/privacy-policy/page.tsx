import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import LegalDocumentContent from "@/components/legal/LegalDocumentContent";

import LegalPageShell from "@/components/legal/LegalPageShell";

import type { AppLocale } from "@/i18n/routing";

import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";



type PrivacyPolicyPageProps = {

  params: Promise<{ locale: string }>;

};



export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {

  const { locale } = await params;

  return buildLocalizedPageMetadata(locale as AppLocale, "/privacy-policy", "privacyPolicy");

}



export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {

  const { locale } = await params;

  setRequestLocale(locale);



  const t = await getTranslations("privacyPolicy");



  return (

    <LegalPageShell title={t("pageTitle")} breadcrumbLabel={t("breadcrumb")} summary={t("summary")}>

      <LegalDocumentContent document="privacy-policy" locale={locale as AppLocale} />

    </LegalPageShell>

  );

}


