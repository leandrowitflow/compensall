import type { AppLocale } from "@/i18n/routing";

const DISRUPTION_CATEGORY_BY_LOCALE: Record<AppLocale, string> = {
  en: "Flight disruptions",
  pt: "Perturbações de voos",
  fr: "Perturbations de vols",
  es: "Alteraciones de vuelos",
  ro: "Perturbări de zbor",
  hu: "Járatzavarok",
  sq: "Ndërprerje fluturimesh",
  de: "Flugstörungen",
  nl: "Vluchtverstoringen",
};

export function disruptionCategory(locale: AppLocale): string {
  return DISRUPTION_CATEGORY_BY_LOCALE[locale];
}
