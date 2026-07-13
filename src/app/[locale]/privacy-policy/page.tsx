import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { PrivacyPolicyContent } from "@/components/legal/site-legal-content";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how Compensall collects, uses, stores, and protects your personal data when you use our website and flight compensation claim service.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      breadcrumbLabel="Privacy Policy"
      summary="How we handle your personal data across our website and claim service."
    >
      <PrivacyPolicyContent />
    </LegalPageShell>
  );
}
