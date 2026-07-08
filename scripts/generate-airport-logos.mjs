import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const airportsDir = path.join(__dirname, "../public/assets/airports");
const force = process.argv.includes("--force");

/** IATA codes for airports that use locally generated badge logos. */
const airportBadges = {
  heathrow: { iata: "LHR", label: "London Heathrow" },
  gatwick: { iata: "LGW", label: "London Gatwick" },
  manchester: { iata: "MAN", label: "Manchester" },
  stansted: { iata: "STN", label: "London Stansted" },
  luton: { iata: "LTN", label: "London Luton" },
  birmingham: { iata: "BHX", label: "Birmingham" },
  edinburgh: { iata: "EDI", label: "Edinburgh" },
  glasgow: { iata: "GLA", label: "Glasgow" },
  bristol: { iata: "BRS", label: "Bristol" },
  madrid: { iata: "MAD", label: "Madrid Barajas" },
  barcelona: { iata: "BCN", label: "Barcelona El Prat" },
  malaga: { iata: "AGP", label: "Malaga" },
  palma: { iata: "PMI", label: "Palma de Mallorca" },
  munich: { iata: "MUC", label: "Munich" },
  berlin: { iata: "BER", label: "Berlin Brandenburg" },
  dusseldorf: { iata: "DUS", label: "Düsseldorf" },
  hamburg: { iata: "HAM", label: "Hamburg" },
  "rome-fiumicino": { iata: "FCO", label: "Rome Fiumicino" },
  "milan-malpensa": { iata: "MXP", label: "Milan Malpensa" },
  "milan-linate": { iata: "LIN", label: "Milan Linate" },
  venice: { iata: "VCE", label: "Venice Marco Polo" },
  brussels: { iata: "BRU", label: "Brussels" },
  dublin: { iata: "DUB", label: "Dublin" },
  warsaw: { iata: "WAW", label: "Warsaw Chopin" },
  krakow: { iata: "KRK", label: "Kraków" },
  athens: { iata: "ATH", label: "Athens" },
  vienna: { iata: "VIE", label: "Vienna" },
  zurich: { iata: "ZRH", label: "Zurich" },
  geneva: { iata: "GVA", label: "Geneva" },
  copenhagen: { iata: "CPH", label: "Copenhagen" },
  oslo: { iata: "OSL", label: "Oslo Gardermoen" },
  stockholm: { iata: "ARN", label: "Stockholm Arlanda" },
  helsinki: { iata: "HEL", label: "Helsinki" },
  prague: { iata: "PRG", label: "Prague" },
  budapest: { iata: "BUD", label: "Budapest" },
  bucharest: { iata: "OTP", label: "Bucharest" },
};

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function labelFontSize(label) {
  if (label.length > 18) return 9;
  if (label.length > 14) return 10;
  return 11;
}

function badgeSvg(iata, label) {
  const safeLabel = escapeXml(label);
  const safeIata = escapeXml(iata);
  const labelSize = labelFontSize(label);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60" role="img" aria-label="${safeLabel}">
  <rect x="0" y="0" width="200" height="60" rx="10" fill="#f0f5fe" stroke="#d5e0f9" stroke-width="2"/>
  <text x="14" y="38" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="2.5" fill="#2669f3">${safeIata}</text>
  <text x="86" y="24" font-family="Arial, Helvetica, sans-serif" font-size="${labelSize}" font-weight="700" letter-spacing="0.35" fill="#1f3664">${safeLabel}</text>
  <text x="86" y="42" font-family="Arial, Helvetica, sans-serif" font-size="10" letter-spacing="0.5" fill="#7b8094">Airport</text>
</svg>`;
}

fs.mkdirSync(airportsDir, { recursive: true });

let created = 0;
let updated = 0;

for (const [id, { iata, label }] of Object.entries(airportBadges)) {
  const pngPath = path.join(airportsDir, `${id}.png`);
  if (fs.existsSync(pngPath)) {
    continue;
  }

  const svgPath = path.join(airportsDir, `${id}.svg`);
  const exists = fs.existsSync(svgPath);

  if (!exists || force) {
    fs.writeFileSync(svgPath, badgeSvg(iata, label));
    if (exists) {
      updated++;
      console.log(`Updated ${id}.svg`);
    } else {
      created++;
      console.log(`Created ${id}.svg`);
    }
  }
}

console.log(`Done. Created ${created}, updated ${updated} airport badge SVGs.`);
