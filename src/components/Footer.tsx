import Link from "next/link";

const NAV_LINKS = [
  { href: "/know-your-rights", label: "Know your rights" },
  { href: "/airlines", label: "Airlines" },
  { href: "/about", label: "About us" },
  { href: "/blog", label: "Blog" },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookies" },
];

const SOCIAL_LINKS = [
  { href: "#", label: "X", icon: "/assets/icons/social-x.svg" },
  { href: "#", label: "Facebook", icon: "/assets/icons/social-facebook.svg" },
  { href: "#", label: "LinkedIn", icon: "/assets/icons/social-linkedin.svg" },
  { href: "#", label: "Instagram", icon: "/assets/icons/social-instagram.svg?v=2" },
];

function NewsletterForm() {
  return (
    <>
      <h3 className="font-roboto font-medium text-xl xl:text-[32px] leading-normal text-white mb-3 max-w-[389px]">
        Don&apos;t miss any opportunity
      </h3>
      <p className="font-roboto font-light text-base xl:text-[18px] leading-[30px] text-white mb-5">
        Subscribe to our newsletter
      </p>
      <div className="flex items-center w-full max-w-[340px] min-w-0 mx-auto lg:mx-0">
        <div className="bg-white h-12 min-w-0 flex-1 rounded-full flex items-center px-4 sm:px-5">
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full min-w-0 text-[#1c2544] text-sm outline-none bg-transparent placeholder:text-[#1c2544]/60"
          />
        </div>
        <button
          type="button"
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 hover:bg-white/90 transition-colors -ml-1"
          aria-label="Subscribe"
        >
          <img src="/assets/icons/footer-newsletter-arrow.svg" alt="" className="w-6 h-6 object-contain" />
        </button>
      </div>
    </>
  );
}

function ContactDetails({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-4 xl:gap-6 ${className}`}>
      <h4 className="font-roboto font-medium text-[19px] xl:text-[21px] tracking-[-0.21px] leading-[1.5]">
        Entre em contato
      </h4>
      <p className="font-poppins text-[rgba(255,255,255,0.63)] text-base leading-[30px] max-w-[280px] lg:max-w-[237px]">
        Rua Paulo da Gama 629
        <br />
        4150-589 Porto
      </p>
      <p className="font-poppins text-[rgba(255,255,255,0.63)] text-base leading-[30px]">
        <a href="mailto:help@compensall.com" className="hover:text-white transition-colors break-all">
          help@compensall.com
        </a>
      </p>
      <p className="font-poppins text-[rgba(255,255,255,0.63)] text-base leading-[30px]">
        <a href="tel:+351928370420" className="hover:text-white transition-colors">
          +351 928 370 420
        </a>
      </p>
    </div>
  );
}

function LegalLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 sm:gap-5 xl:gap-8 ${className}`}>
      {LEGAL_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="font-roboto text-sm sm:text-base tracking-[-0.16px] leading-[1.5] text-white hover:text-white/70 transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center lg:justify-start gap-5 lg:gap-6 xl:gap-8 ${className}`}>
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          className="hover:opacity-70 transition-opacity p-1"
        >
          <img src={social.icon} alt="" className="w-5 h-5 object-contain" />
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1f3664] text-white px-4 md:px-8 lg:px-8 xl:px-12 overflow-x-clip">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto pt-12 pb-8 md:pb-10 lg:pt-12 xl:pt-[83px] xl:pb-12">
        {/* Mobile & tablet */}
        <div className="flex flex-col items-center text-center gap-8 md:gap-10 lg:hidden">
          <img
            src="/assets/logo-white.svg?v=2"
            alt="Compensall"
            className="h-8 w-auto"
          />

          <nav className="grid grid-cols-2 gap-x-6 gap-y-4 w-full max-w-[320px] sm:max-w-[360px]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-base sm:text-[17px] leading-[23px] hover:text-white/70 transition-colors text-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="w-full max-w-[340px]">
            <NewsletterForm />
          </div>

          <ContactDetails className="w-full max-w-[320px] sm:max-w-[360px] mx-auto items-start text-left" />

          <div className="w-full max-w-[340px] pt-6 border-t border-white/15 flex flex-col items-center gap-5">
            <LegalLinks />
            <SocialLinks />
            <p className="font-roboto text-sm sm:text-base tracking-[-0.16px] leading-[1.5] text-white/90">
              Copyright © FlowProductions 2026
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,180px)_1fr_minmax(0,240px)] xl:grid-cols-[minmax(0,260px)_1fr_minmax(0,320px)] gap-x-8 xl:gap-x-16 gap-y-8">
          <div className="lg:row-start-1 lg:col-start-1">
            <img
              src="/assets/logo-white.svg?v=2"
              alt="Compensall"
              className="h-8 xl:h-[39px] w-auto"
            />
          </div>

          <nav className="lg:row-start-1 lg:col-start-2 flex flex-wrap items-center justify-center gap-6 xl:gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-[17px] leading-[23px] hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <ContactDetails className="lg:row-start-1 lg:row-span-2 lg:col-start-3 items-start text-left" />

          <div className="lg:row-start-2 lg:col-start-2 flex flex-col items-center text-center">
            <NewsletterForm />
          </div>

          <p className="lg:row-start-3 lg:col-start-1 font-roboto text-base tracking-[-0.16px] leading-[1.5] lg:self-end lg:pt-8 xl:pt-[68px]">
            Copyright © FlowProductions 2026
          </p>

          <LegalLinks className="lg:row-start-3 lg:col-start-2 lg:self-end lg:pt-8 xl:pt-[68px]" />

          <SocialLinks className="lg:row-start-3 lg:col-start-3 lg:self-end lg:pt-8 xl:pt-[68px]" />
        </div>
      </div>
    </footer>
  );
}
