import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Authority to Act – Compensall",
  description: "Authority to Act document authorising Compensall to act on your behalf with the airline.",
};

const imgDocument = "/assets/documents/authority-to-act.png";

export default function AuthorityToActPage() {
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
          <span className="text-[#1f3664] font-medium">Authority to Act</span>
        </nav>

        <div className="bg-white rounded-2xl border border-[#d5e0f9] overflow-hidden shadow-sm">
          {/* Document header */}
          <div className="bg-gradient-to-r from-[#1f3664] to-[#2669f3] px-8 py-8 flex items-center gap-5">
            <div className="w-16 h-16 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <img src={imgDocument} alt="Document" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Legal Document</p>
              <h1 className="font-bold text-white text-2xl md:text-3xl">Authority to Act</h1>
            </div>
          </div>

          <div className="px-8 py-8 text-[#1f3664]">
            <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
              <p className="text-sm text-[#1f3664]/70 leading-relaxed">
                <strong className="text-[#1f3664]">Important:</strong> By signing this document you authorise Compensall to act as your legal representative and agent in all matters relating to your flight compensation claim against the airline(s) identified in your claim submission.
              </p>
            </div>

            <Section title="1. Authorisation">
              <p>
                I, the claimant, hereby authorise and appoint <strong>Compensall</strong> ("the Company") to act as my exclusive agent and representative in connection with pursuing flight compensation from the airline(s) responsible for the disruption to my flight(s), as described in the claim form submitted through the Compensall platform.
              </p>
            </Section>

            <Section title="2. Scope of Authority">
              <p>This authority includes the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Contact the airline(s) on my behalf.</li>
                <li>Submit compensation claims under EU Regulation EC 261/2004 or any applicable national law.</li>
                <li>Negotiate settlement amounts with the airline(s).</li>
                <li>Accept compensation or alternative settlement on my behalf.</li>
                <li>Instruct legal counsel if necessary to enforce my rights.</li>
                <li>Sign correspondence, settlement agreements, and other documents related to my claim.</li>
              </ul>
            </Section>

            <Section title="3. Duration">
              <p>
                This authority remains in force until the claim is fully resolved, withdrawn by me in writing, or until two years from the date of signing, whichever comes first.
              </p>
            </Section>

            <Section title="4. Fees">
              <p>
                Compensall operates on a no win, no fee basis. A success fee as specified in the No Win, No Fee Agreement will be deducted from any compensation recovered. No fee is payable if no compensation is recovered.
              </p>
            </Section>

            <Section title="5. Data Processing">
              <p>
                By signing this document, you also consent to Compensall processing your personal data as described in our Privacy Policy, solely for the purpose of pursuing your compensation claim.
              </p>
            </Section>

            <Section title="6. Revocation">
              <p>
                You may revoke this authority at any time by providing written notice to <strong>legal@compensall.com</strong>. Please note that revocation may affect the progress of your claim and may result in fees if work has already been completed.
              </p>
            </Section>

            <div className="mt-8 pt-6 border-t border-[#d5e0f9] flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <p className="text-xs text-[#1f3664]/50 mb-1">Document version 2.1 — Last updated January 2026</p>
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
