import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";

const values = [
  {
    icon: "/assets/icons/lightning-charge.svg",
    title: "Fast & risk-free",
    description: "Check eligibility in minutes with no upfront cost. We only charge if we win your claim.",
  },
  {
    icon: "/assets/icons/headset.svg",
    title: "Human-backed support",
    description: "AI speeds things up, but real people review your case and handle the airline for you.",
  },
  {
    icon: "/assets/icons/secured.svg",
    title: "Highest security",
    description: "Your boarding pass and personal data are protected. You stay in control at every step.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        title="About us"
        subtitle={
          <>
            We help passengers claim the compensation they are owed — with AI guidance and human support
            every step of the way.
          </>
        }
      />

      <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start mb-12 xl:mb-16">
            <div>
              <h2 className="font-['Open_Sans',sans-serif] font-bold text-2xl lg:text-[28px] xl:text-[36px] text-[#1f3664] mb-4 leading-[1.2]">
                Our mission
              </h2>
              <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-4">
                Compensall makes flight compensation simple. Too many passengers never claim what EU
                regulation EC 261/2004 entitles them to — often because the process feels slow, confusing,
                or stacked against them.
              </p>
              <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed">
                We combine secure technology with a team that knows how airlines work, so you can upload
                your boarding pass, confirm your details, and let us fight for your compensation.
              </p>
            </div>

            <div className="bg-[#f0f5fe] border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8">
              <h3 className="font-bold text-[#1f3664] text-lg xl:text-xl mb-4">Why passengers choose us</h3>
              <ul className="space-y-3 text-[#1f3664] text-sm xl:text-base leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#2669f3] font-bold flex-shrink-0">✓</span>
                  No win, no fee — you pay nothing unless we succeed
                </li>
                <li className="flex gap-3">
                  <span className="text-[#2669f3] font-bold flex-shrink-0">✓</span>
                  GDPR-first approach to your personal data
                </li>
                <li className="flex gap-3">
                  <span className="text-[#2669f3] font-bold flex-shrink-0">✓</span>
                  Up to €600 per passenger on eligible flights
                </li>
                <li className="flex gap-3">
                  <span className="text-[#2669f3] font-bold flex-shrink-0">✓</span>
                  Trusted by thousands of travellers across Europe
                </li>
              </ul>
              <Link
                href="/#claim"
                className="inline-flex mt-6 bg-[#2669f3] text-white font-bold text-base px-6 h-11 items-center rounded-[11px] hover:bg-[#1a55d4] transition-colors"
              >
                Start your claim
              </Link>
            </div>
          </div>

          <h2 className="font-['Open_Sans',sans-serif] font-bold text-2xl lg:text-[28px] xl:text-[36px] text-[#1f3664] text-center mb-8 xl:mb-10 leading-[1.2]">
            What we stand for
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 xl:gap-6">
            {values.map((item) => (
              <div
                key={item.title}
                className="bg-white border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8 text-center"
              >
                <img src={item.icon} alt="" className="w-12 h-12 xl:w-14 xl:h-14 mx-auto mb-4 object-contain" />
                <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[18px] mb-2">{item.title}</h3>
                <p className="text-[#1f3664] text-sm xl:text-[15px] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 lg:mt-10 xl:mt-[89px]">
        <CTABanner />
      </div>
      <Footer />
    </div>
  );
}
