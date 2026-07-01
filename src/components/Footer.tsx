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

export default function Footer() {
  return (
    <footer className="bg-[#1f3664] text-white px-4 md:px-8 lg:px-8 xl:px-12">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto pt-12 pb-8 md:pb-10 lg:pt-12 xl:pt-[83px] xl:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,180px)_1fr_minmax(0,240px)] xl:grid-cols-[minmax(0,260px)_1fr_minmax(0,320px)] gap-y-10 lg:gap-x-8 xl:gap-x-16 lg:gap-y-8">
          {/* Row 1 — Logo */}
          <div className="lg:row-start-1 lg:col-start-1">
            <img
              src="/assets/logo-white.svg?v=2"
              alt="Compensall"
              className="h-7 sm:h-8 xl:h-[39px] w-auto"
            />
          </div>

          {/* Row 1 — Nav links (centered in middle column) */}
          <nav className="lg:row-start-1 lg:col-start-2 flex flex-wrap items-center justify-center gap-5 sm:gap-6 xl:gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-['Open_Sans',sans-serif] text-white text-[17px] leading-[23px] hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Row 1 — Contact heading */}
          <div className="lg:row-start-1 lg:col-start-3">
            <h4 className="font-['Roboto',sans-serif] font-medium text-[19px] xl:text-[21px] tracking-[-0.21px] leading-[1.5]">
              Entre em contato
            </h4>
          </div>

          {/* Row 2 — Newsletter (centered in middle column) */}
          <div className="lg:row-start-2 lg:col-start-2 flex flex-col items-center text-center">
            <h3 className="font-['Roboto',sans-serif] font-medium text-xl lg:text-xl xl:text-[32px] leading-normal text-white mb-3 max-w-[389px]">
              Don&apos;t miss any opportunity
            </h3>
            <p className="font-['Roboto',sans-serif] font-light text-base xl:text-[18px] leading-[30px] text-white mb-5">
              Subscribe to our newsletter
            </p>
            <div className="flex items-center w-full max-w-[340px] min-w-0">
              <div className="bg-white h-12 min-w-0 flex-1 rounded-full flex items-center px-4 sm:px-5">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full text-[#1c2544] text-sm outline-none bg-transparent placeholder:text-[#1c2544]/60"
                />
              </div>
              <button
                type="button"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 hover:bg-white/90 transition-colors -ml-1"
                aria-label="Subscribe"
              >
                <img
                  src="/assets/icons/footer-newsletter-arrow.svg"
                  alt=""
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          {/* Row 2 — Contact details */}
          <div className="lg:row-start-2 lg:col-start-3 flex flex-col gap-5 xl:gap-6">
            <p className="font-['Poppins',sans-serif] text-[rgba(255,255,255,0.63)] text-base leading-[30px] max-w-[237px]">
              123 Creative Blvd, Innovation City, NY 10001, USA
            </p>
            <p className="font-['Poppins',sans-serif] text-[rgba(255,255,255,0.63)] text-base leading-[30px]">
              <a href="mailto:contact@sphereagency.com" className="hover:text-white transition-colors">
                contact@sphereagency.com
              </a>
            </p>
            <p className="font-['Poppins',sans-serif] text-[rgba(255,255,255,0.63)] text-base leading-[30px]">
              <a href="tel:+15551234567" className="hover:text-white transition-colors">
                +1 (555) 123-4567
              </a>
            </p>
          </div>

          {/* Row 3 — Copyright */}
          <p className="lg:row-start-3 lg:col-start-1 font-['Roboto',sans-serif] text-base tracking-[-0.16px] leading-[1.5] lg:self-end lg:pt-8 xl:pt-[68px]">
            Copyright © FlowProductions 2026
          </p>

          {/* Row 3 — Legal links (centered in middle column) */}
          <div className="lg:row-start-3 lg:col-start-2 flex flex-wrap items-center justify-center gap-5 sm:gap-6 xl:gap-8 lg:self-end lg:pt-8 xl:pt-[68px]">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-['Roboto',sans-serif] text-base tracking-[-0.16px] leading-[1.5] text-white hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Row 3 — Social icons (left-aligned with contact column) */}
          <div className="lg:row-start-3 lg:col-start-3 flex items-center gap-5 lg:gap-6 xl:gap-8 lg:self-end lg:pt-8 xl:pt-[68px]">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="hover:opacity-70 transition-opacity"
              >
                <img src={social.icon} alt="" className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
