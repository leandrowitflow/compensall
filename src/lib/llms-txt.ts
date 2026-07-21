import { localizedPath, SITE_URL } from "@/lib/site-metadata";
import { COMPENSALL_GUIDE_SLUGS } from "@/lib/blog/guide-slugs";

type LlmsLink = {
  title: string;
  path: string;
  description: string;
};

type LlmsSection = {
  heading: string;
  links: LlmsLink[];
};

const LLMS_SECTIONS: LlmsSection[] = [
  {
    heading: "Primary pages",
    links: [
      {
        title: "Home and claim start",
        path: "/",
        description:
          "Upload a boarding pass to begin a no win no fee EU261 compensation claim of up to €600.",
      },
      {
        title: "Know your rights",
        path: "/know-your-rights",
        description:
          "Passenger rights under EC 261/2004, eligibility rules, and how Compensall helps you claim.",
      },
      {
        title: "Airlines and airports",
        path: "/airlines",
        description:
          "Browse airline and airport guides to check compensation eligibility for your journey.",
      },
      {
        title: "About Compensall",
        path: "/about",
        description: "How the platform works, our no win no fee model, and human-backed claim support.",
      },
      {
        title: "Blog",
        path: "/blog",
        description: "Articles on flight delays, cancellations, denied boarding, and compensation rights.",
      },
    ],
  },
  {
    heading: "Key guides",
    links: [
      {
        title: "Flight cancellation compensation",
        path: `/blog/${COMPENSALL_GUIDE_SLUGS[0]}`,
        description: "When cancelled flights qualify for EU261 compensation and how much you can claim.",
      },
      {
        title: "Flight delay compensation",
        path: `/blog/${COMPENSALL_GUIDE_SLUGS[2]}`,
        description: "Delay thresholds, payout amounts by distance, and how to document your claim.",
      },
      {
        title: "Denied boarding rights",
        path: `/blog/${COMPENSALL_GUIDE_SLUGS[1]}`,
        description: "Rights when involuntarily denied boarding and steps to pursue compensation.",
      },
      {
        title: "Missed connection compensation",
        path: `/blog/${COMPENSALL_GUIDE_SLUGS[3]}`,
        description: "When missed connections on one booking still qualify for EU261 payouts.",
      },
      {
        title: "Overbooking compensation",
        path: `/blog/${COMPENSALL_GUIDE_SLUGS[4]}`,
        description: "What airlines owe when you are bumped from an overbooked flight.",
      },
      {
        title: "Airline strike disruptions",
        path: `/blog/${COMPENSALL_GUIDE_SLUGS[5]}`,
        description: "When strike-related cancellations still trigger passenger compensation.",
      },
      {
        title: "EU air passenger rights overview",
        path: `/blog/${COMPENSALL_GUIDE_SLUGS[6]}`,
        description: "Plain-language guide to EC 261/2004 compensation, refunds, and care.",
      },
      {
        title: "Flying with a disability",
        path: `/blog/${COMPENSALL_GUIDE_SLUGS[7]}`,
        description: "Assistance, accessibility, and compensation rights for passengers with disabilities.",
      },
    ],
  },
  {
    heading: "Example airline pages",
    links: [
      {
        title: "Ryanair compensation",
        path: "/airlines/ryanair",
        description: "Ryanair-specific guidance for EU261 delay and cancellation claims.",
      },
      {
        title: "easyJet compensation",
        path: "/airlines/easyjet",
        description: "easyJet-specific guidance for EU261 delay and cancellation claims.",
      },
      {
        title: "British Airways compensation",
        path: "/airlines/british-airways",
        description: "British Airways-specific guidance for EU261 delay and cancellation claims.",
      },
    ],
  },
  {
    heading: "Optional",
    links: [
      {
        title: "Privacy Policy",
        path: "/privacy-policy",
        description: "How Compensall collects, uses, and protects personal data across the website and claim service.",
      },
      {
        title: "Terms of Service",
        path: "/terms",
        description: "Terms governing use of the Compensall website and compensation claim service.",
      },
      {
        title: "Cookie Policy",
        path: "/cookies",
        description: "How Compensall uses cookies and how visitors can manage preferences.",
      },
      {
        title: "No win, no fee agreement",
        path: "/documents/no-win-no-fee",
        description: "Fee terms applied when Compensall pursues compensation on your behalf.",
      },
      {
        title: "Authority to act",
        path: "/documents/authority-to-act",
        description: "Legal authority for Compensall to communicate with the airline about your claim.",
      },
      {
        title: "Privacy and data consent",
        path: "/documents/privacy-data-consent",
        description: "How boarding pass and personal data are collected, used, and protected.",
      },
    ],
  },
];

function formatLink({ title, path, description }: LlmsLink): string {
  const url = `${SITE_URL}${localizedPath(path, "en")}`;
  return `- [${title}](${url}): ${description}`;
}

export function buildLlmsTxt(): string {
  const sections = LLMS_SECTIONS.map(
    (section) => `## ${section.heading}\n\n${section.links.map(formatLink).join("\n")}`,
  ).join("\n\n");

  return [
    "# Compensall",
    "",
    "> Compensall helps air passengers claim compensation of up to €600 per person under EU regulation EC 261/2004 for delayed, cancelled, and disrupted flights. Localized site versions: English (en-GB), Portuguese (pt-PT), and French (fr-FR) at /en/, /pt/, and /fr/.",
    "",
    sections,
    "",
    "## Contact",
    "",
    `- [Start a claim](${SITE_URL}/en#claim): Use the homepage boarding pass upload form; human support is available throughout the process.`,
    "",
  ].join("\n");
}
