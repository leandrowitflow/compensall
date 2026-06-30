export type ClaimDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export const CLAIM_DOCUMENTS: ClaimDocument[] = [
  {
    id: "authority-to-act",
    title: "Authority to Act",
    description: "Authorises Compensall to represent you with the airline.",
    href: "/documents/authority-to-act",
  },
  {
    id: "no-win-no-fee",
    title: "No Win, No Fee Agreement",
    description: "Explains our success-based fee and your obligations.",
    href: "/documents/no-win-no-fee",
  },
  {
    id: "privacy-data-consent",
    title: "Privacy & Data Consent",
    description: "How we collect, use, and protect your personal data.",
    href: "/documents/privacy-data-consent",
  },
];
