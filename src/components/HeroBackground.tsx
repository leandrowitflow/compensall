import type { CSSProperties } from "react";

type HeroBackgroundVariant = "home" | "pageHero" | "cta";

const VARIANT_STYLES: Record<HeroBackgroundVariant, CSSProperties> = {
  home: {
    height: "116.55%",
    width: "141.39%",
    left: "-10.76%",
    top: "-4.32%",
  },
  pageHero: {
    height: "338.64%",
    width: "141.39%",
    left: "-0.02%",
    top: "-69.36%",
  },
  cta: {
    height: "338.64%",
    width: "141.39%",
    left: "-0.02%",
    top: "-69.36%",
  },
};

type HeroBackgroundProps = {
  variant?: HeroBackgroundVariant;
  className?: string;
};

export default function HeroBackground({ variant = "home", className = "" }: HeroBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute max-w-none pointer-events-none ${className}`}
      style={{
        ...VARIANT_STYLES[variant],
        background:
          "linear-gradient(118deg, #152d5c 0%, #1f3664 32%, #2669f3 62%, #3d9ee8 88%, #7ec8f7 100%)",
        boxShadow: "inset -120px -40px 180px rgba(126, 200, 247, 0.35)",
      }}
    />
  );
}
