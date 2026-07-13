import { getTranslations } from "next-intl/server";
import { parseFaqItems, type FaqItem } from "@/lib/faq-items";

export type { FaqItem };

type FaqVariant = "default" | "uk";

export async function getLocalizedFaqs(locale: string, variant: FaqVariant = "default"): Promise<FaqItem[]> {
  const t = await getTranslations({ locale, namespace: "faq" });
  return parseFaqItems(t.raw(variant));
}

export async function getAllLocalizedFaqs(locale: string): Promise<FaqItem[]> {
  const [defaultFaqs, ukFaqs] = await Promise.all([
    getLocalizedFaqs(locale, "default"),
    getLocalizedFaqs(locale, "uk"),
  ]);

  return [...defaultFaqs, ...ukFaqs];
}
