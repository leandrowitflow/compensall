"use client";

import { useState } from "react";
import AirportBadge from "@/components/AirportBadge";
import type { CatalogItem } from "@/lib/catalog";
import { catalogLogoPath, catalogLogoSvgFallback } from "@/lib/catalog";
import { getAirportBadge, shouldUseAirportBadge } from "@/lib/airport-badges";

type CatalogLogoProps = {
  id: string;
  kind: "airlines" | "airports";
  name: string;
  logo?: string;
  className?: string;
};

export default function CatalogLogo({
  id,
  kind,
  name,
  logo,
  className = "h-full w-auto max-w-[200px] object-contain object-left",
}: CatalogLogoProps) {
  const item = { id, logo } satisfies Pick<CatalogItem, "id" | "logo">;
  const airportBadge = kind === "airports" ? getAirportBadge(id) : undefined;
  const useAirportBadge = kind === "airports" && shouldUseAirportBadge(id, logo);
  const primarySrc = catalogLogoPath(item, kind);
  const svgFallback = catalogLogoSvgFallback(item, kind);
  const [src, setSrc] = useState(primarySrc);
  const [failed, setFailed] = useState(false);

  if (useAirportBadge && airportBadge) {
    return <AirportBadge iata={airportBadge.iata} label={airportBadge.label} />;
  }

  const handleError = () => {
    if (svgFallback && src !== svgFallback) {
      setSrc(svgFallback);
      return;
    }
    setFailed(true);
  };

  if (failed && airportBadge) {
    return <AirportBadge iata={airportBadge.iata} label={airportBadge.label} />;
  }

  return <img src={src} alt={name} className={className} onError={handleError} />;
}
