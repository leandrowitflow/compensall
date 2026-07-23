"use client";

import dynamic from "next/dynamic";

/** Code-split below-fold sections while keeping SSR HTML for faster first paint. */
const HowItWorksSteps = dynamic(() => import("@/components/HowItWorksSteps"), {
  loading: () => <div className="min-h-[267px]" aria-hidden />,
});

const HomePassengerRightsSection = dynamic(() => import("@/components/HomePassengerRightsSection"), {
  loading: () => <div className="min-h-[400px]" aria-hidden />,
});

const CTABanner = dynamic(() => import("@/components/CTABanner"), {
  loading: () => <div className="min-h-[200px]" aria-hidden />,
});

const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  loading: () => <div className="min-h-[300px]" aria-hidden />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="min-h-[300px]" aria-hidden />,
});

export {
  CTABanner,
  FAQSection,
  Footer,
  HomePassengerRightsSection,
  HowItWorksSteps,
};
