import type { LegalDocument } from "./types";

export const termsEn: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Summary:" },
      {
        type: "text",
        text: " By using Compensall you agree to these Terms of Service. Our claim work is provided on a no win, no fee basis subject to the separate fee agreement you sign when submitting a claim.",
      },
    ],
  },
  sections: [
    {
      title: "1. Agreement",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'These Terms of Service ("Terms") govern your access to and use of the Compensall website, tools, and related services (the "Service"). By using the Service, you agree to these Terms and our ',
            },
            { type: "link", href: "/privacy-policy", label: "Privacy Policy" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "2. Who may use the Service",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "You must be at least 18 years old and legally able to enter into binding contracts. If you submit a claim for another passenger, you confirm that you have authority to act on their behalf.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Our Service",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " helps air passengers assess and pursue flight compensation claims, primarily under UK Regulation UK261 and EU Regulation EC 261/2004 and related passenger rights rules. We provide digital tools, assistant-led checks, document preparation, and human-backed claim handling.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "We do not guarantee that a claim will succeed. Eligibility depends on the facts of your journey, airline response, and applicable law.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Submitting a claim",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "When you submit a claim you agree to:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Provide accurate and complete information." }],
            [
              {
                type: "text",
                text: "Upload documents you are entitled to share and that relate to your claim.",
              },
            ],
            [
              {
                type: "text",
                text: "Sign the required legal documents, including the Authority to Act, No Win, No Fee Agreement, and Privacy & Data Consent.",
              },
            ],
            [
              {
                type: "text",
                text: "Not pursue the same claim independently with the airline while we are acting for you, unless we agree otherwise in writing.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "See our claim documents at " },
            { type: "link", href: "/documents/no-win-no-fee", label: "No Win, No Fee" },
            { type: "text", text: ", " },
            { type: "link", href: "/documents/authority-to-act", label: "Authority to Act" },
            { type: "text", text: ", and " },
            { type: "link", href: "/documents/privacy-data-consent", label: "Privacy & Data Consent" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "5. Fees",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Website access and eligibility checks are free. If you appoint us to pursue compensation, our fees apply only on a success basis as set out in the No Win, No Fee Agreement. You pay nothing if we do not recover compensation for you, subject to the terms of that agreement.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Your responsibilities",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "You agree not to:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Misuse the Service or attempt unauthorised access to our systems." }],
            [{ type: "text", text: "Submit false, misleading, or fraudulent claims or documents." }],
            [{ type: "text", text: "Use the Service in violation of applicable law or third-party rights." }],
            [{ type: "text", text: "Copy, scrape, or commercially exploit our content without permission." }],
          ],
        },
      ],
    },
    {
      title: "7. Intellectual property",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The Compensall name, branding, website content, software, and materials are owned by or licensed to Compensall. You receive a limited, non-exclusive licence to use the Service for personal claim purposes.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Disclaimer",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The Service provides general information and claim assistance. It is not legal advice. Content on the website is provided for information purposes and may not reflect the latest legal developments in every jurisdiction.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "To the fullest extent permitted by law, Compensall is not liable for indirect, incidental, or consequential losses, or for airline decisions, court outcomes, or delays outside our reasonable control. Nothing in these Terms limits liability that cannot be limited under applicable law, including liability for fraud or death or personal injury caused by negligence.",
            },
          ],
        },
      ],
    },
    {
      title: "10. Suspension and termination",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "We may suspend or terminate access to the Service if you breach these Terms or if continued service would create legal or security risk. You may stop using the Service at any time. Claim-specific cancellation rights are described in your signed claim documents.",
            },
          ],
        },
      ],
    },
    {
      title: "11. Governing law",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "These Terms are governed by the laws of England and Wales. Courts in England and Wales have exclusive jurisdiction, except where mandatory consumer protection laws in your country of residence give you the right to bring proceedings elsewhere.",
            },
          ],
        },
      ],
    },
    {
      title: "12. Contact",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Questions about these Terms: " },
            { type: "email" },
          ],
        },
      ],
    },
  ],
  footer: "Document version 1.0. Last updated July 2026",
};
