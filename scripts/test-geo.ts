import {
  runLlmsTxtBuilderChecks,
  runLlmsTxtChecks,
  runRobotsTxtChecks,
  runSitemapChecks,
} from "../src/lib/aeo-geo-checks";
import { fetchText, printResults, resolveBaseUrl, resolveSiteOrigin } from "./test-runner";

async function main() {
  const baseUrl = resolveBaseUrl();

  const [llmsResponse, robotsResponse, sitemapResponse] = await Promise.all([
    fetchText("/llms.txt", baseUrl),
    fetchText("/robots.txt", baseUrl),
    fetchText("/sitemap.xml", baseUrl),
  ]);

  const siteOrigin = resolveSiteOrigin(llmsResponse.finalUrl, baseUrl);
  console.log(`GEO checks against ${baseUrl} (origin: ${siteOrigin})`);

  const builderResults = runLlmsTxtBuilderChecks();
  const liveLlmsResults = runLlmsTxtChecks(llmsResponse.body, llmsResponse.status, siteOrigin);
  const robotsResults = runRobotsTxtChecks(robotsResponse.body);
  const sitemapResults = runSitemapChecks(sitemapResponse.body, sitemapResponse.status, siteOrigin);

  const contentTypeResult = {
    id: "llms-content-type",
    label: "llms.txt served as markdown",
    pass: llmsResponse.body.startsWith("# Compensall"),
    detail: llmsResponse.body.startsWith("# Compensall")
      ? undefined
      : "Unexpected llms.txt body",
  };

  const failed =
    printResults("GEO llms.txt builder checks", builderResults) +
    printResults("GEO llms.txt live checks", [...liveLlmsResults, contentTypeResult]) +
    printResults("GEO robots.txt checks", robotsResults) +
    printResults("GEO sitemap.xml checks", sitemapResults);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("GEO test run failed:", error);
  process.exit(1);
});
