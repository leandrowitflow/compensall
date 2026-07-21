import { DEFAULT_FAQS } from "@/lib/default-faqs";
import { COMPENSALL_GUIDE_SLUGS } from "@/lib/blog/guide-slugs";
import { buildLlmsTxt } from "@/lib/llms-txt";
import { SITE_URL } from "@/lib/site-metadata";

export type CheckResult = {
  id: string;
  label: string;
  pass: boolean;
  detail?: string;
};

export type PageTestCase = {
  id: string;
  path: string;
  label: string;
  optional?: boolean;
  checks: PageCheck[];
};

export type PageCheck =
  | { type: "status"; expect: number }
  | { type: "html-contains"; text: string; label?: string }
  | { type: "json-ld-types"; types: string[] }
  | { type: "meta-description" }
  | { type: "canonical-path"; suffix: string }
  | { type: "noindex" };

const CITATION_BOTS = ["OAI-SearchBot", "PerplexityBot", "Google-Extended", "ClaudeBot"] as const;
const TRAINING_BOTS = ["GPTBot", "CCBot"] as const;

export const AEO_PAGE_CASES: PageTestCase[] = [
  {
    id: "home",
    path: "/en",
    label: "Homepage",
    checks: [
      { type: "status", expect: 200 },
      { type: "html-contains", text: "EC 261/2004", label: "EC 261/2004 mentioned in HTML" },
      {
        type: "html-contains",
        text: DEFAULT_FAQS[2].answer.slice(0, 40),
        label: "FAQ compensation answer visible in HTML",
      },
      { type: "json-ld-types", types: ["FAQPage", "HowTo"] },
      { type: "meta-description" },
      { type: "canonical-path", suffix: "/en" },
    ],
  },
  {
    id: "ryanair",
    path: "/en/airlines/ryanair",
    label: "Ryanair catalog page",
    checks: [
      { type: "status", expect: 200 },
      { type: "html-contains", text: "Ryanair", label: "Airline entity name in HTML" },
      { type: "html-contains", text: "EC 261/2004", label: "EC 261/2004 mentioned in HTML" },
      { type: "json-ld-types", types: ["FAQPage", "BreadcrumbList"] },
      { type: "meta-description" },
      { type: "canonical-path", suffix: "/en/airlines/ryanair" },
    ],
  },
  {
    id: "know-your-rights",
    path: "/en/know-your-rights",
    label: "Know your rights",
    checks: [
      { type: "status", expect: 200 },
      {
        type: "html-contains",
        text: "EC 261/2004",
        label: "Direct-answer rights copy in HTML",
      },
      {
        type: "html-contains",
        text: "Understand your rights under UK261",
        label: "Hero subtitle visible in HTML",
      },
      { type: "json-ld-types", types: ["FAQPage"] },
      { type: "meta-description" },
      { type: "canonical-path", suffix: "/en/know-your-rights" },
    ],
  },
  {
    id: "about",
    path: "/en/about",
    label: "About page",
    checks: [
      { type: "status", expect: 200 },
      { type: "json-ld-types", types: ["ProfessionalService"] },
      { type: "meta-description" },
      { type: "canonical-path", suffix: "/en/about" },
    ],
  },
  {
    id: "blog-post",
    path: `/en/blog/${COMPENSALL_GUIDE_SLUGS[0]}`,
    label: "Flight cancellation guide",
    optional: true,
    checks: [
      { type: "status", expect: 200 },
      { type: "json-ld-types", types: ["Article", "BreadcrumbList"] },
      { type: "meta-description" },
      {
        type: "canonical-path",
        suffix: `/en/blog/${COMPENSALL_GUIDE_SLUGS[0]}`,
      },
    ],
  },
  {
    id: "legal-noindex",
    path: "/en/documents/no-win-no-fee",
    label: "Legal document (noindex)",
    checks: [
      { type: "status", expect: 200 },
      { type: "noindex" },
    ],
  },
];

export function extractJsonLdFromHtml(html: string): unknown[] {
  const docs: unknown[] = [];
  const pattern =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(pattern)) {
    const raw = match[1]?.trim();
    if (!raw) continue;

    try {
      docs.push(JSON.parse(raw));
    } catch {
      // Ignore malformed JSON-LD blocks.
    }
  }

  return docs;
}

function flattenJsonLdNodes(doc: unknown): Record<string, unknown>[] {
  if (!doc || typeof doc !== "object") {
    return [];
  }

  if (Array.isArray(doc)) {
    return doc.flatMap((item) => flattenJsonLdNodes(item));
  }

  const record = doc as Record<string, unknown>;
  const nodes = [record];

  if (Array.isArray(record["@graph"])) {
    nodes.push(...record["@graph"].flatMap((item) => flattenJsonLdNodes(item)));
  }

  return nodes;
}

export function collectSchemaTypes(docs: unknown[]): string[] {
  const types = new Set<string>();

  for (const doc of docs) {
    for (const node of flattenJsonLdNodes(doc)) {
      const typeValue = node["@type"];
      if (typeof typeValue === "string") {
        types.add(typeValue);
      } else if (Array.isArray(typeValue)) {
        for (const type of typeValue) {
          if (typeof type === "string") {
            types.add(type);
          }
        }
      }
    }
  }

  return [...types];
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalizeHtmlText(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function htmlContainsText(html: string, needle: string): boolean {
  return normalizeHtmlText(html).toLowerCase().includes(needle.toLowerCase());
}

function getMetaContent(html: string, name: string): string | null {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const match = html.match(pattern);
  if (match?.[1]) {
    return decodeHtmlEntities(match[1]);
  }

  const reversePattern = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${escaped}["']`,
    "i",
  );
  const reverseMatch = html.match(reversePattern);
  return reverseMatch?.[1] ? decodeHtmlEntities(reverseMatch[1]) : null;
}

function getCanonicalHref(html: string): string | null {
  const match = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']|<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i,
  );
  return match?.[1] ?? match?.[2] ?? null;
}

function isNoIndex(html: string): boolean {
  const robots = getMetaContent(html, "robots");
  return robots?.toLowerCase().includes("noindex") ?? false;
}

export function runPageChecks(
  html: string,
  status: number,
  testCase: PageTestCase,
): CheckResult[] {
  const results: CheckResult[] = [];
  const schemaTypes = collectSchemaTypes(extractJsonLdFromHtml(html));

  for (const [index, check] of testCase.checks.entries()) {
    const id = `${testCase.id}-${index}`;

    switch (check.type) {
      case "status": {
        const pass = status === check.expect;
        results.push({
          id,
          label: `${testCase.label}: HTTP ${check.expect}`,
          pass,
          detail: pass ? undefined : `Received HTTP ${status}`,
        });
        break;
      }
      case "html-contains": {
        const pass = htmlContainsText(html, check.text);
        results.push({
          id,
          label: check.label ?? `${testCase.label}: contains "${check.text.slice(0, 40)}"`,
          pass,
          detail: pass ? undefined : `Missing text: "${check.text.slice(0, 80)}"`,
        });
        break;
      }
      case "json-ld-types": {
        const missing = check.types.filter((type) => !schemaTypes.includes(type));
        results.push({
          id,
          label: `${testCase.label}: JSON-LD includes ${check.types.join(", ")}`,
          pass: missing.length === 0,
          detail:
            missing.length === 0
              ? undefined
              : `Missing types: ${missing.join(", ")} (found: ${schemaTypes.join(", ") || "none"})`,
        });
        break;
      }
      case "meta-description": {
        const description = getMetaContent(html, "description");
        const pass = Boolean(description && description.length >= 50);
        results.push({
          id,
          label: `${testCase.label}: meta description present`,
          pass,
          detail: pass ? undefined : "Missing or too short meta description",
        });
        break;
      }
      case "canonical-path": {
        const canonical = getCanonicalHref(html);
        const pass = Boolean(canonical?.endsWith(check.suffix));
        results.push({
          id,
          label: `${testCase.label}: canonical ends with ${check.suffix}`,
          pass,
          detail: pass ? undefined : `Canonical was ${canonical ?? "missing"}`,
        });
        break;
      }
      case "noindex": {
        const pass = isNoIndex(html);
        results.push({
          id,
          label: `${testCase.label}: robots noindex`,
          pass,
          detail: pass ? undefined : "Expected noindex on legal/private page",
        });
        break;
      }
      default: {
        const exhaustive: never = check;
        results.push({
          id,
          label: `${testCase.label}: unsupported check`,
          pass: false,
          detail: `Unhandled check: ${JSON.stringify(exhaustive)}`,
        });
      }
    }
  }

  return results;
}

function buildAbsoluteUrl(siteUrl: string, path: string): string {
  return `${siteUrl.replace(/\/$/, "")}${path}`;
}

export function runLlmsTxtChecks(
  content: string,
  status = 200,
  siteUrl: string = SITE_URL,
): CheckResult[] {
  const requiredSections = ["Primary pages", "Key guides", "Example airline pages", "Contact"];
  const requiredPaths = [
    "/en",
    "/en/know-your-rights",
    "/en/airlines",
    `/en/blog/${COMPENSALL_GUIDE_SLUGS[0]}`,
    "/en/airlines/ryanair",
  ];

  const results: CheckResult[] = [
    {
      id: "llms-status",
      label: "llms.txt returns HTTP 200",
      pass: status === 200,
      detail: status === 200 ? undefined : `Received HTTP ${status}`,
    },
    {
      id: "llms-title",
      label: "llms.txt starts with Compensall heading",
      pass: content.startsWith("# Compensall"),
    },
    {
      id: "llms-ec261",
      label: "llms.txt mentions EC 261/2004",
      pass: content.includes("EC 261/2004"),
    },
    {
      id: "llms-localized",
      label: "llms.txt documents localized locales",
      pass: content.includes("/en/") && content.includes("/pt/") && content.includes("/fr/"),
    },
  ];

  for (const section of requiredSections) {
    results.push({
      id: `llms-section-${section}`,
      label: `llms.txt includes section "${section}"`,
      pass: content.includes(`## ${section}`),
    });
  }

  for (const path of requiredPaths) {
    const absoluteUrl = buildAbsoluteUrl(siteUrl, path);
    results.push({
      id: `llms-path-${path}`,
      label: `llms.txt links to ${path}`,
      pass: content.includes(absoluteUrl) || content.includes(buildAbsoluteUrl(SITE_URL, path)),
    });
  }

  return results;
}

export function runLlmsTxtBuilderChecks(): CheckResult[] {
  return runLlmsTxtChecks(buildLlmsTxt(), 200);
}

export function runRobotsTxtChecks(content: string): CheckResult[] {
  const results: CheckResult[] = [
    {
      id: "robots-sitemap",
      label: "robots.txt references sitemap.xml",
      pass: /Sitemap:\s*https?:\/\/.+\/sitemap\.xml/i.test(content),
    },
    {
      id: "robots-host",
      label: "robots.txt sets host",
      pass: /Host:\s*https?:\/\//i.test(content),
    },
    {
      id: "robots-block-api",
      label: "robots.txt disallows /api/",
      pass: content.includes("Disallow: /api/"),
    },
    {
      id: "robots-block-track",
      label: "robots.txt disallows track pages",
      pass: content.includes("Disallow: /*/track/"),
    },
  ];

  for (const bot of CITATION_BOTS) {
    results.push({
      id: `robots-allow-${bot}`,
      label: `robots.txt allows ${bot}`,
      pass: new RegExp(`User-Agent:\\s*${bot}[\\s\\S]*?Allow:\\s*/`, "i").test(content),
    });
  }

  for (const bot of TRAINING_BOTS) {
    results.push({
      id: `robots-block-${bot}`,
      label: `robots.txt blocks ${bot}`,
      pass: new RegExp(`User-Agent:\\s*${bot}[\\s\\S]*?Disallow:\\s*/`, "i").test(content),
    });
  }

  return results;
}

export function runSitemapChecks(
  xml: string,
  status = 200,
  siteUrl: string = SITE_URL,
): CheckResult[] {
  const requiredUrls = [
    "/en",
    "/en/about",
    "/en/blog",
    "/en/know-your-rights",
    "/en/airlines/ryanair",
    `/en/blog/${COMPENSALL_GUIDE_SLUGS[0]}`,
  ];

  const results: CheckResult[] = [
    {
      id: "sitemap-status",
      label: "sitemap.xml returns HTTP 200",
      pass: status === 200,
      detail: status === 200 ? undefined : `Received HTTP ${status}`,
    },
    {
      id: "sitemap-xml",
      label: "sitemap.xml is valid urlset markup",
      pass: xml.includes("<urlset") && xml.includes("</urlset>"),
    },
    {
      id: "sitemap-locales",
      label: "sitemap.xml includes all locales",
      pass: xml.includes("/en/") && xml.includes("/pt/") && xml.includes("/fr/"),
    },
  ];

  for (const path of requiredUrls) {
    const absoluteUrl = buildAbsoluteUrl(siteUrl, path);
    results.push({
      id: `sitemap-url-${path}`,
      label: `sitemap.xml includes ${path}`,
      pass: xml.includes(absoluteUrl) || xml.includes(buildAbsoluteUrl(SITE_URL, path)),
    });
  }

  return results;
}

export function summarizeResults(results: CheckResult[]): {
  passed: number;
  failed: number;
  skipped: number;
  failures: CheckResult[];
} {
  const passed = results.filter((result) => result.pass).length;
  const failed = results.filter((result) => !result.pass && !result.detail?.startsWith("SKIPPED")).length;
  const skipped = results.filter((result) => result.detail?.startsWith("SKIPPED")).length;

  return {
    passed,
    failed,
    skipped,
    failures: results.filter((result) => !result.pass),
  };
}
