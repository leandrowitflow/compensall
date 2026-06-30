import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  subtitle: ReactNode;
};

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="px-4 md:px-8 lg:px-8 xl:px-12 pt-0 pb-0">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
        <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
            <img
              src="/assets/hero-bg.png"
              alt=""
              className="absolute max-w-none"
              style={{ height: "338.64%", width: "141.39%", left: "-0.02%", top: "-69.36%" }}
            />
          </div>

          <div className="relative px-4 sm:px-6 pt-10 lg:pt-10 xl:pt-12 pb-10 lg:pb-12 xl:pb-14 text-center">
            <div className="flex justify-center mb-5">
              <img
                src="/assets/icons/trustpilot-score.png"
                alt="Excellent Trustpilot 4.8 out of 5"
                className="h-9 object-contain"
              />
            </div>

            <h1 className="font-['Open_Sans',sans-serif] font-bold text-4xl md:text-5xl lg:text-[34px] xl:text-[57px] text-white leading-[1.2] mb-4 max-w-[1010px] mx-auto">
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
