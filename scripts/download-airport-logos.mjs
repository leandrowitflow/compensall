import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const airportsDir = path.join(__dirname, "../public/assets/airports");

const USER_AGENT = "CompensallLogoDownloader/1.0 (https://compensall.vercel.app)";

/** Preferred Commons logo file per airport (verified or search-derived). */
const airportLogoFiles = {
  stansted: "STN airport logo.svg",
  luton: "LTN airport logo.svg",
  birmingham: "BHX airport logo.svg",
  edinburgh: "EDI logo white.svg",
  glasgow: "GLA airport logo.svg",
  bristol: "BRS airport logo.svg",
  madrid: "Aena MAD logo white.svg",
  barcelona: "Aena MAD logo white.svg",
  malaga: "Aena MAD logo white.svg",
  palma: "Aena MAD logo white.svg",
  munich: "MUC airport logo.svg",
  berlin: "BER airport logo.svg",
  dusseldorf: "DUS airport logo.svg",
  hamburg: "HAM airport logo.svg",
  "rome-fiumicino": "FCO airport logo.svg",
  "milan-malpensa": "MXP airport logo.svg",
  "milan-linate": "LIN airport logo.svg",
  venice: "VCE airport logo.svg",
  brussels: "Brussels Airport logo.svg",
  dublin: "Dublin Airport logo.svg",
  warsaw: "WAW airport logo.svg",
  krakow: "KRK airport logo.svg",
  athens: "ATH airport logo.svg",
  vienna: "VIE airport logo.svg",
  zurich: "ZRH airport logo.svg",
  geneva: "Logo Genève Aéroport.svg",
  copenhagen: "CPH-logo.svg",
  oslo: "OSL airport logo.svg",
  stockholm: "ARN airport logo.svg",
  helsinki: "HEL airport logo-01.svg",
  prague: "PRG airport logo.svg",
  budapest: "BUD airport logo.svg",
  bucharest: "Bucharest Airport Logo.svg",
  gatwick: "LGW airport logo.svg",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getCommonsThumb(fileName) {
  const title = encodeURIComponent(`File:${fileName}`);
  const apiUrl =
    `https://commons.wikimedia.org/w/api.php?action=query&titles=${title}` +
    `&prop=imageinfo&iiurlwidth=250&iiprop=url|thumburl&format=json`;

  const response = await fetch(apiUrl, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) {
    return null;
  }

  const text = await response.text();
  if (text.startsWith("You are making too many requests")) {
    throw new Error("rate_limited");
  }

  const data = JSON.parse(text);
  const page = Object.values(data.query?.pages ?? {})[0];
  if (!page?.missing && page?.imageinfo?.[0]?.thumburl) {
    return page.imageinfo[0].thumburl;
  }

  return null;
}

async function searchCommonsLogo(query) {
  const search = encodeURIComponent(query);
  const apiUrl =
    `https://commons.wikimedia.org/w/api.php?action=query&list=search` +
    `&srsearch=${search}&srnamespace=6&format=json&srlimit=5`;

  const response = await fetch(apiUrl, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) {
    return null;
  }

  const text = await response.text();
  if (text.startsWith("You are making too many requests")) {
    throw new Error("rate_limited");
  }

  const data = JSON.parse(text);
  const results = data.query?.search ?? [];
  const match = results.find((item) => /logo/i.test(item.title) && /\.svg/i.test(item.title));
  if (!match) {
    return null;
  }

  return match.title.replace(/^File:/, "");
}

async function downloadFile(url, outPath) {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
}

async function resolveAndDownload(id, preferredFile, iata) {
  const outPath = path.join(airportsDir, `${id}.png`);

  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 5000) {
    console.log(`SKIP ${id}`);
    return "skip";
  }

  let fileName = preferredFile;
  let thumbUrl = await getCommonsThumb(fileName);

  if (!thumbUrl) {
    await sleep(4000);
    fileName = await searchCommonsLogo(`${iata} airport logo`);
    if (fileName) {
      await sleep(4000);
      thumbUrl = await getCommonsThumb(fileName);
    }
  }

  if (!thumbUrl) {
    console.log(`NO FILE ${id}`);
    return "fail";
  }

  await sleep(3000);
  await downloadFile(thumbUrl, outPath);
  console.log(`OK   ${id} <= ${fileName}`);
  return "ok";
}

/** @type {{ id: string; file: string; iata: string }[]} */
const airports = [
  { id: "stansted", file: airportLogoFiles.stansted, iata: "STN" },
  { id: "luton", file: airportLogoFiles.luton, iata: "LTN" },
  { id: "birmingham", file: airportLogoFiles.birmingham, iata: "BHX" },
  { id: "edinburgh", file: airportLogoFiles.edinburgh, iata: "EDI" },
  { id: "glasgow", file: airportLogoFiles.glasgow, iata: "GLA" },
  { id: "bristol", file: airportLogoFiles.bristol, iata: "BRS" },
  { id: "madrid", file: airportLogoFiles.madrid, iata: "MAD" },
  { id: "barcelona", file: airportLogoFiles.barcelona, iata: "BCN" },
  { id: "malaga", file: airportLogoFiles.malaga, iata: "AGP" },
  { id: "palma", file: airportLogoFiles.palma, iata: "PMI" },
  { id: "munich", file: airportLogoFiles.munich, iata: "MUC" },
  { id: "berlin", file: airportLogoFiles.berlin, iata: "BER" },
  { id: "dusseldorf", file: airportLogoFiles.dusseldorf, iata: "DUS" },
  { id: "hamburg", file: airportLogoFiles.hamburg, iata: "HAM" },
  { id: "rome-fiumicino", file: airportLogoFiles["rome-fiumicino"], iata: "FCO" },
  { id: "milan-malpensa", file: airportLogoFiles["milan-malpensa"], iata: "MXP" },
  { id: "milan-linate", file: airportLogoFiles["milan-linate"], iata: "LIN" },
  { id: "venice", file: airportLogoFiles.venice, iata: "VCE" },
  { id: "brussels", file: airportLogoFiles.brussels, iata: "BRU" },
  { id: "dublin", file: airportLogoFiles.dublin, iata: "DUB" },
  { id: "warsaw", file: airportLogoFiles.warsaw, iata: "WAW" },
  { id: "krakow", file: airportLogoFiles.krakow, iata: "KRK" },
  { id: "athens", file: airportLogoFiles.athens, iata: "ATH" },
  { id: "vienna", file: airportLogoFiles.vienna, iata: "VIE" },
  { id: "zurich", file: airportLogoFiles.zurich, iata: "ZRH" },
  { id: "geneva", file: airportLogoFiles.geneva, iata: "GVA" },
  { id: "copenhagen", file: airportLogoFiles.copenhagen, iata: "CPH" },
  { id: "oslo", file: airportLogoFiles.oslo, iata: "OSL" },
  { id: "stockholm", file: airportLogoFiles.stockholm, iata: "ARN" },
  { id: "helsinki", file: airportLogoFiles.helsinki, iata: "HEL" },
  { id: "prague", file: airportLogoFiles.prague, iata: "PRG" },
  { id: "budapest", file: airportLogoFiles.budapest, iata: "BUD" },
  { id: "bucharest", file: airportLogoFiles.bucharest, iata: "OTP" },
  { id: "gatwick", file: airportLogoFiles.gatwick, iata: "LGW" },
];

async function main() {
  fs.mkdirSync(airportsDir, { recursive: true });

  const counts = { ok: 0, skip: 0, fail: 0 };

  for (const airport of airports) {
    try {
      await sleep(5000);
      const result = await resolveAndDownload(airport.id, airport.file, airport.iata);
      counts[result]++;
    } catch (error) {
      if (error instanceof Error && error.message === "rate_limited") {
        console.log("Rate limited — waiting 60s...");
        await sleep(60000);
        const result = await resolveAndDownload(airport.id, airport.file, airport.iata);
        counts[result]++;
      } else {
        console.log(`ERR  ${airport.id}`);
        counts.fail++;
      }
    }
  }

  console.log(`\nDone: ${counts.ok} downloaded, ${counts.skip} skipped, ${counts.fail} failed.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
