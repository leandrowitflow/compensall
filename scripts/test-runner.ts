import type { CheckResult, PageTestCase } from "../src/lib/aeo-geo-checks";
import { runPageChecks, summarizeResults } from "../src/lib/aeo-geo-checks";

export function resolveBaseUrl(argv = process.argv.slice(2)): string {
  const fromArg = argv.find((arg) => !arg.startsWith("-"));
  const fromEnv = process.env.TEST_BASE_URL;
  const base = (fromArg ?? fromEnv ?? "http://localhost:3000").replace(/\/$/, "");
  return base;
}

export async function fetchText(
  path: string,
  baseUrl: string,
): Promise<{ status: number; body: string; finalUrl: string }> {
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const response = await fetch(url, {
    headers: {
      Accept: "text/html,application/xml,text/plain,*/*",
    },
    redirect: "follow",
  });

  return {
    status: response.status,
    body: await response.text(),
    finalUrl: response.url,
  };
}

export function resolveSiteOrigin(finalUrl: string, fallbackBaseUrl: string): string {
  try {
    return new URL(finalUrl).origin;
  } catch {
    return fallbackBaseUrl.replace(/\/$/, "");
  }
}

export function printResults(title: string, results: CheckResult[]): number {
  console.log(`\n${title}`);
  console.log("=".repeat(title.length));

  for (const result of results) {
    const icon = result.pass ? "PASS" : result.detail?.startsWith("SKIPPED") ? "SKIP" : "FAIL";
    console.log(`[${icon}] ${result.label}`);
    if (result.detail && !result.pass) {
      console.log(`       ${result.detail}`);
    }
  }

  const summary = summarizeResults(results);
  console.log("");
  console.log(
    `Summary: ${summary.passed} passed, ${summary.failed} failed${summary.skipped ? `, ${summary.skipped} skipped` : ""}`,
  );

  return summary.failed;
}

export async function runPageTestCases(
  baseUrl: string,
  cases: PageTestCase[],
): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  for (const testCase of cases) {
    const { status, body } = await fetchText(testCase.path, baseUrl);

    if (testCase.optional && status === 404) {
      results.push({
        id: `${testCase.id}-skipped`,
        label: `${testCase.label}: optional page unavailable`,
        pass: true,
        detail: "SKIPPED: page returned HTTP 404",
      });
      continue;
    }

    results.push(...runPageChecks(body, status, testCase));
  }

  return results;
}
