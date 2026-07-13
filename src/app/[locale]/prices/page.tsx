import type { Metadata } from "next";
import Link from "next/link";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { EC261_NOTE, EC261_TIERS, UK261_TIERS } from "@/lib/passenger-rights";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Prices and fees",
  description:
    "Compensall works on a no win, no fee basis. See our success fee structure and the UK261 and EC 261 compensation amounts passengers may receive.",
  path: "/prices",
});

export default function PricesPage() {
  return (
    <LegalPageShell
      title="Prices and fees"
      breadcrumbLabel="Prices"
      summary="No upfront cost. We only charge a success fee when we recover compensation for you."
    >
      <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
        <p className="text-sm text-muted leading-relaxed">
          <strong className="text-[#1f3664]">No win, no fee:</strong> Checking eligibility and using our website is
          free. If you appoint us to pursue compensation, our fee applies only when your claim is successful, as set
          out in our{" "}
          <Link href="/documents/no-win-no-fee" className="text-[#2669f3] underline">
            No Win, No Fee Agreement
          </Link>
          .
        </p>
      </div>

      <h2 className="font-bold text-[#1f3664] text-lg mb-2">Success fee</h2>
      <p className="text-muted text-sm leading-relaxed mb-4">
        When we recover compensation on your behalf, we deduct a success fee before transferring the balance to you.
        You receive at least 75% of the recovered amount before VAT adjustments.
      </p>

      <div className="overflow-hidden rounded-xl border border-[#d5e0f9] mb-8">
        <table className="w-full text-sm">
          <thead className="bg-[#f0f5ff]">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">Compensation recovered</th>
              <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">Success fee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d5e0f9]">
            <tr>
              <td className="px-4 py-3 text-muted">Up to £220 / €250</td>
              <td className="px-4 py-3 text-muted">25% + VAT</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-muted">£221–£350 / €251–€400</td>
              <td className="px-4 py-3 text-muted">25% + VAT</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-muted">£351–£520 / €401–€600</td>
              <td className="px-4 py-3 text-muted">25% + VAT</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="font-bold text-[#1f3664] text-lg mb-2">Compensation amounts (UK261)</h2>
      <p className="text-muted text-sm leading-relaxed mb-4">
        For UK departures, fixed compensation under UK261 depends on flight distance:
      </p>
      <ul className="list-disc pl-5 text-sm text-muted space-y-1 mb-8">
        {UK261_TIERS.map((tier) => (
          <li key={tier.amount}>
            <strong className="text-[#1f3664]">{tier.amount}</strong> — {tier.label}
          </li>
        ))}
      </ul>

      <h2 className="font-bold text-[#1f3664] text-lg mb-2">Compensation amounts (EC 261/2004)</h2>
      <p className="text-muted text-sm leading-relaxed mb-4">{EC261_NOTE}</p>
      <ul className="list-disc pl-5 text-sm text-muted space-y-1">
        {EC261_TIERS.map((tier) => (
          <li key={tier.amount}>
            <strong className="text-[#1f3664]">{tier.amount}</strong> — {tier.label}
          </li>
        ))}
      </ul>
    </LegalPageShell>
  );
}
