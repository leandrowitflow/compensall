import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site-metadata";
import TrackClaimPage from "@/components/TrackClaimPage";
import { normalizeTrackingNumber } from "@/lib/claim-tracking";

type TrackPageProps = {
  params: Promise<{ trackingNumber: string }>;
};

export const metadata: Metadata = buildPageMetadata({
  title: "Track your claim",
  description: "Check the status of your Compensall flight compensation claim using your tracking reference.",
  path: "/track",
  noIndex: true,
});

export default async function TrackPage({ params }: TrackPageProps) {
  const { trackingNumber } = await params;
  return <TrackClaimPage trackingNumber={normalizeTrackingNumber(trackingNumber)} />;
}
