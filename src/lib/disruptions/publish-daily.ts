import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { randomUUID } from "node:crypto";
import { generateText, isStepCount, Output } from "ai";
import { z } from "zod";
import type { CmsBlogRecord } from "@/lib/cms-blog-store";
import { listCmsBlogRecords, upsertCmsBlogPost } from "@/lib/cms-blog-store";
import type { CmsWebhookPayload } from "@/lib/cms-webhook/types";
import { getGeminiApiKey, isUnavailableGeminiModelError, resolveGeminiModel } from "@/lib/gemini";
import {
  acceptDisruptionDraft,
  disruptionPublishGate,
  isDisruptionDigestFlagEnabled,
  isDisruptionSlug,
  isNothingNew,
  type DisruptionDraftInput,
  type ExistingDisruption,
} from "@/lib/disruptions/guards";

const DIGEST_MODEL = resolveGeminiModel(process.env.GEMINI_DISRUPTION_MODEL, "gemini-3.5-flash");
const DIGEST_MODEL_FALLBACK = "gemini-3.6-flash";
const COVER_IMAGE = "/assets/blog/airline-strike.jpg";

const disruptionDraftSchema = z.object({
  publish: z.boolean(),
  confidence: z.enum(["high", "medium", "low"]),
  title: z.string(),
  excerpt: z.string(),
  place: z.string(),
  reason: z.string(),
  eventDate: z.string(),
  contentMd: z.string(),
  sources: z.array(z.object({ title: z.string(), url: z.string() })).max(8),
  stats: z
    .array(z.object({ label: z.string(), value: z.string(), sourceUrl: z.string() }))
    .max(6),
});

export type DisruptionPublishResult =
  | { status: "skipped"; reason: string }
  | {
      status: "published";
      slug: string;
      translatedLocales: string[];
      failedLocales: string[];
    };

/**
 * One live search per run. The run itself is capped to once a day and three
 * articles a week, and translation only starts after the draft is accepted.
 */
export async function publishDailyDisruptionDigest(
  now = new Date(),
): Promise<DisruptionPublishResult> {
  if (!isDisruptionDigestFlagEnabled()) {
    return { status: "skipped", reason: "disabled" };
  }
  if (!getGeminiApiKey()) {
    return { status: "skipped", reason: "gemini_not_configured" };
  }

  const records = await listCmsBlogRecords();
  const gate = disruptionPublishGate(existingDisruptions(records), now);
  if (!gate.ok) {
    return { status: "skipped", reason: gate.reason };
  }

  let research = "";
  try {
    research = await researchDisruption(existingTitles(records), now);
  } catch (error) {
    console.error("[disruption-digest] research failed:", errorMessage(error));
    return { status: "skipped", reason: "research_failed" };
  }

  if (isNothingNew(research)) {
    return { status: "skipped", reason: "nothing_new" };
  }

  let draft: DisruptionDraftInput;
  try {
    draft = await structureDisruption(research.slice(0, 5000), now);
  } catch (error) {
    console.error("[disruption-digest] structure failed:", errorMessage(error));
    return { status: "skipped", reason: "structure_failed" };
  }

  const decision = acceptDisruptionDraft(
    draft,
    existingDisruptions(records),
    new Set(records.map((record) => record.slug)),
    now,
  );
  if (!decision.ok) {
    return { status: "skipped", reason: decision.reason };
  }

  let fresh: CmsBlogRecord[];
  try {
    fresh = await listCmsBlogRecords();
  } catch (error) {
    console.error("[disruption-digest] refresh failed:", errorMessage(error));
    return { status: "skipped", reason: "publish_failed" };
  }

  const freshGate = disruptionPublishGate(existingDisruptions(fresh), now);
  if (!freshGate.ok || fresh.some((record) => record.slug === decision.article.slug)) {
    return { status: "skipped", reason: freshGate.ok ? "duplicate_slug" : freshGate.reason };
  }

  try {
    const saved = await upsertCmsBlogPost(buildPayload(decision.article, now));
    console.info("[disruption-digest] published", decision.article.slug);
    return {
      status: "published",
      slug: decision.article.slug,
      translatedLocales: saved.translatedLocales,
      failedLocales: saved.failedLocales,
    };
  } catch (error) {
    console.error("[disruption-digest] publish failed:", errorMessage(error));
    return { status: "skipped", reason: "publish_failed" };
  }
}

function existingDisruptions(records: CmsBlogRecord[]): ExistingDisruption[] {
  return records.filter((record) => isDisruptionSlug(record.slug)).map((record) => ({
    slug: record.slug,
    publishedAt: record.published_at ?? record.updated_at,
    title: record.translations.en?.title?.trim() || firstTitle(record),
  }));
}

function existingTitles(records: CmsBlogRecord[]): string[] {
  return existingDisruptions(records)
    .map((post) => post.title.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 8);
}

function firstTitle(record: CmsBlogRecord): string {
  for (const translation of Object.values(record.translations)) {
    const title = translation?.title?.trim();
    if (title) return title;
  }
  return "";
}

function buildResearchPrompt(titles: string[], now: Date): string {
  const covered = titles.length > 0 ? titles.map((title) => `- ${title.slice(0, 100)}`).join("\n") : "- none";
  const today = now.toISOString().slice(0, 10);
  return `Today is ${today} (UTC).

Search the live web once for one major flight disruption affecting passengers in the United Kingdom or the European Union during the last 3 days. Relevant events: an airport closure, an air traffic control strike or restriction, an airline strike, or widespread cancellations at one airport or airline.

Ignore a single delayed flight, rumours, social-media-only claims, and stories already covered:
${covered}

If you cannot find a new, material event reported by at least two independent https news or official sources, reply with exactly NOTHING_NEW and stop.

Otherwise write a research note of at most 700 words. Every fact and every number needs the source URL it came from. Do not estimate missing figures.`;
}

function buildStructurePrompt(notes: string, now: Date): string {
  return `Turn these research notes into one flight-disruption article. Today is ${now.toISOString().slice(0, 10)} (UTC).

Research notes:
${notes}

Rules:
- publish=false when the notes are thin, old, single-sourced, or already covered.
- confidence is high only when two independent sources agree. Use medium for two sources with some gaps. Use low when the notes are uncertain.
- eventDate is the disruption date as YYYY-MM-DD, not the publication date of an old recap.
- place is the airport, city, or country. reason is a short slug-friendly cause such as "atc strike".
- title and excerpt are plain English, with no markdown.
- contentMd is 4 to 6 short markdown paragraphs of what happened and who is affected. Do not write a rights or sources section. Do not invent numbers. Omit any figure that is not in the notes.
- sources are the https pages you used, with a short title and the URL. At least two different websites.
- stats only when a number is explicit in the notes. sourceUrl must be one of the source URLs. Otherwise return an empty stats array.

Return the object only.`;
}

async function researchDisruption(titles: string[], now: Date): Promise<string> {
  const google = createGoogleProvider();
  const run = (modelId: string) =>
    generateText({
      model: google(modelId),
      tools: {
        google_search: google.tools.googleSearch({}),
      },
      stopWhen: isStepCount(3),
      maxOutputTokens: 1200,
      temperature: 0.2,
      prompt: buildResearchPrompt(titles, now),
    });

  try {
    const { text } = await run(DIGEST_MODEL);
    return text.trim();
  } catch (error) {
    if (DIGEST_MODEL !== DIGEST_MODEL_FALLBACK && isUnavailableGeminiModelError(error)) {
      const { text } = await run(DIGEST_MODEL_FALLBACK);
      return text.trim();
    }
    throw error;
  }
}

async function structureDisruption(notes: string, now: Date): Promise<DisruptionDraftInput> {
  const google = createGoogleProvider();
  const run = (modelId: string) =>
    generateText({
      model: google(modelId),
      output: Output.object({ schema: disruptionDraftSchema }),
      maxOutputTokens: 4000,
      temperature: 0,
      // Gemini 3.x otherwise spends the output budget on thinking and returns nothing.
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      },
      prompt: buildStructurePrompt(notes, now),
    });

  try {
    const { output } = await run(DIGEST_MODEL);
    if (!output) {
      throw new Error("Empty disruption draft.");
    }
    return output;
  } catch (error) {
    if (
      DIGEST_MODEL !== DIGEST_MODEL_FALLBACK &&
      (isUnavailableGeminiModelError(error) || isEmptyOutputError(error))
    ) {
      const { output } = await run(DIGEST_MODEL_FALLBACK);
      if (!output) {
        throw new Error("Empty disruption draft.");
      }
      return output;
    }
    throw error;
  }
}

function buildPayload(
  article: { slug: string; title: string; excerpt: string; contentMd: string },
  now: Date,
): CmsWebhookPayload {
  const timestamp = now.toISOString();
  return {
    event: "post.published",
    siteId: disruptionSiteId(),
    timestamp,
    post: {
      id: randomUUID(),
      slug: article.slug,
      status: "published",
      updatedAt: timestamp,
      cover_image_url: COVER_IMAGE,
      locale: "en",
      title: article.title,
      excerpt: article.excerpt,
      content_md: article.contentMd,
      seo_title: article.title.slice(0, 70),
      meta_description: article.excerpt,
    },
  };
}

function disruptionSiteId(): string | undefined {
  const siteId = process.env.CMS_SITE_ID?.trim();
  if (!siteId) return undefined;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(siteId)) {
    return undefined;
  }
  return siteId;
}

function createGoogleProvider() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return createGoogleGenerativeAI({ apiKey });
}

function isEmptyOutputError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.toLowerCase().includes("no output generated");
}

function errorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  return message.slice(0, 300);
}
