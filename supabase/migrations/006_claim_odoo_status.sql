-- Add Odoo linkage and status change tracking for claim timeline sync
alter table claims
  add column if not exists odoo_lead_id integer,
  add column if not exists odoo_ticket_id integer,
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists status_updated_at timestamptz not null default now(),
  add column if not exists locale text;

create index if not exists claims_odoo_ticket_id_idx on claims (odoo_ticket_id);
create index if not exists claims_odoo_lead_id_idx on claims (odoo_lead_id);
