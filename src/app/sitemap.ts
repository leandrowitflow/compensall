import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { airlinesCatalog, airportsCatalog } from "@/lib/catalog";
import { routing, type AppLocale } from "@/i18n/routing";
import { localizedPath, SITE_URL } from "@/lib/site-metadata";

const STATIC_ROUTES = [
  "",
  "/about",
  "/blog",
  "/know-your-rights",
  "/airlines",
  "/privacy-policy",
  "/terms",
  "/cookies",
  "/faq",
  "/prices",
  "/documents/authority-to-act",
  "/documents/no-win-no-fee",
  "/documents/privacy-data-consent",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_ROUTES) {
      entries.push({
        url: `${SITE_URL}${localizedPath(path, locale as AppLocale)}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const post of await getBlogPosts(locale as AppLocale)) {
      entries.push({
        url: `${SITE_URL}${localizedPath(`/blog/${post.slug}`, locale as AppLocale)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const item of airlinesCatalog) {
      entries.push({
        url: `${SITE_URL}${localizedPath(`/airlines/${item.id}`, locale as AppLocale)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const item of airportsCatalog) {
      entries.push({
        url: `${SITE_URL}${localizedPath(`/airports/${item.id}`, locale as AppLocale)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
