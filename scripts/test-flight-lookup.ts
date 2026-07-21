import { readFileSync } from "node:fs";
import { resolve } from "node:path";

async function main() {
  const envPath = resolve(process.cwd(), ".env.local");
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }

  const { lookupFlightStatusFromWeb, isFlightWebLookupEnabled } = await import(
    "../src/lib/lookup-flight-status-web.ts"
  );

  const flight = process.argv[2] ?? "X32138";
  const date = process.argv[3] ?? "3 June 2026";

  console.log("Flight web lookup test");
  console.log("  enabled:", isFlightWebLookupEnabled());
  console.log("  flight:", flight);
  console.log("  date:", date);
  console.log("  model:", process.env.GEMINI_FLIGHT_LOOKUP_MODEL ?? "gemini-3.5-flash");
  console.log("---");

  const started = Date.now();
  try {
    const result = await lookupFlightStatusFromWeb({
      flightDesignator: flight,
      flightDate: date,
      departureIata: "FRA",
      arrivalIata: "FUE",
      airlineName: "TUI fly",
    });
    console.log("Duration:", `${((Date.now() - started) / 1000).toFixed(1)}s`);
    console.log("Result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Duration:", `${((Date.now() - started) / 1000).toFixed(1)}s`);
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
