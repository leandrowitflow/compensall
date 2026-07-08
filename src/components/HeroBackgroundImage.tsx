import Image from "next/image";
import type { CSSProperties } from "react";

const HERO_BG_SRC = "/assets/hero-bg.png";

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
      <Image
        src={HERO_BG_SRC}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1550px) 95vw, 1550px"
        quality={80}
        className="object-fill"
      />
    </div>
  );
}
