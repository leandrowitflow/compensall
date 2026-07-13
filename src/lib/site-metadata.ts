import type { Metadata } from "next";
import type { CatalogItem } from "@/lib/catalog";
import type { AppLocale } from "@/i18n/routing";
import {
  buildCatalogMetadataDescription,
  buildCatalogTitle,
  type CatalogKind,
} from "@/lib/catalog-detail";

export const SITE_NAME = "Compensall";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://compensall.vercel.app";

export const SITE_DESCRIPTION =
  "Delayed or cancelled flight? Claim up to £520 under UK261 or €600 under EC 261/2004. Secure boarding pass upload, human-backed support, no win no fee.";

export const DEFAULT_OG_IMAGE = "/assets/blog/flight-cancellation.jpg";

const OG_LOCALE_MAP: Record<AppLocale, string> = {
  en: "en_GB",
  pt: "pt_PT",
  fr: "fr_FR",
};

const FAVICON_ICONS = [
  {
    url: "/assets/favicon.svg",
    type: "image/svg+xml",
    media: "(prefers-color-scheme: light)",
  },
  {
    url: "/assets/favicon-dark.svg",
    type: "image/svg+xml",
    media: "(prefers-color-scheme: dark)",
  },
  {
    url: "/assets/favicon.png",
    type: "image/png",
    sizes: "96x96",
    media: "(prefers-color-scheme: light)",
  },
  {
    url: "/assets/favicon-dark.png",
    type: "image/png",
    sizes: "96x96",
    media: "(prefers-color-scheme: dark)",
  },
] as const;

type SiteMetadataMessages = {
  title: string;
  description: string;
};

export function getSiteMetadata(locale: AppLocale, messages?: SiteMetadataMessages): Metadata {
  const title = messages?.title ?? `${SITE_NAME} – Delayed or cancelled flight? Claim up to £520 or €600`;
  const description = messages?.description ?? SITE_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    icons: {
      icon: [...FAVICON_ICONS],
      apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE_MAP[locale],
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

/** @deprecated Use getSiteMetadata(locale) in locale layout */
export const siteMetadata: Metadata = getSiteMetadata("en");

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  locale?: AppLocale;
  image?: string;
  noIndex?: boolean;
};

function localizedPath(path: string, locale: AppLocale): string {
  if (path === "" || path === "/") {
    return `/${locale}`;
  }
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale = "en",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${localizedPath(path, locale)}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}${localizedPath(path, "en")}`,
        pt: `${SITE_URL}${localizedPath(path, "pt")}`,
        fr: `${SITE_URL}${localizedPath(path, "fr")}`,
      },
    },
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
