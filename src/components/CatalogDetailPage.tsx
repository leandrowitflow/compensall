import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import CatalogClaimSection from "@/components/CatalogClaimSection";
import CatalogLogo from "@/components/CatalogLogo";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildCatalogFaqs,
  buildCatalogIntro,
  buildCatalogTitle,
  type CatalogKind,
} from "@/lib/catalog-detail";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/structured-data";
import type { CatalogItem } from "@/lib/catalog";

type CatalogDetailPageProps = {
  item: CatalogItem;
  kind: CatalogKind;
};

export default function CatalogDetailPage({ item, kind }: CatalogDetailPageProps) {
  const title = buildCatalogTitle(item, kind);
  const intro = buildCatalogIntro(item, kind);
  const faqs = buildCatalogFaqs(item, kind);

  const claimHeadline =
    kind === "airlines"
      ? `Ready to claim against ${item.name}?`
      : `Ready to check your claim from ${item.name}?`;

  const claimSubheadline =
    "Use our boarding pass assistant on the homepage. It's fast, secure, and no win, no fee.";

  const claimCtaLabel = "Check compensation";
  const catalogPath = kind === "airlines" ? `/airlines/${item.id}` : `/airports/${item.id}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <JsonLd
        data={[
          buildFaqPageSchema(faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Airlines & Airports", path: "/airlines" },
            { name: item.name, path: catalogPath },
          ]),
        ]}
      />
      <Header />

      <section className="px-4 md:px-8 lg:px-8 xl:px-12 pt-8 lg:pt-10 xl:pt-12 pb-0">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1100px] mx-auto">
          <nav className="mb-6 xl:mb-8 text-sm">
            <Link href="/airlines" className="text-[#2669f3] font-bold hover:opacity-80">
              Airlines &amp; Airports
            </Link>
            <span className="text-[#7b8094] mx-2">/</span>
            <span className="text-[#1f3664]">{item.name}</span>
          </nav>

          <div className="h-14 xl:h-16 mb-6 flex items-start rounded-[10px] bg-[#f8faff] px-3 w-fit max-w-full">
            <CatalogLogo
              id={item.id}
              kind={kind}
              name={item.name}
              logo={item.logo}
              className="h-full w-auto max-w-[220px] object-contain object-left"
            />
          </div>

          <h1 className="font-bold text-3xl md:text-4xl lg:text-[34px] xl:text-[44px] text-[#1f3664] leading-[1.2] mb-6 xl:mb-8">
            {title}
          </h1>

          <div className="space-y-5 text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-10 xl:mb-14">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <CatalogClaimSection
        headline={claimHeadline}
        subheadline={claimSubheadline}
        ctaLabel={claimCtaLabel}
      />

      <div className="mt-10 lg:mt-12 xl:mt-[109px]">
        <FAQSection faqs={faqs} />
      </div>

      <Footer />
    </div>
  );
}
