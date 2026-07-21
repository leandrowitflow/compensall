"use client";

import dynamic from "next/dynamic";

const HowItWorksSteps = dynamic(() => import("@/components/HowItWorksSteps"), {
  ssr: false,
  loading: () => <div className="min-h-[267px]" aria-hidden />,
});

const HomePassengerRightsSection = dynamic(() => import("@/components/HomePassengerRightsSection"), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" aria-hidden />,
});

const CTABanner = dynamic(() => import("@/components/CTABanner"), {
  ssr: false,
  loading: () => <div className="min-h-[200px]" aria-hidden />,
});

const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  ssr: false,
  loading: () => <div className="min-h-[300px]" aria-hidden />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => <div className="min-h-[300px]" aria-hidden />,
});

export {
  CTABanner,
  FAQSection,
  Footer,
  HomePassengerRightsSection,
  HowItWorksSteps,
};
