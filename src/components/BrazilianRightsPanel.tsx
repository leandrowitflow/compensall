import { getTranslations } from "next-intl/server";

export default async function BrazilianRightsPanel() {
  const t = await getTranslations("home.anac.lead");

  return (
    <div className="text-left">
      <div className="rounded-2xl border border-[#d5e0f9] bg-white px-5 py-5 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wide text-[#2669f3]">{t("when")}</p>
        <p className="mt-1 text-2xl font-bold text-[#1f3664]">{t("title")}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#3d4a6b] sm:text-base">{t("body")}</p>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[#5c6780]">{t("note")}</p>
    </div>
  );
}
