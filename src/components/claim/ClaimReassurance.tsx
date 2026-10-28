"use client";

import { useTranslations } from "next-intl";

function CourtIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97Z"
      />
    </svg>
  );
}

function FastIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M13.6 1.8a.8.8 0 0 1 1.4.6l-1.4 6.8h6.1a.8.8 0 0 1 .6 1.3l-9.6 11a.8.8 0 0 1-1.4-.7l1.5-6.6H5.1a.8.8 0 0 1-.6-1.3l8.4-10.8a.8.8 0 0 1 .7-.3Z"
      />
    </svg>
  );
}

function FeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 3.2c2.2 1.6 4.6 2.4 7.2 2.4h.2V10c0 4.6-3 8.2-7.4 9.6C7.6 18.2 4.6 14.6 4.6 10V5.6h.2C7.4 5.6 9.8 4.8 12 3.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8.8 11.8 11 14l4.3-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ITEMS = [
  { key: "reassuranceCourt", Icon: CourtIcon },
  { key: "reassuranceFast", Icon: FastIcon },
  { key: "reassuranceFee", Icon: FeeIcon },
] as const;

export default function ClaimReassurance() {
  const tStep2 = useTranslations("claim.step2");

  return (
    <ul className="flex flex-row flex-wrap gap-x-5 gap-y-3 lg:flex-col lg:gap-5 lg:pt-2">
      {ITEMS.map((item) => (
        <li key={item.key} className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8efff] text-[#2669f3]">
            <item.Icon />
          </span>
          <span className="text-sm font-bold text-[#1f3664] leading-snug">{tStep2(item.key)}</span>
        </li>
      ))}
    </ul>
  );
}
