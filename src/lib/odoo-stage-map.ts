import type { ClaimStatus } from "@/lib/claim-types";

/**
 * Maps Odoo Helpdesk stage names to the public Compensall claim timeline.
 * Adjust names here when ops rename stages in Odoo.
 */
const STAGE_NAME_TO_STATUS: Record<string, ClaimStatus> = {
  New: "submitted",

  Submeter: "under_review",
  "Submeter expenses": "under_review",
  "Falta algo": "under_review",
  "Legal - falta algo": "under_review",
  "Legal - submeter": "under_review",
  Legal: "under_review",
  NTD: "under_review",
  teste: "under_review",
  vimax: "under_review",

  Submetido: "airline_contacted",
  Insistidos: "airline_contacted",
  "Nega - a refutar": "airline_contacted",

  "Aceite - cobranças al": "compensated",
  "Aceite - em pagamento": "compensated",
  "Aceite - recebido da al": "compensated",
  "Aceite - cobrança cli": "compensated",
  "Aceite - pago ao cliente": "compensated",

  Closed: "closed",
  Congelado: "closed",
  "Não responde - congelado": "closed",
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
