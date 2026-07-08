import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Fragment } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackgroundImage from "@/components/HeroBackgroundImage";
import HeroClaimForm from "@/components/HeroClaimForm";
import JsonLd from "@/components/seo/JsonLd";
import { DEFAULT_FAQS } from "@/lib/default-faqs";
import { buildFaqPageSchema, buildHowToSchema } from "@/lib/structured-data";
import { buildPageMetadata } from "@/lib/site-metadata";

const CTABanner = dynamic(() => import("@/components/CTABanner"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));

export const metadata: Metadata = buildPageMetadata({
  title: "Claim up to €600 for your flight",
  description:
    "Upload your boarding pass and claim EU261 flight compensation of up to €600. Secure, human-backed, no win no fee.",
  path: "/",
});

const TRUST_ITEMS = [
  { icon: "/assets/icons/trust-star.svg", title: "Trustpilot rated", sub: "4.8 out of 5" },
  { icon: "/assets/icons/trust-gdpr.svg", title: "GPDR-first", sub: "Privacy by design" },
  { icon: "/assets/icons/trust-lock.svg", title: "Delete your data", sub: "Full control" },
  { icon: "/assets/icons/trust-headset.svg", title: "Human support", sub: "Real people, real help" },
];

export default function HomePage() {
  const howToSchema = buildHowToSchema([
    { name: "Upload your boarding pass", text: "Add your boarding pass in seconds from the homepage claim form." },
    { name: "Assistant checks your claim", text: "Our assistant verifies eligibility under EU regulation EC 261/2004." },
    { name: "We handle the airline", text: "Our team pursues compensation with the airline on a no win, no fee basis." },
  ]);

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <JsonLd data={[buildFaqPageSchema(DEFAULT_FAQS), howToSchema]} />
      <Header />

      {/* ─── Hero: rounded dark-blue card on white ─── */}
      <section className="px-4 md:px-8 lg:px-8 xl:px-12 pt-0 pb-0">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
        <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
            <HeroBackgroundImage variant="home" priority />
          </div>

          <div
            id="claim"
            className="relative max-w-full mx-auto px-4 sm:px-6 pt-8 lg:pt-8 xl:pt-12 pb-6 lg:pb-8 xl:pb-10 text-center scroll-mt-16 xl:scroll-mt-[90px]"
          >
            <div className="flex justify-center mb-5">
              <Image
                src="/assets/icons/trustpilot-score.png"
                alt="Excellent Trustpilot 4.8 out of 5"
                width={200}
                height={36}
                className="h-9 w-auto object-contain"
                priority
              />
            </div>

            <h1 className="font-['Open_Sans',sans-serif] font-bold text-4xl md:text-5xl lg:text-[34px] xl:text-[57px] text-white leading-[1.2] mb-4 max-w-[760px] mx-auto">
              Claim up to €600 with<br />the help of our assistant
            </h1>
            <p className="text-white/80 text-base md:text-lg font-semibold mb-8">
              The most secure flight compensation platform on the market.
            </p>

            <HeroClaimForm />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-[860px] mx-auto pb-2">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <img src="/assets/icons/lightning-charge.svg" alt="" className="w-10 h-10 object-contain" />
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Fast &amp; risk-free</p>
                  <p className="text-white/60 text-xs">No hidden fees</p>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <img src="/assets/icons/headset.svg" alt="" className="w-10 h-10 object-contain" />
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Talk to us</p>
                  <p className="text-white/60 text-xs">Human support available</p>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <img src="/assets/icons/secured.svg" alt="" className="w-10 h-10 object-contain" />
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Highest security</p>
                  <p className="text-white/60 text-xs">Your data is always protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ─── Trust / Feature bar ─── */}
      <section className="pt-8 lg:pt-8 xl:pt-[60px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto">
          {/* Mobile / tablet / laptop: 2×2 grid */}
          <div className="xl:hidden border-2 border-[#d5e0f9] rounded-[21px] p-4 md:p-5">
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {TRUST_ITEMS.map((item) => (
                <div key={item.title} className="flex items-center gap-2 md:gap-3">
                  <img src={item.icon} alt="" width={40} height={40} className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 object-contain" />
                  <div className="min-w-0">
                    <p className="font-bold text-[#1f3664] text-sm md:text-base leading-[1.4]">{item.title}</p>
                    <p className="text-[#1f3664] text-xs md:text-sm leading-[1.5]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: horizontal row with SVG dividers */}
          <div className="relative rounded-[21px] overflow-hidden hidden xl:block">
            <img
              src="/assets/trust-bar-bg.svg"
              alt=""
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ objectFit: "fill" }}
            />
            <div className="relative flex items-center">
              {TRUST_ITEMS.map((item) => (
                <div key={item.title} className="flex-1 flex items-center gap-3 px-6 py-[33px]">
                  <img src={item.icon} alt="" width={40} height={40} className="w-10 h-10 flex-shrink-0 object-contain" />
                  <div>
                    <p className="font-bold text-[#1f3664] text-[19px] leading-[1.4]">{item.title}</p>
                    <p className="text-[#1f3664] text-base leading-[1.7]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── What can you claim? — bento grid ─── */}
      <section className="pt-8 lg:pt-8 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <h2 className="font-['Open_Sans',sans-serif] font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] text-center mb-4 leading-[1.2]">
            What can you{" "}
            <span className="text-[#0060fe]">claim?</span>
          </h2>
          <p className="text-[#1f3664] text-center text-base mb-6 lg:mb-6 xl:mb-12 max-w-[646px] mx-auto">
            We help you get compensation for a wide range of flight problems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[729fr_374fr_374fr] gap-6 xl:gap-9">
            <div className="relative md:col-span-2 xl:col-span-1 xl:row-span-2 rounded-[21px] overflow-hidden border-2 border-[#d5e0f9] min-h-[320px] lg:min-h-[280px] xl:min-h-[609px] flex flex-col">
              <Image
                src="/assets/icons/flight-delay-bg.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 729px"
                className="object-cover"
              />
              <div className="relative z-10 flex flex-col flex-1 p-5 lg:p-5 xl:pt-[92px] xl:pl-[67px] xl:pr-8 xl:pb-[74px]">
                <img
                  src="/assets/icons/flight-delay-home.png"
                  alt="Flight delay icon"
                  className="w-24 h-24 lg:w-20 lg:h-20 xl:size-[161px] object-contain"
                />
                <div className="mt-auto pt-4 xl:pt-0">
                  <h3 className="font-bold text-[#1f3664] text-xl lg:text-xl xl:text-[30px] mb-2 xl:mb-3 leading-[1.2]">Flight delay</h3>
                  <p className="text-[#1f3664]/80 text-sm lg:text-sm xl:text-[25px] xl:leading-[44px]">
                    If your flight is cancelled with short notice, you may be entitled to compensation of up to €600.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#d5e0f9] rounded-[21px] p-5 lg:p-5 xl:p-9 flex flex-col min-h-[200px] xl:min-h-[288px]">
              <img src="/assets/icons/flight-cancellation-home.png" alt="Flight cancellation" className="w-14 h-14 lg:w-14 lg:h-14 xl:w-20 xl:h-20 object-contain mb-4 flex-shrink-0" />
              <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[19px] mb-2">Flight cancellation</h3>
              <p className="text-[#1f3664]/60 text-sm xl:text-[16px] leading-[1.7]">
                If your flight is cancelled with short notice, you may be entitled to compensation of up to €600.
              </p>
            </div>

            <div className="bg-white border-2 border-[#d5e0f9] rounded-[21px] p-5 lg:p-5 xl:p-9 flex flex-col min-h-[200px] xl:min-h-[288px]">
              <img src="/assets/icons/denied-boarding-home.png" alt="Denied boarding" className="w-14 h-14 lg:w-14 lg:h-14 xl:w-20 xl:h-20 object-contain mb-4 flex-shrink-0" />
              <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[19px] mb-2">Denied boarding</h3>
              <p className="text-[#1f3664]/60 text-sm xl:text-[16px] leading-[1.7]">
                If you were refused boarding against your will, you could claim up to €600.
              </p>
            </div>

            <div className="bg-white border-2 border-[#d5e0f9] rounded-[21px] p-5 lg:p-5 xl:p-9 flex flex-col min-h-[200px] xl:min-h-[288px]">
              <img src="/assets/icons/missed-connection-home.png" alt="Missed connection" className="w-14 h-14 lg:w-14 lg:h-14 xl:w-20 xl:h-20 object-contain mb-4 flex-shrink-0" />
              <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[19px] mb-2">Missed connection</h3>
              <p className="text-[#1f3664]/60 text-sm xl:text-[16px] leading-[1.7]">
                If you miss your connecting flight due to a delay, you may be entitled to compensation.
              </p>
            </div>

            <div className="bg-white border-2 border-[#d5e0f9] rounded-[21px] p-5 lg:p-5 xl:p-9 flex flex-col min-h-[200px] xl:min-h-[288px]">
              <img src="/assets/icons/airline-strike-home.png" alt="Airline strike" className="w-14 h-14 lg:w-14 lg:h-14 xl:w-20 xl:h-20 object-contain mb-4 flex-shrink-0" />
              <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[19px] mb-2">Airline strike</h3>
              <p className="text-[#1f3664]/60 text-sm xl:text-[16px] leading-[1.7]">
                If your flight was disrupted by an airline strike, you may still be entitled to compensation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="pt-8 lg:pt-8 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto text-center">
          <h2 className="font-['Open_Sans',sans-serif] font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] mb-4 leading-[1.2]">
            How it{" "}
            <span className="text-[#005ffe]">works?</span>
          </h2>
          <p className="text-[#1f3664] text-base mb-6 lg:mb-6 xl:mb-14 max-w-[968px] mx-auto">
            Upload your boarding pass. Our assistant checks your claim. Our team handles the airline.
          </p>

          <div className="flex flex-col xl:flex-row items-center xl:items-stretch justify-center w-full min-w-0">
            {[
              {
                num: 1,
                icon: "/assets/icons/step-cloud-upload.svg",
                title: "Upload your boarding pass",
                desc: "Add your boarding pass in seconds.",
              },
              {
                num: 2,
                icon: "/assets/icons/step-sparkles.svg",
                title: "Assistant checks your claim",
                desc: "Our assistant verifies your eligibility.",
              },
              {
                num: 3,
                icon: "/assets/icons/step-handshake.svg",
                title: "We handle the airline",
                desc: "We fight for your compensation.",
              },
            ].map((step, i, arr) => (
              <Fragment key={step.num}>
                <div
                  className="bg-white border-2 border-[#d5e0f9] rounded-[21px] p-6 lg:p-6 xl:p-8 flex flex-col items-center text-center w-full xl:w-[363px] xl:flex-shrink-0"
                  style={{ minHeight: "240px" }}
                >
                  <div className="w-[26px] h-[26px] lg:w-[26px] lg:h-[26px] xl:w-[30px] xl:h-[30px] bg-[#2669f3] rounded-full flex items-center justify-center text-white font-bold text-sm mb-4 lg:mb-4 xl:mb-5 flex-shrink-0">
                    {step.num}
                  </div>
                  <img src={step.icon} alt="" className="w-14 h-14 lg:w-14 lg:h-14 xl:w-[75px] xl:h-[75px] object-contain mb-4 lg:mb-4 xl:mb-5" />
                  <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[19px] mb-1">{step.title}</h3>
                  <p className="text-[#1f3664] text-sm">{step.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className="hidden xl:flex flex-1 items-center justify-center self-center px-4 xl:px-6 min-w-0 max-w-[48px]"
                  >
                    <img src="/assets/icons/step-arrow.svg" alt="" className="w-5 h-5 flex-shrink-0 object-contain" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What is the compensation? ─── */}
      <section className="pt-8 lg:pt-8 xl:pt-[89px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto text-center">
          <h2 className="font-['Open_Sans',sans-serif] font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] mb-4 leading-[1.2]">
            What is the{" "}
            <span className="text-[#005ffe]">compensation?</span>
          </h2>
          <p className="text-[#1f3664] text-base mb-6 lg:mb-6 xl:mb-14 max-w-[968px] mx-auto">
            The amount depends on your flight distance and the rules that apply to your journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                amount: "€250",
                image: "/assets/compensation/250.png",
                label: "Flights up to 500km",
                desc: "For shorter eligible flights.",
              },
              {
                amount: "€400",
                image: "/assets/compensation/400.png",
                label: "Flights between 1,500km and 3,500 km",
                desc: "For medium distance flights.",
              },
              {
                amount: "€600",
                image: "/assets/compensation/600.png",
                label: "Flights over 3,500 km",
                desc: "For long distance flights.",
              },
            ].map((tier) => (
              <div
                key={tier.amount}
                className="relative bg-white/28 border-2 border-[#d5e0f9] rounded-2xl overflow-hidden text-center pt-6 pb-8 px-6"
              >
                <Image
                  src={tier.image}
                  alt={tier.amount}
                  width={208}
                  height={208}
                  sizes="(max-width: 1280px) 112px, 208px"
                  className="w-28 h-28 lg:w-28 lg:h-28 xl:w-52 xl:h-52 mx-auto object-contain mb-2"
                />
                <p className="font-bold text-[#2669f3] mb-2 text-4xl lg:text-[36px] xl:text-[80px] leading-none">
                  {tier.amount}
                </p>
                <p className="text-[#1f3664] font-bold text-base xl:text-lg mb-1">{tier.label}</p>
                <p className="text-[#1f3664]/60 text-sm">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 lg:mt-8 xl:mt-[89px]">
        <CTABanner />
      </div>
      <div className="mt-10 lg:mt-10 xl:mt-[109px]">
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
}
