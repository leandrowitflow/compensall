import { unstable_cache } from "next/cache";
import type { AppLocale } from "@/i18n/routing";
import {
  CMS_BLOG_TAG,
  cmsRecordToBlogPost,
  listCmsBlogRecords,
  type CmsBlogRecord,
} from "@/lib/cms-blog-store";
import { isDisruptionSlug } from "@/lib/disruptions/guards";
import type { BlogPost } from "./types";
import { blogPostsEn } from "./posts.en";
import { blogPostsEs } from "./posts.es";
import { blogPostsFr } from "./posts.fr";
import { blogPostsPt } from "./posts.pt";
import { blogPostsHu } from "./posts.hu";
import { blogPostsRo } from "./posts.ro";
import { blogPostsDe } from "./posts.de";
import { blogPostsNl } from "./posts.nl";
import { blogPostsSq } from "./posts.sq";

const blogPostsByLocale: Record<AppLocale, BlogPost[]> = {
  en: blogPostsEn,
  pt: blogPostsPt,
  "pt-BR": blogPostsPt,
  fr: blogPostsFr,
  es: blogPostsEs,
  ro: blogPostsRo,
  hu: blogPostsHu,
  sq: blogPostsSq,
  de: blogPostsDe,
  nl: blogPostsNl,
};

const TRANSLATION_FALLBACKS: AppLocale[] = ["en", "pt", "fr", "es", "ro", "hu", "sq", "de", "nl"];

function slimRecord(record: CmsBlogRecord, locale: AppLocale): CmsBlogRecord {
  const direct = record.translations[locale];
  if (direct?.title?.trim() && direct.content_md?.trim()) {
    return { ...record, translations: { [locale]: direct } };
  }

  const fallbacks: AppLocale[] =
    locale === "pt-BR" ? ["pt", "en", "fr", "es", "ro", "hu", "sq", "de", "nl"] : TRANSLATION_FALLBACKS;
  for (const fallback of fallbacks) {
    const candidate = record.translations[fallback];
    if (candidate?.title?.trim() && candidate.content_md?.trim()) {
      return { ...record, translations: { [fallback]: candidate } };
    }
  }

  return { ...record, translations: {} };
}

/** One locale per cache entry. The full ten-language payload is over the 2MB cache limit. */
const getCachedCmsRecords = unstable_cache(
  async (locale: AppLocale) => {
    const records = await listCmsBlogRecords();
    return records.map((record) => slimRecord(record, locale));
  },
  ["cms-blog-posts-by-locale", "pt-br-blog-2026-11-05"],
  { tags: [CMS_BLOG_TAG] },
);

function mergePosts(staticPosts: BlogPost[], cmsPosts: BlogPost[]): BlogPost[] {
  const cmsSlugs = new Set(cmsPosts.map((post) => post.slug));
  const legacyPosts = staticPosts.filter((post) => !cmsSlugs.has(post.slug));
  return [...cmsPosts, ...legacyPosts];
}

export async function getBlogPosts(locale: AppLocale): Promise<BlogPost[]> {
  const staticPosts = blogPostsByLocale[locale] ?? blogPostsEn;
  const records = await getCachedCmsRecords(locale);
  const cmsPosts = records
    .filter((record) => !isDisruptionSlug(record.slug))
    .map((record) => cmsRecordToBlogPost(record, locale))
    .filter((post): post is BlogPost => post !== null);

  return mergePosts(staticPosts, cmsPosts);
}

export async function getDisruptionPosts(locale: AppLocale): Promise<BlogPost[]> {
  const records = await getCachedCmsRecords(locale);
  return records
    .filter((record) => isDisruptionSlug(record.slug))
    .map((record) => cmsRecordToBlogPost(record, locale))
    .filter((post): post is BlogPost => post !== null);
}

export async function getDisruptionPost(
  slug: string,
  locale: AppLocale,
): Promise<BlogPost | undefined> {
  if (!isDisruptionSlug(slug)) return undefined;
  const posts = await getDisruptionPosts(locale);
  return posts.find((post) => post.slug === slug);
}

export async function getBlogPost(
  slug: string,
  locale: AppLocale,
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts(locale);
  return posts.find((post) => post.slug === slug);
}

export async function getBlogPostsBySlug(
  locale: AppLocale,
): Promise<Record<string, BlogPost>> {
  const posts = await getBlogPosts(locale);
  return Object.fromEntries(posts.map((post) => [post.slug, post]));
}

export type { BlogBlock, BlogPost } from "./types";
