"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { NavMenuGroup } from "@/lib/nav-menu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/routing";
import type { NavMenuItem } from "@/lib/nav-menu";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  knowYourRightsNav: NavMenuGroup[];
  airlinesNav: NavMenuGroup[];
  primaryNavLinks: NavMenuItem[];
  talkToUsLabel: string;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
      className={`flex-shrink-0 text-[#2669f3] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MobileAccordion({
  label,
  groups,
  onNavigate,
  defaultOpen = false,
}: {
  label: string;
  groups: NavMenuGroup[];
  onNavigate: () => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-[16px] border-2 border-[#d5e0f9] overflow-hidden bg-white">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="font-bold text-[#1f3664] text-base">{label}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="border-t border-[#d5e0f9] bg-[#f8faff] px-3 py-3 space-y-4">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="text-[#7b8094] text-[11px] font-bold uppercase tracking-wider mb-2 px-2">
                {group.title}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between gap-3 rounded-[12px] bg-white border border-[#d5e0f9] px-3 py-3 active:bg-[#f0f5fe] transition-colors"
                      onClick={onNavigate}
                    >
                      <span className="min-w-0">
                        <span className="block font-semibold text-[#1f3664] text-sm leading-snug">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="block text-[#7b8094] text-xs mt-0.5">{item.description}</span>
                        )}
                      </span>
                      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true" className="flex-shrink-0 text-[#2669f3]">
                        <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-3 rounded-[16px] border-2 border-[#d5e0f9] bg-white px-4 py-4 font-bold text-[#1f3664] text-base active:bg-[#f8faff] transition-colors"
      onClick={onNavigate}
    >
      {label}
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true" className="text-[#2669f3]">
        <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

export default function MobileMenu({
  open,
  onClose,
  knowYourRightsNav,
  airlinesNav,
  primaryNavLinks,
  talkToUsLabel,
}: MobileMenuProps) {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="md:hidden fixed inset-0 z-[100]">
      <button
        type="button"
        className="absolute inset-0 bg-[#1f3664]/40 backdrop-blur-[2px]"
        aria-label={tCommon("closeMenu")}
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-[min(100%,24rem)] flex-col bg-white shadow-[-8px_0_32px_rgba(31,54,100,0.15)]">
        <div className="flex items-center justify-between gap-3 border-b border-[#d5e0f9] px-4 py-4">
          <Link href="/" onClick={onClose} className="flex-shrink-0">
            <img src="/assets/logo.svg?v=2" alt="Compensall" className="h-8 w-auto" />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#d5e0f9] text-[#1f3664]"
            aria-label={tCommon("closeMenu")}
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3">
          <MobileAccordion
            label={tNav("knowYourRights")}
            groups={knowYourRightsNav}
            onNavigate={onClose}
            defaultOpen
          />
          <MobileAccordion label={tNav("airlinesAndAirports")} groups={airlinesNav} onNavigate={onClose} />

          {primaryNavLinks.slice(2).map((link) => (
            <MobileNavLink key={link.href} href={link.href} label={link.label} onNavigate={onClose} />
          ))}

          <div className="rounded-[16px] border-2 border-[#d5e0f9] bg-white px-4 py-3">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="border-t border-[#d5e0f9] p-4 bg-[#f8faff]">
          <Link
            href="/#claim"
            className="flex items-center justify-center rounded-[14px] bg-[#2669f3] px-4 py-3.5 text-center font-bold text-white text-sm active:bg-[#1a55d4] transition-colors"
            onClick={onClose}
          >
            {talkToUsLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
