import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { blogPosts } from "@/lib/blog-posts";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        title="Blog"
        subtitle={
          <>
            Guides on flight cancellation, delays, denied boarding, and more — so you know your rights
            before you fly.
          </>
        }
      />

      <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-12 xl:pb-20 px-4 md:px-8 lg:px-8 xl:px-12">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8 flex flex-col min-h-[280px] xl:min-h-[312px]"
              >
                <div className="h-16 xl:h-[87px] mb-5 flex items-start">
                  <img
                    src={post.image}
                    alt=""
                    className="h-full w-auto max-w-[109px] object-contain object-left"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 mb-2 text-sm">
                  <span className="text-[#2669f3] font-bold">{post.category}</span>
                  <time className="text-[#7b8094]">{post.date}</time>
                </div>
                <h2 className="font-bold text-[#1f3664] text-[17px] xl:text-[18px] leading-snug mb-3">
                  {post.title}
                </h2>
                <p className="text-[#1f3664] text-sm xl:text-[15px] leading-[1.7] flex-1">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-[17px] xl:text-[18px] mt-5 hover:opacity-80 transition-opacity"
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
