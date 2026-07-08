import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { CookiePolicyContent } from "@/components/legal/site-legal-content";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy",
  description:
    "Understand how Compensall uses cookies and similar technologies, and how you can manage your preferences.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPageShell
      title="Cookie Policy"
      breadcrumbLabel="Cookies"
      summary="How we use cookies and how you can control them."
    >
      <CookiePolicyContent />
    </LegalPageShell>
  );
}
