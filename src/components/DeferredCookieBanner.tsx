"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CookieBanner = dynamic(() => import("@/components/CookieBanner"), {
  ssr: false,
});

/** Load cookie UI after idle so it never contends with LCP. */
export default function DeferredCookieBanner() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const id = win.requestIdleCallback(() => setReady(true), { timeout: 4000 });
      return () => win.cancelIdleCallback?.(id);
    }

    const timeoutId = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!ready) return null;
  return <CookieBanner />;
}
