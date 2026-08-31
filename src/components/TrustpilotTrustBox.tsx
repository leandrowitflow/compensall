"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, force?: boolean) => void;
    };
  }
}

const BUSINESS_UNIT_ID = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID?.trim() || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID?.trim() || "";
const REVIEW_URL =
  process.env.NEXT_PUBLIC_TRUSTPILOT_REVIEW_URL?.trim() ||
  "https://www.trustpilot.com/review/www.compensall.com";

function localeToTrustpilot(locale: string): string {
  switch (locale) {
    case "pt":
      return "pt-PT";
    case "fr":
      return "fr-FR";
    case "en":
    default:
      return "en-GB";
  }
}

type TrustpilotTrustBoxProps = {
  className?: string;
  /** TrustBox height from Trustpilot “Get code”. */
  height?: string;
};

/**
 * Official Trustpilot TrustBox only.
 * Renders nothing unless Business Unit ID + Template ID are configured
 * (avoids unofficial score images that violate Trustpilot brand guidelines).
 */
export default function TrustpilotTrustBox({
  className = "",
  height = "28px",
}: TrustpilotTrustBoxProps) {
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!BUSINESS_UNIT_ID || !TEMPLATE_ID || !ref.current) return;
    window.Trustpilot?.loadFromElement(ref.current, true);
  }, [locale]);

  if (!BUSINESS_UNIT_ID || !TEMPLATE_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="trustpilot-bootstrap"
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
      />
      <div className={`flex justify-center w-full ${className}`.trim()}>
        <div
          ref={ref}
          className="trustpilot-widget"
          data-locale={localeToTrustpilot(locale)}
          data-template-id={TEMPLATE_ID}
          data-businessunit-id={BUSINESS_UNIT_ID}
          data-style-height={height}
          data-style-width="100%"
          data-theme="light"
        >
          <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer">
            Trustpilot
          </a>
        </div>
      </div>
    </>
  );
}

export function isTrustpilotTrustBoxConfigured(): boolean {
  return Boolean(BUSINESS_UNIT_ID && TEMPLATE_ID);
}
