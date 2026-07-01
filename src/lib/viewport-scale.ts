/** Matches Figma at ~75% on 1920×1200 laptops; everything else stays 100%. */
export const LAPTOP_VIEWPORT_ZOOM = 0.75;

/** Known 1920×1200 (16:10) laptop sizes at 100%, 125%, and 150% Windows scaling. */
const LAPTOP_SCREEN_SIZES = new Set([
  "1920x1200",
  "1200x1920",
  "1536x960",
  "960x1536",
  "1280x800",
  "800x1280",
]);

function screenSizeKey(width: number, height: number): string {
  return `${width}x${height}`;
}

/** Uses display size so DevTools / half-width windows don't fool detection. */
export function is1920x1200LaptopScreen(): boolean {
  if (typeof window === "undefined") return false;
  return LAPTOP_SCREEN_SIZES.has(screenSizeKey(window.screen.width, window.screen.height));
}

export function shouldApplyLaptopViewportZoom(width: number, height: number): boolean {
  if (is1920x1200LaptopScreen()) return true;

  if (width < 1024) return false;

  // Fallback when screen.* is unavailable or window matches a maximized 1200p band
  if (width <= 1920 && height >= 1100 && height <= 1250) return true;
  if (width <= 1600 && height >= 900 && height <= 1099) return true;
  if (width <= 1400 && height >= 760 && height <= 899) return true;

  return false;
}

export function applyViewportZoom(
  width = window.innerWidth,
  height = window.innerHeight,
): void {
  const root = document.documentElement;
  const useLaptopZoom = shouldApplyLaptopViewportZoom(width, height);

  if (useLaptopZoom && CSS.supports("zoom", "1")) {
    root.style.zoom = String(LAPTOP_VIEWPORT_ZOOM);
    root.removeAttribute("data-viewport-scale");
    return;
  }

  root.style.zoom = "";

  if (useLaptopZoom) {
    root.setAttribute("data-viewport-scale", "laptop");
    root.style.setProperty("--viewport-scale", String(LAPTOP_VIEWPORT_ZOOM));
  } else {
    root.removeAttribute("data-viewport-scale");
    root.style.removeProperty("--viewport-scale");
  }
}

/** Inline bootstrap — keep in sync with shouldApplyLaptopViewportZoom. */
export const VIEWPORT_SCALE_BOOTSTRAP = `(function(){var z="${LAPTOP_VIEWPORT_ZOOM}",k=window.screen.width+"x"+window.screen.height,a=["1920x1200","1200x1920","1536x960","960x1536","1280x800","800x1280"],w=window.innerWidth,h=window.innerHeight,b=a.indexOf(k)!==-1,c=w>=1024&&((w<=1920&&h>=1100&&h<=1250)||(w<=1600&&h>=900&&h<=1099)||(w<=1400&&h>=760&&h<=899));if(!b&&!c)return;var r=document.documentElement;if(CSS.supports&&CSS.supports("zoom","1")){r.style.zoom=z;}else{r.setAttribute("data-viewport-scale","laptop");r.style.setProperty("--viewport-scale",z);}})();`;
