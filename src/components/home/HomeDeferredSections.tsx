"use client";

import dynamic from "next/dynamic";

/**
 * Below-fold islands — client-only so their chunks stay off the initial SSR/LCP path.
 * Avoid IntersectionObserver-gated mounting: it races Turbopack chunk loaders in dev.
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
