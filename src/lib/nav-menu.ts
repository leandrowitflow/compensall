import { COMPENSALL_GUIDE_SLUGS } from "@/lib/blog/guide-slugs";

export type NavMenuItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavMenuGroup = {
  title: string;
  items: NavMenuItem[];
};

export const knowYourRightsNav: NavMenuGroup[] = [
  {
    title: "Your rights",
    items: [
      { label: "Overview", href: "/know-your-rights", description: "How EC 261 protects you" },
      { label: "Flight cancellation", href: `/blog/${COMPENSALL_GUIDE_SLUGS[0]}` },
      { label: "Flight delay", href: `/blog/${COMPENSALL_GUIDE_SLUGS[2]}` },
      { label: "Denied boarding", href: `/blog/${COMPENSALL_GUIDE_SLUGS[1]}` },
      { label: "Missed connection", href: `/blog/${COMPENSALL_GUIDE_SLUGS[3]}` },
      { label: "Overbooking", href: `/blog/${COMPENSALL_GUIDE_SLUGS[4]}` },
      { label: "Airline strike", href: `/blog/${COMPENSALL_GUIDE_SLUGS[5]}` },
      { label: "Passenger rights", href: `/blog/${COMPENSALL_GUIDE_SLUGS[6]}` },
      {
        label: "Passengers with disabilities",
        href: `/blog/${COMPENSALL_GUIDE_SLUGS[7]}`,
      },
    ],
  },
];

export const airlinesNav: NavMenuGroup[] = [
  {
    title: "Browse",
    items: [{ label: "All airlines & airports", href: "/airlines", description: "Full catalog" }],
  },
  {
    title: "Popular airlines",
    items: [
      { label: "Ryanair", href: "/airlines/ryanair" },
      { label: "easyJet", href: "/airlines/easyjet" },
      { label: "British Airways", href: "/airlines/british-airways" },
      { label: "Wizz Air", href: "/airlines/wizz-air" },
      { label: "Lufthansa", href: "/airlines/lufthansa" },
      { label: "TAP Air Portugal", href: "/airlines/tap" },
    ],
  },
  {
    title: "Popular airports",
    items: [
      { label: "London Heathrow", href: "/airports/heathrow" },
      { label: "London Gatwick", href: "/airports/gatwick" },
      { label: "Manchester", href: "/airports/manchester" },
      { label: "Lisbon", href: "/airports/lisbon" },
      { label: "Barcelona El Prat", href: "/airports/barcelona" },
      { label: "Paris CDG", href: "/airports/paris-cdg" },
    ],
  },
];

/** Top-level nav links shared by header and footer (same labels and order). */
export const primaryNavLinks: NavMenuItem[] = [
  { label: "Know your rights", href: "/know-your-rights" },
  { label: "Airlines", href: "/airlines" },
  { label: "About us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export { COMPENSALL_GUIDE_SLUGS };
