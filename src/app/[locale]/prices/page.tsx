import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArticleWithToc } from "@/components/ArticleToc";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { headingDomId } from "@/lib/heading-anchor";
import type { AppLocale } from "@/i18n/routing";
import { gtmId } from "@/lib/gtm";
import { buildLocalizedPageMetadata } from "@/lib/i18n-metadata";
import { localizeEuroAmountLabel, polishPublicCopy } from "@/lib/public-copy";
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

  const showUkTiers = locale === "en";
  const brazilian = locale === "pt-BR";
  const t = await getTranslations("prices");
  const tTiers = await getTranslations("passengerRights");

  const ukTierItems = UK261_TIERS.map((tier) => {
    const key = tierTranslationKey(tier.amount);
    return {
      amount: localizeEuroAmountLabel(tier.amount, locale),
      label: tTiers(`tiers.uk261.${key}.label`),
    };
  });

  const ecTierItems = EC261_TIERS.map((tier) => {
    const key = tierTranslationKey(tier.amount);
    return {
      amount: localizeEuroAmountLabel(tier.amount, locale),
      label: tTiers(`tiers.ec261.${key}.label`),
    };
  });

  return (
    <LegalPageShell title={t("title")} breadcrumbLabel={t("breadcrumb")} summary={t("summary")}>
      <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
        <p className="text-sm text-muted leading-relaxed">
          <strong className="text-[#1f3664]">{polishPublicCopy(t("noWinNoFeeIntro"), locale)}</strong>{" "}
          {t.rich("noWinNoFeeBody", {
            noWinNoFeeAgreement: (chunks) => (
              <Link
                href="/documents/no-win-no-fee"
                className="text-[#2669f3] underline"
                {...gtmId("prices_nwnf_agreement")}
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>

      <ArticleWithToc
        items={
          brazilian
            ? [
                { id: headingDomId(t("successFeeTitle"), 0), text: t("successFeeTitle") },
                { id: headingDomId(t("anac.assistanceTitle"), 1), text: t("anac.assistanceTitle") },
                { id: headingDomId(t("anac.deniedTitle"), 2), text: t("anac.deniedTitle") },
              ]
            : [
                { id: headingDomId(t("successFeeTitle"), 0), text: t("successFeeTitle") },
                ...(showUkTiers
                  ? [{ id: headingDomId(t("uk261Title"), 1), text: t("uk261Title"), level: 2 as const }]
                  : []),
                { id: headingDomId(t("ec261Title"), 2), text: t("ec261Title") },
              ]
        }
      >
      <h2 id={headingDomId(t("successFeeTitle"), 0)} className="scroll-mt-28 font-bold text-[#1f3664] text-lg mb-2">{t("successFeeTitle")}</h2>
      <p className="text-muted text-sm leading-relaxed mb-4">{t("successFeeDescription")}</p>

      {brazilian ? (
        <>
          <p className="text-muted text-sm leading-relaxed mb-8">{t("anac.feeNote")}</p>
          <h2 id={headingDomId(t("anac.assistanceTitle"), 1)} className="scroll-mt-28 font-bold text-[#1f3664] text-lg mb-2">{t("anac.assistanceTitle")}</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">{t("anac.assistanceBody")}</p>
          <ul className="list-disc pl-5 text-sm text-muted space-y-1 mb-8">
            <li>{t("anac.hour1")}</li>
            <li>{t("anac.hour2")}</li>
            <li>{t("anac.hour4")}</li>
          </ul>
          <h2 id={headingDomId(t("anac.deniedTitle"), 2)} className="scroll-mt-28 font-bold text-[#1f3664] text-lg mb-2">{t("anac.deniedTitle")}</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">{t("anac.deniedBody")}</p>
          <p className="text-muted text-sm leading-relaxed">{t("anac.choice")}</p>
        </>
      ) : (
        <>
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

      {showUkTiers ? (
        <>
          <h2 id={headingDomId(t("uk261Title"), 1)} className="scroll-mt-28 font-bold text-[#1f3664] text-lg mb-2">{t("uk261Title")}</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">{polishPublicCopy(t("uk261Intro"), locale)}</p>
          <ul className="list-disc pl-5 text-sm text-muted space-y-1 mb-8">
            {ukTierItems.map((tier) => (
              <li key={tier.amount}>
                <strong className="text-[#1f3664]">{tier.amount}</strong> — {tier.label}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2 id={headingDomId(t("ec261Title"), 2)} className="scroll-mt-28 font-bold text-[#1f3664] text-lg mb-2">{t("ec261Title")}</h2>
      <p className="text-muted text-sm leading-relaxed mb-4">{tTiers("ec261Note")}</p>
      <ul className="list-disc pl-5 text-sm text-muted space-y-1">
        {ecTierItems.map((tier) => (
          <li key={tier.amount}>
            <strong className="text-[#1f3664]">{tier.amount}</strong> — {tier.label}
          </li>
        ))}
      </ul>
        </>
      )}
      </ArticleWithToc>
    </LegalPageShell>
  );
}
