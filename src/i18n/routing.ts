import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "pt", "fr"] as const;
export type AppLocale = (typeof locales)[number];

export const localeLabels: Record<AppLocale, string> = {
  en: "English (UK)",
  pt: "Português (PT)",
  fr: "Français (FR)",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
