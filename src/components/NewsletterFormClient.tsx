"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/routing";

export default function NewsletterFormClient() {
  const t = useTranslations("footer");
  const [consent, setConsent] = useState(false);

  return (
    <>
      <h3 className="font-roboto font-medium text-xl xl:text-[32px] leading-normal text-white mb-3 max-w-[389px]">
        {t("newsletterTitle")}
      </h3>
      <p className="font-roboto font-light text-base xl:text-[18px] leading-[30px] text-white mb-5">
        {t("newsletterSubtitle")}
      </p>
      <div className="flex items-center gap-2.5 w-full max-w-[340px] min-w-0 mx-auto lg:mx-0">
        <div className="bg-white h-12 min-w-0 flex-1 rounded-full flex items-center px-4 sm:px-5">
          <input
            type="email"
            placeholder={t("newsletterPlaceholder")}
            className="w-full min-w-0 text-[#1c2544] text-sm outline-none bg-transparent placeholder:text-[#1c2544]/60"
          />
        </div>
        <button
          type="button"
          disabled={!consent}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label={t("newsletterSubscribe")}
        >
          <img
            src="/assets/icons/footer-newsletter-arrow.svg"
            alt=""
            aria-hidden="true"
            className="w-6 h-6 object-contain"
          />
        </button>
      </div>
      <label className="flex items-start gap-2 mt-4 max-w-[340px] mx-auto lg:mx-0 text-left cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 flex-shrink-0 accent-[#2669f3]"
        />
        <span className="font-poppins text-[rgba(255,255,255,0.75)] text-xs leading-relaxed">
          {t.rich("newsletterConsent", {
            privacyPolicy: (chunks) => (
              <Link href="/privacy-policy" className="text-white underline hover:text-white/90">
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>
    </>
  );
}
