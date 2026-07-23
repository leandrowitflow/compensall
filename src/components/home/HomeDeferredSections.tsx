"use client";

import dynamic from "next/dynamic";

/**
 * Interactive / heavy below-fold islands only.
 * Keep SSR off so their client chunks and images stay out of the LCP path.
 */
const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  ssr: false,
  loading: () => <div className="min-h-[300px]" aria-hidden />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => <div className="min-h-[300px]" aria-hidden />,
});

export { FAQSection, Footer };
