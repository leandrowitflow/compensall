import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import FAQSection, { DEFAULT_FAQS } from "@/components/FAQSection";
import HeroBackground from "@/components/HeroBackground";
import JsonLd from "@/components/seo/JsonLd";
import TrustpilotBadge from "@/components/TrustpilotBadge";
import { buildFaqPageSchema } from "@/lib/structured-data";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Know your flight compensation rights",
  description:
    "Learn when EU regulation EC 261/2004 entitles you to up to €600 for delays, cancellations, denied boarding, missed connections, and airline strikes.",
  path: "/know-your-rights",
});

const flightIssues = [
  {
    slug: "flight-cancellation",
    image: "/assets/blog/flight-cancellation.png",
    title: "Flight cancellation",
    description:
      "If your flight is cancelled with short notice, you may be entitled to compensation of up to €600.",
  },
  {
    slug: "denied-boarding",
    image: "/assets/blog/denied-boarding.png",
    title: "Denied boarding",
    description:
      "If you were refused boarding against your will, you could claim up to €600.",
  },
  {
    slug: "flight-delay",
    image: "/assets/blog/flight-delay.png",
    title: "Flight delay",
    description:
      "If your flight arrived more than 3 hours late, you may be entitled to compensation.",
  },
  {
    slug: "missed-connection",
    image: "/assets/blog/missed-connection.png",
    title: "Missed connection",
    description:
      "If a delay or cancellation caused you to miss a connecting flight, you may be entitled to compensation.",
  },
  {
    slug: "overbooking",
    image: "/assets/blog/overbooking.png",
    title: "Overbooking",
    description:
      "If the airline overbooked your flight and you could not travel as planned, you may be able to claim.",
  },
  {
    slug: "airline-strike",
    image: "/assets/blog/airline-strike.png",
    title: "Airline strike",
    description:
      "If your flight was disrupted by an airline strike, you may still have compensation rights.",
  },
  {
    slug: "passenger-rights",
    image: "/assets/blog/passenger-rights.png",
    title: "Passenger rights",
    description: "Learn what airlines may owe you when your trip is disrupted.",
  },
  {
    slug: "passengers-with-disabilities",
    image: "/assets/blog/passengers-with-disabilities.png",
    title: "Passengers with disabilities",
    description:
      "Understand your rights to assistance, accessibility and support when travelling.",
  },
];

const howItWorksSteps = [
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
];

export default function KnowYourRightsPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={buildFaqPageSchema(DEFAULT_FAQS)} />
      <Header />

      <section className="px-4 md:px-8 lg:px-8 xl:px-12 pt-0 pb-0">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
              <HeroBackground variant="pageHero" />
            </div>

            <div className="relative px-4 sm:px-6 pt-10 lg:pt-10 xl:pt-12 pb-10 lg:pb-12 xl:pb-14 text-center">
              <div className="flex justify-center mb-5">
                <TrustpilotBadge />
              </div>

              <h1 className="font-['Open_Sans',sans-serif] font-bold text-4xl md:text-5xl lg:text-[34px] xl:text-[57px] text-white leading-[1.2] mb-4 max-w-[1010px] mx-auto">
                Know your rights
              </h1>
              <p className="text-white font-bold text-base lg:text-[17px] xl:text-[19px] leading-relaxed max-w-[720px] mx-auto mb-2">
                Under EU regulation EC 261/2004, passengers on qualifying flights may claim fixed compensation of up to
                €600 per person for delays of three hours or more, cancellations, and denied boarding, in addition to
                care and re-routing from the airline.
              </p>
              <p className="text-white/90 font-bold text-base lg:text-[17px] xl:text-[19px] leading-relaxed max-w-[642px] mx-auto">
                Understand when you may be entitled to compensation and how Compensall helps you claim with our digital
                support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <h2 className="font-['Open_Sans',sans-serif] font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] text-center mb-8 lg:mb-10 xl:mb-14 leading-[1.2]">
            What type of flight disruption may entitle you to{" "}
            <span className="text-[#2669f3]">compensation?</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
            {flightIssues.map((issue) => (
              <div
                key={issue.title}
                className="bg-white border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8 flex flex-col min-h-[280px] xl:min-h-[312px]"
              >
                <div className="h-16 xl:h-[87px] mb-5 flex items-start">
                  <Image
                    src={issue.image}
                    alt=""
                    width={109}
                    height={87}
                    className="h-full w-auto max-w-[109px] object-contain object-left"
                  />
                </div>
                <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[18px] mb-3 leading-snug">
                  {issue.title}
                </h3>
                <p className="text-[#1f3664] text-sm xl:text-[15px] leading-[1.7] flex-1">
                  {issue.description}
                </p>
                <Link
                  href={`/blog/${issue.slug}`}
                  className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-[17px] xl:text-[18px] mt-5 hover:opacity-80 transition-opacity"
                >
                  Learn more
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                    <path
                      d="M1 6h14M10 1l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto text-center">
          <h2 className="font-['Open_Sans',sans-serif] font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] mb-4 leading-[1.2]">
            How do you claim compensation with{" "}
            <span className="text-[#005ffe]">Compensall?</span>
          </h2>
          <p className="text-[#1f3664] text-base xl:text-[19px] mb-6 lg:mb-8 xl:mb-14 max-w-[740px] mx-auto leading-relaxed">
            Upload your boarding pass. Our AI checks your claim. Our team handles the airline.
          </p>

          <div className="flex flex-col xl:flex-row items-center xl:items-stretch justify-center w-full min-w-0">
            {howItWorksSteps.map((step, i, arr) => (
              <Fragment key={step.num}>
                <div
                  className="bg-white border-2 border-[#d5e0f9] rounded-[21px] p-6 lg:p-6 xl:p-8 flex flex-col items-center text-center w-full xl:w-[363px] xl:flex-shrink-0 min-h-[240px] xl:min-h-[267px]"
                >
                  <div className="w-[26px] h-[26px] xl:w-[30px] xl:h-[30px] bg-[#2669f3] rounded-full flex items-center justify-center text-white font-bold text-sm mb-4 xl:mb-5 flex-shrink-0">
                    {step.num}
                  </div>
                  <img
                    src={step.icon}
                    alt=""
                    className="w-14 h-14 xl:w-[75px] xl:h-[75px] object-contain mb-4 xl:mb-5"
                  />
                  <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[19px] mb-1">{step.title}</h3>
                  <p className="text-[#1f3664] text-sm xl:text-base">{step.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden xl:flex flex-1 items-center justify-center self-center px-4 xl:px-6 min-w-0 max-w-[48px]">
                    <img src="/assets/icons/step-arrow.svg" alt="" className="w-5 h-5 flex-shrink-0 object-contain" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 lg:mt-10 xl:mt-[89px]">
        <CTABanner />
      </div>
      <div className="mt-10 lg:mt-12 xl:mt-[109px]">
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
}
