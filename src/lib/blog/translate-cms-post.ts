import { generateText, Output } from "ai";
import { z } from "zod";
import { type AppLocale, locales } from "@/i18n/routing";
import { normalizeMarkdownInternalLinks } from "@/lib/blog/normalize-internal-href";
import type { CmsWebhookTranslation } from "@/lib/cms-webhook/types";
import { isGeminiConfigured, withGeminiModelFallback } from "@/lib/gemini";
import { polishPublicCopy } from "@/lib/public-copy";

const SOURCE_LOCALE_ORDER = ["en", "pt", "fr"] as const;
const SITE_ORIGIN = "https://www.compensall.com";
const TRANSLATION_CONCURRENCY = 3;

const LOCALE_TRANSLATION_NOTES: Record<AppLocale, string> = {
  en: "English (UK). Use British spelling.",
  pt: "European Portuguese from Portugal, not Brazilian Portuguese. Address the reader as você / o seu.",
  fr: "French from France. Address the reader as vous. Do not put a space before ? ! : ;",
  es: "Spanish from Spain. Address the reader as tú.",
  ro: "Romanian. Address the reader as tu.",
  hu: "Hungarian. Address the reader as te.",
  sq: "Albanian. Address the reader as ti.",
  de: "German. Address the reader as Sie.",
  nl: "Dutch. Address the reader as u.",
};

const translatedPostSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string(),
  seo_title: z.string(),
  meta_description: z.string(),
  content_md: z.string().min(1),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
});

type TranslatedPost = z.infer<typeof translatedPostSchema>;

export type BlogTranslationFillResult = {
  translations: Record<string, CmsWebhookTranslation>;
  translatedLocales: AppLocale[];
  failedLocales: AppLocale[];
};

function isUsableTranslation(translation: CmsWebhookTranslation | undefined): boolean {
  return Boolean(translation?.title?.trim() && translation?.content_md?.trim());
}

function sourceFingerprint(translation: CmsWebhookTranslation | undefined): string {
  return [translation?.title ?? "", translation?.excerpt ?? "", translation?.content_md ?? ""].join(
    "\n",
  );
}

export function pickBlogSourceLocale(
  translations: Record<string, CmsWebhookTranslation>,
): AppLocale | null {
  for (const locale of SOURCE_LOCALE_ORDER) {
    if (isUsableTranslation(translations[locale])) {
      return locale;
    }
  }

  for (const locale of locales) {
    if (isUsableTranslation(translations[locale])) {
      return locale;
    }
  }

  return null;
}

export function blogLocalesToTranslate(input: {
  translations: Record<string, CmsWebhookTranslation>;
  previous: Record<string, CmsWebhookTranslation> | null;
  cmsLocales: ReadonlySet<string>;
}): AppLocale[] {
  const sourceLocale = pickBlogSourceLocale(input.translations);
  if (!sourceLocale) {
    return [];
  }

  const source = input.translations[sourceLocale];
  const previousSource = input.previous?.[sourceLocale];
  const sourceChanged = sourceFingerprint(previousSource) !== sourceFingerprint(source);

  return locales.filter((locale) => {
    if (locale === sourceLocale) {
      return false;
    }
    if (input.cmsLocales.has(locale) && isUsableTranslation(input.translations[locale])) {
      return false;
    }
    if (!sourceChanged && isUsableTranslation(input.translations[locale])) {
      return false;
    }
    return true;
  });
}

function stripMarkdownFence(text: string): string {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:markdown|md)?\s*([\s\S]*?)```$/i);
  return (fenced?.[1] ?? trimmed).trim();
}

function buildJsonLd(input: {
  locale: AppLocale;
  slug: string;
  title: string;
  description: string;
  faqs: Array<{ question: string; answer: string }>;
}): Record<string, unknown> {
  const graph: unknown[] = [
    {
      "@type": "BlogPosting",
      headline: input.title,
      description: input.description,
      inLanguage: input.locale,
      author: { "@type": "Organization", name: "Compensall", url: SITE_ORIGIN },
      publisher: { "@type": "Organization", name: "Compensall", url: SITE_ORIGIN },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/${input.locale}/blog/${input.slug}`,
      },
    },
  ];

  const faqs = input.faqs.filter((faq) => faq.question.trim() && faq.answer.trim());
  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question.trim(),
        acceptedAnswer: { "@type": "Answer", text: faq.answer.trim() },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function buildTranslationPrompt(locale: AppLocale, source: CmsWebhookTranslation): string {
  return `Translate this Compensall blog post into ${LOCALE_TRANSLATION_NOTES[locale]}

Rules:
- Translate the full article. Do not summarise or omit sections.
- Keep the markdown structure: headings, lists, bold, and links.
- Do not change URLs inside markdown links.
- Keep the brand phrase "No win, no fee" in English, exactly.
- Keep the name Compensall unchanged.
- Keep numbers, dates, currencies, airline names, and legal citations.
- When the source mentions EC 261 or Regulation (EC) No 261/2004, use the usual name in the target language.
- Return FAQ pairs only when the article has a frequently asked questions section.

Title: ${source.title ?? ""}
Excerpt: ${source.excerpt ?? ""}
SEO title: ${source.seo_title ?? source.title ?? ""}
Meta description: ${source.meta_description ?? source.excerpt ?? ""}

Markdown:
${source.content_md ?? ""}`;
}

async function translateOneLocale(
  locale: AppLocale,
  slug: string,
  source: CmsWebhookTranslation,
): Promise<CmsWebhookTranslation> {
  const translated = await withGeminiModelFallback(async (model) => {
    const { output } = await generateText({
      model,
      output: Output.object({ schema: translatedPostSchema }),
      prompt: buildTranslationPrompt(locale, source),
    });
    if (!output) {
      throw new Error(`Empty translation for ${locale}`);
    }
    return output;
  }, "text");

  return toCmsTranslation(locale, slug, source, translated);
}

function toCmsTranslation(
  locale: AppLocale,
  slug: string,
  source: CmsWebhookTranslation,
  translated: TranslatedPost,
): CmsWebhookTranslation {
  const contentMd = polishPublicCopy(
    normalizeMarkdownInternalLinks(stripMarkdownFence(translated.content_md)),
    locale,
  );
  const title = polishPublicCopy(translated.title.trim(), locale);
  const excerpt = polishPublicCopy(translated.excerpt.trim(), locale);
  const description = polishPublicCopy(
    (translated.meta_description || translated.excerpt).trim(),
    locale,
  );

  if (!title || contentMd.length < 80) {
    throw new Error(`Translation for ${locale} was too short.`);
  }

  return {
    title,
    excerpt,
    seo_title: polishPublicCopy((translated.seo_title || translated.title).trim(), locale),
    meta_description: description,
    content_md: contentMd,
    json_ld: buildJsonLd({
      locale,
      slug,
      title,
      description,
      faqs: translated.faqs,
    }),
    author: source.author ?? null,
  };
}

async function translateWithRetry(
  locale: AppLocale,
  slug: string,
  source: CmsWebhookTranslation,
): Promise<CmsWebhookTranslation> {
  try {
    return await translateOneLocale(locale, slug, source);
  } catch (error) {
    console.error(`Blog translation failed for ${locale} (${slug}), retrying:`, error);
    return translateOneLocale(locale, slug, source);
  }
}

async function runPool(localesToFill: AppLocale[], worker: (locale: AppLocale) => Promise<void>): Promise<void> {
  const queue = [...localesToFill];
  const workers = Array.from({ length: Math.min(TRANSLATION_CONCURRENCY, queue.length) }, async () => {
    while (queue.length > 0) {
      const locale = queue.shift();
      if (!locale) {
        return;
      }
      await worker(locale);
    }
  });
  await Promise.all(workers);
}

export async function fillMissingBlogTranslations(input: {
  slug: string;
  translations: Record<string, CmsWebhookTranslation>;
  previous: Record<string, CmsWebhookTranslation> | null;
  cmsLocales: ReadonlySet<string>;
  onProgress?: (translations: Record<string, CmsWebhookTranslation>) => Promise<void>;
}): Promise<BlogTranslationFillResult> {
  const targets = blogLocalesToTranslate(input);
  const sourceLocale = pickBlogSourceLocale(input.translations);
  const source = sourceLocale ? input.translations[sourceLocale] : undefined;

  if (!source || !sourceLocale || targets.length === 0) {
    return { translations: input.translations, translatedLocales: [], failedLocales: [] };
  }

  if (!isGeminiConfigured()) {
    console.error(
      `Blog ${input.slug} is missing ${targets.join(", ")} and GEMINI_API_KEY is not configured.`,
    );
    return { translations: input.translations, translatedLocales: [], failedLocales: targets };
  }

  const translations = { ...input.translations };
  const translatedLocales: AppLocale[] = [];
  const failedLocales: AppLocale[] = [];

  await runPool(targets, async (locale) => {
    try {
      translations[locale] = await translateWithRetry(locale, input.slug, source);
      await input.onProgress?.(translations);
      translatedLocales.push(locale);
    } catch (error) {
      failedLocales.push(locale);
      console.error(`Blog translation failed for ${locale} (${input.slug}):`, error);
    }
  });

  if (translatedLocales.length > 0) {
    console.info(
      `Translated blog ${input.slug} from ${sourceLocale} into ${translatedLocales.join(", ")}.`,
    );
  }

  return { translations, translatedLocales, failedLocales };
}
