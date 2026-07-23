/**
 * Replacement for Next.js `polyfill-module`.
 *
 * Next ships Baseline-2020+ polyfills (Array.at, Object.hasOwn, etc.) to every
 * browser. Our browserslist already targets Chrome/Edge/Firefox 111+ and
 * Safari 16.4+, which natively support those APIs — except URL.canParse
 * (Safari 17+). Keep only that one polyfill.
 */
if (!("canParse" in URL)) {
  URL.canParse = function canParse(url, base) {
    try {
      return !!new URL(url, base);
    } catch {
      return false;
    }
  };
}
