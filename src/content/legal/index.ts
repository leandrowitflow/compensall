import type { AppLocale } from "@/i18n/routing";
import { cookiesEn } from "./cookies.en";
import { cookiesFr } from "./cookies.fr";
import { cookiesPt } from "./cookies.pt";
import { noWinNoFeeEn } from "./no-win-no-fee.en";
import { noWinNoFeeFr } from "./no-win-no-fee.fr";
import { noWinNoFeePt } from "./no-win-no-fee.pt";
import { privacyPolicyEn } from "./privacy-policy.en";
import { privacyPolicyFr } from "./privacy-policy.fr";
import { privacyPolicyPt } from "./privacy-policy.pt";
import { termsEn } from "./terms.en";
import { termsFr } from "./terms.fr";
import { termsPt } from "./terms.pt";
import type { LegalDocument, LegalDocumentKey } from "./types";

const documents: Record<LegalDocumentKey, Record<AppLocale, LegalDocument>> = {
  "privacy-policy": {
    en: privacyPolicyEn,
    pt: privacyPolicyPt,
    fr: privacyPolicyFr,
  },
  terms: {
    en: termsEn,
    pt: termsPt,
    fr: termsFr,
  },
  cookies: {
    en: cookiesEn,
    pt: cookiesPt,
    fr: cookiesFr,
  },
  "no-win-no-fee": {
    en: noWinNoFeeEn,
    pt: noWinNoFeePt,
    fr: noWinNoFeeFr,
  },
};

export function getLegalDocument(documentKey: LegalDocumentKey, locale: AppLocale): LegalDocument {
  return documents[documentKey][locale];
}

export type { LegalDocument, LegalDocumentKey } from "./types";
