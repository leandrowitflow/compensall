import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
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

      <article className="px-4 md:px-8 lg:px-8 xl:px-12 pt-10 xl:pt-14 pb-0">
        <div className="max-w-[760px] mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-sm mb-6 hover:opacity-80"
          >
            ← Back to blog
          </Link>

          <div className="h-16 xl:h-[87px] mb-6">
            <img
              src={post.image}
              alt=""
              className="h-full w-auto max-w-[109px] object-contain object-left"
            />
          </div>

          <div className="flex items-center justify-between gap-4 mb-4 text-sm flex-wrap">
            <span className="text-[#2669f3] font-bold">{post.category}</span>
            <time className="text-[#7b8094]">{post.date}</time>
          </div>

          <h1 className="font-['Open_Sans',sans-serif] font-bold text-3xl md:text-4xl lg:text-[34px] xl:text-[44px] text-[#1f3664] leading-[1.2] mb-8">
            {post.title}
          </h1>

          <div className="space-y-5 text-[#1f3664] text-base xl:text-[17px] leading-relaxed pb-12 xl:pb-16">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
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
