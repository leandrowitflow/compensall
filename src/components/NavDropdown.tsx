"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import type { NavMenuGroup } from "@/lib/nav-menu";

type NavDropdownProps = {
  label: string;
  groups: NavMenuGroup[];
  columns?: 1 | 2 | 3;
};

export default function NavDropdown({ label, groups, columns = 2 }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const columnClass =
    columns === 3
      ? "md:grid-cols-3"
      : columns === 1
        ? "md:grid-cols-1"
        : "md:grid-cols-2";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 text-[#1f3664] text-[15px] xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute left-0 top-[calc(100%+12px)] z-50 min-w-[280px] xl:min-w-[520px] rounded-[16px] border-2 border-[#d5e0f9] bg-white shadow-[0_16px_40px_rgba(31,54,100,0.12)] p-4 xl:p-5"
        >
          <div className={`grid grid-cols-1 gap-5 ${columnClass}`}>
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-[#7b8094] text-xs font-bold uppercase tracking-wide mb-3 px-2">
                  {group.title}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-[10px] px-2 py-2 hover:bg-[#f0f5fe] transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <span className="block text-[#1f3664] text-sm xl:text-[15px] font-semibold">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="block text-[#7b8094] text-xs mt-0.5">{item.description}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
