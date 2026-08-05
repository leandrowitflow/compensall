"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/routing";
import type { HeaderNavData } from "@/lib/build-header-nav";
import { gtmClaimCta, gtmId } from "@/lib/gtm";

const NavDropdown = dynamic(() => import("@/components/NavDropdown"));
const MobileMenu = dynamic(() => import("@/components/MobileMenu"));

type HeaderClientProps = HeaderNavData;

export default function HeaderClient({
  knowYourRightsNav,
  airlinesNav,
  primaryNavLinks,
  labels,
}: HeaderClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  /** Desktop mega-menus are xl-only — skip loading their chunks on mobile. */
  const [loadDesktopNav, setLoadDesktopNav] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const sync = () => setLoadDesktopNav(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-50 px-4 md:px-8 lg:px-8 xl:px-12">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto h-16 lg:h-16 xl:h-[90px] grid grid-cols-[auto_1fr_auto] items-center gap-2 xl:gap-3 min-w-0">
          <Link href="/" className="shrink-0" {...gtmId("nav_logo_home")}>
            <img src="/assets/logo.svg?v=2" alt="Compensall" width={120} height={32} className="h-8 w-auto" />
          </Link>

          <nav className="hidden xl:flex items-center justify-center gap-3 2xl:gap-5 min-w-0 px-2">
            {loadDesktopNav ? (
              <>
                <NavDropdown
                  label={labels.knowYourRightsShort}
                  groups={knowYourRightsNav}
                  columns={1}
                  triggerGtm="nav_know_your_rights"
                />
                <NavDropdown
                  label={labels.airlinesShort}
                  groups={airlinesNav}
                  columns={3}
                  align="center"
                  triggerGtm="nav_airlines"
                />
              </>
            ) : (
              <>
                <Link
                  href="/know-your-rights"
                  className="text-[#1f3664] text-[14px] 2xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors whitespace-nowrap px-1.5"
                  {...gtmId("nav_know_your_rights")}
                >
                  {labels.knowYourRightsShort}
                </Link>
                <Link
                  href="/airlines"
                  className="text-[#1f3664] text-[14px] 2xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors whitespace-nowrap px-1.5"
                  {...gtmId("nav_airlines")}
                >
                  {labels.airlinesShort}
                </Link>
              </>
            )}
            {primaryNavLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1f3664] text-[14px] 2xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors whitespace-nowrap px-1.5"
                {...(link.gtm ? gtmId(link.gtm) : {})}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 shrink-0">
            <div className="hidden xl:flex items-center gap-2 2xl:gap-3">
              <LanguageSwitcher />
              <Link
                href="/#claim"
                className="bg-[#2669f3] text-white text-[14px] 2xl:text-[17px] font-bold px-4 2xl:px-8 h-10 2xl:h-[51px] flex items-center rounded-[11px] hover:bg-[#1a55d4] transition-colors whitespace-nowrap"
                {...gtmClaimCta("header")}
              >
                <span className="2xl:hidden">{labels.talkToUsShort}</span>
                <span className="hidden 2xl:inline">{labels.talkToUs}</span>
              </Link>
            </div>

            <div className="flex xl:hidden items-center gap-2">
              <LanguageSwitcher />
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-[11px] border-2 border-[#d5e0f9] text-[#1f3664]"
                onClick={() => setMenuOpen(true)}
                aria-label={labels.openMenu}
                aria-expanded={menuOpen}
                {...gtmId("nav_mobile_menu_open")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <MobileMenu
          open={menuOpen}
          onClose={closeMenu}
          knowYourRightsNav={knowYourRightsNav}
          airlinesNav={airlinesNav}
          primaryNavLinks={primaryNavLinks}
          talkToUsLabel={labels.talkToUs}
        />
      ) : null}
    </>
  );
}
