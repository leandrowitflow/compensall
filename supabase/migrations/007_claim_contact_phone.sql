-- Phone captured on the claim form (Helpdesk/CRM sync).
alter table claims
  add column if not exists contact_phone text;
