import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="px-4 md:px-8 py-16 text-center max-w-[760px] mx-auto">
        <h1 className="font-bold text-3xl text-[#1f3664] mb-4">Page not found</h1>
        <p className="text-[#1f3664] mb-8">
          We could not find that page. Start a compensation check or browse our guides below.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/#claim" className="bg-[#2669f3] text-white font-bold px-6 py-3 rounded-[11px]">
            Check compensation
          </Link>
          <Link href="/know-your-rights" className="text-[#2669f3] font-bold px-6 py-3">
            Know your rights
          </Link>
          <Link href="/blog" className="text-[#2669f3] font-bold px-6 py-3">
            Blog
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
