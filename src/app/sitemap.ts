import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { airlinesCatalog, airportsCatalog } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site-metadata";

const STATIC_ROUTES = [
  "",
  "/about",
  "/blog",
  "/know-your-rights",
  "/airlines",
  "/documents/authority-to-act",
  "/documents/no-win-no-fee",
  "/documents/privacy-data-consent",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const airlineEntries: MetadataRoute.Sitemap = airlinesCatalog.map((item) => ({
    url: `${SITE_URL}/airlines/${item.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const airportEntries: MetadataRoute.Sitemap = airportsCatalog.map((item) => ({
    url: `${SITE_URL}/airports/${item.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...airlineEntries, ...airportEntries];
}
