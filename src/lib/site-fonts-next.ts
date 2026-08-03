import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-open-sans",
  // Keep fonts off the mobile LCP network path (hero image wins).
  // display:swap + adjustFontFallback preserve the look without blocking paint.
  preload: false,
  adjustFontFallback: true,
});
