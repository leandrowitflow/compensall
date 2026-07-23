import { mapOdooHelpdeskStageToClaimStatus } from "../src/lib/odoo-stage-map";

const cases: Array<[string, string]> = [
  ["New", "submitted"],
  ["Submeter", "under_review"],
  ["Submetido", "airline_contacted"],
  ["Aceite - pago ao cliente", "compensated"],
  ["Closed", "closed"],
  ["Não responde - congelado", "closed"],
];

let failed = 0;
for (const [stage, expected] of cases) {
  const actual = mapOdooHelpdeskStageToClaimStatus(stage);
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"} ${stage} → ${actual} (expected ${expected})`);
  if (!ok) failed += 1;
}

const unknown = mapOdooHelpdeskStageToClaimStatus("Totally Unknown Stage");
console.log(`${unknown === null ? "PASS" : "FAIL"} unknown stage → ${unknown}`);
if (unknown !== null) failed += 1;

if (failed > 0) process.exit(1);
console.log("\nStage mapping checks passed.");
