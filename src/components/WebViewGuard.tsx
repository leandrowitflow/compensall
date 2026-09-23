"use client";

import { useEffect } from "react";
import { isWebViewBridgeNoise } from "@/lib/in-app-browser";

/**
 * Facebook / Instagram WebViews throw native bridge errors (postMessage / Java object
 * gone) that Clarity records as JavaScript failures. They do not come from our form
 * and must not tear down React or look like a blocked claim.
 */
export default function WebViewGuard() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      if (!isWebViewBridgeNoise(event.message)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        typeof reason === "string" ? reason : reason instanceof Error ? reason.message : "";
      if (!isWebViewBridgeNoise(message)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    window.addEventListener("error", onError, true);
    window.addEventListener("unhandledrejection", onRejection, true);
    return () => {
      window.removeEventListener("error", onError, true);
      window.removeEventListener("unhandledrejection", onRejection, true);
    };
  }, []);

  return null;
}
