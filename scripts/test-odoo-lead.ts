import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { generateTrackingNumber } from "../src/lib/claim-tracking";
import { isOdooConfigured, resolveOdooTagId } from "../src/lib/odoo-client";
import { syncClaimCaseToOdoo } from "../src/lib/odoo-crm-lead";

function loadEnvLocal(): void {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // optional
  }
}

loadEnvLocal();

async function main() {
  console.log("=== Compensall → Odoo case fields test ===\n");
  console.log("1. Odoo configured:", isOdooConfigured());

  if (!isOdooConfigured()) {
    console.error("Missing ODOO_* env vars in .env.local");
    process.exit(1);
  }

  const trackingNumber = generateTrackingNumber();
  console.log("2. Tracking number:", trackingNumber);

  const { lead, ticket } = await syncClaimCaseToOdoo({
    trackingNumber,
    signedName: "Integration Test Passenger",
    contactEmail: "integration-test@compensall.test",
    entryMode: "manual",
    flight: {
      passenger: "Integration Test Passenger",
      flight: "BA123",
      routeFrom: "London Heathrow - LHR",
      routeTo: "Lisbon - LIS",
      date: "2026-07-17",
      status: "Delayed",
      delay: "2h 45m",
    },
    verification: {
      result: "needs_review",
      summary: "Automated integration test from Compensall scripts.",
      mismatches: [],
    },
    siteUrl: "http://localhost:3000",
    locale: "en",
    landingPage: "/en/#claim",
  });

  if (!lead || !ticket) {
    console.error("FAILED — CRM lead or Helpdesk ticket was not created.");
    process.exit(1);
  }

  console.log("3. CRM lead:", lead.id, lead.companyName, lead.crmUrl);
  console.log("4. Helpdesk ticket:", ticket.id, ticket.ticketUrl);
  console.log("   brand:", ticket.brand);
  console.log("   company:", ticket.companyName);
  console.log("   first/last:", ticket.firstName, ticket.lastName);
  console.log("   email:", ticket.email);
  console.log("   flight:", ticket.flightNumber, ticket.flightDate);
  console.log("   route:", ticket.departedFrom, "→", ticket.finalDestination);
  console.log("   disruption:", ticket.disruptionType, ticket.delayDuration);
  console.log("   airline:", ticket.airline);

  const failures: string[] = [];
  const warnings: string[] = [];

  if (ticket.brand !== "Compensall") failures.push(`brand=${ticket.brand}`);
  if (ticket.firstName !== "Integration") failures.push(`firstName=${ticket.firstName}`);
  if (ticket.lastName !== "Test Passenger") failures.push(`lastName=${ticket.lastName}`);
  if (ticket.email !== "integration-test@compensall.test") failures.push(`email=${ticket.email}`);
  if (ticket.flightNumber !== "BA123") failures.push(`flightNumber=${ticket.flightNumber}`);
  if (ticket.flightDate !== "2026-07-17") failures.push(`flightDate=${ticket.flightDate}`);
  if (ticket.departedFrom !== "London Heathrow - LHR") failures.push(`departedFrom=${ticket.departedFrom}`);
  if (ticket.finalDestination !== "Lisbon - LIS") failures.push(`finalDestination=${ticket.finalDestination}`);
  if (ticket.disruptionType !== "delayed") failures.push(`disruptionType=${ticket.disruptionType}`);
  if (ticket.delayDuration !== "less_than_3") failures.push(`delayDuration=${ticket.delayDuration}`);
  if (ticket.airline !== "British Airways") failures.push(`airline=${ticket.airline}`);

  const [crmAaTagId, helpdeskAaTagId] = await Promise.all([
    resolveOdooTagId("AA", "crm.tag"),
    resolveOdooTagId("AA", "helpdesk.tag"),
  ]);
  if (!crmAaTagId || !lead.tagIds.includes(crmAaTagId)) failures.push("CRM missing AA tag");
  if (!helpdeskAaTagId || !ticket.tagIds.includes(helpdeskAaTagId)) failures.push("Helpdesk missing AA tag");

  if (lead.companyName !== "Compensall") {
    warnings.push(`CRM company_id=${lead.companyName}`);
  }
  if (ticket.companyName !== "Compensall") {
    warnings.push(`Helpdesk company_id=${ticket.companyName}`);
  }

  if (warnings.length > 0) {
    console.warn("\nWarnings:");
    for (const warning of warnings) console.warn(" -", warning);
  }

  if (failures.length > 0) {
    console.error("\nFAILED:");
    for (const failure of failures) console.error(" -", failure);
    process.exit(1);
  }

  console.log("\n✓ Case data written to Helpdesk fields (not only description).");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
