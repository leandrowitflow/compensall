import type { Metadata } from "next";
import { Open_Sans, Poppins, Roboto } from "next/font/google";
import AnchorScroll from "@/components/AnchorScroll";
import JsonLd from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/structured-data";
import { siteMetadata } from "@/lib/site-metadata";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${openSans.variable} ${poppins.variable} ${roboto.variable}`}
    >
      <body suppressHydrationWarning>
        <JsonLd data={[buildOrganizationSchema(), buildWebSiteSchema()]} />
        <div className="site-viewport min-w-0 overflow-x-clip">
          <AnchorScroll />
          {children}
        </div>
      </body>
    </html>
  );
}
