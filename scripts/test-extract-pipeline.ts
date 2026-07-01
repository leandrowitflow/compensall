import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
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
}

async function main() {
  loadEnv();

  const imagePath = process.argv[2];
  if (!imagePath) {
    console.error("Usage: tsx scripts/test-extract-pipeline.ts <path-to-image>");
    process.exit(1);
  }

  const { extractBoardingPassFromFile } = await import("../src/lib/extract-boarding-pass");

  const buffer = readFileSync(imagePath);
  console.log("Reading image:", imagePath, `(${buffer.length} bytes)`);
  console.log("---");

  const started = Date.now();
  const result = await extractBoardingPassFromFile(buffer, "image/png");
  console.log(`Full pipeline (${((Date.now() - started) / 1000).toFixed(1)}s):`);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error("FAILED:", error);
  process.exit(1);
});
