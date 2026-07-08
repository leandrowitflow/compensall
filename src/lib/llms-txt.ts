import { SITE_URL } from "@/lib/site-metadata";

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
        path: "/blog/flight-cancellation",
        description: "When cancelled flights qualify for EU261 compensation and how much you can claim.",
      },
      {
        title: "Flight delay compensation",
        path: "/blog/flight-delay",
        description: "Delay thresholds, payout amounts by distance, and how to document your claim.",
      },
      {
        title: "Denied boarding rights",
        path: "/blog/denied-boarding",
        description: "Rights when involuntarily denied boarding and steps to pursue compensation.",
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
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return `- [${title}](${url}): ${description}`;
}

export function buildLlmsTxt(): string {
  const sections = LLMS_SECTIONS.map(
    (section) => `## ${section.heading}\n\n${section.links.map(formatLink).join("\n")}`,
  ).join("\n\n");

  return [
    "# Compensall",
    "",
    "> Compensall helps air passengers claim compensation of up to €600 per person under EU regulation EC 261/2004 for delayed, cancelled, and disrupted flights. Passengers upload a boarding pass, confirm flight details, sign legal documents, and track their claim online.",
    "",
    sections,
    "",
    "## Contact",
    "",
    `- [Start a claim](${SITE_URL}/#claim): Use the homepage boarding pass upload form; human support is available throughout the process.`,
    "",
  ].join("\n");
}
