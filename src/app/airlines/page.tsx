import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";

const airlines = [
  {
    name: "Ryanair",
    logo: "/assets/airlines/ryanair.png",
    description:
      "Delayed, cancelled or denied boarding on a Ryanair flight? Check your eligibility in minutes.",
    cta: "Learn more",
  },
  {
    name: "easyJet",
    logo: "/assets/airlines/easyjet.png",
    description:
      "If your easyJet flight was disrupted, you may be entitled to compensation of up to €600.",
    cta: "Learn more",
  },
  {
    name: "British Airways",
    logo: "/assets/airlines/british-airways.png",
    description:
      "Check whether your British Airways flight delay, cancellation or missed connection is eligible.",
    cta: "Learn more",
  },
  {
    name: "Wizz Air",
    logo: "/assets/airlines/wizz-air.png",
    description: "Start a quick digital powered check for your Wizz Air disruption.",
    cta: "Learn more",
  },
];

const airports = [
  {
    name: "London Heathrow Airport",
    logo: "/assets/airports/heathrow.png",
    description:
      "Flight delayed, cancelled or disrupted at Heathrow? Check your compensation rights with Compensall Agent",
    cta: "Check claims",
  },
  {
    name: "London Gatwick Airport",
    logo: "/assets/airports/gatwick.png",
    description:
      "If your flight from or to Gatwick was disrupted, you may be able to claim compensation.",
    cta: "Check claims",
  },
  {
    name: "Manchester Airport",
    logo: "/assets/airports/manchester.png",
    description:
      "Delayed, cancelled or denied boarding at Manchester? Find out if you may be eligible.",
    cta: "Check claims",
  },
  {
    name: "Lisbon Airport",
    logo: "/assets/airports/lisbon.png",
    description: "Check your rights for flight disruptions involving Lisbon Airport.",
    cta: "Check claims",
  },
];

function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative w-full sm:w-[280px] xl:w-[363px] flex-shrink-0">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-11 border border-[#d5e0f9] rounded-[10px] pl-4 pr-12 text-sm text-[#1f3664] placeholder:text-[#7b8094] outline-none focus:border-[#2669f3] bg-white"
      />
      <button
        type="button"
        className="absolute right-1 top-1 w-9 h-9 flex items-center justify-center text-[#2669f3]"
        aria-label="Search"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function CatalogCard({
  logo,
  name,
  description,
  cta,
}: {
  logo: string;
  name: string;
  description: string;
  cta: string;
}) {
  return (
    <div className="bg-white border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8 flex flex-col min-h-[280px] xl:min-h-[312px]">
      <div className="h-12 xl:h-[60px] mb-5 flex items-start">
        <img src={logo} alt={name} className="h-full w-auto max-w-[200px] object-contain object-left" />
      </div>
      <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[18px] mb-3 leading-snug">{name}</h3>
      <p className="text-[#1f3664] text-sm xl:text-[15px] leading-[1.7] flex-1">{description}</p>
      <Link
        href="/#claim"
        className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-[17px] xl:text-[18px] mt-5 hover:opacity-80 transition-opacity"
      >
        {cta}
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
  );
}

function CatalogSection({
  title,
  searchPlaceholder,
  items,
}: {
  title: string;
  searchPlaceholder: string;
  items: typeof airlines;
}) {
  return (
    <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
        <h2 className="font-['Open_Sans',sans-serif] font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] text-center mb-6 lg:mb-8 xl:mb-10 leading-[1.2]">
          {title}
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 xl:mb-8">
          <p className="font-bold text-[#1f3664] text-[17px] xl:text-[18px]">Most popular</p>
          <SearchField placeholder={searchPlaceholder} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
          {items.map((item) => (
            <CatalogCard
              key={item.name}
              logo={item.logo}
              name={item.name}
              description={item.description}
              cta={item.cta}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AirlinesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="px-4 md:px-8 lg:px-8 xl:px-12 pt-0 pb-0">
        <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
          <div className="relative rounded-[28px] xl:rounded-[38px] overflow-clip">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] xl:rounded-[38px]">
              <img
                src="/assets/hero-bg.png"
                alt=""
                className="absolute max-w-none"
                style={{ height: "338.64%", width: "141.39%", left: "-0.02%", top: "-48.04%" }}
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
                Airports &amp; Airlines
              </h1>
              <p className="text-white font-bold text-base lg:text-[17px] xl:text-[19px] leading-relaxed max-w-[642px] mx-auto">
                Find your airline or airport.
                <br />
                Check your claim in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CatalogSection title="Airlines" searchPlaceholder="Search airline..." items={airlines} />
      <CatalogSection title="Airports" searchPlaceholder="Search airport..." items={airports} />

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
