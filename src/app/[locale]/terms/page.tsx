import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { TermsOfServiceContent } from "@/components/legal/site-legal-content";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Read the Terms of Service for using Compensall, including claim submission rules, fees, responsibilities, and governing law.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms of Service"
      breadcrumbLabel="Terms of Service"
      summary="The rules for using Compensall and submitting a flight compensation claim."
    >
      <TermsOfServiceContent />
    </LegalPageShell>
  );
}
