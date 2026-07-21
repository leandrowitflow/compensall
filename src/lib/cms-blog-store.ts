import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AppLocale } from "@/i18n/routing";
import { estimateReadTime, markdownToBlocks } from "@/lib/blog/markdown-to-blocks";
import type { BlogPost } from "@/lib/blog/types";
import { formatBlogDisplayDate } from "@/lib/blog-date";
import type { CmsWebhookPayload, CmsWebhookTranslation } from "@/lib/cms-webhook/types";
import { supabaseRestUrl } from "@/lib/supabase-rest";

export const CMS_BLOG_TAG = "cms-blog-posts";

const LOCAL_CMS_DIR = path.join(process.cwd(), "data", "cms-posts");
const LOCAL_INDEX_PATH = path.join(LOCAL_CMS_DIR, "index.json");

export type CmsBlogRecord = {
  id: string;
  slug: string;
  status: string;
  cover_image_url: string | null;
  primary_locale: string;
  published_at: string | null;
  updated_at: string;
  cms_site_id: string | null;
  translations: Record<string, CmsWebhookTranslation>;
};

type LocalIndex = {
  posts: Record<string, CmsBlogRecord>;
};

function hasSupabaseConfig(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function supabaseHeaders(): Record<string, string> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function normalizeTranslations(
  payload: CmsWebhookPayload["post"],
): Record<string, CmsWebhookTranslation> {
  const translations = { ...(payload.translations ?? {}) };

  if (payload.locale && (payload.title || payload.content_md)) {
    translations[payload.locale] = {
      title: payload.title,
      excerpt: payload.excerpt,
      content_md: payload.content_md,
      seo_title: payload.seo_title,
      meta_description: payload.meta_description,
      json_ld: payload.json_ld,
      author: payload.author,
      ...translations[payload.locale],
    };
  }

  return translations;
}

function payloadToRecord(payload: CmsWebhookPayload): CmsBlogRecord {
  const post = payload.post;
  const updatedAt = post.updatedAt ?? payload.timestamp ?? new Date().toISOString();

  return {
    id: post.id,
    slug: post.slug,
    status: post.status ?? "published",
    cover_image_url: post.cover_image_url ?? null,
    primary_locale: post.locale ?? "en",
    published_at: post.status === "published" ? updatedAt : null,
    updated_at: updatedAt,
    cms_site_id: payload.siteId ?? null,
    translations: normalizeTranslations(post),
  };
}

async function readLocalIndex(): Promise<LocalIndex> {
  try {
    const raw = await readFile(LOCAL_INDEX_PATH, "utf8");
    return JSON.parse(raw) as LocalIndex;
  } catch {
    return { posts: {} };
  }
}

async function writeLocalIndex(index: LocalIndex): Promise<void> {
  await mkdir(LOCAL_CMS_DIR, { recursive: true });
  await writeFile(LOCAL_INDEX_PATH, JSON.stringify(index, null, 2), "utf8");
}

async function upsertLocal(record: CmsBlogRecord): Promise<void> {
  const index = await readLocalIndex();
  index.posts[record.slug] = record;
  await writeLocalIndex(index);
}

async function deleteLocal(slug: string): Promise<void> {
  const index = await readLocalIndex();
  delete index.posts[slug];
  await writeLocalIndex(index);
}

async function listLocal(): Promise<CmsBlogRecord[]> {
  const index = await readLocalIndex();
  return Object.values(index.posts).filter((post) => post.status === "published");
}

async function upsertSupabase(record: CmsBlogRecord): Promise<void> {
  const response = await fetch(`${supabaseRestUrl("cms_blog_posts")}?on_conflict=slug`, {
    method: "POST",
    headers: {
      ...supabaseHeaders(),
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      id: record.id,
      slug: record.slug,
      status: record.status,
      cover_image_url: record.cover_image_url,
      primary_locale: record.primary_locale,
      published_at: record.published_at,
      updated_at: record.updated_at,
      cms_site_id: record.cms_site_id,
      translations: record.translations,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    if (response.status === 404 && body.includes("cms_blog_posts")) {
      throw new Error(
        "cms_blog_posts table not found — run supabase/migrations/005_cms_blog_posts.sql",
      );
    }
    throw new Error(`Supabase upsert failed (${response.status}): ${body.slice(0, 200)}`);
  }
}

async function deleteSupabase(slug: string): Promise<void> {
  const response = await fetch(
    `${supabaseRestUrl("cms_blog_posts")}?slug=eq.${encodeURIComponent(slug)}`,
    {
      method: "DELETE",
      headers: supabaseHeaders(),
    },
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Supabase delete failed (${response.status}): ${body.slice(0, 200)}`);
  }
}

async function listSupabase(): Promise<CmsBlogRecord[]> {
  const response = await fetch(
    `${supabaseRestUrl("cms_blog_posts")}?status=eq.published&select=*&order=updated_at.desc`,
    {
      headers: supabaseHeaders(),
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Supabase list failed (${response.status}): ${body.slice(0, 200)}`);
  }

  return (await response.json()) as CmsBlogRecord[];
}

export async function upsertCmsBlogPost(payload: CmsWebhookPayload): Promise<CmsBlogRecord> {
  const record = payloadToRecord(payload);

  if (hasSupabaseConfig()) {
    await upsertSupabase(record);
  } else {
    await upsertLocal(record);
  }

  return record;
}

export async function deleteCmsBlogPost(slug: string): Promise<void> {
  if (hasSupabaseConfig()) {
    await deleteSupabase(slug);
  } else {
    await deleteLocal(slug);
  }
}

export async function listCmsBlogRecords(): Promise<CmsBlogRecord[]> {
  if (hasSupabaseConfig()) {
    return listSupabase();
  }
  return listLocal();
}

function pickTranslation(
  record: CmsBlogRecord,
  locale: AppLocale,
): CmsWebhookTranslation | null {
  const direct = record.translations[locale];
  if (direct?.title) {
    return direct;
  }

  const fallbacks: AppLocale[] = ["en", "pt", "fr"];
  for (const fallback of fallbacks) {
    const candidate = record.translations[fallback];
    if (candidate?.title) {
      return candidate;
    }
  }

  return null;
}

export function cmsRecordToBlogPost(record: CmsBlogRecord, locale: AppLocale): BlogPost | null {
  const translation = pickTranslation(record, locale);
  if (!translation?.title) {
    return null;
  }

  const contentMd = translation.content_md ?? "";
  const dateSource = record.published_at ?? record.updated_at;

  return {
    slug: record.slug,
    category: "Blog",
    date: formatBlogDisplayDate(dateSource),
    readTime: estimateReadTime(contentMd),
    title: translation.title,
    excerpt: translation.excerpt ?? "",
    image: record.cover_image_url ?? "/assets/blog/flight-cancellation.jpg",
    imageAlt: translation.title,
    body: markdownToBlocks(contentMd),
  };
}

export function isDeleteEvent(event: string): boolean {
  return (
    event === "post.deleted" ||
    event === "post.unpublished" ||
    event === "cms.post.deleted"
  );
}

export function isUpsertEvent(event: string): boolean {
  return (
    event === "post.published" ||
    event === "post.updated" ||
    event === "cms.post.published" ||
    event === "cms.post.updated"
  );
}
