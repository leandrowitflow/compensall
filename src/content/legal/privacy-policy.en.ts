import type { LegalDocument } from "./types";

export const privacyPolicyEn: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Last updated:" },
      {
        type: "text",
        text: " July 2026. This Privacy Policy explains how Compensall collects, uses, and protects personal data when you use our website and claim services.",
      },
    ],
  },
  sections: [
    {
      title: "1. Who we are",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "strongBrand", field: "legalEntityName" },
            { type: "text", text: " (NIF " },
            { type: "brand", field: "legalEntityNif" },
            { type: "text", text: "), trading as " },
            { type: "strongBrand", field: "brandName" },
            { type: "text", text: ' ("' },
            { type: "brand", field: "brandName" },
            { type: "text", text: '", "we", "us"), is the data controller for personal data processed through this website and related services. Registered address: ' },
            { type: "brand", field: "legalEntityAddress" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Privacy enquiries: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "2. What this policy covers",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This policy applies to visitors to our website, people who start or submit a compensation claim, and anyone who contacts us. If you submit a claim, you will also be asked to review our claim-specific ",
            },
            {
              type: "link",
              href: "/documents/privacy-data-consent",
              label: "Privacy & Data Consent",
            },
            { type: "text", text: " document before signing." },
          ],
        },
      ],
    },
    {
      title: "3. Data we collect",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Depending on how you use Compensall, we may process:" }],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Identity and contact data:" },
              { type: "text", text: " name, email address, phone number, postal address." },
            ],
            [
              { type: "strong", text: "Claim data:" },
              {
                type: "text",
                text: " boarding pass uploads, flight number, route, booking reference, disruption details, passenger information, and signatures.",
              },
            ],
            [
              { type: "strong", text: "Financial data:" },
              { type: "text", text: " bank account details used to pay recovered compensation." },
            ],
            [
              { type: "strong", text: "Technical data:" },
              {
                type: "text",
                text: " IP address, browser type, device information, pages visited, and referral source.",
              },
            ],
            [
              { type: "strong", text: "Communications:" },
              { type: "text", text: " messages you send to support and records of claim correspondence." },
            ],
          ],
        },
      ],
    },
    {
      title: "4. How we use your data",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "We use personal data to:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Operate the website and provide our claim service." }],
            [
              {
                type: "text",
                text: "Read boarding pass information and assess eligibility under UK261 and EC 261/2004 and related rules.",
              },
            ],
            [
              {
                type: "text",
                text: "Prepare, submit, and manage compensation claims with airlines on your behalf.",
              },
            ],
            [{ type: "text", text: "Communicate with you about claim status, documents, and payments." }],
            [{ type: "text", text: "Meet legal, regulatory, and accounting obligations." }],
            [{ type: "text", text: "Improve security, prevent fraud, and maintain service quality." }],
            [
              {
                type: "text",
                text: "Send service-related updates and, where permitted, marketing communications.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "5. Legal bases",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Under the UK GDPR and EU GDPR, we rely on:" }],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Contract:" },
              { type: "text", text: " to deliver the claim service you request." },
            ],
            [
              { type: "strong", text: "Legitimate interests:" },
              {
                type: "text",
                text: " to operate, secure, and improve our platform and pursue claims efficiently.",
              },
            ],
            [
              { type: "strong", text: "Legal obligation:" },
              { type: "text", text: " where retention or disclosure is required by law." },
            ],
            [
              { type: "strong", text: "Consent:" },
              {
                type: "text",
                text: " for optional marketing and non-essential cookies where applicable.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "6. Sharing your data",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "We may share data with:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Airlines, regulators, and dispute bodies involved in your claim." }],
            [{ type: "text", text: "Legal advisers and representatives acting on your claim." }],
            [{ type: "text", text: "Payment providers and banks handling compensation transfers." }],
            [{ type: "text", text: "Hosting, email, storage, and IT providers under data processing agreements." }],
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "We do not sell your personal data." }],
        },
      ],
    },
    {
      title: "7. International transfers",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Some service providers may process data outside the UK or EEA. Where this happens, we use appropriate safeguards such as Standard Contractual Clauses or equivalent protections required by applicable law.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Retention",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Claim records are generally retained for up to 7 years after a matter is closed. Technical logs are kept for a shorter period unless needed for security investigations. We delete or anonymise data when it is no longer required.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Your rights",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "You may have the right to access, rectify, erase, restrict, object to, or port your personal data, and to withdraw consent where processing is consent-based. Contact ",
            },
            { type: "email" },
            { type: "text", text: ". You may also complain to your local data protection authority." },
          ],
        },
      ],
    },
    {
      title: "10. Security",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "We use encryption, access controls, and secure infrastructure to protect personal data. No online service can be guaranteed completely secure, but we work to reduce risk proportionate to the sensitivity of the information we handle.",
            },
          ],
        },
      ],
    },
    {
      title: "11. Cookies",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "We use cookies and similar technologies as described in our " },
            { type: "link", href: "/cookies", label: "Cookie Policy" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "12. Changes",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "We may update this policy from time to time. Material changes will be posted on this page with an updated date.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Document version 1.0. Last updated July 2026",
};
