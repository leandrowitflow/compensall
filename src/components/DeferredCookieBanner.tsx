"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CookieBanner = dynamic(() => import("@/components/CookieBanner"), {
  ssr: false,
});

/** Show on the next frame so Meta in-app users are not surprised mid-tap 2–4s later. */
export default function DeferredCookieBanner() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  if (!ready) return null;
  return <CookieBanner />;
}
