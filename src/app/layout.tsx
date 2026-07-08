import type { Metadata } from "next";
import AnchorScroll from "@/components/AnchorScroll";
import JsonLd from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/structured-data";
import { siteMetadata } from "@/lib/site-metadata";
import "./globals.css";

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
      </head>
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
