import { getTranslations } from "next-intl/server";

const ASSISTANCE = ["food", "stay"] as const;

export default async function BrazilianRightsPanel() {
  const t = await getTranslations("home.anac");

  return (
    <div className="text-left">
      <div className="grid gap-3 sm:grid-cols-2">
        {ASSISTANCE.map((key) => (
          <div key={key} className="rounded-2xl border border-[#d5e0f9] bg-[#f8faff] px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#2669f3]">{t(`${key}.when`)}</p>
            <p className="mt-1 font-bold text-[#1f3664]">{t(`${key}.title`)}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#5c6780]">{t(`${key}.body`)}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#d5e0f9] bg-white px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#7b8094]">{t("domestic.kicker")}</p>
          <p className="mt-1 text-2xl font-bold text-[#2669f3]">250 DES</p>
          <p className="mt-1 text-sm leading-relaxed text-[#5c6780]">{t("domestic.body")}</p>
        </div>
        <div className="rounded-2xl border border-[#d5e0f9] bg-white px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#7b8094]">{t("international.kicker")}</p>
          <p className="mt-1 text-2xl font-bold text-[#2669f3]">500 DES</p>
          <p className="mt-1 text-sm leading-relaxed text-[#5c6780]">{t("international.body")}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[#3d4a6b]">{t("choice")}</p>
      <p className="mt-2 text-xs leading-relaxed text-[#7b8094]">{t("desNote")}</p>
    </div>
  );
}
