const BENTO_ICON_SIZES = {
  flightDelay: { w: 161, h: 161 },
  default: { w: 109, h: 77 },
} as const;

type ClaimBentoIconProps = {
  src: string;
  alt: string;
  frameClassName: string;
  objectPosition: string;
  priority?: boolean;
};

/**
 * Native img avoids Next/Image preloads competing with the hero LCP on mobile.
 * Icons are already tiny PNGs; optimizer gains are negligible.
 */
export default function ClaimBentoIcon({
  src,
  alt,
  frameClassName,
  objectPosition,
  priority = false,
}: ClaimBentoIconProps) {
  const dims = src.includes("flight-delay-home") ? BENTO_ICON_SIZES.flightDelay : BENTO_ICON_SIZES.default;

  return (
    <div className={`relative overflow-hidden pointer-events-none shrink-0 mb-4 ${frameClassName}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={dims.w}
        height={dims.h}
        draggable={false}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        className="absolute inset-0 h-full w-full object-contain select-none"
        style={{ objectPosition }}
      />
    </div>
  );
}

export const CLAIM_BENTO_ICON_FRAMES = {
  flightDelay: {
    frameClassName: "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-[161px] xl:h-[161px]",
    objectPosition: "38% 34%",
  },
  flightCancellation: {
    frameClassName: "w-[62px] h-[60px] sm:w-[72px] sm:h-[70px] lg:w-[76px] lg:h-[74px] xl:w-[79px] xl:h-[77px]",
    objectPosition: "36% 33%",
  },
  deniedBoarding: {
    frameClassName: "w-[70px] h-[58px] sm:w-[80px] sm:h-[66px] lg:w-[86px] lg:h-[71px] xl:w-[90px] xl:h-[74px]",
    objectPosition: "45% 60%",
  },
  missedConnection: {
    frameClassName: "w-[85px] h-[60px] sm:w-[96px] sm:h-[68px] lg:w-[104px] lg:h-[74px] xl:w-[109px] xl:h-[77px]",
    objectPosition: "36% 64%",
  },
  airlineStrike: {
    frameClassName: "w-[70px] h-[58px] sm:w-[80px] sm:h-[67px] lg:w-[86px] lg:h-[72px] xl:w-[90px] xl:h-[75px]",
    objectPosition: "39% 39%",
  },
} as const;
