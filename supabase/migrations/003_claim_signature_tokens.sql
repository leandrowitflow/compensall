-- Run in Supabase SQL editor or via supabase db push
-- Per-document signing: each signature is tokenized at the moment the user signs,
-- before the claim exists, then verified and consumed at final submission.
create table if not exists claim_signature_tokens (
  token text primary key,
  session_id text not null,
  document_id text not null,
  signature_hash text not null,
  signed_at timestamptz not null,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now(),
  consumed_by_tracking_number text,
  consumed_at timestamptz
);

create index if not exists claim_signature_tokens_session_id_idx on claim_signature_tokens (session_id);
create index if not exists claim_signature_tokens_consumed_by_idx on claim_signature_tokens (consumed_by_tracking_number);

alter table claim_signature_tokens enable row level security;

-- Service role bypasses RLS; no public policies (tokens are only read/written server-side)
