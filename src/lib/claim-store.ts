import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ClaimRecord, ClaimStatus } from "@/lib/claim-types";
import { normalizeTrackingNumber } from "@/lib/claim-tracking";
import { supabaseRestUrl } from "@/lib/supabase-rest";

const LOCAL_CLAIMS_DIR = path.join(process.cwd(), "data", "claims");

type ClaimsRow = {
  tracking_number: string;
  status: ClaimRecord["status"];
  entry_mode: ClaimRecord["entryMode"];
  flight: ClaimRecord["flight"];
  signed_name: string;
  contact_email: string;
  accepted_documents: string[];
  document_signatures: ClaimRecord["documentSignatures"];
  audit_trail: ClaimRecord["auditTrail"];
  verification: ClaimRecord["verification"];
  created_at: string;
  updated_at?: string | null;
  status_updated_at?: string | null;
  odoo_lead_id?: number | null;
  odoo_ticket_id?: number | null;
  locale?: string | null;
};

function hasSupabaseConfig(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function rowToClaim(row: ClaimsRow): ClaimRecord {
  return {
    trackingNumber: row.tracking_number,
    status: row.status,
    entryMode: row.entry_mode,
    flight: row.flight,
    signedName: row.signed_name,
    contactEmail: row.contact_email,
    acceptedDocuments: row.accepted_documents,
    documentSignatures: row.document_signatures ?? [],
    auditTrail: row.audit_trail ?? { ipAddress: null, userAgent: null },
    verification: row.verification,
    createdAt: row.created_at,
    updatedAt: row.updated_at ?? null,
    statusUpdatedAt: row.status_updated_at ?? null,
    odooLeadId: row.odoo_lead_id ?? null,
    odooTicketId: row.odoo_ticket_id ?? null,
    locale: row.locale ?? null,
  };
}

function claimToRow(record: ClaimRecord): Record<string, unknown> {
  return {
    tracking_number: record.trackingNumber,
    status: record.status,
    entry_mode: record.entryMode,
    flight: record.flight,
    signed_name: record.signedName,
    contact_email: record.contactEmail,
    accepted_documents: record.acceptedDocuments,
    document_signatures: record.documentSignatures,
    audit_trail: record.auditTrail,
    verification: record.verification,
    created_at: record.createdAt,
    updated_at: record.updatedAt ?? record.createdAt,
    status_updated_at: record.statusUpdatedAt ?? record.createdAt,
    odoo_lead_id: record.odooLeadId ?? null,
    odoo_ticket_id: record.odooTicketId ?? null,
    locale: record.locale ?? null,
  };
}

async function saveClaimLocally(record: ClaimRecord): Promise<void> {
  await mkdir(LOCAL_CLAIMS_DIR, { recursive: true });
  const filePath = path.join(LOCAL_CLAIMS_DIR, `${record.trackingNumber}.json`);
  await writeFile(filePath, JSON.stringify(record, null, 2), "utf8");
}

async function getClaimLocally(trackingNumber: string): Promise<ClaimRecord | null> {
  try {
    const filePath = path.join(LOCAL_CLAIMS_DIR, `${trackingNumber}.json`);
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as ClaimRecord;
  } catch {
    return null;
  }
}

async function listClaimsLocally(): Promise<ClaimRecord[]> {
  try {
    const { readdir } = await import("node:fs/promises");
    const files = await readdir(LOCAL_CLAIMS_DIR);
    const claims: ClaimRecord[] = [];
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const raw = await readFile(path.join(LOCAL_CLAIMS_DIR, file), "utf8");
      claims.push(JSON.parse(raw) as ClaimRecord);
    }
    return claims;
  } catch {
    return [];
  }
}

async function saveClaimSupabase(record: ClaimRecord): Promise<void> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const response = await fetch(supabaseRestUrl("claims"), {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(claimToRow(record)),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase insert failed: ${response.status} ${body}`);
  }
}

async function patchClaimSupabase(
  trackingNumber: string,
  patch: Record<string, unknown>,
): Promise<ClaimRecord | null> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const response = await fetch(
    `${supabaseRestUrl("claims")}?tracking_number=eq.${encodeURIComponent(trackingNumber)}`,
    {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(patch),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase claim patch failed: ${response.status} ${body}`);
  }

  const rows = (await response.json()) as ClaimsRow[];
  return rows[0] ? rowToClaim(rows[0]) : null;
}

async function getClaimSupabase(trackingNumber: string): Promise<ClaimRecord | null> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const response = await fetch(
    `${supabaseRestUrl("claims")}?tracking_number=eq.${encodeURIComponent(trackingNumber)}&select=*&limit=1`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const rows = (await response.json()) as ClaimsRow[];
  return rows[0] ? rowToClaim(rows[0]) : null;
}

async function getClaimByOdooTicketIdSupabase(ticketId: number): Promise<ClaimRecord | null> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const response = await fetch(
    `${supabaseRestUrl("claims")}?odoo_ticket_id=eq.${ticketId}&select=*&limit=1`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const rows = (await response.json()) as ClaimsRow[];
  return rows[0] ? rowToClaim(rows[0]) : null;
}

export async function saveClaim(record: ClaimRecord): Promise<void> {
  const now = new Date().toISOString();
  const withTimestamps: ClaimRecord = {
    ...record,
    updatedAt: now,
    statusUpdatedAt: record.statusUpdatedAt ?? record.createdAt,
  };

  if (hasSupabaseConfig()) {
    await saveClaimSupabase(withTimestamps);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    await saveClaimLocally(withTimestamps);
    return;
  }

  console.warn("Claim storage not configured — tracking lookup will not persist.");
}

export async function getClaim(trackingNumber: string): Promise<ClaimRecord | null> {
  const normalized = normalizeTrackingNumber(trackingNumber);

  if (hasSupabaseConfig()) {
    return getClaimSupabase(normalized);
  }

  if (process.env.NODE_ENV === "development") {
    return getClaimLocally(normalized);
  }

  return null;
}

export async function getClaimByOdooTicketId(ticketId: number): Promise<ClaimRecord | null> {
  if (hasSupabaseConfig()) {
    return getClaimByOdooTicketIdSupabase(ticketId);
  }

  if (process.env.NODE_ENV === "development") {
    const claims = await listClaimsLocally();
    return claims.find((claim) => claim.odooTicketId === ticketId) ?? null;
  }

  return null;
}

export async function updateClaimFields(
  trackingNumber: string,
  fields: Partial<
    Pick<
      ClaimRecord,
      | "status"
      | "odooLeadId"
      | "odooTicketId"
      | "odooLeadName"
      | "odooTicketName"
      | "locale"
    >
  >,
): Promise<ClaimRecord | null> {
  const normalized = normalizeTrackingNumber(trackingNumber);
  const existing = await getClaim(normalized);
  if (!existing) {
    return null;
  }

  const now = new Date().toISOString();
  const statusChanged = fields.status !== undefined && fields.status !== existing.status;
  const next: ClaimRecord = {
    ...existing,
    ...fields,
    updatedAt: now,
    statusUpdatedAt: statusChanged ? now : existing.statusUpdatedAt ?? existing.createdAt,
  };

  if (hasSupabaseConfig()) {
    return patchClaimSupabase(normalized, {
      status: next.status,
      updated_at: next.updatedAt,
      status_updated_at: next.statusUpdatedAt,
      odoo_lead_id: next.odooLeadId ?? null,
      odoo_ticket_id: next.odooTicketId ?? null,
      locale: next.locale ?? null,
    });
  }

  if (process.env.NODE_ENV === "development") {
    await saveClaimLocally(next);
    return next;
  }

  return null;
}

export async function updateClaimStatus(
  trackingNumber: string,
  status: ClaimStatus,
): Promise<{ claim: ClaimRecord; changed: boolean } | null> {
  const existing = await getClaim(trackingNumber);
  if (!existing) {
    return null;
  }

  if (existing.status === status) {
    return { claim: existing, changed: false };
  }

  const updated = await updateClaimFields(trackingNumber, { status });
  if (!updated) {
    return null;
  }

  return { claim: updated, changed: true };
}
