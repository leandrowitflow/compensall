import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "pt", "fr", "es", "ro", "hu", "sq", "de", "nl"] as const;
export type AppLocale = (typeof locales)[number];

export function parseAppLocale(value: string | null | undefined): AppLocale {
  switch (value) {
    case "en":
    case "pt":
    case "fr":
    case "es":
    case "ro":
    case "hu":
    case "sq":
    case "de":
    case "nl":
      return value;
    default:
      return "en";
  }
}

export const localeLabels: Record<AppLocale, string> = {
  en: "English (UK)",
  pt: "Português (PT)",
  fr: "Français (FR)",
  es: "Español (ES)",
  ro: "Română (RO)",
  hu: "Magyar (HU)",
  sq: "Shqip (AL)",
  de: "Deutsch (DE)",
  nl: "Nederlands (NL)",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
