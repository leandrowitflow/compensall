"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import type { AirportOption } from "@/lib/airport-option";
import { searchAirports } from "@/lib/airport-search";
import { resolveBrowserLanguage } from "@/lib/localize-catalog";

type AirportSelectProps = {
  id: string;
  placeholder: string;
  value: AirportOption | null;
  onChange: (airport: AirportOption | null) => void;
  excludeAirportId?: string | null;
  disabled?: boolean;
};

function AirportLogo({ airport }: { airport: AirportOption }) {
  const [src, setSrc] = useState(airport.logo);

  return (
    <div className="w-9 h-9 rounded-lg bg-[#f8faff] border border-[#d5e0f9]/80 flex items-center justify-center flex-shrink-0 overflow-hidden">
      <img
        src={src}
        alt=""
        className="w-7 h-7 object-contain"
        onError={() => {
          if (airport.logoFallback && src !== airport.logoFallback) {
            setSrc(airport.logoFallback);
          }
        }}
      />
    </div>
  );
}

export default function AirportSelect({
  id,
  placeholder,
  value,
  onChange,
  excludeAirportId,
  disabled = false,
}: AirportSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [language, setLanguage] = useState("en");
  const [menuRect, setMenuRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);

  const results = searchAirports(query, language, {
    excludeId: excludeAirportId ?? undefined,
  });
  const showAll = !query.trim();
  const listTitle = showAll
    ? `All airports (${results.length})`
    : `${results.length} result${results.length === 1 ? "" : "s"}`;

  useEffect(() => {
    setMounted(true);
    setLanguage(resolveBrowserLanguage());
  }, []);

  const updateMenuRect = () => {
    if (rootRef.current) {
      setMenuRect(rootRef.current.getBoundingClientRect());
    }
  };

  useLayoutEffect(() => {
    if (!open) return;
    updateMenuRect();
    window.addEventListener("scroll", updateMenuRect, true);
    window.addEventListener("resize", updateMenuRect);
    return () => {
      window.removeEventListener("scroll", updateMenuRect, true);
      window.removeEventListener("resize", updateMenuRect);
    };
  }, [open, query]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
      setQuery("");
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    setHighlightIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
      setQuery("");
    }
  }, [disabled]);

  const openPicker = () => {
    if (disabled) return;
    setOpen(true);
    setQuery("");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const selectAirport = (airport: AirportOption) => {
    onChange(airport);
    setOpen(false);
    setQuery("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightIndex((index) => Math.min(index + 1, results.length - 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightIndex((index) => Math.max(index - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const airport = results[highlightIndex];
      if (airport) selectAirport(airport);
      return;
    }
    if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  };

  const dropdown =
    open && menuRect && mounted
      ? createPortal(
          <div
            ref={menuRef}
            className="rounded-xl border-2 border-[#d5e0f9] bg-white shadow-[0_12px_40px_rgba(31,54,100,0.12)] overflow-hidden"
            style={{
              position: "fixed",
              top: menuRect.bottom + 4,
              left: menuRect.left,
              width: menuRect.width,
              zIndex: 100,
            }}
          >
            <div className="px-3 py-2 border-b border-[#d5e0f9]/80 bg-[#fafbff]">
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#7b8094]">{listTitle}</p>
              {excludeAirportId && (
                <p className="text-[11px] text-[#7b8094] mt-0.5">The other selected airport is hidden.</p>
              )}
            </div>
            <ul id={listboxId} role="listbox" className="max-h-[min(360px,50vh)] overflow-y-auto py-1">
              {results.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-[#7b8094]">
                  No airports found. Try a city name or code (e.g. LHR).
                </li>
              ) : (
                results.map((airport, index) => {
                  const selected = value?.id === airport.id;
                  const highlighted = index === highlightIndex;
                  return (
                    <li key={airport.id} role="option" aria-selected={selected}>
                      <button
                        type="button"
                        onMouseEnter={() => setHighlightIndex(index)}
                        onClick={() => selectAirport(airport)}
                        className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-colors ${
                          highlighted ? "bg-[#f1f5fe]" : "hover:bg-[#f8faff]"
                        }`}
                      >
                        <AirportLogo airport={airport} />
                        <span className="min-w-0 flex-1">
                          <span className="block font-bold text-[#1f3664] text-sm truncate">{airport.city}</span>
                          <span className="block text-[#7b8094] text-xs truncate">{airport.name}</span>
                        </span>
                        <span className="flex-shrink-0 rounded-md bg-[#f1f5fe] px-2 py-1 text-xs font-bold text-[#2669f3]">
                          {airport.iata}
                        </span>
                        {selected && (
                          <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-4 h-4 flex-shrink-0 object-contain" />
                        )}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <div
      ref={rootRef}
      className={`relative flex-1 min-w-0 self-stretch ${disabled ? "opacity-60" : ""}`}
      aria-disabled={disabled || undefined}
    >
      <span className="sr-only" id={`${id}-label`}>
        {placeholder}
      </span>

      {!open && value ? (
        <button
          type="button"
          id={id}
          aria-labelledby={`${id}-label`}
          onClick={openPicker}
          disabled={disabled}
          className="w-full h-full min-h-[73px] px-4 sm:px-6 flex items-center justify-center text-center hover:bg-[#f8faff]/50 transition-colors disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <span className="text-[#1f3664] text-base sm:text-lg truncate">
            {value.city} ({value.iata})
          </span>
        </button>
      ) : !open ? (
        <button
          type="button"
          id={id}
          aria-labelledby={`${id}-label`}
          onClick={openPicker}
          disabled={disabled}
          className="w-full h-full min-h-[73px] px-4 sm:px-6 flex items-center justify-center text-center hover:bg-[#f8faff]/50 transition-colors disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <span className="text-[#1f3664] text-base sm:text-lg">{placeholder}</span>
        </button>
      ) : (
        <div className="w-full h-full min-h-[73px] px-4 sm:px-6 flex items-center">
          <input
            ref={inputRef}
            id={`${id}-input`}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-labelledby={`${id}-label`}
            value={query}
            disabled={disabled}
            onChange={(e) => {
              if (disabled) return;
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              if (disabled) return;
              setOpen(true);
            }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent text-[#1f3664] text-base sm:text-lg text-center outline-none placeholder:text-[#1f3664]"
          />
        </div>
      )}

      {dropdown}
    </div>
  );
}
