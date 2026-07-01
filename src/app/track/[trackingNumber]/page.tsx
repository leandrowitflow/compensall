import TrackClaimPage from "@/components/TrackClaimPage";
import { normalizeTrackingNumber } from "@/lib/claim-tracking";

type PageProps = {
  params: Promise<{ trackingNumber: string }>;
};

export default async function Page({ params }: PageProps) {
  const { trackingNumber } = await params;
  return <TrackClaimPage trackingNumber={normalizeTrackingNumber(trackingNumber)} />;
}
