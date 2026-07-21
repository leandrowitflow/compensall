import { z } from "zod";
import { normalizeFlightData } from "@/lib/claim-types";
import { isOdooConfigured } from "@/lib/odoo-client";
import { safeSyncPartialClaimToOdoo } from "@/lib/odoo-crm-lead";

const flightSchema = z.object({
  passenger: z.string(),
  flight: z.string(),
  routeFrom: z.string(),
  routeTo: z.string(),
  date: z.string(),
  status: z.enum(["Delayed", "Cancelled", "Denied boarding", "Unknown"]),
  delay: z.string(),
});

const bodySchema = z.object({
  formSessionId: z.string().min(1),
  signedName: z.string().min(1),
  contactEmail: z.string().trim().email(),
  entryMode: z.enum(["upload", "manual"]),
  flight: flightSchema,
  locale: z.string().length(2).optional().nullable(),
  odooLeadId: z.number().int().positive().optional().nullable(),
  step: z.string().min(1).optional(),
});

function getSiteUrl(request: Request): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "https://compensall.com"
  );
}

export async function POST(request: Request) {
  if (!isOdooConfigured()) {
    return Response.json({ error: "Odoo is not configured." }, { status: 503 });
  }

  try {
    const raw = (await request.json()) as unknown;
    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) {
      return Response.json({ error: "Invalid partial claim payload." }, { status: 400 });
    }

    const siteUrl = getSiteUrl(request);
    const locale = parsed.data.locale?.toLowerCase() ?? null;
    const landingPage = locale ? `/${locale}/#claim` : "/#claim";

    const lead = await safeSyncPartialClaimToOdoo({
      formSessionId: parsed.data.formSessionId,
      signedName: parsed.data.signedName,
      contactEmail: parsed.data.contactEmail,
      entryMode: parsed.data.entryMode,
      flight: normalizeFlightData(parsed.data.flight),
      siteUrl,
      locale,
      landingPage,
      odooLeadId: parsed.data.odooLeadId ?? null,
      step: parsed.data.step ?? "contact_confirmed",
    });

    if (!lead) {
      return Response.json({ error: "Could not sync partial claim to Odoo." }, { status: 502 });
    }

    return Response.json({
      odooLeadId: lead.id,
      odooLeadName: lead.name,
      stageName: lead.stageName,
    });
  } catch (error) {
    console.error("Partial Odoo lead sync failed:", error);
    return Response.json({ error: "Could not sync partial claim to Odoo." }, { status: 500 });
  }
}
