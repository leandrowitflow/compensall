import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "No Win, No Fee Agreement – Compensall",
  description: "Compensall's No Win, No Fee agreement — you only pay if we successfully recover your compensation.",
};

const imgDocument = "/assets/documents/no-win-no-fee.png";

export default function NoWinNoFeePage() {
  return (
    <div className="min-h-screen bg-[#f8faff]">
      <Header />

      <div className="max-w-[900px] mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#1f3664]/60 mb-8">
          <Link href="/" className="hover:text-[#2669f3] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#claim" className="hover:text-[#2669f3] transition-colors">Claim</Link>
          <span>/</span>
          <span className="text-[#1f3664] font-medium">No Win, No Fee Agreement</span>
        </nav>

        <div className="bg-white rounded-2xl border border-[#d5e0f9] overflow-hidden shadow-sm">
          {/* Document header */}
          <div className="bg-gradient-to-r from-[#1f3664] to-[#2669f3] px-8 py-8 flex items-center gap-5">
            <div className="w-16 h-16 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <img src={imgDocument} alt="Document" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Legal Document</p>
              <h1 className="font-bold text-white text-2xl md:text-3xl">No Win, No Fee Agreement</h1>
            </div>
          </div>

          <div className="px-8 py-8 text-[#1f3664]">
            <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
              <p className="text-sm text-[#1f3664]/70 leading-relaxed">
                <strong className="text-[#1f3664]">Summary:</strong> You pay nothing upfront and nothing if we do not recover compensation on your behalf. Our success fee is only charged when your claim is successful.
              </p>
            </div>

            <Section title="1. Agreement Overview">
              <p>
                This No Win, No Fee Agreement ("Agreement") is entered into between the claimant (you) and <strong>Compensall</strong> ("the Company"). By proceeding with a claim through the Compensall platform, you agree to these terms.
              </p>
            </Section>

            <Section title="2. No Upfront Costs">
              <p>
                There are no upfront fees, registration fees, or administration charges to submit your claim. You will incur no costs whatsoever if we are unable to recover compensation on your behalf.
              </p>
            </Section>

            <Section title="3. Success Fee">
              <p>A success fee will be deducted from the compensation recovered on your behalf:</p>
              <div className="mt-3 overflow-hidden rounded-xl border border-[#d5e0f9]">
                <table className="w-full text-sm">
                  <thead className="bg-[#f0f5ff]">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">Compensation Amount</th>
                      <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">Success Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d5e0f9]">
                    <tr>
                      <td className="px-4 py-3 text-[#1f3664]/70">Up to €250</td>
                      <td className="px-4 py-3 text-[#1f3664]/70">25% + VAT</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[#1f3664]/70">€251 – €400</td>
                      <td className="px-4 py-3 text-[#1f3664]/70">25% + VAT</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[#1f3664]/70">€401 – €600</td>
                      <td className="px-4 py-3 text-[#1f3664]/70">25% + VAT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs">
                The success fee is deducted before the remaining compensation is transferred to you. You will always receive at least 75% of the recovered amount before VAT adjustments.
              </p>
            </Section>

            <Section title="4. Payment Process">
              <p>
                Once the airline pays the compensation, Compensall will deduct the agreed success fee and transfer the remaining balance to your nominated bank account within 5–10 business days. You will receive a full breakdown of the settlement and deductions.
              </p>
            </Section>

            <Section title="5. Cancellation">
              <p>
                You may cancel this agreement at any time before the claim is settled by notifying us in writing at <strong>cancel@compensall.com</strong>. If substantial work has already been completed and the airline has made an offer, a reduced cancellation fee may apply.
              </p>
            </Section>

            <Section title="6. Governing Law">
              <p>
                This Agreement is governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </Section>

            <div className="mt-8 pt-6 border-t border-[#d5e0f9] flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <p className="text-xs text-[#1f3664]/50 mb-1">Document version 3.0 — Last updated January 2026</p>
                <p className="text-xs text-[#1f3664]/50">Copyright © Compensall 2026. All rights reserved.</p>
              </div>
              <Link
                href="/#claim"
                className="bg-[#2669f3] text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-[#1a55d4] transition-colors whitespace-nowrap"
              >
                Back to claim
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="font-bold text-[#1f3664] text-lg mb-2">{title}</h2>
      <div className="text-[#1f3664]/70 text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}
