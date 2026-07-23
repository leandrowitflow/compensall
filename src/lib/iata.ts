/** Extract a 3-letter IATA code from free text like "London (LHR)" or "LHR". */
export function normalizeIata(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim().toUpperCase();

  const parenthesized = trimmed.match(/\(([A-Z]{3})\)/);
  if (parenthesized) return parenthesized[1];

  if (/^[A-Z]{3}$/.test(trimmed)) return trimmed;

  const match = trimmed.match(/\b([A-Z]{3})\b/);
  return match?.[1] ?? null;
}
