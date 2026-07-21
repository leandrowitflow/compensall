type ClaimBentoIconProps = {
  src: string;
  alt: string;
  frameClassName: string;
  imageClassName: string;
  priority?: boolean;
};

export default function ClaimBentoIcon({
  src,
  alt,
  frameClassName,
  imageClassName,
  priority = false,
}: ClaimBentoIconProps) {
  return (
    <div className={`relative overflow-hidden pointer-events-none shrink-0 mb-4 ${frameClassName}`}>
      <img
        src={src}
        alt={alt}
        draggable={false}
        width={161}
        height={161}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`absolute max-w-none select-none ${imageClassName}`}
      />
    </div>
  );
}

export const CLAIM_BENTO_ICON_FRAMES = {
  flightDelay: {
    frameClassName: "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-[161px] xl:h-[161px]",
    imageClassName: "h-[176.87%] w-[177.62%] left-[-37.68%] top-[-34.13%]",
  },
  flightCancellation: {
    frameClassName: "w-[62px] h-[60px] sm:w-[72px] sm:h-[70px] lg:w-[76px] lg:h-[74px] xl:w-[79px] xl:h-[77px]",
    imageClassName: "h-[173.68%] w-[171.43%] left-[-36.36%] top-[-32.89%]",
  },
  deniedBoarding: {
    frameClassName: "w-[70px] h-[58px] sm:w-[80px] sm:h-[66px] lg:w-[86px] lg:h-[71px] xl:w-[90px] xl:h-[74px]",
    imageClassName: "h-[228.05%] w-[185.15%] left-[-44.55%] top-[-59.76%]",
  },
  missedConnection: {
    frameClassName: "w-[85px] h-[60px] sm:w-[96px] sm:h-[68px] lg:w-[104px] lg:h-[74px] xl:w-[109px] xl:h-[77px]",
    imageClassName: "h-[231.58%] w-[166.04%] left-[-35.85%] top-[-64.47%]",
  },
  airlineStrike: {
    frameClassName: "w-[70px] h-[58px] sm:w-[80px] sm:h-[67px] lg:w-[86px] lg:h-[72px] xl:w-[90px] xl:h-[75px]",
    imageClassName: "h-[193.75%] w-[179.71%] left-[-39.13%] top-[-39.06%]",
  },
} as const;
