"use client";

import { useTranslations } from "next-intl";
import NewsletterFormClient from "@/components/NewsletterFormClient";
import { Link } from "@/i18n/routing";
import { gtmId } from "@/lib/gtm";

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/compensall",
    labelKey: "socialLinkedIn",
    icon: "/assets/icons/social-linkedin.svg",
    gtm: "footer_social_linkedin",
  },
  {
    href: "https://www.instagram.com/compensall/",
    labelKey: "socialInstagram",
    icon: "/assets/icons/social-instagram.svg?v=2",
    gtm: "footer_social_instagram",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61591145513794",
    labelKey: "socialFacebook",
    icon: "/assets/icons/social-facebook.svg",
    gtm: "footer_social_facebook",
  },
  {
    href: "https://www.tiktok.com/@compensall",
    labelKey: "socialTikTok",
    icon: "/assets/icons/social-tiktok.svg",
    gtm: "footer_social_tiktok",
  },
] as const;

const FOOTER_NAV_GTM: Record<string, string> = {
  "/know-your-rights": "footer_nav_know_your_rights",
  "/airlines": "footer_nav_airlines",
  "/about": "footer_nav_about",
  "/blog": "footer_nav_blog",
  "/faq": "footer_nav_faq",
};

const FOOTER_LEGAL_GTM: Record<string, string> = {
  "/privacy-policy": "footer_legal_privacy",
  "/terms": "footer_legal_terms",
  "/cookies": "footer_legal_cookies",
  "/prices": "footer_legal_prices",
  "/documents/no-win-no-fee": "footer_legal_no_win_no_fee",
};

function ContactDetails({ className = "", contactUsLabel }: { className?: string; contactUsLabel: string }) {
  const tFooter = useTranslations("footer");

  return (
    <div className={`flex flex-col gap-4 xl:gap-6 ${className}`}>
      <h4 className="font-medium text-[19px] xl:text-[21px] tracking-[-0.21px] leading-[1.5]">
        {contactUsLabel}
      </h4>
      <p className="text-[rgba(255,255,255,0.63)] text-base leading-[30px]">
        <a
          href="mailto:help@compensall.com"
          className="hover:text-white transition-colors break-all"
          {...gtmId("footer_contact_email")}
        >
          {tFooter("email")}
        </a>
      </p>
      <p className="text-[rgba(255,255,255,0.63)] text-base leading-[30px]">
        <a href="tel:+351923391980" className="hover:text-white transition-colors" {...gtmId("footer_contact_phone")}>
          {tFooter("phone")}
        </a>
      </p>
    </div>
  );
}

function LegalLinks({ className = "" }: { className?: string }) {
  const tFooter = useTranslations("footer");
  const legalLinks = [
    { href: "/privacy-policy", label: tFooter("privacyPolicy") },
    { href: "/terms", label: tFooter("termsOfService") },
    { href: "/cookies", label: tFooter("cookies") },
    { href: "/prices", label: tFooter("prices") },
    { href: "/documents/no-win-no-fee", label: tFooter("noWinNoFee") },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 sm:gap-5 xl:gap-8 ${className}`}>
      {legalLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm sm:text-base tracking-[-0.16px] leading-[1.5] text-white hover:text-white/70 transition-colors"
          {...gtmId(FOOTER_LEGAL_GTM[link.href] ?? "footer_legal")}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function SocialLinks({ className = "" }: { className?: string }) {
  const tFooter = useTranslations("footer");

  return (
    <div className={`flex items-center justify-center lg:justify-start gap-5 lg:gap-6 xl:gap-8 ${className}`}>
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.labelKey}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tFooter(social.labelKey)}
          className="hover:opacity-70 transition-opacity p-1"
          {...gtmId(social.gtm)}
        >
          <img src={social.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const primaryNavLinks = [
    { label: tNav("knowYourRights"), shortLabel: tNav("knowYourRightsShort"), href: "/know-your-rights" },
    { label: tNav("airlines"), shortLabel: tNav("airlinesShort"), href: "/airlines" },
    { label: tNav("aboutUs"), shortLabel: tNav("aboutUs"), href: "/about" },
    { label: tNav("blog"), shortLabel: tNav("blog"), href: "/blog" },
    { label: tNav("faq"), shortLabel: tNav("faq"), href: "/faq" },
  ];

  return (
    <footer className="mt-auto bg-[#1f3664] text-white px-4 md:px-8 lg:px-8 xl:px-12 overflow-x-clip">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto pt-12 pb-8 md:pb-10 lg:pt-12 xl:pt-[83px] xl:pb-12">
        <div className="flex flex-col items-center text-center gap-8 md:gap-10 lg:hidden">
          <img
            src="/assets/logo-white.svg?v=2"
            alt="Compensall"
            width={120}
            height={32}
            className="h-8 w-auto"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />

          <nav className="grid grid-cols-2 gap-x-6 gap-y-4 w-full max-w-[320px] sm:max-w-[360px]">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-base sm:text-[17px] leading-[23px] hover:text-white/70 transition-colors text-center"
                {...gtmId(FOOTER_NAV_GTM[link.href] ?? "footer_nav")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="w-full max-w-[340px]">
            <NewsletterFormClient />
          </div>

          <ContactDetails
            className="w-full max-w-[320px] sm:max-w-[360px] mx-auto items-start text-left"
            contactUsLabel={tFooter("contactUs")}
          />

          <div className="w-full max-w-[340px] pt-6 border-t border-white/15 flex flex-col items-center gap-5">
            <LegalLinks />
            <SocialLinks />
            <p className="text-sm sm:text-base tracking-[-0.16px] leading-[1.5] text-white/90">
              {tFooter("copyright")}
            </p>
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-[minmax(0,180px)_1fr_minmax(0,240px)] xl:grid-cols-[minmax(0,260px)_1fr_minmax(0,320px)] gap-x-8 xl:gap-x-16 gap-y-8">
          <div className="lg:row-start-1 lg:col-start-1">
            <img
              src="/assets/logo-white.svg?v=2"
              alt="Compensall"
              width={120}
              height={39}
              className="h-8 xl:h-[39px] w-auto"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>

          <nav className="lg:row-start-1 lg:col-start-2 flex flex-wrap items-center justify-center gap-4 xl:gap-6 2xl:gap-10">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-[15px] xl:text-[16px] 2xl:text-[17px] leading-[23px] hover:text-white/70 transition-colors text-center"
                {...gtmId(FOOTER_NAV_GTM[link.href] ?? "footer_nav")}
              >
                <span className="2xl:hidden">{link.shortLabel}</span>
                <span className="hidden 2xl:inline">{link.label}</span>
              </Link>
            ))}
          </nav>

          <ContactDetails
            className="lg:row-start-1 lg:row-span-2 lg:col-start-3 items-start text-left"
            contactUsLabel={tFooter("contactUs")}
          />

          <div className="lg:row-start-2 lg:col-start-2 flex flex-col items-center text-center">
            <NewsletterFormClient />
          </div>

          <p className="lg:row-start-3 lg:col-start-1 text-base tracking-[-0.16px] leading-[1.5] lg:self-end lg:pt-8 xl:pt-[68px]">
            {tFooter("copyright")}
          </p>

          <LegalLinks className="lg:row-start-3 lg:col-start-2 lg:self-end lg:pt-8 xl:pt-[68px]" />

          <SocialLinks className="lg:row-start-3 lg:col-start-3 lg:self-end lg:pt-8 xl:pt-[68px]" />
        </div>
      </div>
    </footer>
  );
}
