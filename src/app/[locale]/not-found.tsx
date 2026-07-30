import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";

export default async function NotFound() {
  const t = await getTranslations("notFoundPage");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="px-4 md:px-8 py-16 text-center max-w-[760px] mx-auto">
        <h1 className="font-bold text-3xl text-[#1f3664] mb-4">{t("title")}</h1>
        <p className="text-[#1f3664] mb-8">{t("description")}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/#claim" className="bg-[#2669f3] text-white font-bold px-6 py-3 rounded-[11px]">
            {t("checkCompensation")}
          </Link>
          <Link href="/know-your-rights" className="text-[#2669f3] font-bold px-6 py-3">
            {t("knowYourRights")}
          </Link>
          <Link href="/blog" className="text-[#2669f3] font-bold px-6 py-3">
            {t("blog")}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
