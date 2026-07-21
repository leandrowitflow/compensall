import { unstable_cache } from "next/cache";
import type { AppLocale } from "@/i18n/routing";
import {
  CMS_BLOG_TAG,
  cmsRecordToBlogPost,
  listCmsBlogRecords,
} from "@/lib/cms-blog-store";
import type { BlogPost } from "./types";
import { blogPostsEn } from "./posts.en";
import { blogPostsFr } from "./posts.fr";
import { blogPostsPt } from "./posts.pt";

const blogPostsByLocale: Record<AppLocale, BlogPost[]> = {
  en: blogPostsEn,
  pt: blogPostsPt,
  fr: blogPostsFr,
};

const getCachedCmsRecords = unstable_cache(
  async () => listCmsBlogRecords(),
  ["cms-blog-posts-list"],
  { tags: [CMS_BLOG_TAG] },
);

function mergePosts(staticPosts: BlogPost[], cmsPosts: BlogPost[]): BlogPost[] {
  const cmsSlugs = new Set(cmsPosts.map((post) => post.slug));
  const legacyPosts = staticPosts.filter((post) => !cmsSlugs.has(post.slug));
  return [...cmsPosts, ...legacyPosts];
}

export async function getBlogPosts(locale: AppLocale): Promise<BlogPost[]> {
  const staticPosts = blogPostsByLocale[locale] ?? blogPostsEn;
  const records = await getCachedCmsRecords();
  const cmsPosts = records
    .map((record) => cmsRecordToBlogPost(record, locale))
    .filter((post): post is BlogPost => post !== null);

  return mergePosts(staticPosts, cmsPosts);
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
