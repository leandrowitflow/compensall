"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import {
  getTrustpilotBusinessUnitId,
  getTrustpilotReviewUrl,
  getTrustpilotTemplateId,
  isTrustpilotTrustBoxConfigured,
} from "@/lib/trustpilot";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, force?: boolean) => void;
    };
  }
}

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
  const businessUnitId = getTrustpilotBusinessUnitId();
  const templateId = getTrustpilotTemplateId();
  const reviewUrl = getTrustpilotReviewUrl();

  useEffect(() => {
    if (!businessUnitId || !templateId || !ref.current) return;
    window.Trustpilot?.loadFromElement(ref.current, true);
  }, [locale, businessUnitId, templateId]);

  if (!businessUnitId || !templateId) {
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
          data-template-id={templateId}
          data-businessunit-id={businessUnitId}
          data-style-height={height}
          data-style-width="100%"
          data-theme="light"
        >
          <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
            Trustpilot
          </a>
        </div>
      </div>
    </>
  );
}

export { isTrustpilotTrustBoxConfigured };
