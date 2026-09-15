-- Incomplete claim drafts so passengers can resume via emailed link.
-- Service role only; no public client access.
create table if not exists claim_drafts (
  token text primary key,
  form_session_id text not null,
  odoo_lead_id integer,
  entry_mode text not null,
  flight jsonb not null,
  signed_name text not null,
  contact_email text not null,
  contact_phone text,
  additional_passengers jsonb not null default '[]'::jsonb,
  locale text,
  resume_email_sent_at timestamptz,
  consumed_by_tracking_number text,
  consumed_at timestamptz,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists claim_drafts_form_session_id_idx on claim_drafts (form_session_id);
create index if not exists claim_drafts_contact_email_idx on claim_drafts (contact_email);
create index if not exists claim_drafts_expires_at_idx on claim_drafts (expires_at);

alter table claim_drafts enable row level security;

create policy "Deny all client access" on claim_drafts
  for all
  to anon, authenticated
  using (false)
  with check (false);
