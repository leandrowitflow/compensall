import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  normalizeFlightData,
  type ClaimEntryMode,
  type ClaimFlightData,
  type ClaimPassenger,
} from "@/lib/claim-types";
import { CLAIM_RESUME_QUERY, isClaimResumeToken } from "@/lib/claim-draft-token";
import { supabaseRestUrl } from "@/lib/supabase-rest";

export { CLAIM_RESUME_QUERY, isClaimResumeToken };
export const CLAIM_DRAFT_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export type ClaimDraft = {
  token: string;
  formSessionId: string;
  odooLeadId: number | null;
  entryMode: ClaimEntryMode;
  flight: ClaimFlightData;
  signedName: string;
  contactEmail: string;
  contactPhone: string;
  additionalPassengers: ClaimPassenger[];
  locale: string | null;
  resumeEmailSentAt: string | null;
  consumedByTrackingNumber: string | null;
  consumedAt: string | null;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};

export type ClaimDraftInput = {
  formSessionId: string;
  odooLeadId?: number | null;
  entryMode: ClaimEntryMode;
  flight: ClaimFlightData;
  signedName: string;
  contactEmail: string;
  contactPhone: string;
  additionalPassengers?: ClaimPassenger[];
  locale?: string | null;
};

const LOCAL_DRAFTS_DIR = path.join(process.cwd(), "data", "claim-drafts");

function hasSupabaseConfig(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function createToken(): string {
  return randomBytes(32).toString("hex");
}

function normalizePassengers(value: unknown): ClaimPassenger[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 9)
    .map((passenger) => {
      if (!passenger || typeof passenger !== "object") return null;
      const record = passenger as Partial<ClaimPassenger>;
      const firstName = typeof record.firstName === "string" ? record.firstName.trim() : "";
      const lastName = typeof record.lastName === "string" ? record.lastName.trim() : "";
      if (!firstName && !lastName) return null;
      return {
        firstName,
        lastName,
        email: typeof record.email === "string" ? record.email.trim() : "",
        phone: typeof record.phone === "string" ? record.phone.trim() : "",
      };
    })
    .filter((passenger): passenger is ClaimPassenger => passenger !== null);
}

function draftFilePath(token: string): string {
  return path.join(LOCAL_DRAFTS_DIR, `${token}.json`);
}

function rowToDraft(row: {
  token: string;
  form_session_id: string;
  odoo_lead_id?: number | null;
  entry_mode: ClaimEntryMode;
  flight: ClaimFlightData;
  signed_name: string;
  contact_email: string;
  contact_phone?: string | null;
  additional_passengers?: ClaimPassenger[] | null;
  locale?: string | null;
  resume_email_sent_at?: string | null;
  consumed_by_tracking_number?: string | null;
  consumed_at?: string | null;
  expires_at: string;
  created_at: string;
  updated_at?: string | null;
}): ClaimDraft {
  return {
    token: row.token,
    formSessionId: row.form_session_id,
    odooLeadId: row.odoo_lead_id ?? null,
    entryMode: row.entry_mode === "upload" ? "upload" : "manual",
    flight: normalizeFlightData(row.flight),
    signedName: row.signed_name,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone ?? "",
    additionalPassengers: normalizePassengers(row.additional_passengers),
    locale: row.locale ?? null,
    resumeEmailSentAt: row.resume_email_sent_at ?? null,
    consumedByTrackingNumber: row.consumed_by_tracking_number ?? null,
    consumedAt: row.consumed_at ?? null,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at ?? row.created_at,
  };
}

function draftToRow(draft: ClaimDraft): Record<string, unknown> {
  return {
    token: draft.token,
    form_session_id: draft.formSessionId,
    odoo_lead_id: draft.odooLeadId,
    entry_mode: draft.entryMode,
    flight: draft.flight,
    signed_name: draft.signedName,
    contact_email: draft.contactEmail,
    contact_phone: draft.contactPhone || null,
    additional_passengers: draft.additionalPassengers,
    locale: draft.locale,
    resume_email_sent_at: draft.resumeEmailSentAt,
    consumed_by_tracking_number: draft.consumedByTrackingNumber,
    consumed_at: draft.consumedAt,
    expires_at: draft.expiresAt,
    created_at: draft.createdAt,
    updated_at: draft.updatedAt,
  };
}

export function isClaimDraftActive(draft: ClaimDraft, now = Date.now()): boolean {
  if (draft.consumedAt || draft.consumedByTrackingNumber) {
    return false;
  }
  return new Date(draft.expiresAt).getTime() > now;
}

export function buildClaimResumeUrl(siteUrl: string, token: string, locale?: string | null): string {
  const base = siteUrl.replace(/\/$/, "");
  const localeSegment = locale && /^[a-z]{2}$/i.test(locale) ? locale.toLowerCase() : "en";
  return `${base}/${localeSegment}?${CLAIM_RESUME_QUERY}=${encodeURIComponent(token)}#claim`;
}

async function saveDraftLocally(draft: ClaimDraft): Promise<void> {
  await mkdir(LOCAL_DRAFTS_DIR, { recursive: true });
  await writeFile(draftFilePath(draft.token), JSON.stringify(draft, null, 2), "utf8");
}

async function getDraftLocally(token: string): Promise<ClaimDraft | null> {
  try {
    const raw = await readFile(draftFilePath(token), "utf8");
    const parsed = JSON.parse(raw) as ClaimDraft;
    return {
      ...parsed,
      flight: normalizeFlightData(parsed.flight),
      additionalPassengers: normalizePassengers(parsed.additionalPassengers),
    };
  } catch {
    return null;
  }
}

async function findDraftBySessionLocally(formSessionId: string): Promise<ClaimDraft | null> {
  try {
    const { readdir } = await import("node:fs/promises");
    const files = await readdir(LOCAL_DRAFTS_DIR);
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const raw = await readFile(path.join(LOCAL_DRAFTS_DIR, file), "utf8");
      const draft = JSON.parse(raw) as ClaimDraft;
      if (draft.formSessionId === formSessionId) {
        return draft;
      }
    }
  } catch {
    return null;
  }
  return null;
}

async function supabaseHeaders(): Promise<Record<string, string>> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

async function getDraftSupabaseByQuery(query: string): Promise<ClaimDraft | null> {
  const response = await fetch(`${supabaseRestUrl("claim_drafts")}?${query}&select=*&limit=1`, {
    headers: await supabaseHeaders(),
  });
  if (!response.ok) return null;
  const rows = (await response.json()) as Array<Parameters<typeof rowToDraft>[0]>;
  return rows[0] ? rowToDraft(rows[0]) : null;
}

async function writeDraftSupabase(draft: ClaimDraft): Promise<ClaimDraft> {
  const response = await fetch(`${supabaseRestUrl("claim_drafts")}?on_conflict=token`, {
    method: "POST",
    headers: {
      ...(await supabaseHeaders()),
      Prefer: "return=representation,resolution=merge-duplicates",
    },
    body: JSON.stringify(draftToRow(draft)),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase claim draft upsert failed: ${response.status} ${body}`);
  }

  const rows = (await response.json()) as Array<Parameters<typeof rowToDraft>[0]>;
  return rows[0] ? rowToDraft(rows[0]) : draft;
}

export async function getClaimDraftByToken(token: string): Promise<ClaimDraft | null> {
  if (!isClaimResumeToken(token)) {
    return null;
  }

  if (hasSupabaseConfig()) {
    return getDraftSupabaseByQuery(`token=eq.${encodeURIComponent(token)}`);
  }

  if (process.env.NODE_ENV === "development") {
    return getDraftLocally(token);
  }

  return null;
}

export async function getClaimDraftBySessionId(formSessionId: string): Promise<ClaimDraft | null> {
  if (!formSessionId.trim()) {
    return null;
  }

  if (hasSupabaseConfig()) {
    return getDraftSupabaseByQuery(`form_session_id=eq.${encodeURIComponent(formSessionId)}`);
  }

  if (process.env.NODE_ENV === "development") {
    return findDraftBySessionLocally(formSessionId);
  }

  return null;
}

export async function saveClaimDraft(input: ClaimDraftInput): Promise<ClaimDraft> {
  const now = new Date();
  const existing = await getClaimDraftBySessionId(input.formSessionId);
  const draft: ClaimDraft = {
    token: existing?.token ?? createToken(),
    formSessionId: input.formSessionId,
    odooLeadId: input.odooLeadId ?? existing?.odooLeadId ?? null,
    entryMode: input.entryMode,
    flight: normalizeFlightData(input.flight),
    signedName: input.signedName.trim(),
    contactEmail: input.contactEmail.trim(),
    contactPhone: input.contactPhone.trim(),
    additionalPassengers: normalizePassengers(input.additionalPassengers),
    locale: input.locale ?? existing?.locale ?? null,
    resumeEmailSentAt: existing?.resumeEmailSentAt ?? null,
    consumedByTrackingNumber: null,
    consumedAt: null,
    expiresAt: new Date(now.getTime() + CLAIM_DRAFT_TTL_MS).toISOString(),
    createdAt: existing?.createdAt ?? now.toISOString(),
    updatedAt: now.toISOString(),
  };

  if (hasSupabaseConfig()) {
    return writeDraftSupabase(draft);
  }

  if (process.env.NODE_ENV === "development") {
    await saveDraftLocally(draft);
    return draft;
  }

  throw new Error("Claim draft storage is not configured.");
}

export async function markClaimDraftEmailSent(token: string, sentAt = new Date().toISOString()): Promise<void> {
  const existing = await getClaimDraftByToken(token);
  if (!existing) return;

  const next = { ...existing, resumeEmailSentAt: sentAt, updatedAt: sentAt };
  if (hasSupabaseConfig()) {
    await writeDraftSupabase(next);
    return;
  }
  if (process.env.NODE_ENV === "development") {
    await saveDraftLocally(next);
  }
}

export async function consumeClaimDraftBySessionId(
  formSessionId: string,
  trackingNumber: string,
): Promise<void> {
  const draft = await getClaimDraftBySessionId(formSessionId);
  if (!draft) return;
  await consumeClaimDraft(draft.token, trackingNumber);
}

export async function consumeClaimDraft(
  token: string,
  trackingNumber: string,
  consumedAt = new Date().toISOString(),
): Promise<void> {
  if (!isClaimResumeToken(token)) {
    return;
  }

  const existing = await getClaimDraftByToken(token);
  if (!existing) return;

  const next: ClaimDraft = {
    ...existing,
    consumedByTrackingNumber: trackingNumber,
    consumedAt,
    updatedAt: consumedAt,
  };

  if (hasSupabaseConfig()) {
    await writeDraftSupabase(next);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    await saveDraftLocally(next);
  }
}

export function toPublicClaimDraft(draft: ClaimDraft) {
  return {
    token: draft.token,
    formSessionId: draft.formSessionId,
    odooLeadId: draft.odooLeadId,
    entryMode: draft.entryMode,
    flight: draft.flight,
    signedName: draft.signedName,
    contactEmail: draft.contactEmail,
    contactPhone: draft.contactPhone,
    additionalPassengers: draft.additionalPassengers,
    locale: draft.locale,
  };
}
