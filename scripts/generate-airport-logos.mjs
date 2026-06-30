import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const airportsDir = path.join(__dirname, "../public/assets/airports");

/** IATA codes for airports that still need locally generated badge logos. */
const airportBadges = {
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

function badgeSvg(iata, label) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60" role="img" aria-label="${label}">
  <rect x="0" y="0" width="200" height="60" rx="10" fill="#f0f5fe" stroke="#d5e0f9" stroke-width="2"/>
  <text x="18" y="38" font-family="Open Sans, Arial, sans-serif" font-size="28" font-weight="700" fill="#2669f3">${iata}</text>
  <text x="78" y="24" font-family="Open Sans, Arial, sans-serif" font-size="11" font-weight="700" fill="#1f3664">${label}</text>
  <text x="78" y="40" font-family="Open Sans, Arial, sans-serif" font-size="10" fill="#7b8094">Airport</text>
</svg>`;
}

fs.mkdirSync(airportsDir, { recursive: true });

let created = 0;
for (const [id, { iata, label }] of Object.entries(airportBadges)) {
  const pngPath = path.join(airportsDir, `${id}.png`);
  if (fs.existsSync(pngPath)) {
    continue;
  }

  const svgPath = path.join(airportsDir, `${id}.svg`);
  fs.writeFileSync(svgPath, badgeSvg(iata, label));
  created++;
  console.log(`Created ${id}.svg`);
}

console.log(`Done. Created ${created} airport badge SVGs.`);
