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
      <div className="relative rounded-[28px] xl:rounded-[34px] overflow-clip max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto min-h-[360px] lg:min-h-[340px] xl:min-h-[660px]">
        {/* Background — Figma node 94:277 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[34px]">
          <img
            src="/assets/cta-banner-bg.png"
            alt=""
            className="absolute max-w-none h-[347.38%] w-[262.97%] left-[-2.49%] top-[-247.38%]"
          />
        </div>

        <div className="relative z-10 flex min-h-[360px] lg:min-h-[340px] xl:min-h-[660px] flex-col items-center justify-center gap-6 xl:gap-8 text-center px-6 py-12 lg:py-14 xl:py-16 max-w-[760px] lg:max-w-[960px] xl:max-w-[1189px] mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-white leading-[1.2] w-full">
            <span>
              Secure claim check.{" "}
              <span className="whitespace-nowrap">Human-backed.</span>
            </span>
            <br className="hidden lg:block" />
            <span>No win, no fee.</span>
          </h2>

          <div className="space-y-3 xl:space-y-4 max-w-[856px] w-full">
            <p className="text-white text-base md:text-lg xl:text-[19px] xl:leading-[27px] max-w-[740px] mx-auto">
              Your claim is guided by our assistant and backed by real people.
              <br className="hidden md:block" />
              Fast, secure and simple from the first upload.
            </p>
            <p className="text-white text-sm md:text-base xl:text-[19px] xl:leading-[27px]">
              Our standard fee is only charged if we win compensation for you.{" "}
              <strong className="font-bold">Compensall</strong> handles the process from boarding pass upload to airline
              follow-up, so you can claim with confidence.
            </p>
          </div>

          <Link
            href="/#claim"
            className="inline-flex items-center justify-center bg-[#2669f3] text-white font-bold px-10 xl:px-12 h-14 xl:h-[73px] rounded-[11px] hover:bg-[#1f5ae0] transition-colors text-base xl:text-[19px] min-w-[260px] xl:min-w-[316px]"
          >
            Check compensation
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 xl:gap-12 w-full max-w-[700px] sm:max-w-none xl:max-w-[1280px] mt-2 xl:mt-4 px-0 sm:px-6 xl:px-14">
            {CTA_FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4 xl:gap-5 justify-center sm:justify-start flex-1 min-w-0">
                <img
                  src={feature.icon}
                  alt=""
                  className="w-12 h-12 xl:w-16 xl:h-16 object-contain flex-shrink-0"
                />
                <div className="text-left min-w-0">
                  <p className="text-white font-bold text-sm xl:text-[19px] xl:leading-[27px]">{feature.title}</p>
                  <p className="text-white/80 text-xs xl:text-[16px] xl:leading-[28px]">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
