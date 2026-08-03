import { airlinesCatalog, airportsCatalog } from "@/lib/catalog";
import { getPopularNavItems } from "@/lib/popular-nav";
import { COMPENSALL_GUIDE_SLUGS } from "@/lib/blog/guide-slugs";
import type { NavMenuGroup, NavMenuItem } from "@/lib/nav-menu";

type NavTranslator = {
  (key: string): string;
};

export type HeaderNavData = {
  knowYourRightsNav: NavMenuGroup[];
  airlinesNav: NavMenuGroup[];
  primaryNavLinks: NavMenuItem[];
  labels: {
    openMenu: string;
    talkToUs: string;
    talkToUsShort: string;
    knowYourRightsShort: string;
    airlinesShort: string;
  };
};

/** Build header menus on the server so the client Header never imports catalogs. */
export function buildHeaderNav(
  locale: string,
  tNav: NavTranslator,
  openMenuLabel: string,
): HeaderNavData {
  const popularAirlines = getPopularNavItems(airlinesCatalog, locale, "airlines", 6);
  const popularAirports = getPopularNavItems(airportsCatalog, locale, "airports", 6);

  const knowYourRightsNav: NavMenuGroup[] = [
    {
      title: tNav("knowYourRightsMenu.yourRights"),
      items: [
        {
          label: tNav("knowYourRightsMenu.overview"),
          href: "/know-your-rights",
          description: tNav("knowYourRightsMenu.overviewDescription"),
        },
        { label: tNav("knowYourRightsMenu.flightCancellation"), href: `/blog/${COMPENSALL_GUIDE_SLUGS[0]}` },
        { label: tNav("knowYourRightsMenu.flightDelay"), href: `/blog/${COMPENSALL_GUIDE_SLUGS[2]}` },
        { label: tNav("knowYourRightsMenu.deniedBoarding"), href: `/blog/${COMPENSALL_GUIDE_SLUGS[1]}` },
        { label: tNav("knowYourRightsMenu.missedConnection"), href: `/blog/${COMPENSALL_GUIDE_SLUGS[3]}` },
        { label: tNav("knowYourRightsMenu.overbooking"), href: `/blog/${COMPENSALL_GUIDE_SLUGS[4]}` },
        { label: tNav("knowYourRightsMenu.airlineStrike"), href: `/blog/${COMPENSALL_GUIDE_SLUGS[5]}` },
        { label: tNav("knowYourRightsMenu.passengerRights"), href: `/blog/${COMPENSALL_GUIDE_SLUGS[6]}` },
        {
          label: tNav("knowYourRightsMenu.passengersWithDisabilities"),
          href: `/blog/${COMPENSALL_GUIDE_SLUGS[7]}`,
        },
      ],
    },
  ];

  const airlinesNav: NavMenuGroup[] = [
    {
      title: tNav("airlinesMenu.browse"),
      items: [
        {
          label: tNav("airlinesMenu.allAirlinesAirports"),
          href: "/airlines",
          description: tNav("airlinesMenu.allAirlinesAirportsDescription"),
        },
      ],
    },
    {
      title: tNav("airlinesMenu.popularAirlines"),
      items: popularAirlines.map((item) => ({
        label: item.name,
        href: `/airlines/${item.id}`,
      })),
    },
    {
      title: tNav("airlinesMenu.popularAirports"),
      items: popularAirports.map((item) => ({
        label: item.name,
        href: `/airports/${item.id}`,
      })),
    },
  ];

  const primaryNavLinks: NavMenuItem[] = [
    { label: tNav("knowYourRights"), href: "/know-your-rights" },
    { label: tNav("airlines"), href: "/airlines" },
    { label: tNav("aboutUs"), href: "/about" },
    { label: tNav("blog"), href: "/blog" },
    { label: tNav("faq"), href: "/faq" },
  ];

  return {
    knowYourRightsNav,
    airlinesNav,
    primaryNavLinks,
    labels: {
      openMenu: openMenuLabel,
      talkToUs: tNav("talkToUs"),
      talkToUsShort: tNav("talkToUsShort"),
      knowYourRightsShort: tNav("knowYourRightsShort"),
      airlinesShort: tNav("airlinesShort"),
    },
  };
}
