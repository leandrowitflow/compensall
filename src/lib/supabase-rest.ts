function getSupabaseBaseUrl(): string {
  const raw = process.env.SUPABASE_URL ?? "";
  return raw.trim().replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
}

export function supabaseRestUrl(path: string): string {
  const base = getSupabaseBaseUrl();
  return `${base}/rest/v1/${path.replace(/^\/+/, "")}`;
}
