"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readCookieConsent() === null);
  }, []);

  const saveChoice = (choice: CookieConsentChoice) => {
    writeCookieConsent(choice);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:px-8 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-[960px] xl:max-w-[1100px] rounded-2xl border border-[#d5e0f9] bg-white p-4 sm:p-5 shadow-[0_12px_40px_rgba(31,54,100,0.12)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p id="cookie-banner-title" className="font-bold text-[#1f3664] text-sm sm:text-base mb-1">
              {t("bannerTitle")}
            </p>
            <p id="cookie-banner-description" className="text-muted text-sm leading-relaxed">
              {t.rich("bannerDescription", {
                cookiePolicy: (chunks) => (
                  <Link href="/cookies" className="text-[#2669f3] font-semibold hover:underline">
                    {chunks}
                  </Link>
                ),
                privacyPolicy: (chunks) => (
                  <Link href="/privacy-policy" className="text-[#2669f3] font-semibold hover:underline">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => saveChoice("essential")}
              className="border-2 border-[#d5e0f9] text-[#1f3664] font-semibold px-5 py-2.5 rounded-full text-sm hover:border-[#2669f3] transition-colors"
            >
              {t("essentialOnly")}
            </button>
            <button
              type="button"
              onClick={() => saveChoice("all")}
              className="bg-[#2669f3] text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-[#1a55d4] transition-colors"
            >
              {t("acceptAll")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
