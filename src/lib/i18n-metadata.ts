import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/site-metadata";

export type LocalizedMetadataKey =
  | "home"
  | "faq"
  | "about"
  | "knowYourRights"
  | "prices"
  | "blog"
  | "cookies"
  | "privacyPolicy"
  | "terms"
  | "airlines"
  | "authorityToAct"
  | "noWinNoFee"
  | "privacyDataConsent";

type BuildLocalizedPageMetadataOptions = {
  noIndex?: boolean;
};

export async function buildLocalizedPageMetadata(
  locale: AppLocale,
  path: string,
  pageKey: LocalizedMetadataKey,
  options: BuildLocalizedPageMetadataOptions = {},
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    title: t(`${pageKey}.title`),
    description: t(`${pageKey}.description`),
    path,
    locale,
    noIndex: options.noIndex,
  });
}
