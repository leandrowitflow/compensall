import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import BlogPostContent from "@/components/BlogPostContent";
import { blogPosts, blogPostsBySlug } from "@/lib/blog-posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero title={post.title} subtitle={post.excerpt} />

      <article className="px-4 md:px-8 lg:px-8 xl:px-12 pt-8 lg:pt-10 xl:pt-[80px] pb-0">
        <div className="max-w-[760px] mx-auto">
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
              <time>{post.date}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <BlogPostContent blocks={post.body} />
        </div>
      </article>

      <div className="mt-4 xl:mt-8 pb-12 lg:pb-14 xl:pb-20">
        <CTABanner />
      </div>
      <Footer />
    </div>
  );
}
