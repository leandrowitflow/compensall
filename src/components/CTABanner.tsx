import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="px-4 md:px-8 lg:px-8 xl:px-12 pb-0 bg-white">
      <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto min-h-[360px] lg:min-h-[340px] xl:min-h-[660px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
          <img
            src="/assets/hero-bg.png"
            alt=""
            className="absolute max-w-none"
            style={{ height: "338.64%", width: "141.39%", left: "-0.02%", top: "-69.36%" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center py-10 lg:py-12 xl:py-20 px-6 max-w-[760px] lg:max-w-[960px] xl:max-w-[1100px] mx-auto">
          <h2 className="font-['Open_Sans',sans-serif] font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-white leading-[1.2] mb-6 w-full">
            <span>
              Secure claim check.{" "}
              <span className="whitespace-nowrap">Human-backed.</span>
            </span>
            <br className="hidden lg:block" />
            <span>No win, no fee.</span>
          </h2>

          <p className="text-white text-base md:text-lg leading-relaxed max-w-[740px] mx-auto mb-3">
            Your claim is guided by AI and backed by real people.
            <br className="hidden md:block" />
            Fast, secure and simple from the first upload.
          </p>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-[856px] mx-auto">
            Our standard fee is only charged if we win compensation for you.{" "}
            <strong className="font-bold">Compensall</strong> handles the process from boarding pass upload to airline
            follow-up, so you can claim with confidence.
          </p>

          <div className="py-10 xl:py-12">
            <Link
              href="/#claim"
              className="inline-block bg-[#DDF444] text-[#1f3664] font-bold px-10 py-5 rounded-xl hover:bg-[#c8df2e] transition-colors text-base shadow-[0_4px_20px_rgba(221,244,68,0.45)]"
            >
              Check compensation
            </Link>
          </div>

          {/* Features row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[700px]">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <img src="/assets/icons/lightning-charge.svg" alt="" className="w-10 h-10 object-contain flex-shrink-0" />
              <div className="text-left">
                <p className="text-white font-bold text-sm">Fast &amp; risk-free</p>
                <p className="text-white/60 text-xs">No hidden fees</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <img src="/assets/icons/headset.svg" alt="" className="w-10 h-10 object-contain flex-shrink-0" />
              <div className="text-left">
                <p className="text-white font-bold text-sm">Talk to us</p>
                <p className="text-white/60 text-xs">Human support available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <img src="/assets/icons/secured.svg" alt="" className="w-10 h-10 object-contain flex-shrink-0" />
              <div className="text-left">
                <p className="text-white font-bold text-sm">Highest security</p>
                <p className="text-white/60 text-xs">Your data is always protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
