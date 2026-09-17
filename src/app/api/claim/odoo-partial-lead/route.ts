import { after } from "next/server";
import { z } from "zod";
import { parseClaimAttribution } from "@/lib/claim-attribution";
import { buildClaimResumeUrl, buildOdooClaimResumeUrl, saveClaimDraft } from "@/lib/claim-drafts";
import { sendPendingResumeClaimEmails } from "@/lib/claim-resume-email";
import { normalizeFlightData } from "@/lib/claim-types";
import { isOdooConfigured } from "@/lib/odoo-client";
import { safeSyncPartialClaimToOdoo } from "@/lib/odoo-crm-lead";
import { isBlankOrValidClaimPhone, toE164Phone } from "@/lib/phone";

const flightSchema = z.object({
  passenger: z.string(),
  flight: z.string(),
  routeFrom: z.string(),
  routeTo: z.string(),
  date: z.string(),
  status: z.enum(["Delayed", "Cancelled", "Denied boarding", "Unknown"]),
  delay: z.string(),
  delayDuration: z.enum(["more_than_3", "less_than_3", ""]).optional(),
  hadConnectingFlight: z.boolean().nullable().optional(),
  connectingFlights: z
    .array(
      z.object({
        airport: z.string(),
        flightNumber: z.string(),
      }),
    )
    .max(2)
    .optional(),
  cancellationNotice: z.enum(["14 days or more", "Less than 14 days", ""]).optional(),
  disruptionReason: z
    .enum(["technical", "weather", "strike", "crew", "airport", "other", ""])
    .optional(),
  bookingReference: z.string().nullable().optional(),
});

const passengerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional().default(""),
  phone: z.string().optional().default(""),
});

const bodySchema = z.object({
  formSessionId: z.string().min(1),
  signedName: z.string().min(1),
  contactEmail: z.string().trim().email(),
  contactPhone: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine((value) => isBlankOrValidClaimPhone(value), "Invalid phone"),
  entryMode: z.enum(["upload", "manual"]),
  flight: flightSchema,
  additionalPassengers: z.array(passengerSchema).max(9).optional(),
  locale: z.string().length(2).optional().nullable(),
  attribution: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
    })
    .optional()
    .nullable(),
  odooLeadId: z.number().int().positive().optional().nullable(),
  step: z.string().min(1).optional(),
});

function getSiteUrl(request: Request): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "https://www.compensall.com"
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
    const flight = normalizeFlightData(parsed.data.flight);
    const additionalPassengers = (parsed.data.additionalPassengers ?? []).map((passenger) => ({
      ...passenger,
      phone: passenger.phone.trim() ? toE164Phone(passenger.phone) : "",
    }));

    const draft = await saveClaimDraft({
      formSessionId: parsed.data.formSessionId,
      odooLeadId: parsed.data.odooLeadId ?? null,
      entryMode: parsed.data.entryMode,
      flight,
      signedName: parsed.data.signedName,
      contactEmail: parsed.data.contactEmail,
      contactPhone: toE164Phone(parsed.data.contactPhone),
      additionalPassengers,
      locale,
    });
    const resumeUrl = buildClaimResumeUrl(siteUrl, draft.token, locale);
    const odooWebsiteUrl = buildOdooClaimResumeUrl(siteUrl, draft.token, locale);

    const lead = await safeSyncPartialClaimToOdoo({
      formSessionId: parsed.data.formSessionId,
      signedName: parsed.data.signedName,
      contactEmail: parsed.data.contactEmail,
      contactPhone: toE164Phone(parsed.data.contactPhone),
      entryMode: parsed.data.entryMode,
      flight,
      additionalPassengers,
      siteUrl,
      locale,
      landingPage,
      resumeUrl,
      odooWebsiteUrl,
      attribution: parseClaimAttribution(parsed.data.attribution),
      odooLeadId: parsed.data.odooLeadId ?? draft.odooLeadId ?? null,
      step: parsed.data.step ?? "contact_confirmed",
    });

    if (lead) {
      await saveClaimDraft({
        formSessionId: parsed.data.formSessionId,
        odooLeadId: lead.id,
        entryMode: parsed.data.entryMode,
        flight,
        signedName: parsed.data.signedName,
        contactEmail: parsed.data.contactEmail,
        contactPhone: toE164Phone(parsed.data.contactPhone),
        additionalPassengers,
        locale,
      });
    }

    if (!lead) {
      return Response.json({ error: "Could not sync partial claim to Odoo." }, { status: 502 });
    }

    after(() => sendPendingResumeClaimEmails(siteUrl));

    return Response.json({
      odooLeadId: lead.id,
      odooLeadName: lead.name,
      stageName: lead.stageName,
      resumeUrl,
    });
  } catch (error) {
    console.error("Partial Odoo lead sync failed:", error);
    return Response.json({ error: "Could not sync partial claim to Odoo." }, { status: 500 });
  }
}
