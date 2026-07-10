import Link from "next/link";

const CTA_FEATURES = [
  {
    icon: "/assets/icons/lightning-charge.svg",
    title: "Fast & risk-free",
    subtitle: "No hidden fees",
  },
  {
    icon: "/assets/icons/headset.svg",
    title: "Talk to us",
    subtitle: "Human support available",
  },
  {
    icon: "/assets/icons/secured.svg",
    title: "Highest security",
    subtitle: "Your data is always protected",
  },
] as const;

export default function CTABanner() {
  return (
    <section className="px-4 md:px-8 lg:px-8 xl:px-12 pb-0 bg-white">
      {/* Figma 347:201 — fixed 1550×660 ratio at 2xl; auto height on laptop so content is not squashed */}
      <div className="relative w-full max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto overflow-clip rounded-[28px] xl:rounded-[34px] 2xl:aspect-[155/66]">
        <img
          src="/assets/cta-banner-bg.png?v=4"
          alt=""
          className="absolute inset-0 size-full object-fill pointer-events-none rounded-[28px] xl:rounded-[34px]"
        />

        <div className="relative z-10 flex w-full max-w-[1189px] mx-auto flex-col items-center text-center px-6 pt-14 pb-12 sm:px-8 sm:pt-16 sm:pb-14 md:pt-20 md:pb-16 xl:px-8 xl:pt-16 xl:pb-16 2xl:h-full 2xl:justify-center 2xl:pt-[72px] 2xl:pb-[74px] gap-5 sm:gap-6 xl:gap-6 2xl:gap-8">
          <h2 className="shrink-0 font-bold text-3xl md:text-4xl lg:text-[40px] xl:text-[48px] 2xl:text-[57px] text-white leading-[1.2] w-full">
            Secure claim check. Human-backed.
            <br />
            No win, no fee.
          </h2>

          <p className="shrink-0 text-white text-base md:text-lg xl:text-[17px] xl:leading-[26px] 2xl:text-[19px] 2xl:leading-[27px] max-w-[740px]">
            Your claim is guided by AI and backed by real people.
            <br className="hidden sm:block" />
            Fast, secure and simple from the first upload.
          </p>

          <p className="shrink-0 text-white text-sm md:text-base xl:text-[17px] xl:leading-[26px] 2xl:text-[19px] 2xl:leading-[27px] max-w-[856px]">
            Our standard fee is only charged if we win compensation for you.{" "}
            <strong className="font-bold">Compensall</strong> handles the process from boarding pass upload to airline
            follow-up, so you can claim with confidence.
          </p>

          <Link
            href="/#claim"
            className="inline-flex shrink-0 items-center justify-center whitespace-nowrap bg-[#2669f3] text-white font-bold h-12 lg:h-14 xl:h-[60px] 2xl:h-[73px] px-10 lg:px-11 xl:px-12 rounded-[11px] hover:bg-[#1f5ae0] transition-colors text-base lg:text-lg xl:text-[18px] 2xl:text-[19px] min-w-[240px] lg:min-w-[280px] xl:min-w-[300px] 2xl:min-w-[316px]"
          >
            Check compensation
          </Link>

          <div className="flex w-full shrink-0 flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 xl:max-w-[1280px] xl:gap-10 2xl:gap-12 2xl:mt-2 xl:px-6 2xl:px-14">
            {CTA_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 xl:gap-4 justify-center sm:justify-start sm:flex-1 min-w-0"
              >
                <img
                  src={feature.icon}
                  alt=""
                  className="w-10 h-10 xl:w-[46px] xl:h-[46px] object-contain flex-shrink-0"
                />
                <div className="text-left min-w-0">
                  <p className="text-white font-bold text-sm xl:text-[19px] xl:leading-[27px]">{feature.title}</p>
                  <p className="text-white text-xs xl:text-[16px] xl:leading-[28px]">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
