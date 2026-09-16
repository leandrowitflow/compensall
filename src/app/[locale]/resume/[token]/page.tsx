import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CLAIM_RESUME_QUERY, isClaimResumeToken } from "@/lib/claim-draft-token";

type ResumeClaimPageProps = {
  params: Promise<{ locale: string; token: string }>;
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ResumeClaimPage({ params }: ResumeClaimPageProps) {
  const { locale, token } = await params;
  setRequestLocale(locale);

  const safeLocale = /^[a-z]{2}$/i.test(locale) ? locale.toLowerCase() : "en";
  if (!isClaimResumeToken(token)) {
    redirect(`/${safeLocale}/#claim`);
  }

  redirect(`/${safeLocale}?${CLAIM_RESUME_QUERY}=${encodeURIComponent(token)}#claim`);
}
