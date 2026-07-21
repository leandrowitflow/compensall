"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/routing";
import type { NavMenuGroup, NavMenuItem } from "@/lib/nav-menu";

const NavDropdown = dynamic(() => import("@/components/NavDropdown"));
const MobileMenu = dynamic(() => import("@/components/MobileMenu"));

export default function Header() {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const knowYourRightsNav: NavMenuGroup[] = [
    {
      title: tNav("knowYourRightsMenu.yourRights"),
      items: [
        {
          label: tNav("knowYourRightsMenu.overview"),
          href: "/know-your-rights",
          description: tNav("knowYourRightsMenu.overviewDescription"),
        },
        { label: tNav("knowYourRightsMenu.flightCancellation"), href: "/blog/flight-cancellation" },
        { label: tNav("knowYourRightsMenu.flightDelay"), href: "/blog/flight-delay" },
        { label: tNav("knowYourRightsMenu.deniedBoarding"), href: "/blog/denied-boarding" },
        { label: tNav("knowYourRightsMenu.missedConnection"), href: "/blog/missed-connection" },
        { label: tNav("knowYourRightsMenu.overbooking"), href: "/blog/overbooking" },
        { label: tNav("knowYourRightsMenu.airlineStrike"), href: "/blog/airline-strike" },
        { label: tNav("knowYourRightsMenu.passengerRights"), href: "/blog/passenger-rights" },
        {
          label: tNav("knowYourRightsMenu.passengersWithDisabilities"),
          href: "/blog/passengers-with-disabilities",
        },
      ],
    },
  ];

  const airlinesNav: NavMenuGroup[] = [
    {
      title: tNav("airlinesMenu.browse"),
      items: [
        {
          label: tNav("airlinesMenu.allAirlinesAirports"),
          href: "/airlines",
          description: tNav("airlinesMenu.allAirlinesAirportsDescription"),
        },
      ],
    },
    {
      title: tNav("airlinesMenu.popularAirlines"),
      items: [
        { label: "Ryanair", href: "/airlines/ryanair" },
        { label: "easyJet", href: "/airlines/easyjet" },
        { label: "British Airways", href: "/airlines/british-airways" },
        { label: "Wizz Air", href: "/airlines/wizz-air" },
        { label: "Lufthansa", href: "/airlines/lufthansa" },
        { label: "TAP Air Portugal", href: "/airlines/tap" },
      ],
    },
    {
      title: tNav("airlinesMenu.popularAirports"),
      items: [
        { label: "London Heathrow", href: "/airports/heathrow" },
        { label: "London Gatwick", href: "/airports/gatwick" },
        { label: "Manchester", href: "/airports/manchester" },
        { label: "Lisbon", href: "/airports/lisbon" },
        { label: "Barcelona El Prat", href: "/airports/barcelona" },
        { label: "Paris CDG", href: "/airports/paris-cdg" },
      ],
    },
  ];

  const primaryNavLinks: NavMenuItem[] = [
    { label: tNav("knowYourRights"), href: "/know-your-rights" },
    { label: tNav("airlines"), href: "/airlines" },
    { label: tNav("aboutUs"), href: "/about" },
    { label: tNav("blog"), href: "/blog" },
    { label: tNav("faq"), href: "/faq" },
  ];

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-50 px-4 md:px-8 lg:px-8 xl:px-12">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto h-16 lg:h-16 xl:h-[90px] grid grid-cols-[auto_1fr_auto] items-center gap-3 min-w-0">
          <Link href="/" className="shrink-0">
            <img src="/assets/logo.svg?v=2" alt="Compensall" width={120} height={32} className="h-8 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-2 xl:gap-4 min-w-0 overflow-hidden px-1">
            <NavDropdown
              label={tNav("knowYourRightsShort")}
              groups={knowYourRightsNav}
              columns={1}
            />
            <NavDropdown label={tNav("airlinesShort")} groups={airlinesNav} columns={3} align="end" />
            {primaryNavLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1f3664] text-[14px] xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 shrink-0">
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <LanguageSwitcher />
              <Link
                href="/#claim"
                className="bg-[#2669f3] text-white text-[14px] xl:text-[17px] font-bold px-4 xl:px-8 h-10 xl:h-[51px] flex items-center rounded-[11px] hover:bg-[#1a55d4] transition-colors whitespace-nowrap"
              >
                <span className="xl:hidden">{tNav("talkToUsShort")}</span>
                <span className="hidden xl:inline">{tNav("talkToUs")}</span>
              </Link>
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <LanguageSwitcher />
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-[11px] border-2 border-[#d5e0f9] text-[#1f3664]"
                onClick={() => setMenuOpen(true)}
                aria-label={tCommon("openMenu")}
                aria-expanded={menuOpen}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        knowYourRightsNav={knowYourRightsNav}
        airlinesNav={airlinesNav}
        primaryNavLinks={primaryNavLinks}
        talkToUsLabel={tNav("talkToUs")}
      />
    </>
  );
}
