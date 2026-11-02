"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { gtmClaimCta } from "@/lib/gtm";

export default function HomeFloatingClaimCta() {
  const t = useTranslations("common");
  const tHero = useTranslations("home.hero");
  const tTrust = useTranslations("home.trustBar");
  const tAirline = useTranslations("home.howItWorks.steps.airline");
  const barRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const bar = barRef.current;
    if (!visible || !bar) {
      document.documentElement.style.removeProperty("--floating-claim-offset");
      return;
    }

    const apply = () => {
      document.documentElement.style.setProperty("--floating-claim-offset", `${bar.offsetHeight + 12}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--floating-claim-offset");
    };
  }, [visible]);

  if (!visible) return null;

  const benefits = [tTrust("noWinNoFee"), tHero("fastRiskFree"), tAirline("title")];

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 z-40"
      style={{
        bottom: "calc(var(--cookie-banner-offset, 0px) + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="border-t border-white/10 bg-[#1f3664] text-white shadow-[0_-12px_40px_rgba(31,54,100,0.28)]">
        <div className="mx-auto flex max-w-[1550px] flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:gap-8 md:px-8 md:py-4">
          <div className="min-w-0 flex-1">
            <p className="hidden font-bold text-lg leading-snug md:block lg:text-xl">{t("floatingClaim")}</p>
            <ul className="mt-2 hidden flex-wrap gap-x-5 gap-y-1 text-sm text-white/80 md:flex">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-[#8eb4ff]">
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/#claim"
            className="inline-flex min-h-11 w-full max-w-sm items-center justify-center self-center rounded-full bg-[#2669f3] px-5 py-2 text-center text-sm font-bold leading-tight text-white hover:bg-[#1a55d4] md:hidden"
            {...gtmClaimCta("home_floating")}
          >
            {t("floatingClaimShort")}
          </Link>
          <Link
            href="/#claim"
            className="hidden h-12 shrink-0 items-center justify-center rounded-[11px] bg-white px-6 text-base font-bold text-[#1f3664] hover:bg-[#f4f7ff] md:inline-flex"
            {...gtmClaimCta("home_floating")}
          >
            {t("checkCompensation")}
          </Link>
        </div>
      </div>
    </div>
  );
}
