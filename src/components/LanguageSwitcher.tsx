"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { localeLabels, locales, type AppLocale } from "@/i18n/routing";

const LOCALE_SHORT: Record<AppLocale, string> = {
  en: "EN",
  pt: "PT",
  fr: "FR",
};

function GlobeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 opacity-70"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const tCommon = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-[11px] border-2 border-[#d5e0f9] bg-[#f8faff] p-0.5 pl-2"
      role="group"
      aria-label={tCommon("selectLanguage")}
    >
      <GlobeIcon />
      <div className="inline-flex items-center gap-0.5">
        {locales.map((code) => {
          const isActive = locale === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => router.replace(pathname, { locale: code })}
              aria-pressed={isActive}
              title={localeLabels[code]}
              className={`min-w-[2.75rem] px-2.5 py-1.5 rounded-[9px] text-xs font-bold tracking-wide transition-all ${
                isActive
                  ? "bg-[#2669f3] text-white shadow-sm"
                  : "text-[#1f3664]/70 hover:text-[#1f3664] hover:bg-white"
              }`}
            >
              <span className="sr-only">{localeLabels[code]}</span>
              <span aria-hidden="true">{LOCALE_SHORT[code]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
