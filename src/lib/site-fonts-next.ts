import { Open_Sans, Poppins, Roboto } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-open-sans",
  preload: true,
  adjustFontFallback: true,
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-roboto",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-poppins",
});

export const siteFontClassNames = `${openSans.variable} ${roboto.variable} ${poppins.variable}`;
