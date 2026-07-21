"use client";

import { useEffect, useId, useRef, useState } from "react";
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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 12 8"
      fill="none"
      aria-hidden="true"
      className={`flex-shrink-0 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const tCommon = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectLocale = (code: AppLocale) => {
    setOpen(false);
    if (code !== locale) {
      router.replace(pathname, { locale: code });
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-[11px] border-2 border-[#d5e0f9] bg-[#f8faff] px-2.5 py-1.5 text-xs font-bold tracking-wide text-[#1f3664] hover:bg-white transition-colors"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={`${tCommon("selectLanguage")}: ${localeLabels[locale]}`}
        onClick={() => setOpen((value) => !value)}
      >
        <GlobeIcon />
        <span aria-hidden="true">{LOCALE_SHORT[locale]}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={tCommon("selectLanguage")}
          className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[196px] overflow-hidden rounded-[12px] border-2 border-[#d5e0f9] bg-white py-1 shadow-[0_12px_32px_rgba(31,54,100,0.12)]"
        >
          {locales.map((code) => {
            const isActive = locale === code;
            return (
              <li key={code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => selectLocale(code)}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors ${
                    isActive
                      ? "bg-[#f0f5fe] text-[#2669f3]"
                      : "text-[#1f3664] hover:bg-[#f8faff]"
                  }`}
                >
                  <span className="text-sm font-bold">{localeLabels[code]}</span>
                  <span
                    aria-hidden="true"
                    className={`text-xs font-bold tracking-wide ${isActive ? "text-[#2669f3]" : "text-[#7b8094]"}`}
                  >
                    {LOCALE_SHORT[code]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
