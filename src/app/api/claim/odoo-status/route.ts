import { z } from "zod";
import {
  getClaim,
  getClaimByOdooTicketId,
  updateClaimStatus,
} from "@/lib/claim-store";
import { isValidTrackingNumber, normalizeTrackingNumber } from "@/lib/claim-tracking";
import { mapOdooHelpdeskStageToClaimStatus } from "@/lib/odoo-stage-map";
import { sendClaimStatusEmail } from "@/lib/send-claim-email";

const payloadSchema = z
  .object({
    odooTicketId: z.number().int().positive().optional(),
    trackingNumber: z.string().trim().min(1).optional(),
    stageName: z.string().trim().min(1),
    stageId: z.number().int().positive().optional(),
  })
  .refine((value) => Boolean(value.odooTicketId || value.trackingNumber), {
    message: "odooTicketId or trackingNumber is required",
  });

function getWebhookSecret(): string | null {
  return process.env.ODOO_WEBHOOK_SECRET?.trim() || null;
}

function getSiteUrl(request: Request): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    request.headers.get("origin") ??
    "https://compensall.com"
  );
}

function isAuthorized(request: Request): boolean {
  const expected = getWebhookSecret();
  if (!expected) {
    return false;
  }

  const provided = request.headers.get("x-odoo-webhook-secret");
  return Boolean(provided && provided === expected);
}

export async function POST(request: Request) {
  if (!getWebhookSecret()) {
    console.error("ODOO_WEBHOOK_SECRET is not configured.");
    return Response.json({ error: "Webhook is not configured." }, { status: 503 });
  }

  if (!isAuthorized(request)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid payload.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const mappedStatus = mapOdooHelpdeskStageToClaimStatus(parsed.data.stageName);
  if (!mappedStatus) {
    return Response.json(
      {
        error: "Unmapped Odoo stage.",
        stageName: parsed.data.stageName,
      },
      { status: 422 },
    );
  }

  let claim = null;
  if (parsed.data.odooTicketId) {
    claim = await getClaimByOdooTicketId(parsed.data.odooTicketId);
  }

  if (!claim && parsed.data.trackingNumber) {
    const trackingNumber = normalizeTrackingNumber(parsed.data.trackingNumber);
    if (!isValidTrackingNumber(trackingNumber)) {
      return Response.json({ error: "Invalid tracking number format." }, { status: 400 });
    }
    claim = await getClaim(trackingNumber);
  }

  if (!claim) {
    return Response.json({ error: "Claim not found." }, { status: 404 });
  }

  const result = await updateClaimStatus(claim.trackingNumber, mappedStatus);
  if (!result) {
    return Response.json({ error: "Could not update claim status." }, { status: 500 });
  }

  let emailSent = false;
  if (result.changed) {
    emailSent = await sendClaimStatusEmail({
      trackingNumber: result.claim.trackingNumber,
      signedName: result.claim.signedName,
      contactEmail: result.claim.contactEmail,
      flight: result.claim.flight,
      status: result.claim.status,
      siteUrl: getSiteUrl(request),
      locale: result.claim.locale,
    });
  }

  return Response.json({
    ok: true,
    trackingNumber: result.claim.trackingNumber,
    previousStatus: claim.status,
    status: result.claim.status,
    stageName: parsed.data.stageName,
    changed: result.changed,
    emailSent,
  });
}
