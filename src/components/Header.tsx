"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { airlinesNav, knowYourRightsNav } from "@/lib/nav-menu";

const NavDropdown = dynamic(() => import("@/components/NavDropdown"));
const MobileMenu = dynamic(() => import("@/components/MobileMenu"));

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-50 px-4 md:px-8 lg:px-8 xl:px-12">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto h-16 lg:h-16 xl:h-[90px] flex items-center justify-between gap-3 min-w-0">
          <Link href="/">
            <img src="/assets/logo.svg?v=2" alt="Compensall" className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 min-w-0">
            <NavDropdown label="Know your rights" groups={knowYourRightsNav} columns={1} />
            <NavDropdown label="Airlines" groups={airlinesNav} columns={3} />
            <Link
              href="/about"
              className="text-[#1f3664] text-[15px] xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors"
            >
              About us
            </Link>
            <Link
              href="/blog"
              className="text-[#1f3664] text-[15px] xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors"
            >
              Blog
            </Link>
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              href="/#claim"
              className="bg-[#2669f3] text-white text-[15px] xl:text-[17px] font-bold px-5 xl:px-8 h-10 xl:h-[51px] flex items-center rounded-[11px] hover:bg-[#1a55d4] transition-colors"
            >
              Talk to us
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-[11px] border-2 border-[#d5e0f9] text-[#1f3664]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
