export type CompensationTier = {
  amount: string;
  image?: string;
  label: string;
  desc: string;
};

export const LEGAL_ENTITY_NAME = "Albuquerque, Araújo, Lda";
export const LEGAL_ENTITY_NIF = "PT518929485";
export const LEGAL_ENTITY_ADDRESS = "Rua Paulo da Gama 629, 4150-589 Porto, Portugal";
export const LEGAL_ENTITY_EMAIL = "help@compensall.com";
export const BRAND_NAME = "Compensall";

export const UK261_TIERS: CompensationTier[] = [
  {
    amount: "£220",
    image: "/assets/compensation/250.png",
    label: "Flights up to 1,500 km",
    desc: "UK261 compensation for shorter eligible flights.",
  },
  {
    amount: "£350",
    image: "/assets/compensation/400.png",
    label: "Flights between 1,500 km and 3,500 km",
    desc: "UK261 compensation for medium-distance flights.",
  },
  {
    amount: "£520",
    image: "/assets/compensation/600.png",
    label: "Flights over 3,500 km",
    desc: "UK261 compensation for long-distance flights.",
  },
];

export const EC261_TIERS: CompensationTier[] = [
  {
    amount: "€250",
    image: "/assets/compensation/250.png",
    label: "Flights up to 1,500 km",
    desc: "EC 261/2004 compensation for shorter eligible flights.",
  },
  {
    amount: "€400",
    image: "/assets/compensation/400.png",
    label: "Flights between 1,500 km and 3,500 km",
    desc: "EC 261/2004 compensation for medium-distance flights.",
  },
  {
    amount: "€600",
    image: "/assets/compensation/600.png",
    label: "Flights over 3,500 km",
    desc: "EC 261/2004 compensation for long-distance flights.",
  },
];

export const EC261_NOTE =
  "For eligible EU flights, EC 261/2004 provides €250, €400, or €600 on the same distance bands.";

export const UPLOAD_RIGHTS_CONTEXT =
  "Under UK and EU passenger rights law (UK261 and EC 261/2004), you may be entitled to compensation for delays, cancellations, and denied boarding. Upload your boarding pass to check eligibility — free and no win, no fee.";
