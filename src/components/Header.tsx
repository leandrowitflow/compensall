"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white sticky top-0 z-50 px-4 md:px-8 lg:px-8 xl:px-12">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto h-16 lg:h-16 xl:h-[90px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <img src="/assets/logo.svg?v=2" alt="Compensall" className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/know-your-rights" className="text-[#1f3664] text-[15px] xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors">
            Know your rights
          </Link>
          <Link href="/airlines" className="text-[#1f3664] text-[15px] xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors">
            Airlines
          </Link>
          <Link href="/about" className="text-[#1f3664] text-[15px] xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors">
            About us
          </Link>
          <Link href="/blog" className="text-[#1f3664] text-[15px] xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors">
            Blog
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/#claim"
            className="bg-[#2669f3] text-white text-[15px] xl:text-[17px] font-bold px-5 xl:px-8 h-10 xl:h-[51px] flex items-center rounded-[11px] hover:bg-[#1a55d4] transition-colors"
          >
            Talk to us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#1f3664]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#d5e0f9] py-4 flex flex-col gap-4">
          <Link href="/know-your-rights" className="text-[#1f3664] text-sm font-medium" onClick={() => setMenuOpen(false)}>
            Know your rights
          </Link>
          <Link href="/airlines" className="text-[#1f3664] text-sm font-medium" onClick={() => setMenuOpen(false)}>
            Airlines
          </Link>
          <Link href="/about" className="text-[#1f3664] text-sm font-medium" onClick={() => setMenuOpen(false)}>
            About us
          </Link>
          <Link href="/blog" className="text-[#1f3664] text-sm font-medium" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
          <Link
            href="/#claim"
            className="bg-[#2669f3] text-white text-sm font-bold px-6 py-3 rounded-[11px] text-center"
            onClick={() => setMenuOpen(false)}
          >
            Talk to us
          </Link>
        </div>
      )}
    </header>
  );
}
