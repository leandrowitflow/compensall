import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { AuthorityToActContent } from "@/components/claim/legal-document-content";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Authority to Act",
  description: "Authority to Act document authorising Compensall to act on your behalf with the airline.",
  path: "/documents/authority-to-act",
  noIndex: true,
});

const imgDocument = "/assets/documents/authority-to-act.png";

export default function AuthorityToActPage() {
  return (
    <div className="min-h-screen bg-[#f8faff]">
      <Header />

      <div className="max-w-[900px] mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#1f3664]/60 mb-8">
          <Link href="/" className="hover:text-[#2669f3] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#claim" className="hover:text-[#2669f3] transition-colors">Claim</Link>
          <span>/</span>
          <span className="text-[#1f3664] font-medium">Authority to Act</span>
        </nav>

        <div className="bg-white rounded-2xl border border-[#d5e0f9] overflow-hidden shadow-sm">
          {/* Document header */}
          <div className="bg-gradient-to-r from-[#1f3664] to-[#2669f3] px-8 py-8 flex items-center gap-5">
            <div className="w-16 h-16 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <img src={imgDocument} alt="Document" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Legal Document</p>
              <h1 className="font-bold text-white text-2xl md:text-3xl">Authority to Act</h1>
            </div>
          </div>

          <div className="px-8 py-8 text-[#1f3664]">
            <AuthorityToActContent />

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
