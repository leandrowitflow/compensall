import type { Metadata } from "next";
import Image from "next/image";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import HeroBackgroundImage from "@/components/HeroBackgroundImage";
import JsonLd from "@/components/seo/JsonLd";
import { DEFAULT_FAQS } from "@/lib/default-faqs";
import { buildFaqPageSchema } from "@/lib/structured-data";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Know your flight compensation rights",
  description:
    "Learn when UK261 and EU Regulation EC 261/2004 entitle you to up to £520 or €600 for delays, cancellations, denied boarding, missed connections, and airline strikes.",
  path: "/know-your-rights",
});

const flightIssues = [
  {
    slug: "flight-cancellation",
    image: "/assets/icons/flight-cancellation.png",
    title: "Flight cancellation",
    description:
      "If your flight is cancelled with short notice, you may be entitled to compensation of up to €600.",
  },
  {
    slug: "denied-boarding",
    image: "/assets/icons/denied-boarding.png",
    title: "Denied boarding",
    description:
      "If you were refused boarding against your will, you could claim up to €600.",
  },
  {
    slug: "flight-delay",
    image: "/assets/icons/flight-delay.png",
    title: "Flight delay",
    description:
      "If your flight arrived more than 3 hours late, you may be entitled to compensation.",
  },
  {
    slug: "missed-connection",
    image: "/assets/icons/missed-connection.png",
    title: "Missed connection",
    description:
      "If a delay or cancellation caused you to miss a connecting flight, you may be entitled to compensation.",
  },
  {
    slug: "overbooking",
    image: "/assets/icons/overbooking.png",
    title: "Overbooking",
    description:
      "If the airline overbooked your flight and you could not travel as planned, you may be able to claim.",
  },
  {
    slug: "airline-strike",
    image: "/assets/icons/airline-strike.png",
    title: "Airline strike",
    description:
      "If your flight was disrupted by an airline strike, you may still have compensation rights.",
  },
  {
    slug: "passenger-rights",
    image: "/assets/icons/passenger-rights.png",
    title: "Passenger rights",
    description: "Learn what airlines may owe you when your trip is disrupted.",
  },
  {
    slug: "passengers-with-disabilities",
    image: "/assets/icons/passengers-with-disabilities.png",
    title: "Passengers with disabilities",
    description:
      "Understand your rights to assistance, accessibility and support when travelling.",
  },
];

export default function KnowYourRightsPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={buildFaqPageSchema(DEFAULT_FAQS)} />
      <Header />

      {/* Hero — rounded card matching homepage */}
      <section className="px-4 md:px-8 lg:px-8 xl:px-12 pt-0 pb-0">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
              <HeroBackgroundImage variant="banner" priority />
            </div>

            <div className="relative px-4 sm:px-6 pt-10 lg:pt-10 xl:pt-12 pb-10 lg:pb-12 xl:pb-14 text-center">
              <div className="flex justify-center mb-5">
                <Image
                  src="/assets/icons/trustpilot-score.png"
                  alt="Excellent Trustpilot 4.8 out of 5"
                  width={200}
                  height={36}
                  className="h-9 w-auto object-contain"
                />
              </div>

              <h1 className="font-bold text-4xl md:text-5xl lg:text-[34px] xl:text-[57px] text-white leading-[1.2] mb-4 max-w-[1010px] mx-auto">
                Know your rights
              </h1>
              <p className="text-white font-bold text-base lg:text-[17px] xl:text-[19px] leading-relaxed max-w-[642px] mx-auto">
                Understand your rights under UK261 and EC 261/2004 and how Compensall helps you claim with our digital support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What happened on your flight? */}
      <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] text-center mb-8 lg:mb-10 xl:mb-14 leading-[1.2]">
            What happened on your{" "}
            <span className="text-[#2669f3]">flight?</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
            {flightIssues.map((issue) => (
              <div
                key={issue.title}
                className="bg-white border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8 flex flex-col min-h-[280px] xl:min-h-[312px]"
              >
                <div className="h-16 xl:h-[87px] mb-5 flex items-start">
                  <img
                    src={issue.image}
                    alt={`${issue.title} icon`}
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

      {/* How it works */}
      <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto text-center">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] mb-4 leading-[1.2]">
            How it{" "}
            <span className="text-[#005ffe]">works?</span>
          </h2>
          <p className="text-[#1f3664] text-base xl:text-[19px] mb-6 lg:mb-8 xl:mb-14 max-w-[740px] mx-auto leading-relaxed">
            Upload your boarding pass. Our assistant checks your claim. Our team handles the airline.
          </p>

          <HowItWorksSteps />
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
