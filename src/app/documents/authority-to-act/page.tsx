import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import PowerOfAttorneyDocument from "@/components/claim/PowerOfAttorneyDocument";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Power of Attorney",
  description: "Power of Attorney authorising Compensall to pursue your EC 261/2004 flight compensation claim.",
  path: "/documents/authority-to-act",
  noIndex: true,
});

export default function AuthorityToActPage() {
  return (
    <div className="min-h-screen bg-[#f8faff]">
      <Header />

      <div className="max-w-[900px] mx-auto px-6 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-[#2669f3] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#claim" className="hover:text-[#2669f3] transition-colors">
            Claim
          </Link>
          <span>/</span>
          <span className="text-[#1f3664] font-medium">Power of Attorney</span>
        </nav>

        <div className="bg-white rounded-2xl border border-[#d5e0f9] overflow-hidden shadow-sm">
          <div className="px-8 py-10 text-[#1f3664]">
            <PowerOfAttorneyDocument />

            <div className="mt-8 pt-6 border-t border-[#d5e0f9] flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <p className="text-xs text-[#1f3664]/50">Copyright © Compensall 2026. All rights reserved.</p>
              <Link
                href="/#claim"
                className="bg-[#2669f3] text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-[#1a55d4] transition-colors whitespace-nowrap"
              >
                Back to claim
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
