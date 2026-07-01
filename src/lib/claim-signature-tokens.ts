import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { supabaseRestUrl } from "@/lib/supabase-rest";

export type ClaimSignatureToken = {
  token: string;
  sessionId: string;
  documentId: string;
  signatureHash: string;
  signedAt: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  consumedByTrackingNumber: string | null;
  consumedAt: string | null;
};

const LOCAL_TOKENS_DIR = path.join(process.cwd(), "data", "claim-signature-tokens");

function hasSupabaseConfig(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function tokenFilePath(token: string): string {
  return path.join(LOCAL_TOKENS_DIR, `${token}.json`);
}

async function saveTokenLocally(record: ClaimSignatureToken): Promise<void> {
  await mkdir(LOCAL_TOKENS_DIR, { recursive: true });
  await writeFile(tokenFilePath(record.token), JSON.stringify(record, null, 2), "utf8");
}

async function getTokenLocally(token: string): Promise<ClaimSignatureToken | null> {
  try {
    const raw = await readFile(tokenFilePath(token), "utf8");
    return JSON.parse(raw) as ClaimSignatureToken;
  } catch {
    return null;
  }
}

async function saveTokenSupabase(record: ClaimSignatureToken): Promise<void> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const response = await fetch(supabaseRestUrl("claim_signature_tokens"), {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      token: record.token,
      session_id: record.sessionId,
      document_id: record.documentId,
      signature_hash: record.signatureHash,
      signed_at: record.signedAt,
      ip_address: record.ipAddress,
      user_agent: record.userAgent,
      created_at: record.createdAt,
      consumed_by_tracking_number: record.consumedByTrackingNumber,
      consumed_at: record.consumedAt,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase signature token insert failed: ${response.status} ${body}`);
  }
}

async function getTokenSupabase(token: string): Promise<ClaimSignatureToken | null> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const response = await fetch(
    `${supabaseRestUrl("claim_signature_tokens")}?token=eq.${encodeURIComponent(token)}&select=*&limit=1`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    },
  );

  if (!response.ok) return null;

  const rows = (await response.json()) as Array<{
    token: string;
    session_id: string;
    document_id: string;
    signature_hash: string;
    signed_at: string;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
    consumed_by_tracking_number: string | null;
    consumed_at: string | null;
  }>;

  const row = rows[0];
  if (!row) return null;

  return {
    token: row.token,
    sessionId: row.session_id,
    documentId: row.document_id,
    signatureHash: row.signature_hash,
    signedAt: row.signed_at,
    ipAddress: row.ip_address,
    userAgent: row.user_agent,
    createdAt: row.created_at,
    consumedByTrackingNumber: row.consumed_by_tracking_number,
    consumedAt: row.consumed_at,
  };
}

async function markTokenConsumedSupabase(token: string, trackingNumber: string, consumedAt: string): Promise<void> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const response = await fetch(`${supabaseRestUrl("claim_signature_tokens")}?token=eq.${encodeURIComponent(token)}`, {
    method: "PATCH",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ consumed_by_tracking_number: trackingNumber, consumed_at: consumedAt }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase signature token update failed: ${response.status} ${body}`);
  }
}

export async function saveSignatureToken(record: ClaimSignatureToken): Promise<void> {
  if (hasSupabaseConfig()) {
    await saveTokenSupabase(record);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    await saveTokenLocally(record);
    return;
  }

  console.warn("Signature token storage not configured — signature tokens will not persist.");
}

export async function getSignatureToken(token: string): Promise<ClaimSignatureToken | null> {
  if (hasSupabaseConfig()) {
    return getTokenSupabase(token);
  }

  if (process.env.NODE_ENV === "development") {
    return getTokenLocally(token);
  }

  return null;
}

export async function consumeSignatureToken(token: string, trackingNumber: string): Promise<void> {
  const consumedAt = new Date().toISOString();

  if (hasSupabaseConfig()) {
    await markTokenConsumedSupabase(token, trackingNumber, consumedAt);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    const existing = await getTokenLocally(token);
    if (!existing) return;
    await saveTokenLocally({ ...existing, consumedByTrackingNumber: trackingNumber, consumedAt });
  }
}
