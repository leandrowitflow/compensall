"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import {
  consumeCrossPageAnchorScroll,
  markCrossPageAnchorScroll,
  normalizePath,
  scrollToHash,
  scrollToHashWhenReady,
} from "@/lib/anchor-scroll";

export default function AnchorScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const onHashChange = () => scrollToHash(window.location.hash, true);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href?.includes("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      const hash = url.hash;
      if (!hash) return;

      const targetPath = normalizePath(url.pathname);
      const currentPath = normalizePath(pathname);

      if (targetPath !== currentPath) {
        markCrossPageAnchorScroll();
        return;
      }

      const id = hash.slice(1);
      if (!document.getElementById(id)) return;

      event.preventDefault();
      if (window.location.hash !== hash) {
        window.history.pushState(null, "", `${url.pathname}${hash}`);
      }
      scrollToHash(hash, true);
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const animateFromTop = consumeCrossPageAnchorScroll();
    if (animateFromTop) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    requestAnimationFrame(() => {
      scrollToHashWhenReady(hash, animateFromTop);
    });
  }, [pathname]);

  return null;
}
