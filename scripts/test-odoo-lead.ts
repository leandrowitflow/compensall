import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { generateTrackingNumber } from "../src/lib/claim-tracking";
import { isOdooConfigured } from "../src/lib/odoo-client";
import { syncClaimToOdoo } from "../src/lib/odoo-crm-lead";

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
  console.log("=== Compensall → Odoo integration test ===\n");
  console.log("1. Odoo configured:", isOdooConfigured());

  if (!isOdooConfigured()) {
    console.error("Missing ODOO_* env vars in .env.local");
    process.exit(1);
  }

  const trackingNumber = generateTrackingNumber();
  console.log("2. Generated site tracking number:", trackingNumber);

  const lead = await syncClaimToOdoo({
    trackingNumber,
    signedName: "Integration Test Passenger",
    contactEmail: "integration-test@compensall.test",
    entryMode: "manual",
    flight: {
      passenger: "Integration Test Passenger",
      flight: "BA123",
      routeFrom: "LHR",
      routeTo: "LIS",
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

  if (!lead) {
    console.error("3. FAILED — Odoo lead was not created.");
    process.exit(1);
  }

  console.log("3. Odoo lead created successfully:");
  console.log("   - Odoo case ID:", lead.id);
  console.log("   - Odoo case name:", lead.name);
  console.log("   - Contact:", lead.contactName);
  console.log("   - Email:", lead.emailFrom);
  console.log("   - Stage:", lead.stageName ?? "New");
  console.log("   - CRM URL:", lead.crmUrl);
  console.log("\n4. What the client sees on the site:");
  console.log("   - Tracking number:", trackingNumber);
  console.log("   - Track URL:", `http://localhost:3000/track/${trackingNumber}`);
  console.log("\n5. What the client would get by email:");
  console.log(`   Subject: Your Compensall claim ${trackingNumber}`);
  console.log(`   Body includes: tracking ${trackingNumber}, Odoo case #${lead.id}, stage "${lead.stageName ?? "New"}"`);
  console.log("\n6. Resend configured:", Boolean(process.env.RESEND_API_KEY));
  if (!process.env.RESEND_API_KEY) {
    console.log("   → Add RESEND_API_KEY to .env.local to actually send client emails.");
  }

  console.log("\n✓ Test complete. Open the CRM URL above to verify the card in Odoo.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
