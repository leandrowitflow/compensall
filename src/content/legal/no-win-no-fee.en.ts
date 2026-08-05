import type { LegalDocument } from "./types";

export const noWinNoFeeEn: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Summary:" },
      {
        type: "text",
        text: " You pay nothing upfront and nothing if we do not recover compensation on your behalf. Our success fee is only charged when your claim is successful.",
      },
    ],
  },
  sections: [
    {
      title: "1. Agreement Overview",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'This No Win, No Fee Agreement ("Agreement") is entered into between the claimant (you) and ',
            },
            { type: "strongBrand", field: "brandName" },
            {
              type: "text",
              text: ' ("the Company"). By proceeding with a claim through the Compensall platform, you agree to these terms.',
            },
          ],
        },
      ],
    },
    {
      title: "2. No Upfront Costs",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "There are no upfront fees, registration fees, or administration charges to submit your claim. You will incur no costs whatsoever if we are unable to recover compensation on your behalf.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Success Fee",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A success fee will be deducted from the compensation recovered on your behalf:",
            },
          ],
        },
        {
          type: "table",
          headers: ["Compensation Amount", "Success Fee"],
          rows: [
            { category: "Up to €250", purpose: "25% + VAT" },
            { category: "€251 – €400", purpose: "25% + VAT" },
            { category: "€401 – €600", purpose: "25% + VAT" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The success fee is deducted before the remaining compensation is transferred to you. You will always receive at least 75% of the recovered amount before VAT adjustments.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Payment Process",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Once the airline pays the compensation, Compensall will deduct the agreed success fee and transfer the remaining balance to your nominated bank account within 5–10 business days. You will receive a full breakdown of the settlement and deductions.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Cancellation",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "You may cancel this agreement at any time before the claim is settled by notifying us in writing at ",
            },
            { type: "strong", text: "cancel@compensall.com" },
            {
              type: "text",
              text: ". If substantial work has already been completed and the airline has made an offer, a reduced cancellation fee may apply.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Governing Law",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This Agreement is governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Document version 3.0. Last updated January 2026",
};
