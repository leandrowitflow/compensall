import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { parseBlogDisplayDate } from "@/lib/blog-date";
import { blogPosts } from "@/lib/blog-posts";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Flight compensation guides and passenger rights",
  description:
    "Practical EC 261/2004 guides on delays, cancellations, denied boarding, missed connections, and how to claim up to €600.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        title="Blog"
        subtitle={
          <>
            Under EU regulation EC 261/2004, passengers on qualifying flights may claim fixed compensation of up to
            €600 for delays, cancellations, and denied boarding. These guides explain when you qualify and how to
            claim.
          </>
        }
      />

      <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-12 xl:pb-20 px-4 md:px-8 lg:px-8 xl:px-12">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border-2 border-[#d5e0f9] rounded-[20px] overflow-hidden flex flex-col min-h-[280px] xl:min-h-[312px]"
              >
                <div className="aspect-[16/9] overflow-hidden border-b-2 border-[#d5e0f9] relative">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 xl:p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-3 mb-2 text-sm">
                  <span className="text-[#2669f3] font-bold">{post.category}</span>
                  <div className="flex items-center gap-2 text-[#7b8094]">
                    <time dateTime={parseBlogDisplayDate(post.date)}>{post.date}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h2 className="font-bold text-[#1f3664] text-[17px] xl:text-[18px] mb-3 leading-snug flex-1">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#2669f3] transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-[#1f3664] text-sm xl:text-[15px] leading-relaxed mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-sm hover:opacity-80"
                >
                  Read article
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                    <path
                      d="M1 6h14M10 1l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
