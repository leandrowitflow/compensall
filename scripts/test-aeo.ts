import { AEO_PAGE_CASES } from "../src/lib/aeo-geo-checks";
import { fetchText, printResults, resolveBaseUrl, runPageTestCases } from "./test-runner";

async function main() {
  const baseUrl = resolveBaseUrl();
  console.log(`AEO checks against ${baseUrl}`);

  const pageResults = await runPageTestCases(baseUrl, AEO_PAGE_CASES);

  const layoutResponse = await fetchText("/en", baseUrl);
  const layoutResults = [
    {
      id: "layout-jsonld",
      label: "Root layout exposes Organization + WebSite JSON-LD",
      pass: layoutResponse.body.includes('"@type":"Organization"') &&
        layoutResponse.body.includes('"@type":"WebSite"'),
      detail:
        layoutResponse.body.includes('"@type":"Organization"') &&
        layoutResponse.body.includes('"@type":"WebSite"')
          ? undefined
          : "Missing Organization or WebSite schema on homepage",
    },
    {
      id: "layout-schema-context",
      label: "JSON-LD uses schema.org context",
      pass: layoutResponse.body.includes("https://schema.org"),
      detail: layoutResponse.body.includes("https://schema.org")
        ? undefined
        : "Missing schema.org @context",
    },
  ];

  const failed =
    printResults("AEO page checks", pageResults) +
    printResults("AEO global checks", layoutResults);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("AEO test run failed:", error);
  process.exit(1);
});
