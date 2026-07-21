import type { CSSProperties } from "react";

const HERO_BG_SRC = "/assets/hero-bg.webp";

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
    <div aria-hidden className="absolute max-w-none" style={frameStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_BG_SRC}
        alt=""
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
