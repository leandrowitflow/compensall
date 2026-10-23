"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { gtmClaimCta } from "@/lib/gtm";

export default function HomeFloatingClaimCta() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("claim");
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("has-floating-claim", visible);
    return () => document.documentElement.classList.remove("has-floating-claim");
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
      style={{
        bottom: "calc(var(--cookie-banner-offset, 0px) + env(safe-area-inset-bottom, 0px) + 12px)",
      }}
    >
      <Link
        href="/#claim"
        className="pointer-events-auto inline-flex h-12 w-full max-w-md items-center justify-center rounded-full bg-[#2669f3] px-6 text-base font-bold text-white shadow-[0_10px_30px_rgba(38,105,243,0.35)] hover:bg-[#1a55d4]"
        {...gtmClaimCta("home_floating")}
      >
        {t("checkCompensationShort")}
      </Link>
    </div>
  );
}
