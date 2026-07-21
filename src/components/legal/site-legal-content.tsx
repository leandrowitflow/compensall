import type { AppLocale } from "@/i18n/routing";
import LegalDocumentContent from "./LegalDocumentContent";

export function PrivacyPolicyContent({ locale = "en" }: { locale?: AppLocale }) {
  return <LegalDocumentContent document="privacy-policy" locale={locale} />;
}

export function TermsOfServiceContent({ locale = "en" }: { locale?: AppLocale }) {
  return <LegalDocumentContent document="terms" locale={locale} />;
}

export function CookiePolicyContent({ locale = "en" }: { locale?: AppLocale }) {
  return <LegalDocumentContent document="cookies" locale={locale} />;
}
