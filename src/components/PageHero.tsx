import TrustpilotBadge from "@/components/TrustpilotBadge";
import type { ReactNode } from "react";
import HeroBackgroundImage from "@/components/HeroBackgroundImage";

type PageHeroProps = {
  title: string;
  subtitle: ReactNode;
  priority?: boolean;
};

export default function PageHero({ title, subtitle, priority = true }: PageHeroProps) {
  return (
    <section className="px-4 md:px-8 lg:px-8 xl:px-12 pt-4 md:pt-6 pb-0">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
        <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
            <HeroBackgroundImage variant="banner" priority={priority} />
          </div>

          <div className="relative px-4 sm:px-6 pt-10 lg:pt-10 xl:pt-12 pb-10 lg:pb-12 xl:pb-14 text-center">
            <div className="flex justify-center mb-5">
              <TrustpilotBadge priority={priority} />
            </div>

            <h1 className="font-bold text-4xl md:text-5xl lg:text-[34px] xl:text-[57px] text-white leading-[1.2] mb-4 max-w-[1010px] mx-auto">
              {title}
            </h1>
            <div className="text-white font-bold text-base lg:text-[17px] xl:text-[19px] leading-relaxed max-w-[720px] mx-auto">
              {subtitle}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
