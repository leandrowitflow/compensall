export type ClaimDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export const CLAIM_DOCUMENTS: ClaimDocument[] = [
  {
    id: "authority-to-act",
    title: "Power of Attorney",
    description: "Authorises Compensall to pursue your EC 261/2004 compensation claim.",
    href: "/documents/authority-to-act",
  },
];
