-- Run in Supabase SQL editor or via supabase db push
create table if not exists claims (
  id uuid primary key default gen_random_uuid(),
  tracking_number text unique not null,
  status text not null default 'submitted',
  entry_mode text not null,
  flight jsonb not null,
  signed_name text not null,
  contact_email text,
  accepted_documents text[] not null,
  verification jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists claims_tracking_number_idx on claims (tracking_number);

alter table claims enable row level security;

-- Service role bypasses RLS; no public policies until ODOO integration
