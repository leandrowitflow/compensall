import type { Metadata } from "next";
import type { CatalogItem } from "@/lib/catalog";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  buildCatalogMetadataDescription,
  buildCatalogTitle,
  type CatalogKind,
} from "@/lib/catalog-detail";

export const SITE_NAME = "Compensall";

const PRODUCTION_SITE_URL = "https://compensall.com";

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv && !fromEnv.includes("localhost")) {
    return fromEnv;
  }

  const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  if (process.env.NODE_ENV === "development") {
    return fromEnv ?? "http://localhost:3000";
  }

  return PRODUCTION_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();

export const SITE_DESCRIPTION =
  "Delayed or cancelled flight? Claim up to £520 under UK261 or €600 under EC 261/2004. Secure boarding pass upload, human-backed support, no win no fee.";

export const DEFAULT_OG_IMAGE = "/assets/blog/flight-cancellation.jpg";

export const HTML_LANG_MAP: Record<AppLocale, string> = {
  en: "en-GB",
  pt: "pt-PT",
  fr: "fr-FR",
};

const HREFLANG_MAP: Record<AppLocale, string> = {
  en: "en-GB",
  pt: "pt-PT",
  fr: "fr-FR",
};

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

export function localizedPath(path: string, locale: AppLocale): string {
  if (path === "" || path === "/") {
    return `/${locale}`;
  }
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildHreflangAlternates(path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[HREFLANG_MAP[locale]] = `${SITE_URL}${localizedPath(path, locale)}`;
  }

  languages["x-default"] = `${SITE_URL}${localizedPath(path, routing.defaultLocale)}`;

  return {
    canonical: undefined,
    languages,
  };
}

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
      url: `${SITE_URL}${localizedPath("/", locale)}`,
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

export function buildPageMetadata({
  title,
  description,
  path,
  locale = "en",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${localizedPath(path, locale)}`;
  const hreflang = buildHreflangAlternates(path);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: hreflang?.languages,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      locale: OG_LOCALE_MAP[locale],
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
  locale?: AppLocale;
  image: string;
  imageAlt: string;
  publishedTime: string;
  modifiedTime?: string;
};

export function buildArticleMetadata({
  title,
  description,
  path,
  locale = "en",
  image,
  imageAlt,
  publishedTime,
  modifiedTime,
}: ArticleMetadataInput): Metadata {
  const base = buildPageMetadata({ title, description, path, locale, image });

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

export function buildCatalogMetadata(
  item: CatalogItem,
  kind: CatalogKind,
  locale: AppLocale = "en",
): Metadata {
  const title = buildCatalogTitle(item, kind);
  const description = buildCatalogMetadataDescription(item, kind);
  const path = kind === "airlines" ? `/airlines/${item.id}` : `/airports/${item.id}`;

  return buildPageMetadata({ title, description, path, locale });
}
