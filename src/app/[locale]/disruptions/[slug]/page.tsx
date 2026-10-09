import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import BlogPostContent from "@/components/BlogPostContent";
import JsonLd from "@/components/seo/JsonLd";
import { Link } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import { parseBlogDisplayDate } from "@/lib/blog-date";
import { getDisruptionPost, getDisruptionPosts } from "@/lib/blog";
import { gtmId } from "@/lib/gtm";
import { buildArticleMetadata, localizedPath } from "@/lib/site-metadata";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/structured-data";

type DisruptionArticlePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getDisruptionPosts("en");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: DisruptionArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const appLocale = locale as AppLocale;
  const post = await getDisruptionPost(slug, appLocale);

  if (!post) {
    return { title: "Update not found | Compensall" };
  }

  return buildArticleMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/disruptions/${post.slug}`,
    locale: appLocale,
    image: post.image,
    imageAlt: post.imageAlt,
    publishedTime: parseBlogDisplayDate(post.date),
  });
}

export default async function DisruptionArticlePage({ params }: DisruptionArticlePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const appLocale = locale as AppLocale;
  const post = await getDisruptionPost(slug, appLocale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations("disruptionsPage");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const tHero = await getTranslations("home.hero");
  const articlePath = `/disruptions/${post.slug}`;
  const publishedIso = parseBlogDisplayDate(post.date);

  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.excerpt,
    path: localizedPath(articlePath, appLocale),
    image: post.image,
    datePublished: publishedIso,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tCommon("home"), path: localizedPath("/", appLocale) },
    { name: tNav("disruptions"), path: localizedPath("/disruptions", appLocale) },
    { name: post.title, path: localizedPath(articlePath, appLocale) },
  ]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <Header />

      <PageHero title={post.title} subtitle={post.excerpt} trustpilotAlt={tHero("trustpilotAlt")} />

      <article className="px-4 md:px-8 lg:px-8 xl:px-12 pt-8 lg:pt-10 xl:pt-[80px] pb-0">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <div className="max-w-[760px] lg:max-w-[960px] xl:max-w-[1100px] mx-auto">
            <Link
              href="/disruptions"
              className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-sm mb-6 hover:opacity-80"
              {...gtmId("disruption_back")}
            >
              ← {t("backToList")}
            </Link>

            <div className="rounded-[20px] overflow-hidden border-2 border-[#d5e0f9] mb-8">
              <img src={post.image} alt={post.imageAlt} className="w-full aspect-[16/9] object-cover" />
            </div>

            <div className="flex items-center justify-between gap-4 mb-8 text-sm flex-wrap">
              <span className="text-[#2669f3] font-bold">{post.category}</span>
              <div className="flex items-center gap-3 text-[#7b8094]">
                <time dateTime={publishedIso}>{post.date}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <BlogPostContent blocks={post.body} />
          </div>
        </div>
      </article>

      <div className="mt-4 xl:mt-8 pb-12 lg:pb-14 xl:pb-20">
        <CTABanner />
      </div>
      <Footer />
    </div>
  );
}
