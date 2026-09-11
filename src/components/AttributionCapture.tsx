"use client";

import { useEffect } from "react";
import { captureClaimAttribution } from "@/lib/claim-attribution-client";

/** Persist first-touch UTMs / referrer before the visitor reaches the claim form. */
export default function AttributionCapture() {
  useEffect(() => {
    captureClaimAttribution();
  }, []);

  return null;
}
