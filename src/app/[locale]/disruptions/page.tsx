import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Link } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import { getDisruptionPosts } from "@/lib/blog";
import { gtmId } from "@/lib/gtm";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";

type DisruptionsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: DisruptionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/disruptions", "disruptions");
}

export default async function DisruptionsPage({ params }: DisruptionsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("disruptionsPage");
  const tHero = await getTranslations("home.hero");
  const posts = await getDisruptionPosts(locale as AppLocale);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <PageHero title={t("title")} subtitle={t("subtitle")} trustpilotAlt={tHero("trustpilotAlt")} />

      <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-12 xl:pb-20 px-4 md:px-8 lg:px-8 xl:px-12">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          {posts.length === 0 ? (
            <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed max-w-[720px]">
              {t("empty")}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white border-2 border-[#d5e0f9] rounded-[20px] overflow-hidden flex flex-col min-h-[280px] xl:min-h-[312px]"
                >
                  <div className="aspect-[16/9] overflow-hidden border-b-2 border-[#d5e0f9]">
                    <img src={post.image} alt={post.imageAlt} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 xl:p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-3 mb-2 text-sm">
                      <span className="text-[#2669f3] font-bold">{post.category}</span>
                      <time className="text-[#7b8094]">{post.date}</time>
                    </div>
                    <h2 className="font-bold text-[#1f3664] text-[17px] xl:text-[18px] leading-snug mb-3">
                      {post.title}
                    </h2>
                    <p className="text-[#1f3664] text-sm xl:text-[15px] leading-[1.7] flex-1">{post.excerpt}</p>
                    <Link
                      href={`/disruptions/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-[17px] xl:text-[18px] mt-5 hover:opacity-80 transition-opacity"
                      {...gtmId("disruption_read_article")}
                    >
                      {t("readArticle")}
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
