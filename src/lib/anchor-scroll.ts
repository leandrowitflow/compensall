const DEFAULT_HEADER_GAP = 0;

export const ANCHOR_SCROLL_SMOOTH_KEY = "compensall-anchor-scroll-smooth";

function headerOffset(): number {
  return document.querySelector("header")?.getBoundingClientRect().height ?? 0;
}

export function scrollToHash(hash: string, smooth: boolean) {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const behavior: ScrollBehavior = smooth ? "smooth" : "auto";
  const elementTop = el.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: Math.max(0, elementTop - headerOffset() - DEFAULT_HEADER_GAP),
    behavior,
  });
  return true;
}

export function scrollToHashWhenReady(hash: string, smooth: boolean, attempt = 0) {
  if (scrollToHash(hash, smooth)) return;
  if (attempt >= 12) return;
  requestAnimationFrame(() => scrollToHashWhenReady(hash, smooth, attempt + 1));
}

export function normalizePath(path: string): string {
  const trimmed = path.replace(/\/$/, "");
  return trimmed || "/";
}

export function markCrossPageAnchorScroll() {
  sessionStorage.setItem(ANCHOR_SCROLL_SMOOTH_KEY, "1");
}

export function consumeCrossPageAnchorScroll(): boolean {
  const pending = sessionStorage.getItem(ANCHOR_SCROLL_SMOOTH_KEY) === "1";
  if (pending) sessionStorage.removeItem(ANCHOR_SCROLL_SMOOTH_KEY);
  return pending;
}
