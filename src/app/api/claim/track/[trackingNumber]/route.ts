import { getClaim } from "@/lib/claim-store";
import { isValidTrackingNumber, normalizeTrackingNumber } from "@/lib/claim-tracking";
import { estimateCompensationForFlight } from "@/lib/compensation-estimate";

type RouteContext = {
  params: Promise<{ trackingNumber: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { trackingNumber: rawTrackingNumber } = await context.params;
  const trackingNumber = normalizeTrackingNumber(rawTrackingNumber);

  if (!isValidTrackingNumber(trackingNumber)) {
    return Response.json({ error: "Invalid tracking number format." }, { status: 400 });
  }

  const claim = await getClaim(trackingNumber);
  if (!claim) {
    return Response.json({ error: "Claim not found." }, { status: 404 });
  }

  const compensationEstimate = estimateCompensationForFlight(claim.flight);

  return Response.json({
    trackingNumber: claim.trackingNumber,
    status: claim.status,
    flight: {
      flight: claim.flight.flight,
      routeFrom: claim.flight.routeFrom,
      routeTo: claim.flight.routeTo,
      date: claim.flight.date,
      status: claim.flight.status,
    },
    compensationEstimate,
    signedName: claim.signedName,
    verificationResult: claim.verification.result,
    createdAt: claim.createdAt,
  });
}
