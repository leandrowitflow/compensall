"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Interactive / heavy below-fold islands only.
 * Mount only when near the viewport so their chunks/images stay off the LCP path.
 */
const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  ssr: false,
  loading: () => <div className="min-h-[300px]" aria-hidden />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => <div className="min-h-[300px]" aria-hidden />,
});

function LazyMount({
  minHeightClass,
  children,
}: {
  minHeightClass: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || show) return;

    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [show]);

  return (
    <div ref={ref} className={show ? undefined : minHeightClass}>
      {show ? children : <div className={minHeightClass} aria-hidden />}
    </div>
  );
}

function DeferredFAQSection() {
  return (
    <LazyMount minHeightClass="min-h-[300px]">
      <FAQSection />
    </LazyMount>
  );
}

function DeferredFooter() {
  return (
    <LazyMount minHeightClass="min-h-[300px]">
      <Footer />
    </LazyMount>
  );
}

export { DeferredFAQSection as FAQSection, DeferredFooter as Footer };
