import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import LegalPageShell from "@/components/legal/LegalPageShell";
import type { AppLocale } from "@/i18n/routing";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";
import { EC261_TIERS, UK261_TIERS } from "@/lib/passenger-rights";

type PricesPageProps = {
  params: Promise<{ locale: string }>;
};

function tierTranslationKey(amount: string): string {
  return amount.replace(/[£€]/g, "");
}

export async function generateMetadata({ params }: PricesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedPageMetadata(locale as AppLocale, "/prices", "prices");
}

export default async function PricesPage({ params }: PricesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("prices");
  const tTiers = await getTranslations("passengerRights");

  const ukTierItems = UK261_TIERS.map((tier) => {
    const key = tierTranslationKey(tier.amount);
    return {
      amount: tier.amount,
      label: tTiers(`tiers.uk261.${key}.label`),
    };
  });

  const ecTierItems = EC261_TIERS.map((tier) => {
    const key = tierTranslationKey(tier.amount);
    return {
      amount: tier.amount,
      label: tTiers(`tiers.ec261.${key}.label`),
    };
  });

  return (
    <LegalPageShell title={t("title")} breadcrumbLabel={t("breadcrumb")} summary={t("summary")}>
      <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
        <p className="text-sm text-muted leading-relaxed">
          <strong className="text-[#1f3664]">{t("noWinNoFeeIntro")}</strong>{" "}
          {t.rich("noWinNoFeeBody", {
            noWinNoFeeAgreement: (chunks) => (
              <Link href="/documents/no-win-no-fee" className="text-[#2669f3] underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>

      <h2 className="font-bold text-[#1f3664] text-lg mb-2">{t("successFeeTitle")}</h2>
      <p className="text-muted text-sm leading-relaxed mb-4">{t("successFeeDescription")}</p>

      <div className="overflow-hidden rounded-xl border border-[#d5e0f9] mb-8">
        <table className="w-full text-sm">
          <thead className="bg-[#f0f5ff]">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">{t("tableCompensationRecovered")}</th>
              <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">{t("tableSuccessFee")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d5e0f9]">
            <tr>
              <td className="px-4 py-3 text-muted">{t("tierUpTo220")}</td>
              <td className="px-4 py-3 text-muted">{t("fee25Vat")}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-muted">{t("tier221to350")}</td>
              <td className="px-4 py-3 text-muted">{t("fee25Vat")}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-muted">{t("tier351to520")}</td>
              <td className="px-4 py-3 text-muted">{t("fee25Vat")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="font-bold text-[#1f3664] text-lg mb-2">{t("uk261Title")}</h2>
      <p className="text-muted text-sm leading-relaxed mb-4">{t("uk261Intro")}</p>
      <ul className="list-disc pl-5 text-sm text-muted space-y-1 mb-8">
        {ukTierItems.map((tier) => (
          <li key={tier.amount}>
            <strong className="text-[#1f3664]">{tier.amount}</strong> — {tier.label}
          </li>
        ))}
      </ul>

      <h2 className="font-bold text-[#1f3664] text-lg mb-2">{t("ec261Title")}</h2>
      <p className="text-muted text-sm leading-relaxed mb-4">{tTiers("ec261Note")}</p>
      <ul className="list-disc pl-5 text-sm text-muted space-y-1">
        {ecTierItems.map((tier) => (
          <li key={tier.amount}>
            <strong className="text-[#1f3664]">{tier.amount}</strong> — {tier.label}
          </li>
        ))}
      </ul>
    </LegalPageShell>
  );
}
