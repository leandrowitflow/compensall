import Image, { getImageProps } from "next/image";
import { preload } from "react-dom";
import type { CSSProperties } from "react";
import heroBg from "../../public/assets/hero-bg.png";

const HERO_IMAGE_SIZES = "(max-width: 640px) 640px, (max-width: 1024px) 960px, 1550px";
const HERO_IMAGE_QUALITY = 55;

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

  if (priority) {
    const {
      props: { src: heroSrc },
    } = getImageProps({
      src: heroBg,
      alt: "",
      fill: true,
      priority: true,
      sizes: HERO_IMAGE_SIZES,
      quality: HERO_IMAGE_QUALITY,
    });
    preload(heroSrc, { as: "image", fetchPriority: "high" });
  }

  return (
    <div aria-hidden className="absolute max-w-none" style={frameStyle}>
      <Image
        src={heroBg}
        alt=""
        fill
        priority={priority}
        sizes={HERO_IMAGE_SIZES}
        quality={HERO_IMAGE_QUALITY}
        className="object-cover"
      />
    </div>
  );
}
