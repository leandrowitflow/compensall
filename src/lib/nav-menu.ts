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
      { label: "Flight cancellation", href: "/blog/flight-cancellation" },
      { label: "Flight delay", href: "/blog/flight-delay" },
      { label: "Denied boarding", href: "/blog/denied-boarding" },
      { label: "Missed connection", href: "/blog/missed-connection" },
      { label: "Overbooking", href: "/blog/overbooking" },
      { label: "Airline strike", href: "/blog/airline-strike" },
      { label: "Passenger rights", href: "/blog/passenger-rights" },
      {
        label: "Passengers with disabilities",
        href: "/blog/passengers-with-disabilities",
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
