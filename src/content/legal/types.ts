export type LegalDocumentKey = "privacy-policy" | "terms" | "cookies";

export type LegalBrandField =
  | "brandName"
  | "legalEntityName"
  | "legalEntityNif"
  | "legalEntityAddress";

export type LegalInline =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "link"; href: string; label: string }
  | { type: "email" }
  | { type: "brand"; field: LegalBrandField }
  | { type: "strongBrand"; field: LegalBrandField };

export type LegalParagraphBlock = {
  type: "paragraph";
  content: LegalInline[];
};

export type LegalListBlock = {
  type: "list";
  items: LegalInline[][];
};

export type LegalCalloutBlock = {
  type: "callout";
  content: LegalInline[];
};

export type LegalTableBlock = {
  type: "table";
  headers: [string, string];
  rows: Array<{ category: string; purpose: string }>;
};

export type LegalBlock =
  | LegalParagraphBlock
  | LegalListBlock
  | LegalCalloutBlock
  | LegalTableBlock;

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  intro?: LegalCalloutBlock;
  sections: LegalSection[];
  footer?: string;
};
