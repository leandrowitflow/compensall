"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import type { NavMenuGroup } from "@/lib/nav-menu";

type NavDropdownProps = {
  label: string;
  groups: NavMenuGroup[];
  columns?: 1 | 2 | 3;
  align?: "start" | "center" | "end";
};

function panelWidthClass(columns: 1 | 2 | 3): string {
  switch (columns) {
    case 1:
      return "min-w-[280px] lg:min-w-[320px]";
    case 2:
      return "min-w-[280px] lg:min-w-[480px] xl:min-w-[520px]";
    case 3:
      return "min-w-[280px] lg:min-w-[560px] xl:min-w-[720px]";
    default: {
      const _exhaustive: never = columns;
      return _exhaustive;
    }
  }
}

function gridClass(columns: 1 | 2 | 3): string {
  switch (columns) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 lg:grid-cols-2";
    case 3:
      return "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3";
    default: {
      const _exhaustive: never = columns;
      return _exhaustive;
    }
  }
}

export default function NavDropdown({
  label,
  groups,
  columns = 2,
  align = "start",
}: NavDropdownProps) {
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

  const columnClass = gridClass(columns);
  let panelAlignClass: string;
  switch (align) {
    case "end":
      panelAlignClass = "right-0 left-auto";
      break;
    case "center":
      panelAlignClass = "left-1/2 right-auto -translate-x-1/2";
      break;
    case "start":
      panelAlignClass = "left-0 right-auto";
      break;
    default: {
      const _exhaustive: never = align;
      panelAlignClass = _exhaustive;
    }
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        className="inline-flex items-center gap-1 text-[#1f3664] text-[14px] lg:text-[15px] xl:text-[17px] font-normal hover:text-[#2669f3] transition-colors whitespace-nowrap"
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
          className={`absolute ${panelAlignClass} top-[calc(100%+12px)] z-50 ${panelWidthClass(columns)} max-w-[calc(100vw-2rem)] rounded-[16px] border-2 border-[#d5e0f9] bg-white shadow-[0_16px_40px_rgba(31,54,100,0.12)] p-4 xl:p-5`}
        >
          <div className={`grid gap-5 ${columnClass}`}>
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-[#7b8094] text-xs font-bold uppercase tracking-wide mb-3 px-2 break-words">
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
                        <span className="block text-[#1f3664] text-sm xl:text-[15px] font-semibold leading-snug">
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
