import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ClaimRecord } from "@/lib/claim-types";
import { normalizeTrackingNumber } from "@/lib/claim-tracking";
import { supabaseRestUrl } from "@/lib/supabase-rest";

const LOCAL_CLAIMS_DIR = path.join(process.cwd(), "data", "claims");

function hasSupabaseConfig(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
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
    body: JSON.stringify({
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
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase insert failed: ${response.status} ${body}`);
  }
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

  const rows = (await response.json()) as Array<{
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
  }>;

  const row = rows[0];
  if (!row) return null;

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
  };
}

export async function saveClaim(record: ClaimRecord): Promise<void> {
  if (hasSupabaseConfig()) {
    await saveClaimSupabase(record);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    await saveClaimLocally(record);
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
