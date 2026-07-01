import type { Metadata } from "next";
import AnchorScroll from "@/components/AnchorScroll";
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
    <html lang="en">
      <body>
        <div className="site-viewport">
          <AnchorScroll />
          {children}
        </div>
      </body>
    </html>
  );
}
