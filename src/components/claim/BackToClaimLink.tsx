"use client";

import { useLocale } from "next-intl";
import type { MouseEvent, ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { returnFromClaimDocument } from "@/lib/claim-return";
import { gtmClaimCta, type GtmClaimLocation } from "@/lib/gtm";

type BackToClaimLinkProps = {
  className?: string;
  location: Extract<GtmClaimLocation, "docs" | "docs_breadcrumb">;
  children: ReactNode;
};

export default function BackToClaimLink({ className, location, children }: BackToClaimLinkProps) {
  const locale = useLocale();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (!returnFromClaimDocument(locale)) return;
    event.preventDefault();
  };

  return (
    <Link href="/#claim" className={className} onClick={onClick} {...gtmClaimCta(location)}>
      {children}
    </Link>
  );
}
