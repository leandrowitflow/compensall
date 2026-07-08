import type { Metadata } from "next";
import DeferredAnchorScroll from "@/components/DeferredAnchorScroll";
import DeferredCookieBanner from "@/components/DeferredCookieBanner";
import JsonLd from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/structured-data";
import { openSans, siteFontClassNames } from "@/lib/site-fonts-next";
import { siteMetadata } from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={siteFontClassNames} suppressHydrationWarning>
      <body className={openSans.className} suppressHydrationWarning>
        <JsonLd data={[buildOrganizationSchema(), buildWebSiteSchema()]} />
        <div className="site-viewport min-w-0 overflow-x-clip">
          <DeferredAnchorScroll />
          <DeferredCookieBanner />
          {children}
        </div>
      </body>
    </html>
  );
}
