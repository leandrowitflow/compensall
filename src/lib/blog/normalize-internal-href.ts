import { locales } from "@/i18n/routing";

const LOCALE_SET = new Set<string>(locales);

const SITE_HOSTS = new Set([
  "compensall.com",
  "www.compensall.com",
]);

/** Old CMS / marketing paths → current App Router paths (locale-less). */
const LEGACY_PATH_REWRITES: Record<string, string> = {
  "/blog/direitos-passageiros": "/blog/passenger-rights",
  "/blog/voo-cancelado": "/blog/flight-cancellation",
  "/servicos/reclamacao-voo": "/#claim",
};

/**
 * Convert CMS/markdown hrefs into locale-less paths for next-intl `Link`.
 * CMS content often stores `/pt/blog/...` or absolute site URLs; `Link` would
 * otherwise prefix the active locale again (`/pt/pt/blog/...`).
 */
export function normalizeInternalHref(href: string): string | null {
  const trimmed = href.trim();
  if (!trimmed) return null;

  let pathname = trimmed;

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      if (!SITE_HOSTS.has(url.hostname.toLowerCase())) {
        return null;
      }
      pathname = `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return null;
    }
  }

  if (!pathname.startsWith("/")) {
    return null;
  }

  return rewriteLegacyPath(stripLocalePrefix(pathname));
}

export function stripLocalePrefix(pathname: string): string {
  let current = pathname;
  // CMS sometimes embeds already-broken double locales like /pt/pt/blog/...
  for (let i = 0; i < locales.length; i += 1) {
    const match = current.match(/^\/([^/?#]+)(\/[^?#]*)?([?#].*)?$/);
    if (!match) break;

    const maybeLocale = match[1]!;
    if (!LOCALE_SET.has(maybeLocale)) break;

    const restPath = match[2];
    const suffix = match[3] ?? "";
    current = `${restPath && restPath.length > 0 ? restPath : "/"}${suffix}`;
  }
  return current;
}

function rewriteLegacyPath(pathname: string): string {
  const match = pathname.match(/^([^?#]*)([?#].*)?$/);
  if (!match) return pathname;

  const pathOnly = match[1]!;
  const suffix = match[2] ?? "";
  const rewritten = LEGACY_PATH_REWRITES[pathOnly];
  return rewritten ? `${rewritten}${suffix}` : pathname;
}

/** Rewrite locale-prefixed / absolute Compensall links inside CMS markdown. */
export function normalizeMarkdownInternalLinks(markdown: string): string {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (full, label: string, href: string) => {
    const normalized = normalizeInternalHref(href);
    if (!normalized || normalized === href) {
      return full;
    }
    return `[${label}](${normalized})`;
  });
}
