-- Run in Supabase SQL editor or via supabase db push
-- Adds per-document signing audit trail (document-by-document signing) and makes contact email mandatory.
alter table claims
  add column if not exists document_signatures jsonb not null default '[]'::jsonb,
  add column if not exists audit_trail jsonb not null default '{"ipAddress": null, "userAgent": null}'::jsonb;

alter table claims
  alter column contact_email set not null;
