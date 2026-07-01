import type { Metadata } from "next";
import AnchorScroll from "@/components/AnchorScroll";
import ViewportScale from "@/components/ViewportScale";
import { VIEWPORT_SCALE_BOOTSTRAP } from "@/lib/viewport-scale";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compensall – Claim up to €600 for your flight",
  description:
    "The most secure flight compensation platform on the market. Claim up to €600 with the help of our AI assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Runs synchronously before first paint — detects laptop screen by screen.width/height */}
        <script dangerouslySetInnerHTML={{ __html: VIEWPORT_SCALE_BOOTSTRAP }} />
        <div className="site-viewport min-w-0 overflow-x-clip">
          <ViewportScale />
          <AnchorScroll />
          {children}
        </div>
      </body>
    </html>
  );
}
