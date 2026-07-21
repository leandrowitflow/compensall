import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TrackClaimPage from "@/components/TrackClaimPage";
import type { AppLocale } from "@/i18n/routing";
import { normalizeTrackingNumber } from "@/lib/claim-tracking";
import { buildPageMetadata } from "@/lib/site-metadata";

type TrackPageProps = {
  params: Promise<{ locale: string; trackingNumber: string }>;
};

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    title: t("track.title"),
    description: t("track.description"),
    path: "/track",
    locale: locale as AppLocale,
    noIndex: true,
  });
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { trackingNumber } = await params;
  return <TrackClaimPage trackingNumber={normalizeTrackingNumber(trackingNumber)} />;
}
