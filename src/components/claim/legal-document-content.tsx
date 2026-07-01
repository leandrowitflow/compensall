import type { ComponentType, ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="font-bold text-[#1f3664] text-lg mb-2">{title}</h2>
      <div className="text-[#1f3664]/70 text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export function AuthorityToActContent() {
  return (
    <>
      <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
        <p className="text-sm text-[#1f3664]/70 leading-relaxed">
          <strong className="text-[#1f3664]">Important:</strong> By signing this document you authorise Compensall
          to act as your legal representative and agent in all matters relating to your flight compensation claim
          against the airline(s) identified in your claim submission.
        </p>
      </div>

      <Section title="1. Authorisation">
        <p>
          I, the claimant, hereby authorise and appoint <strong>Compensall</strong> (&quot;the Company&quot;) to act as my
          exclusive agent and representative in connection with pursuing flight compensation from the airline(s)
          responsible for the disruption to my flight(s), as described in the claim form submitted through the
          Compensall platform.
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
          This authority remains in force until the claim is fully resolved, withdrawn by me in writing, or until
          two years from the date of signing, whichever comes first.
        </p>
      </Section>

      <Section title="4. Fees">
        <p>
          Compensall operates on a no win, no fee basis. A success fee as specified in the No Win, No Fee Agreement
          will be deducted from any compensation recovered. No fee is payable if no compensation is recovered.
        </p>
      </Section>

      <Section title="5. Data Processing">
        <p>
          By signing this document, you also consent to Compensall processing your personal data as described in
          our Privacy Policy, solely for the purpose of pursuing your compensation claim.
        </p>
      </Section>

      <Section title="6. Revocation">
        <p>
          You may revoke this authority at any time by providing written notice to{" "}
          <strong>legal@compensall.com</strong>. Please note that revocation may affect the progress of your claim
          and may result in fees if work has already been completed.
        </p>
      </Section>

      <p className="text-xs text-[#1f3664]/50 pt-2 border-t border-[#d5e0f9]">
        Document version 2.1 — Last updated January 2026
      </p>
    </>
  );
}

export function NoWinNoFeeContent() {
  return (
    <>
      <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
        <p className="text-sm text-[#1f3664]/70 leading-relaxed">
          <strong className="text-[#1f3664]">Summary:</strong> You pay nothing upfront and nothing if we do not
          recover compensation on your behalf. Our success fee is only charged when your claim is successful.
        </p>
      </div>

      <Section title="1. Agreement Overview">
        <p>
          This No Win, No Fee Agreement (&quot;Agreement&quot;) is entered into between the claimant (you) and{" "}
          <strong>Compensall</strong> (&quot;the Company&quot;). By proceeding with a claim through the Compensall platform,
          you agree to these terms.
        </p>
      </Section>

      <Section title="2. No Upfront Costs">
        <p>
          There are no upfront fees, registration fees, or administration charges to submit your claim. You will
          incur no costs whatsoever if we are unable to recover compensation on your behalf.
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
          The success fee is deducted before the remaining compensation is transferred to you. You will always
          receive at least 75% of the recovered amount before VAT adjustments.
        </p>
      </Section>

      <Section title="4. Payment Process">
        <p>
          Once the airline pays the compensation, Compensall will deduct the agreed success fee and transfer the
          remaining balance to your nominated bank account within 5–10 business days. You will receive a full
          breakdown of the settlement and deductions.
        </p>
      </Section>

      <Section title="5. Cancellation">
        <p>
          You may cancel this agreement at any time before the claim is settled by notifying us in writing at{" "}
          <strong>cancel@compensall.com</strong>. If substantial work has already been completed and the airline
          has made an offer, a reduced cancellation fee may apply.
        </p>
      </Section>

      <Section title="6. Governing Law">
        <p>
          This Agreement is governed by the laws of England and Wales. Any disputes shall be subject to the
          exclusive jurisdiction of the courts of England and Wales.
        </p>
      </Section>

      <p className="text-xs text-[#1f3664]/50 pt-2 border-t border-[#d5e0f9]">
        Document version 3.0 — Last updated January 2026
      </p>
    </>
  );
}

export function PrivacyDataConsentContent() {
  return (
    <>
      <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
        <p className="text-sm text-[#1f3664]/70 leading-relaxed">
          <strong className="text-[#1f3664]">GDPR Notice:</strong> Compensall processes your personal data in
          accordance with the General Data Protection Regulation (GDPR) and applicable national data protection
          laws. This document explains how and why we process your data.
        </p>
      </div>

      <Section title="1. Data Controller">
        <p>
          <strong>Compensall Ltd</strong> is the data controller responsible for your personal data. Registered
          address: 123 Creative Blvd, Innovation City, NY 10001. Contact:{" "}
          <a href="mailto:privacy@compensall.com" className="text-[#2669f3] underline">
            privacy@compensall.com
          </a>
        </p>
      </Section>

      <Section title="2. Data We Collect">
        <p>To process your flight compensation claim we collect the following categories of personal data:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong>Identity data:</strong> Name, date of birth, passport/ID number.
          </li>
          <li>
            <strong>Contact data:</strong> Email address, phone number, postal address.
          </li>
          <li>
            <strong>Flight data:</strong> Boarding pass, flight number, route, booking reference, disruption
            details.
          </li>
          <li>
            <strong>Financial data:</strong> Bank account details for compensation transfer.
          </li>
          <li>
            <strong>Technical data:</strong> IP address, browser type, device identifiers (collected
            automatically).
          </li>
        </ul>
      </Section>

      <Section title="3. Legal Basis for Processing">
        <p>We process your personal data on the following legal bases:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong>Contract performance:</strong> To fulfil our obligations under the No Win, No Fee Agreement.
          </li>
          <li>
            <strong>Legitimate interests:</strong> To pursue flight compensation claims on your behalf.
          </li>
          <li>
            <strong>Legal obligation:</strong> To comply with applicable laws and regulations.
          </li>
          <li>
            <strong>Consent:</strong> For marketing communications (optional and easily withdrawn).
          </li>
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
          We retain your personal data for 7 years after a claim is closed to comply with legal and accounting
          obligations. Technical logs are retained for 12 months.
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
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:privacy@compensall.com" className="text-[#2669f3] underline">
            privacy@compensall.com
          </a>
          . You also have the right to lodge a complaint with your national supervisory authority.
        </p>
      </Section>

      <Section title="7. Consent">
        <p>
          By submitting your claim through Compensall, you confirm that you have read and understood this Privacy
          &amp; Data Consent notice and consent to the processing of your personal data as described herein for the
          purpose of pursuing your flight compensation claim.
        </p>
      </Section>

      <p className="text-xs text-[#1f3664]/50 pt-2 border-t border-[#d5e0f9]">
        Document version 1.4 — Last updated January 2026
      </p>
    </>
  );
}

export const LEGAL_DOCUMENT_CONTENT: Record<string, ComponentType> = {
  "authority-to-act": AuthorityToActContent,
  "no-win-no-fee": NoWinNoFeeContent,
  "privacy-data-consent": PrivacyDataConsentContent,
};
