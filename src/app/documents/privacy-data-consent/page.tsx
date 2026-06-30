import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy & Data Consent – Compensall",
  description: "Compensall's Privacy & Data Consent document explaining how we process and protect your personal data.",
};

const imgDocument = "/assets/documents/privacy-consent.png";

export default function PrivacyDataConsentPage() {
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
          <span className="text-[#1f3664] font-medium">Privacy &amp; Data Consent</span>
        </nav>

        <div className="bg-white rounded-2xl border border-[#d5e0f9] overflow-hidden shadow-sm">
          {/* Document header */}
          <div className="bg-gradient-to-r from-[#1f3664] to-[#2669f3] px-8 py-8 flex items-center gap-5">
            <div className="w-16 h-16 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <img src={imgDocument} alt="Document" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Legal Document</p>
              <h1 className="font-bold text-white text-2xl md:text-3xl">Privacy &amp; Data Consent</h1>
            </div>
          </div>

          <div className="px-8 py-8 text-[#1f3664]">
            <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
              <p className="text-sm text-[#1f3664]/70 leading-relaxed">
                <strong className="text-[#1f3664]">GDPR Notice:</strong> Compensall processes your personal data in accordance with the General Data Protection Regulation (GDPR) and applicable national data protection laws. This document explains how and why we process your data.
              </p>
            </div>

            <Section title="1. Data Controller">
              <p>
                <strong>Compensall Ltd</strong> is the data controller responsible for your personal data. Registered address: 123 Creative Blvd, Innovation City, NY 10001. Contact: <a href="mailto:privacy@compensall.com" className="text-[#2669f3] underline">privacy@compensall.com</a>
              </p>
            </Section>

            <Section title="2. Data We Collect">
              <p>To process your flight compensation claim we collect the following categories of personal data:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Identity data:</strong> Name, date of birth, passport/ID number.</li>
                <li><strong>Contact data:</strong> Email address, phone number, postal address.</li>
                <li><strong>Flight data:</strong> Boarding pass, flight number, route, booking reference, disruption details.</li>
                <li><strong>Financial data:</strong> Bank account details for compensation transfer.</li>
                <li><strong>Technical data:</strong> IP address, browser type, device identifiers (collected automatically).</li>
              </ul>
            </Section>

            <Section title="3. Legal Basis for Processing">
              <p>We process your personal data on the following legal bases:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Contract performance:</strong> To fulfil our obligations under the No Win, No Fee Agreement.</li>
                <li><strong>Legitimate interests:</strong> To pursue flight compensation claims on your behalf.</li>
                <li><strong>Legal obligation:</strong> To comply with applicable laws and regulations.</li>
                <li><strong>Consent:</strong> For marketing communications (optional and easily withdrawn).</li>
              </ul>
            </Section>

            <Section title="4. Data Sharing">
              <p>We may share your data with:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Airlines and aviation authorities (to pursue your claim).</li>
                <li>Legal representatives and advisors.</li>
                <li>Payment processors (to transfer compensation).</li>
                <li>IT service providers (under strict data processing agreements).</li>
              </ul>
              <p className="mt-2">We never sell your personal data to third parties.</p>
            </Section>

            <Section title="5. Data Retention">
              <p>
                We retain your personal data for 7 years after a claim is closed to comply with legal and accounting obligations. Technical logs are retained for 12 months.
              </p>
            </Section>

            <Section title="6. Your Rights">
              <p>Under GDPR you have the following rights:</p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { right: "Right to access", desc: "Request a copy of your data." },
                  { right: "Right to rectification", desc: "Correct inaccurate data." },
                  { right: "Right to erasure", desc: 'Request deletion ("right to be forgotten").' },
                  { right: "Right to restrict processing", desc: "Limit how we use your data." },
                  { right: "Right to data portability", desc: "Receive your data in a machine-readable format." },
                  { right: "Right to object", desc: "Object to processing based on legitimate interests." },
                ].map((item) => (
                  <div key={item.right} className="p-3 bg-[#f8faff] rounded-lg border border-[#d5e0f9]">
                    <p className="font-semibold text-[#1f3664] text-xs mb-0.5">{item.right}</p>
                    <p className="text-[#1f3664]/60 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3">
                To exercise any of these rights, contact us at <a href="mailto:privacy@compensall.com" className="text-[#2669f3] underline">privacy@compensall.com</a>. You also have the right to lodge a complaint with your national supervisory authority.
              </p>
            </Section>

            <Section title="7. Consent">
              <p>
                By submitting your claim through Compensall, you confirm that you have read and understood this Privacy &amp; Data Consent notice and consent to the processing of your personal data as described herein for the purpose of pursuing your flight compensation claim.
              </p>
            </Section>

            <div className="mt-8 pt-6 border-t border-[#d5e0f9] flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <p className="text-xs text-[#1f3664]/50 mb-1">Document version 1.4 — Last updated January 2026</p>
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
