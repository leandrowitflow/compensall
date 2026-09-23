"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { isInAppBrowser } from "@/lib/in-app-browser";
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
    case "es":
      return "es-ES";
    case "ro":
      return "ro-RO";
    case "hu":
      return "hu-HU";
    case "sq":
      return "en-GB";
    case "de":
      return "de-DE";
    case "nl":
      return "nl-NL";
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
  const [browserReady, setBrowserReady] = useState(false);
  const [skipIframe, setSkipIframe] = useState(false);
  const businessUnitId = getTrustpilotBusinessUnitId();
  const templateId = getTrustpilotTemplateId();
  const reviewUrl = getTrustpilotReviewUrl();

  useEffect(() => {
    setSkipIframe(isInAppBrowser(navigator.userAgent));
    setBrowserReady(true);
  }, []);

  useEffect(() => {
    if (skipIframe || !businessUnitId || !templateId || !ref.current) return;
    window.Trustpilot?.loadFromElement(ref.current, true);
  }, [locale, businessUnitId, templateId, skipIframe]);

  if (!businessUnitId || !templateId) {
    return null;
  }

  if (!browserReady) {
    return <div className={`w-full ${className}`.trim()} style={{ minHeight: height }} aria-hidden />;
  }

  if (skipIframe) {
    return (
      <div className={`flex justify-center w-full ${className}`.trim()} style={{ minHeight: height }}>
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/90 text-sm font-semibold underline underline-offset-2"
        >
          Trustpilot
        </a>
      </div>
    );
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
