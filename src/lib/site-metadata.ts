import type { Metadata } from "next";
import type { CatalogItem } from "@/lib/catalog";
import {
  buildCatalogMetadataDescription,
  buildCatalogTitle,
  type CatalogKind,
} from "@/lib/catalog-detail";

export const SITE_NAME = "Compensall";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://compensall.vercel.app";

export const SITE_DESCRIPTION =
  "Claim up to €600 for delayed, cancelled, or disrupted flights under EU regulation EC 261/2004. Secure boarding pass upload, human-backed support, no win no fee.";

export const DEFAULT_OG_IMAGE = "/assets/blog/flight-cancellation.png";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Claim up to €600 for your flight`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Claim up to €600 for your flight`,
    description: SITE_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – Claim up to €600 for your flight`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
  };
}

type ArticleMetadataInput = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  publishedTime: string;
  modifiedTime?: string;
};

export function buildArticleMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  publishedTime,
  modifiedTime,
}: ArticleMetadataInput): Metadata {
  const base = buildPageMetadata({ title, description, path, image });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime,
      modifiedTime: modifiedTime ?? publishedTime,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}

export function buildCatalogMetadata(item: CatalogItem, kind: CatalogKind): Metadata {
  const title = buildCatalogTitle(item, kind);
  const description = buildCatalogMetadataDescription(item, kind);
  const path = kind === "airlines" ? `/airlines/${item.id}` : `/airports/${item.id}`;

  return buildPageMetadata({ title, description, path });
}
