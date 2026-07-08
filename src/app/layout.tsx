import type { Metadata } from "next";
import AnchorScroll from "@/components/AnchorScroll";
import JsonLd from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/structured-data";
import { siteMetadata } from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
