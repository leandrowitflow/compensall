import type { ClaimStatus } from "@/lib/claim-types";

/**
 * Maps Odoo Helpdesk stage names → public Compensall track statuses.
 * Only stages listed here update the website tracker.
 */
const STAGE_NAME_TO_STATUS: Record<string, ClaimStatus> = {
  New: "received",
  Submeter: "received",

  "Falta algo": "needs_documents",
  "Legal - falta algo": "needs_documents",

  Submetido: "with_airline",
  Insistidos: "with_airline",
  Legal: "with_airline",
  "Aceite - cobranças al": "with_airline",
  "Aceite - recebido al": "with_airline",
  "Aceite - recebido da al": "with_airline",

  "Nega - a refutar": "following_up",

  "Aceite - em pagamento": "payment_processing",

  "Aceite - cobrança cli": "awaiting_fee",

  "Aceite - pago ao cliente": "paid",

  NTD: "closed_ntd",

  "Não responde - congelado": "paused",

  Closed: "closed_declined",
};

function normalizeStageName(stageName: string): string {
  return stageName.trim().replace(/\s+/g, " ");
}

export function mapOdooHelpdeskStageToClaimStatus(
  stageName: string | null | undefined,
): ClaimStatus | null {
  if (!stageName) {
    return null;
  }

  const normalized = normalizeStageName(stageName);
  return STAGE_NAME_TO_STATUS[normalized] ?? null;
}

export function listMappedOdooStages(): Array<{ stageName: string; status: ClaimStatus }> {
  return Object.entries(STAGE_NAME_TO_STATUS).map(([stageName, status]) => ({
    stageName,
    status,
  }));
}
