"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { parseFaqItems, type FaqItem } from "@/lib/faq-items";

interface FAQSectionProps {
  faqs?: FaqItem[];
  includeUkFaqs?: boolean;
  title?: ReactNode;
  showHeading?: boolean;
}

function FAQCard({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-[#fdfdff] border border-[#d5e0f9] rounded-2xl xl:rounded-[20px] overflow-hidden h-full">
      <button
        type="button"
        className="w-full flex items-start justify-between gap-4 md:gap-5 lg:gap-4 px-5 py-5 sm:px-6 sm:py-6 lg:px-5 lg:py-5 xl:px-12 xl:py-12 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-normal text-[#1f3664] text-base sm:text-lg lg:text-base xl:text-[24px] leading-snug xl:leading-[28px]">
          {faq.question}
        </span>
        <img
          src="/assets/icons/faq-chevron-down.svg"
          alt=""
          aria-hidden="true"
          className={`w-3.5 h-2.5 sm:w-4 sm:h-2.5 xl:w-[17px] xl:h-[11px] flex-shrink-0 mt-1 sm:mt-1.5 xl:mt-[9px] transition-transform duration-200 object-contain ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6 lg:px-5 lg:pb-5 xl:px-12 xl:pb-12 -mt-2 sm:-mt-3 lg:-mt-2 xl:-mt-4">
          <p className="font-normal text-[#1f3664] text-sm sm:text-[15px] lg:text-base xl:text-[16px] leading-relaxed xl:leading-[30px]">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection({
  faqs: faqsProp,
  includeUkFaqs = false,
  title,
  showHeading = true,
}: FAQSectionProps) {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = useMemo(() => {
    if (faqsProp && faqsProp.length > 0) {
      return faqsProp;
    }

    const items = parseFaqItems(t.raw("default"));
    if (includeUkFaqs) {
      items.push(...parseFaqItems(t.raw("uk")));
    }
    return items;
  }, [faqsProp, includeUkFaqs, t]);

  const rowCount = Math.ceil(faqs.length / 2);

  return (
    <section className="pt-0 pb-12 md:pb-16 lg:pb-16 xl:pb-[80px] px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto">
        {showHeading && (
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] text-center mb-6 md:mb-8 lg:mb-6 xl:mb-14 leading-[1.2]">
            {title ?? (
              <>
                {t("sectionTitle")} <span className="text-[#2669f3]">{t("sectionTitleAccent")}</span>
              </>
            )}
          </h2>
        )}

        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 xl:gap-[30px]">
          {Array.from({ length: rowCount }).map((_, rowIdx) => {
            const leftIdx = rowIdx;
            const rightIdx = rowIdx + rowCount;
            const leftFaq = faqs[leftIdx];
            const rightFaq = faqs[rightIdx];

            return (
              <div
                key={rowIdx}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-[30px] items-start"
              >
                {leftFaq && (
                  <FAQCard
                    faq={leftFaq}
                    isOpen={openIndex === leftIdx}
                    onToggle={() => setOpenIndex(openIndex === leftIdx ? null : leftIdx)}
                  />
                )}
                {rightFaq ? (
                  <FAQCard
                    faq={rightFaq}
                    isOpen={openIndex === rightIdx}
                    onToggle={() => setOpenIndex(openIndex === rightIdx ? null : rightIdx)}
                  />
                ) : (
                  <div className="hidden lg:block" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export type { FaqItem as FAQItem };
