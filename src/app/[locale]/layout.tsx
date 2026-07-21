import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import DeferredAnchorScroll from "@/components/DeferredAnchorScroll";
import DeferredCookieBanner from "@/components/DeferredCookieBanner";
import JsonLd from "@/components/seo/JsonLd";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/structured-data";
import { openSans } from "@/lib/site-fonts-next";
import { getSiteMetadata, HTML_LANG_MAP } from "@/lib/site-metadata";
import "../globals.css";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale: appLocale, namespace: "metadata.site" });

  return getSiteMetadata(appLocale, {
    title: t("title"),
    description: t("description"),
  });
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={HTML_LANG_MAP[locale as AppLocale]} className={openSans.variable} suppressHydrationWarning>
      <body className={openSans.className} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={[buildOrganizationSchema(), buildWebSiteSchema()]} />
          <div className="site-viewport min-w-0 overflow-x-clip">
            <DeferredAnchorScroll />
            <DeferredCookieBanner />
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
