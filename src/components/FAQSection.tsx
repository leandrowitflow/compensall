"use client";

import { useState, type ReactNode } from "react";

const DEFAULT_FAQS = [
  {
    question: "Is it safe to upload my boarding pass?",
    answer:
      "Yes, absolutely. Your boarding pass is encrypted and stored securely. We only use the information necessary to process your claim and never share it with third parties.",
  },
  {
    question: "Does AI handle everything?",
    answer:
      "AI helps speed up the process, but your claim is also supported by real people. Our team can review your case, contact the airline and help manage the claim from start to finish.",
  },
  {
    question: "How much compensation can I receive?",
    answer:
      "You can receive up to €600 per passenger depending on the flight distance. Flights under 1,500 km qualify for €250, 1,500–3,500 km for €400, and over 3,500 km for €600.",
  },
  {
    question: "What does 'no win, no fee' mean?",
    answer:
      "It means you pay nothing if we don't win your claim. We only charge a success fee when we successfully recover compensation on your behalf.",
  },
  {
    question: "What does the assistant do?",
    answer:
      "Our AI assistant analyzes your boarding pass, checks eligibility under EU regulation EC 261/2004, and prepares all necessary documentation to file your compensation claim.",
  },
  {
    question: "Can I speak to a real person?",
    answer:
      "Yes! Our human support team is available to assist you throughout the claim process. You can reach us via chat, email or phone.",
  },
  {
    question: "How much does it cost?",
    answer:
      "There is no upfront cost. Compensall works on a no win, no fee basis, which means we only charge a fee if your claim is successful.",
  },
  {
    question: "Can I delete my data?",
    answer:
      "Yes. You can request deletion of your personal data at any time. Contact our support team and we will process your request within 30 days in compliance with GDPR.",
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQItem[];
  title?: ReactNode;
}

function FAQCard({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQItem;
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
        <span className="font-['Open_Sans',sans-serif] font-normal text-[#1f3664] text-base sm:text-lg lg:text-base xl:text-[24px] leading-snug xl:leading-[28px]">
          {faq.question}
        </span>
        <img
          src="/assets/icons/faq-chevron-down.svg"
          alt=""
          className={`w-3.5 h-2.5 sm:w-4 sm:h-2.5 xl:w-[17px] xl:h-[11px] flex-shrink-0 mt-1 sm:mt-1.5 xl:mt-[9px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6 lg:px-5 lg:pb-5 xl:px-12 xl:pb-12 -mt-2 sm:-mt-3 lg:-mt-2 xl:-mt-4">
          <p className="font-['Open_Sans',sans-serif] font-normal text-[#1f3664] text-sm sm:text-[15px] lg:text-base xl:text-[16px] leading-relaxed xl:leading-[30px]">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection({ faqs = DEFAULT_FAQS, title }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const rowCount = Math.ceil(faqs.length / 2);

  return (
    <section className="pt-0 pb-12 md:pb-16 lg:pb-16 xl:pb-[80px] px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto">
        <h2 className="font-['Open_Sans',sans-serif] font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] text-center mb-6 md:mb-8 lg:mb-6 xl:mb-14 leading-[1.2]">
          {title ?? (
            <>
              Frequently asked{" "}
              <span className="text-[#2669f3]">questions</span>
            </>
          )}
        </h2>

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
