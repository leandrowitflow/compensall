import type { ReactNode } from "react";
import Link from "next/link";
import {
  BRAND_NAME,
  LEGAL_ENTITY_ADDRESS,
  LEGAL_ENTITY_EMAIL,
  LEGAL_ENTITY_NAME,
  LEGAL_ENTITY_NIF,
} from "@/lib/passenger-rights";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="font-bold text-[#1f3664] text-lg mb-2">{title}</h2>
      <div className="text-muted text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export function PrivacyPolicyContent() {
  return (
    <>
      <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
        <p className="text-sm text-muted leading-relaxed">
          <strong className="text-[#1f3664]">Last updated:</strong> July 2026. This Privacy Policy explains how
          Compensall collects, uses, and protects personal data when you use our website and claim services.
        </p>
      </div>

      <Section title="1. Who we are">
        <p>
          <strong>{LEGAL_ENTITY_NAME}</strong> (NIF {LEGAL_ENTITY_NIF}), trading as <strong>{BRAND_NAME}</strong>
          (&quot;{BRAND_NAME}&quot;, &quot;we&quot;, &quot;us&quot;), is the data controller for personal data processed through this
          website and related services. Registered address: {LEGAL_ENTITY_ADDRESS}.
        </p>
        <p>
          Privacy enquiries:{" "}
          <a href={`mailto:${LEGAL_ENTITY_EMAIL}`} className="text-[#2669f3] underline">
            {LEGAL_ENTITY_EMAIL}
          </a>
        </p>
      </Section>

      <Section title="2. What this policy covers">
        <p>
          This policy applies to visitors to our website, people who start or submit a compensation claim, and
          anyone who contacts us. If you submit a claim, you will also be asked to review our claim-specific{" "}
          <Link href="/documents/privacy-data-consent" className="text-[#2669f3] underline">
            Privacy &amp; Data Consent
          </Link>{" "}
          document before signing.
        </p>
      </Section>

      <Section title="3. Data we collect">
        <p>Depending on how you use Compensall, we may process:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong className="text-[#1f3664]">Identity and contact data:</strong> name, email address, phone
            number, postal address.
          </li>
          <li>
            <strong className="text-[#1f3664]">Claim data:</strong> boarding pass uploads, flight number, route,
            booking reference, disruption details, passenger information, and signatures.
          </li>
          <li>
            <strong className="text-[#1f3664]">Financial data:</strong> bank account details used to pay recovered
            compensation.
          </li>
          <li>
            <strong className="text-[#1f3664]">Technical data:</strong> IP address, browser type, device
            information, pages visited, and referral source.
          </li>
          <li>
            <strong className="text-[#1f3664]">Communications:</strong> messages you send to support and records of
            claim correspondence.
          </li>
        </ul>
      </Section>

      <Section title="4. How we use your data">
        <p>We use personal data to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Operate the website and provide our claim service.</li>
          <li>Read boarding pass information and assess eligibility under UK261 and EC 261/2004 and related rules.</li>
          <li>Prepare, submit, and manage compensation claims with airlines on your behalf.</li>
          <li>Communicate with you about claim status, documents, and payments.</li>
          <li>Meet legal, regulatory, and accounting obligations.</li>
          <li>Improve security, prevent fraud, and maintain service quality.</li>
          <li>Send service-related updates and, where permitted, marketing communications.</li>
        </ul>
      </Section>

      <Section title="5. Legal bases">
        <p>Under the UK GDPR and EU GDPR, we rely on:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong className="text-[#1f3664]">Contract:</strong> to deliver the claim service you request.
          </li>
          <li>
            <strong className="text-[#1f3664]">Legitimate interests:</strong> to operate, secure, and improve our
            platform and pursue claims efficiently.
          </li>
          <li>
            <strong className="text-[#1f3664]">Legal obligation:</strong> where retention or disclosure is required
            by law.
          </li>
          <li>
            <strong className="text-[#1f3664]">Consent:</strong> for optional marketing and non-essential cookies
            where applicable.
          </li>
        </ul>
      </Section>

      <Section title="6. Sharing your data">
        <p>We may share data with:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Airlines, regulators, and dispute bodies involved in your claim.</li>
          <li>Legal advisers and representatives acting on your claim.</li>
          <li>Payment providers and banks handling compensation transfers.</li>
          <li>Hosting, email, storage, and IT providers under data processing agreements.</li>
        </ul>
        <p>We do not sell your personal data.</p>
      </Section>

      <Section title="7. International transfers">
        <p>
          Some service providers may process data outside the UK or EEA. Where this happens, we use appropriate
          safeguards such as Standard Contractual Clauses or equivalent protections required by applicable law.
        </p>
      </Section>

      <Section title="8. Retention">
        <p>
          Claim records are generally retained for up to 7 years after a matter is closed. Technical logs are
          kept for a shorter period unless needed for security investigations. We delete or anonymise data when it
          is no longer required.
        </p>
      </Section>

      <Section title="9. Your rights">
        <p>
          You may have the right to access, rectify, erase, restrict, object to, or port your personal data, and to
          withdraw consent where processing is consent-based. Contact{" "}
          <a href={`mailto:${LEGAL_ENTITY_EMAIL}`} className="text-[#2669f3] underline">
            {LEGAL_ENTITY_EMAIL}
          </a>
          . You may also complain to your local data protection authority.
        </p>
      </Section>

      <Section title="10. Security">
        <p>
          We use encryption, access controls, and secure infrastructure to protect personal data. No online
          service can be guaranteed completely secure, but we work to reduce risk proportionate to the sensitivity
          of the information we handle.
        </p>
      </Section>

      <Section title="11. Cookies">
        <p>
          We use cookies and similar technologies as described in our{" "}
          <Link href="/cookies" className="text-[#2669f3] underline">
            Cookie Policy
          </Link>
          .
        </p>
      </Section>

      <Section title="12. Changes">
        <p>
          We may update this policy from time to time. Material changes will be posted on this page with an updated
          date.
        </p>
      </Section>

      <p className="text-xs text-[#1f3664]/50 pt-2 border-t border-[#d5e0f9]">
        Document version 1.0. Last updated July 2026
      </p>
    </>
  );
}

export function TermsOfServiceContent() {
  return (
    <>
      <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
        <p className="text-sm text-muted leading-relaxed">
          <strong className="text-[#1f3664]">Summary:</strong> By using Compensall you agree to these Terms of
          Service. Our claim work is provided on a no win, no fee basis subject to the separate fee agreement you
          sign when submitting a claim.
        </p>
      </div>

      <Section title="1. Agreement">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Compensall website, tools, and
          related services (the &quot;Service&quot;). By using the Service, you agree to these Terms and our{" "}
          <Link href="/privacy-policy" className="text-[#2669f3] underline">
            Privacy Policy
          </Link>
          .
        </p>
      </Section>

      <Section title="2. Who may use the Service">
        <p>
          You must be at least 18 years old and legally able to enter into binding contracts. If you submit a claim
          for another passenger, you confirm that you have authority to act on their behalf.
        </p>
      </Section>

      <Section title="3. Our Service">
        <p>
          {BRAND_NAME} helps air passengers assess and pursue flight compensation claims, primarily under UK
          Regulation UK261 and EU Regulation EC 261/2004 and related passenger rights rules. We provide digital
          tools, assistant-led checks, document preparation, and human-backed claim handling.
        </p>
        <p>
          We do not guarantee that a claim will succeed. Eligibility depends on the facts of your journey, airline
          response, and applicable law.
        </p>
      </Section>

      <Section title="4. Submitting a claim">
        <p>When you submit a claim you agree to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Provide accurate and complete information.</li>
          <li>Upload documents you are entitled to share and that relate to your claim.</li>
          <li>Sign the required legal documents, including the Authority to Act, No Win, No Fee Agreement, and Privacy &amp; Data Consent.</li>
          <li>Not pursue the same claim independently with the airline while we are acting for you, unless we agree otherwise in writing.</li>
        </ul>
        <p>
          See our claim documents at{" "}
          <Link href="/documents/no-win-no-fee" className="text-[#2669f3] underline">
            No Win, No Fee
          </Link>
          ,{" "}
          <Link href="/documents/authority-to-act" className="text-[#2669f3] underline">
            Authority to Act
          </Link>
          , and{" "}
          <Link href="/documents/privacy-data-consent" className="text-[#2669f3] underline">
            Privacy &amp; Data Consent
          </Link>
          .
        </p>
      </Section>

      <Section title="5. Fees">
        <p>
          Website access and eligibility checks are free. If you appoint us to pursue compensation, our fees apply
          only on a success basis as set out in the No Win, No Fee Agreement. You pay nothing if we do not recover
          compensation for you, subject to the terms of that agreement.
        </p>
      </Section>

      <Section title="6. Your responsibilities">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Misuse the Service or attempt unauthorised access to our systems.</li>
          <li>Submit false, misleading, or fraudulent claims or documents.</li>
          <li>Use the Service in violation of applicable law or third-party rights.</li>
          <li>Copy, scrape, or commercially exploit our content without permission.</li>
        </ul>
      </Section>

      <Section title="7. Intellectual property">
        <p>
          The Compensall name, branding, website content, software, and materials are owned by or licensed to
          Compensall. You receive a limited, non-exclusive licence to use the Service for personal claim purposes.
        </p>
      </Section>

      <Section title="8. Disclaimer">
        <p>
          The Service provides general information and claim assistance. It is not legal advice. Content on the
          website is provided for information purposes and may not reflect the latest legal developments in every
          jurisdiction.
        </p>
      </Section>

      <Section title="9. Limitation of liability">
        <p>
          To the fullest extent permitted by law, Compensall is not liable for indirect, incidental, or
          consequential losses, or for airline decisions, court outcomes, or delays outside our reasonable control.
          Nothing in these Terms limits liability that cannot be limited under applicable law, including liability
          for fraud or death or personal injury caused by negligence.
        </p>
      </Section>

      <Section title="10. Suspension and termination">
        <p>
          We may suspend or terminate access to the Service if you breach these Terms or if continued service would
          create legal or security risk. You may stop using the Service at any time. Claim-specific cancellation
          rights are described in your signed claim documents.
        </p>
      </Section>

      <Section title="11. Governing law">
        <p>
          These Terms are governed by the laws of England and Wales. Courts in England and Wales have exclusive
          jurisdiction, except where mandatory consumer protection laws in your country of residence give you the
          right to bring proceedings elsewhere.
        </p>
      </Section>

      <Section title="12. Contact">
        <p>
          Questions about these Terms:{" "}
          <a href={`mailto:${LEGAL_ENTITY_EMAIL}`} className="text-[#2669f3] underline">
            {LEGAL_ENTITY_EMAIL}
          </a>
        </p>
      </Section>

      <p className="text-xs text-[#1f3664]/50 pt-2 border-t border-[#d5e0f9]">
        Document version 1.0. Last updated July 2026
      </p>
    </>
  );
}

export function CookiePolicyContent() {
  return (
    <>
      <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
        <p className="text-sm text-muted leading-relaxed">
          <strong className="text-[#1f3664]">Last updated:</strong> July 2026. This Cookie Policy explains how
          Compensall uses cookies and similar technologies on our website.
        </p>
      </div>

      <Section title="1. What are cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a website. They help sites function,
          remember preferences, and understand how visitors use pages. Similar technologies include local storage
          and session storage.
        </p>
      </Section>

      <Section title="2. How we use cookies">
        <p>Compensall uses cookies in the following categories:</p>
        <div className="mt-3 overflow-hidden rounded-xl border border-[#d5e0f9]">
          <table className="w-full text-sm">
            <thead className="bg-[#f0f5ff]">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d5e0f9]">
              <tr>
                <td className="px-4 py-3 text-[#1f3664] font-medium align-top">Strictly necessary</td>
                <td className="px-4 py-3 text-muted">
                  Required for core site functions such as security, load balancing, claim session continuity, and
                  remembering choices needed to provide the service you request.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-[#1f3664] font-medium align-top">Functional</td>
                <td className="px-4 py-3 text-muted">
                  Remember preferences that improve your experience, such as form progress or display settings where
                  enabled.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-[#1f3664] font-medium align-top">Analytics</td>
                <td className="px-4 py-3 text-muted">
                  Help us understand how visitors use the site so we can improve performance and content. These are
                  only used where permitted and, where required, after consent.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="3. Third-party cookies">
        <p>
          Some cookies may be set by infrastructure or service providers that help us host and operate the website,
          such as hosting, security, and performance providers. If we enable analytics or marketing tools in future,
          this policy will be updated to list the relevant providers and retention periods.
        </p>
      </Section>

      <Section title="4. Managing cookies">
        <p>
          You can control cookies through your browser settings. Most browsers let you block or delete cookies.
          Blocking strictly necessary cookies may prevent parts of the site, including the claim flow, from working
          correctly.
        </p>
        <p>
          Where non-essential cookies require consent under applicable law, we will ask for your choice before
          placing them.
        </p>
      </Section>

      <Section title="5. Retention">
        <p>
          Session cookies expire when you close your browser. Persistent cookies remain for a defined period or until
          you delete them. Retention depends on the cookie purpose and provider.
        </p>
      </Section>

      <Section title="6. More information">
        <p>
          For details on how we process personal data, see our{" "}
          <Link href="/privacy-policy" className="text-[#2669f3] underline">
            Privacy Policy
          </Link>
          . Privacy enquiries:{" "}
          <a href={`mailto:${LEGAL_ENTITY_EMAIL}`} className="text-[#2669f3] underline">
            {LEGAL_ENTITY_EMAIL}
          </a>
        </p>
      </Section>

      <Section title="7. Changes">
        <p>
          We may update this Cookie Policy when our use of cookies changes. The latest version will always be
          available on this page.
        </p>
      </Section>

      <p className="text-xs text-[#1f3664]/50 pt-2 border-t border-[#d5e0f9]">
        Document version 1.0. Last updated July 2026
      </p>
    </>
  );
}
