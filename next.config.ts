import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** Drop Next's unused modern-browser polyfills (~14 KiB) while keeping URL.canParse for Safari 16.4. */
const NEXT_POLYFILL_STUB = "./src/lib/next-polyfill-modern.js";
const NEXT_POLYFILL_STUB_ABS = path.join(process.cwd(), "src/lib/next-polyfill-modern.js");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [96, 128, 161, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1550],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": NEXT_POLYFILL_STUB,
      "next/dist/build/polyfills/polyfill-module": NEXT_POLYFILL_STUB,
    },
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "../build/polyfills/polyfill-module": NEXT_POLYFILL_STUB_ABS,
      "next/dist/build/polyfills/polyfill-module": NEXT_POLYFILL_STUB_ABS,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/markdown; charset=utf-8",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
