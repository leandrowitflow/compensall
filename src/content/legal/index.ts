import type { AppLocale } from "@/i18n/routing";
import { cookiesEn } from "./cookies.en";
import { cookiesEs } from "./cookies.es";
import { cookiesFr } from "./cookies.fr";
import { cookiesPt } from "./cookies.pt";
import { cookiesHu } from "./cookies.hu";
import { cookiesRo } from "./cookies.ro";
import { cookiesDe } from "./cookies.de";
import { cookiesNl } from "./cookies.nl";
import { cookiesSq } from "./cookies.sq";
import { noWinNoFeeEn } from "./no-win-no-fee.en";
import { noWinNoFeeEs } from "./no-win-no-fee.es";
import { noWinNoFeeFr } from "./no-win-no-fee.fr";
import { noWinNoFeePt } from "./no-win-no-fee.pt";
import { noWinNoFeeHu } from "./no-win-no-fee.hu";
import { noWinNoFeeRo } from "./no-win-no-fee.ro";
import { noWinNoFeeDe } from "./no-win-no-fee.de";
import { noWinNoFeeNl } from "./no-win-no-fee.nl";
import { noWinNoFeeSq } from "./no-win-no-fee.sq";
import { privacyPolicyEn } from "./privacy-policy.en";
import { privacyPolicyEs } from "./privacy-policy.es";
import { privacyPolicyFr } from "./privacy-policy.fr";
import { privacyPolicyPt } from "./privacy-policy.pt";
import { privacyPolicyHu } from "./privacy-policy.hu";
import { privacyPolicyRo } from "./privacy-policy.ro";
import { privacyPolicyDe } from "./privacy-policy.de";
import { privacyPolicyNl } from "./privacy-policy.nl";
import { privacyPolicySq } from "./privacy-policy.sq";
import { termsEn } from "./terms.en";
import { termsEs } from "./terms.es";
import { termsFr } from "./terms.fr";
import { termsPt } from "./terms.pt";
import { termsHu } from "./terms.hu";
import { termsRo } from "./terms.ro";
import { termsDe } from "./terms.de";
import { termsNl } from "./terms.nl";
import { termsSq } from "./terms.sq";
import type { LegalDocument, LegalDocumentKey } from "./types";

const documents: Record<LegalDocumentKey, Record<AppLocale, LegalDocument>> = {
  "privacy-policy": {
    en: privacyPolicyEn,
    pt: privacyPolicyPt,
    fr: privacyPolicyFr,
    es: privacyPolicyEs,
    ro: privacyPolicyRo,
    hu: privacyPolicyHu,
    sq: privacyPolicySq,
    de: privacyPolicyDe,
    nl: privacyPolicyNl,
  },
  terms: {
    en: termsEn,
    pt: termsPt,
    fr: termsFr,
    es: termsEs,
    ro: termsRo,
    hu: termsHu,
    sq: termsSq,
    de: termsDe,
    nl: termsNl,
  },
  cookies: {
    en: cookiesEn,
    pt: cookiesPt,
    fr: cookiesFr,
    es: cookiesEs,
    ro: cookiesRo,
    hu: cookiesHu,
    sq: cookiesSq,
    de: cookiesDe,
    nl: cookiesNl,
  },
  "no-win-no-fee": {
    en: noWinNoFeeEn,
    pt: noWinNoFeePt,
    fr: noWinNoFeeFr,
    es: noWinNoFeeEs,
    ro: noWinNoFeeRo,
    hu: noWinNoFeeHu,
    sq: noWinNoFeeSq,
    de: noWinNoFeeDe,
    nl: noWinNoFeeNl,
  },
};

export function getLegalDocument(documentKey: LegalDocumentKey, locale: AppLocale): LegalDocument {
  return documents[documentKey][locale];
}

export type { LegalDocument, LegalDocumentKey } from "./types";
