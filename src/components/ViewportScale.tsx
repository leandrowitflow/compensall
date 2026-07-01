"use client";

import { useEffect } from "react";
import { applyViewportZoom } from "@/lib/viewport-scale";

export default function ViewportScale() {
  useEffect(() => {
    applyViewportZoom();

    const onResize = () => applyViewportZoom();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      document.documentElement.style.zoom = "";
      document.documentElement.removeAttribute("data-viewport-scale");
    };
  }, []);

  return null;
}
