import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";

type LegalPageShellProps = {
  title: string;
  breadcrumbLabel: string;
  summary: string;
  children: ReactNode;
};

export default async function LegalPageShell({
  title,
  breadcrumbLabel,
  summary,
  children,
}: LegalPageShellProps) {
  const t = await getTranslations("common");

  return (
    <div className="min-h-screen bg-[#f8faff] flex flex-col">
      <Header />

      <div className="max-w-[900px] mx-auto px-6 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-[#2669f3] transition-colors">
            {t("home")}
          </Link>
          <span>/</span>
          <span className="text-[#1f3664] font-medium">{breadcrumbLabel}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-[#d5e0f9] overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-[#1f3664] to-[#2669f3] px-8 py-8">
            <p className="text-white/70 text-sm mb-1">{t("legal")}</p>
            <h1 className="font-bold text-white text-2xl md:text-3xl">{title}</h1>
            <p className="text-white/80 text-sm md:text-base mt-3 max-w-[640px] leading-relaxed">{summary}</p>
          </div>

          <div className="px-8 py-8 text-[#1f3664]">{children}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
