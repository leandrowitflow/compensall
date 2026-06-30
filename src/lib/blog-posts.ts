export type BlogPost = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "flight-cancellation",
    category: "Know your rights",
    date: "28 May 2026",
    title: "Flight cancellation: when you can claim up to €600",
    excerpt:
      "If your flight is cancelled with short notice, you may be entitled to compensation of up to €600.",
    image: "/assets/icons/flight-cancellation.png",
    body: [
      "When an airline cancels your flight, EU regulation EC 261/2004 may entitle you to fixed compensation — on top of a refund or re-routing. The amount depends on flight distance: up to €250 for short routes, €400 for medium-haul, and €600 for long-haul flights over 3,500 km.",
      "You are generally eligible when the cancellation is announced with less than 14 days' notice and the airline cannot prove the disruption was caused by extraordinary circumstances such as severe weather or air-traffic control restrictions.",
      "Airlines must also offer care while you wait: meals, refreshments, hotel accommodation if an overnight stay is required, and transport between the airport and hotel. Keep every email, SMS, and boarding pass — they are essential evidence for your claim.",
      "Compensall checks your cancellation against the regulation in minutes. Upload your boarding pass and we will tell you whether you have a valid claim and handle the airline on your behalf.",
    ],
  },
  {
    slug: "denied-boarding",
    category: "Know your rights",
    date: "26 May 2026",
    title: "Denied boarding: your rights when refused at the gate",
    excerpt:
      "If you were refused boarding against your will, you could claim up to €600.",
    image: "/assets/icons/denied-boarding.png",
    body: [
      "Denied boarding happens when an airline refuses to let you travel despite you having a valid ticket and arriving on time — most often due to overbooking. Under EU261, this is treated seriously: passengers who are involuntarily denied boarding have strong compensation rights.",
      "Before bumping anyone, the airline must ask for volunteers and offer benefits in exchange for giving up a seat. If there are not enough volunteers, those who are denied boarding against their will may receive the same compensation tiers as for cancellations — up to €600 depending on distance.",
      "You also have the right to choose between a full refund and the earliest available alternative flight to your destination. The airline must provide meals, calls, and accommodation where necessary while you wait.",
      "If you were refused boarding at the gate, do not accept a voucher without understanding your legal rights. Upload your boarding pass to Compensall and we will assess whether you are owed cash compensation.",
    ],
  },
  {
    slug: "flight-delay",
    category: "Know your rights",
    date: "24 May 2026",
    title: "Flight delay: the three-hour rule explained",
    excerpt:
      "If your flight arrived more than 3 hours late, you may be entitled to compensation.",
    image: "/assets/icons/flight-delay.png",
    body: [
      "Not every delay leads to compensation — but if your flight arrives at its final destination three or more hours behind schedule, you may have a valid claim under EU261. The clock is measured at arrival, not departure, and only applies when the delay is the airline's responsibility.",
      "Compensation is fixed by distance, not ticket price: €250 for flights up to 1,500 km, €400 for intra-EU flights over 1,500 km and other routes between 1,500 and 3,500 km, and €600 for flights over 3,500 km.",
      "For delays of two hours or more (depending on distance), the airline must provide care — food, drinks, and hotel stays if needed. Extraordinary circumstances such as extreme weather or security risks can exempt the carrier, but airlines often wrongly cite these reasons to reject claims.",
      "Compensall analyses your actual arrival time against the scheduled time and challenges unfair rejections. Start with a boarding pass upload — eligibility takes just a few minutes.",
    ],
  },
  {
    slug: "missed-connection",
    category: "Know your rights",
    date: "22 May 2026",
    title: "Missed connection: compensation when your itinerary falls apart",
    excerpt:
      "If a delay or cancellation caused you to miss a connecting flight, you may be entitled to compensation.",
    image: "/assets/icons/missed-connection.png",
    body: [
      "Missed connections are one of the most confusing areas of passenger rights. The key question is whether your flights were booked together on a single reservation. If they were, a delay on the first leg that causes you to arrive more than three hours late at your final destination can trigger the same compensation as a direct delay.",
      "The airline is responsible for re-routing you to your destination as quickly as possible. While you wait, you are entitled to care — meals, communication, and accommodation if an overnight delay is unavoidable.",
      "If you booked separate tickets with different airlines, EU261 protections may not apply to the connection itself. However, a delay on an EU-carrier flight that causes a missed onward flight on the same booking is covered.",
      "Keep boarding passes for every leg of your journey and note the actual arrival time at your final stop. Compensall maps multi-leg itineraries automatically from your upload and flags whether a missed connection qualifies.",
    ],
  },
  {
    slug: "overbooking",
    category: "Know your rights",
    date: "20 May 2026",
    title: "Overbooking: what airlines owe you when seats run out",
    excerpt:
      "If the airline overbooked your flight and you could not travel as planned, you may be able to claim.",
    image: "/assets/icons/overbooking.png",
    body: [
      "Airlines routinely sell more tickets than available seats, betting that some passengers will not show up. When everyone does, the flight is overbooked and someone has to be left behind. EU law treats passengers who are involuntarily bumped very differently from those who volunteer to take a later flight.",
      "If you did not volunteer and were denied boarding because of overbooking, you may be entitled to compensation of up to €600, a choice between refund and re-routing, and care while you wait for the next available flight.",
      "Voluntary agreements — where you accept vouchers or miles in exchange for giving up your seat — are separate from legal compensation rights. Always confirm in writing what you are agreeing to before signing anything at the gate.",
      "Overbooking claims require proof that you held a confirmed reservation, checked in on time, and were refused boarding against your will. Compensall helps you document the facts and pursue the compensation you are legally owed.",
    ],
  },
  {
    slug: "airline-strike",
    category: "Know your rights",
    date: "18 May 2026",
    title: "Airline strike: can you still claim compensation?",
    excerpt:
      "If your flight was disrupted by an airline strike, you may still have compensation rights.",
    image: "/assets/icons/airline-strike.png",
    body: [
      "Strikes are a common reason airlines give for denying compensation — but not all strikes are treated equally under EU261. A strike by the airline's own staff (pilots, cabin crew, ground handlers employed by the carrier) is generally considered within the airline's control, meaning compensation may still be due.",
      "By contrast, strikes by third parties — such as air-traffic controllers or airport security staff — are often classified as extraordinary circumstances outside the airline's responsibility. In those cases, compensation may not apply, though you still have rights to care and re-routing.",
      "Airlines frequently blur this distinction in rejection letters. The specific facts of each disruption matter: who was striking, when the airline knew about it, and whether they could have avoided the cancellation or delay.",
      "If your flight was affected by a strike, upload your boarding pass to Compensall. We review the circumstances and pursue your claim when the law supports it.",
    ],
  },
  {
    slug: "passenger-rights",
    category: "Know your rights",
    date: "16 May 2026",
    title: "Passenger rights: what airlines owe you when travel goes wrong",
    excerpt: "Learn what airlines may owe you when your trip is disrupted.",
    image: "/assets/icons/passenger-rights.png",
    body: [
      "EU261 gives every passenger on a qualifying flight a clear set of rights when things go wrong. These include fixed financial compensation for delays, cancellations, and denied boarding; the choice of a refund or re-routing; and care such as meals, drinks, and hotel accommodation during long waits.",
      "The regulation covers flights departing from any EU airport, and flights arriving in the EU on an EU-based carrier. It applies regardless of your nationality or ticket price — even €20 budget fares qualify.",
      "Beyond compensation, airlines must keep you informed. They are required to tell you about your rights at check-in and when a disruption occurs. If they fail to do so, that does not remove your entitlement — but it often means passengers never claim what they are owed.",
      "Compensall exists to close that gap. We translate complex regulation into a simple check: upload your boarding pass, confirm your details, and let us handle the rest.",
    ],
  },
  {
    slug: "passengers-with-disabilities",
    category: "Know your rights",
    date: "14 May 2026",
    title: "Passengers with disabilities: assistance and accessibility rights",
    excerpt:
      "Understand your rights to assistance, accessibility and support when travelling.",
    image: "/assets/icons/passengers-with-disabilities.png",
    body: [
      "Air passengers with disabilities or reduced mobility have dedicated protections under EU law, separate from EC 261/2004. Regulation (EC) No 1107/2006 requires airports and airlines to provide free assistance throughout the journey — from check-in through boarding, connections, and arrival.",
      "You should notify the airline of your needs at least 48 hours before departure when possible, though assistance must still be provided even for last-minute requests. This includes help with wheelchairs, guided boarding, and support during connections.",
      "If your wheelchair or mobility equipment is damaged or lost, you may be entitled to compensation for repair or replacement. If a lack of assistance caused you to miss a flight, the airline may be liable for re-routing and any related costs.",
      "Disability-related rights work alongside standard compensation rules. If a delay or cancellation also affected your journey, you may have claims under both sets of regulations. Contact Compensall with your boarding pass and we will review the full picture.",
    ],
  },
];

export const blogPostsBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPost>;
