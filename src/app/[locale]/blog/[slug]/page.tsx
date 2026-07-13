import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import BlogPostContent from "@/components/BlogPostContent";
import JsonLd from "@/components/seo/JsonLd";
import { parseBlogDisplayDate } from "@/lib/blog-date";
import { blogPosts, blogPostsBySlug } from "@/lib/blog-posts";
import { buildArticleMetadata } from "@/lib/site-metadata";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/structured-data";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    return { title: "Article not found | Compensall" };
  }

  return buildArticleMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.imageAlt,
    publishedTime: parseBlogDisplayDate(post.date),
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    notFound();
  }

  const publishedIso = parseBlogDisplayDate(post.date);
  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    datePublished: publishedIso,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <Header />

      <PageHero title={post.title} subtitle={post.excerpt} />

      <article className="px-4 md:px-8 lg:px-8 xl:px-12 pt-8 lg:pt-10 xl:pt-[80px] pb-0">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <div className="max-w-[760px] lg:max-w-[960px] xl:max-w-[1100px] mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-sm mb-6 hover:opacity-80"
            >
              ← Back to blog
            </Link>

            <div className="rounded-[20px] overflow-hidden border-2 border-[#d5e0f9] mb-8">
              <img
                src={post.image}
                alt={post.imageAlt}
                className="w-full aspect-[16/9] object-cover"
              />
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
