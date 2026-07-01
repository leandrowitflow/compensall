-- Run in Supabase SQL editor or via supabase db push
-- These tables hold claimant PII and legal signature evidence and must only ever be
-- accessed via the Supabase service role key from server-side API routes. Add explicit
-- deny-all policies for anon/authenticated so the intent is documented (not just implied
-- by "no policies exist"), and to resolve the "RLS enabled, no policy" advisory.
create policy "Deny all client access" on claims
  for all
  to anon, authenticated
  using (false)
  with check (false);

create policy "Deny all client access" on claim_signature_tokens
  for all
  to anon, authenticated
  using (false)
  with check (false);
