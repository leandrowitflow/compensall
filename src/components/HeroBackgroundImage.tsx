import type { CSSProperties } from "react";

const HERO_BG_SRC = "/assets/hero-bg.webp";
const HERO_BG_SRC_MOBILE = "/assets/hero-bg-900.webp";

export const HERO_BG_VARIANTS = {
  home: {
    height: "116.55%",
    width: "141.39%",
    left: "-10.76%",
    top: "-4.32%",
  },
  banner: {
    height: "338.64%",
    width: "141.39%",
    left: "-0.02%",
    top: "-69.36%",
  },
  airlines: {
    height: "338.64%",
    width: "141.39%",
    left: "-0.02%",
    top: "-48.04%",
  },
} as const satisfies Record<string, CSSProperties>;

export type HeroBackgroundVariant = keyof typeof HERO_BG_VARIANTS;

type HeroBackgroundImageProps = {
  variant?: HeroBackgroundVariant;
  priority?: boolean;
};

export default function HeroBackgroundImage({
  variant = "banner",
  priority = false,
}: HeroBackgroundImageProps) {
  const frameStyle = HERO_BG_VARIANTS[variant];

  return (
    <div aria-hidden className="absolute max-w-none" style={{ position: "absolute", ...frameStyle }}>
      <picture>
        <source media="(max-width: 767px)" srcSet={HERO_BG_SRC_MOBILE} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_BG_SRC}
          alt=""
          width={1600}
          height={1393}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </picture>
    </div>
  );
}
