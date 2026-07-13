import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/seo/JsonLd";
import { ALL_FAQS } from "@/lib/default-faqs";
import { buildFaqPageSchema } from "@/lib/structured-data";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Frequently asked questions about flight compensation",
  description:
    "Answers about UK261, EC 261/2004, compensation amounts, no win no fee, boarding pass uploads, and how Compensall handles your claim.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={buildFaqPageSchema(ALL_FAQS)} />
      <Header />

      <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-10 pb-4 text-center">
        <h1 className="font-bold text-3xl md:text-4xl xl:text-[48px] text-[#1f3664] mb-4 leading-[1.2]">
          Flight compensation{" "}
          <span className="text-[#2669f3]">FAQ</span>
        </h1>
        <p className="text-[#1f3664] text-base max-w-[640px] mx-auto leading-relaxed">
          Everything you need to know about claiming under UK261 and EC 261/2004, our no win no fee service, and
          how we protect your data.
        </p>
      </div>

      <FAQSection includeUkFaqs showHeading={false} />
      <Footer />
    </div>
  );
}
