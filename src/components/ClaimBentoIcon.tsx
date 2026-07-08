type ClaimBentoIconProps = {
  src: string;
  alt: string;
  frameClassName: string;
  imageClassName: string;
};

export default function ClaimBentoIcon({
  src,
  alt,
  frameClassName,
  imageClassName,
}: ClaimBentoIconProps) {
  return (
    <div
      className={`relative overflow-hidden pointer-events-none flex-shrink-0 mb-4 ${frameClassName}`}
    >
      <img src={src} alt={alt} className={`absolute max-w-none ${imageClassName}`} />
    </div>
  );
}

export const CLAIM_BENTO_ICON_FRAMES = {
  flightDelay: {
    frameClassName: "w-24 h-24 sm:w-28 sm:h-28 xl:w-[161px] xl:h-[161px]",
    imageClassName: "h-[176.87%] w-[177.62%] left-[-37.68%] top-[-34.13%]",
  },
  flightCancellation: {
    frameClassName: "w-16 h-16 sm:w-20 sm:h-20 xl:w-[79px] xl:h-[77px]",
    imageClassName: "h-[173.68%] w-[171.43%] left-[-36.36%] top-[-32.89%]",
  },
  deniedBoarding: {
    frameClassName: "w-16 h-16 sm:w-20 sm:h-20 xl:w-[90px] xl:h-[74px]",
    imageClassName: "h-[228.05%] w-[185.15%] left-[-44.55%] top-[-59.76%]",
  },
  missedConnection: {
    frameClassName: "w-20 h-16 sm:w-24 sm:h-20 xl:w-[109px] xl:h-[77px]",
    imageClassName: "h-[231.58%] w-[166.04%] left-[-35.85%] top-[-64.47%]",
  },
  airlineStrike: {
    frameClassName: "w-16 h-16 sm:w-20 sm:h-20 xl:w-[90px] xl:h-[75px]",
    imageClassName: "h-[193.75%] w-[179.71%] left-[-39.13%] top-[-39.06%]",
  },
} as const;
