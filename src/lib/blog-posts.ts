export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string };

export type BlogPost = {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "flight-cancellation",
    category: "Know your rights",
    date: "28 May 2026",
    readTime: "6 min read",
    title: "Flight cancelled? You may be owed up to €600. Here's how to claim",
    excerpt:
      "Short-notice cancellations often trigger fixed compensation under EU261, on top of a refund or re-routing. Here is how to tell if your flight qualifies.",
    image: "/assets/blog/flight-cancellation.jpg",
    imageAlt: "Passenger checking a cancelled flight on an airport departure board",
    body: [
      {
        type: "paragraph",
        text: "You had plans. The airline had other ideas. If your flight was cancelled with little warning, you are not powerless. EU regulation EC 261/2004 may entitle you to cash compensation of up to €600 per passenger, separate from any refund or alternative flight the airline offers.",
      },
      {
        type: "heading",
        text: "When does a cancellation qualify for compensation?",
      },
      {
        type: "paragraph",
        text: "The general rule: if the airline cancels less than 14 days before departure and cannot prove extraordinary circumstances (severe weather, air-traffic control shutdowns, security emergencies), compensation is due. The amount depends on distance, not ticket price:",
      },
      {
        type: "list",
        items: [
          "Up to 1,500 km → €250 per passenger",
          "1,500–3,500 km → €400 per passenger",
          "Over 3,500 km → €600 per passenger",
        ],
      },
      {
        type: "callout",
        text: "Tip: A €29 Ryanair fare carries the same compensation rights as a business-class ticket on the same route.",
      },
      {
        type: "heading",
        text: "What the airline must offer on the day",
      },
      {
        type: "paragraph",
        text: "Compensation is only part of the picture. While you wait, the carrier must provide care, meals, drinks, two free calls or emails, and hotel accommodation plus airport transfers if an overnight stay is unavoidable. You can also choose between a full refund and the earliest re-routing to your destination.",
      },
      {
        type: "heading",
        text: "Why airlines reject valid cancellation claims",
      },
      {
        type: "paragraph",
        text: "Carriers often cite \"extraordinary circumstances\" without evidence, or offer vouchers instead of the cash you are legally owed. Rejection letters are frequently template responses designed to discourage passengers from pursuing their rights.",
      },
      {
        type: "list",
        items: [
          "Save every email, SMS, and push notification about the cancellation",
          "Keep boarding passes and booking confirmations",
          "Note the exact time you were informed. The 14-day window matters",
          "Do not sign away rights in exchange for a voucher without reading the terms",
        ],
      },
      {
        type: "heading",
        text: "How to check your claim in minutes",
      },
      {
        type: "paragraph",
        text: "Upload your boarding pass to Compensall and our assistant checks your cancellation against EC 261/2004. If you have a valid claim, our human team handles the airline on your behalf, on a no win, no fee basis.",
      },
    ],
  },
  {
    slug: "denied-boarding",
    category: "Know your rights",
    date: "26 May 2026",
    readTime: "5 min read",
    title: "Denied boarding at the gate: your rights when the airline says no",
    excerpt:
      "Refused a seat despite a valid ticket? Involuntary denied boarding can trigger up to €600 in compensation plus care and re-routing.",
    image: "/assets/blog/denied-boarding.jpg",
    imageAlt: "Traveler speaking with airline staff at an airport boarding gate",
    body: [
      {
        type: "paragraph",
        text: "You checked in on time. You had a confirmed seat. Then the gate agent told you the flight was full. If you were refused boarding against your will, most often because of overbooking, EU law treats this as seriously as a cancellation.",
      },
      {
        type: "heading",
        text: "Volunteers vs. involuntary denied boarding",
      },
      {
        type: "paragraph",
        text: "Airlines must first ask for volunteers and offer benefits (vouchers, miles, hotel) in exchange for giving up a seat. That is a voluntary agreement. If you did not volunteer and were bumped anyway, you may have a right to fixed cash compensation under EC 261/2004, up to €600 depending on flight distance.",
      },
      {
        type: "callout",
        text: "Important: Accepting a voucher at the gate does not automatically cancel your legal right to compensation. Always read what you are signing.",
      },
      {
        type: "heading",
        text: "What you are entitled to immediately",
      },
      {
        type: "list",
        items: [
          "Cash compensation of €250, €400, or €600 based on distance",
          "Choice between a full refund and re-routing to your destination",
          "Meals, refreshments, and accommodation while you wait",
          "Communication, calls or emails to rearrange your plans",
        ],
      },
      {
        type: "heading",
        text: "Evidence that strengthens your claim",
      },
      {
        type: "paragraph",
        text: "Successful denied-boarding claims typically show you held a confirmed reservation, arrived at check-in within the deadline, and were refused boarding through no fault of your own. Ask for written confirmation at the gate if possible.",
      },
      {
        type: "heading",
        text: "Next steps",
      },
      {
        type: "paragraph",
        text: "Do not let a stressful gate experience cost you money you are owed. Upload your boarding pass to Compensall. Our assistant and team assess whether you qualify for cash compensation, with no upfront cost.",
      },
    ],
  },
  {
    slug: "flight-delay",
    category: "Know your rights",
    date: "24 May 2026",
    readTime: "6 min read",
    title: "The 3-hour rule: when a delayed flight becomes a compensation claim",
    excerpt:
      "Not every delay pays out, but if you arrived 3+ hours late at your final destination, you may be entitled to up to €600 under EU261.",
    image: "/assets/blog/flight-delay.jpg",
    imageAlt: "Passengers waiting in an airport terminal during a flight delay",
    body: [
      {
        type: "paragraph",
        text: "Three hours feels long at the gate. Under EU261, three hours at arrival can mean hundreds of euros in your pocket, if the delay was the airline's fault and your flight qualifies.",
      },
      {
        type: "heading",
        text: "Arrival time counts, not departure",
      },
      {
        type: "paragraph",
        text: "Courts measure delay at your final destination, not when the plane left the runway. A flight that departs five hours late but makes up time en route may not qualify. Conversely, a short departure delay that snowballs into a long late arrival often does.",
      },
      {
        type: "heading",
        text: "Compensation amounts by distance",
      },
      {
        type: "list",
        items: [
          "Flights up to 1,500 km → €250",
          "Intra-EU flights over 1,500 km and other routes between 1,500–3,500 km → €400",
          "Flights over 3,500 km → €600",
        ],
      },
      {
        type: "heading",
        text: "Care rights while you wait",
      },
      {
        type: "paragraph",
        text: "Before compensation even comes into question, delays of two hours or more (depending on distance) trigger care obligations: food, drinks, and hotel stays when needed. Ask at the airline desk. Do not assume they will offer automatically.",
      },
      {
        type: "heading",
        text: "When airlines say \"extraordinary circumstances\"",
      },
      {
        type: "paragraph",
        text: "Extreme weather, political instability, and certain security events can exempt carriers. But airlines routinely overuse this defence. A technical fault on an earlier rotation, understaffing, or a preventable operational failure is generally not extraordinary.",
      },
      {
        type: "callout",
        text: "Key takeaway: Screenshot your flight's actual arrival time from the airline app or airport board. It is the evidence that wins or loses claims.",
      },
      {
        type: "heading",
        text: "Check your delay claim quickly",
      },
      {
        type: "paragraph",
        text: "Compensall compares your scheduled and actual arrival times against EC 261/2004. Upload your boarding pass and our assistant flags eligibility in minutes. Our team challenges unfair rejections on a no win, no fee basis.",
      },
    ],
  },
  {
    slug: "missed-connection",
    category: "Know your rights",
    date: "22 May 2026",
    readTime: "7 min read",
    title: "Missed your connecting flight? You may still claim €600",
    excerpt:
      "Multi-leg trips confuse passengers and airlines alike. If both flights were on one booking and you arrived 3+ hours late, compensation may still apply.",
    image: "/assets/blog/missed-connection.jpg",
    imageAlt: "Traveler hurrying through an airport terminal to catch a connecting flight",
    body: [
      {
        type: "paragraph",
        text: "You sprinted through the terminal. You still missed the connection. The question passengers ask most: does EU261 cover this? Often, yes, but only when your flights were booked together on a single reservation.",
      },
      {
        type: "heading",
        text: "Single booking vs. separate tickets",
      },
      {
        type: "paragraph",
        text: "EU261 treats a multi-leg journey on one booking as a single trip to your final destination. A delay on the first leg that causes you to arrive more than three hours late at the end can trigger the same compensation as a direct delay.",
      },
      {
        type: "list",
        items: [
          "Same booking reference on all legs → generally covered",
          "Separate tickets with different airlines → usually not covered for the connection itself",
          "First flight on EU carrier causing missed EU onward flight on same booking → covered",
        ],
      },
      {
        type: "heading",
        text: "What the airline must do after a missed connection",
      },
      {
        type: "paragraph",
        text: "The carrier responsible for the delay must re-route you to your destination as quickly as possible. While you wait, you are entitled to meals, communication, and accommodation if an overnight delay is unavoidable.",
      },
      {
        type: "heading",
        text: "Documentation checklist",
      },
      {
        type: "list",
        items: [
          "Boarding pass for every leg of the journey",
          "Actual arrival time at your final stop (not just the connecting airport)",
          "Screenshots of delay notifications",
          "Any re-routing confirmation from the airline",
        ],
      },
      {
        type: "callout",
        text: "Pro tip: The three-hour clock runs to your final destination, not the airport where you missed the connection.",
      },
      {
        type: "heading",
        text: "Let us map your itinerary",
      },
      {
        type: "paragraph",
        text: "Missed-connection cases live or die on the details. Compensall reads multi-leg boarding passes, maps your route, and flags whether you qualify, backed by our assistant and human support.",
      },
    ],
  },
  {
    slug: "overbooking",
    category: "Know your rights",
    date: "20 May 2026",
    readTime: "5 min read",
    title: "Overbooked flights: what airlines owe when there are no seats left",
    excerpt:
      "Airlines sell more tickets than seats on purpose. If you were bumped without volunteering, you may have a strong compensation claim.",
    image: "/assets/blog/overbooking.jpg",
    imageAlt: "Crowded airport gate area with passengers waiting to board a full flight",
    body: [
      {
        type: "paragraph",
        text: "Overbooking is standard industry practice. Airlines bet that some passengers will not show up. When everyone does, someone gets left behind, and EU law draws a sharp line between passengers who volunteer and those who are bumped against their will.",
      },
      {
        type: "heading",
        text: "Involuntary bumping = strong rights",
      },
      {
        type: "paragraph",
        text: "If you did not agree to take a later flight in exchange for benefits, and the airline refused you boarding because the flight was full, you may be entitled to up to €600 in cash compensation, plus re-routing or a refund and care while you wait.",
      },
      {
        type: "heading",
        text: "Vouchers are not a substitute for legal rights",
      },
      {
        type: "paragraph",
        text: "Airlines often push vouchers, miles, or lounge access at the gate. These voluntary deals are separate from the fixed compensation EC 261/2004 provides. Before signing anything, confirm whether you are accepting a voluntary offer or being denied boarding involuntarily.",
      },
      {
        type: "list",
        items: [
          "Confirmed reservation in your name",
          "Checked in within the airline's deadline",
          "Refused boarding through no fault of your own",
          "Written or digital record of the denial if possible",
        ],
      },
      {
        type: "heading",
        text: "Fight back with evidence",
      },
      {
        type: "paragraph",
        text: "Overbooking claims succeed when the facts are clear. Compensall helps you document what happened and pursue the compensation you are legally owed, no win, no fee.",
      },
    ],
  },
  {
    slug: "airline-strike",
    category: "Know your rights",
    date: "18 May 2026",
    readTime: "6 min read",
    title: "Airline strike: can you still claim compensation for a disrupted flight?",
    excerpt:
      "Strikes are the excuse airlines use most, but not every strike removes your right to compensation. Here is how courts draw the line.",
    image: "/assets/blog/airline-strike.jpg",
    imageAlt: "Parked airplanes on the tarmac during an airline strike disruption",
    body: [
      {
        type: "paragraph",
        text: "Your flight was cancelled. The airline blamed a strike. Case closed? Not necessarily. Under EC 261/2004, who is striking matters more than the word \"strike\" in a rejection letter.",
      },
      {
        type: "heading",
        text: "Airline staff strikes vs. third-party strikes",
      },
      {
        type: "list",
        items: [
          "Strike by the airline's own pilots, cabin crew, or ground staff → compensation may still be due",
          "Strike by air-traffic controllers, airport security, or baggage handlers not employed by the airline → often classified as extraordinary circumstances",
          "Grey areas exist, courts look at who employed the strikers and whether the airline could have prevented the disruption",
        ],
      },
      {
        type: "heading",
        text: "What you still get when compensation does not apply",
      },
      {
        type: "paragraph",
        text: "Even when a third-party strike blocks compensation, you retain rights to care (meals, hotels) and re-routing or a refund. Do not accept silence from the airline as the final answer.",
      },
      {
        type: "callout",
        text: "Airlines frequently blur the distinction in rejection letters. Send us the airline's response, the specific facts of each case matter.",
      },
      {
        type: "heading",
        text: "How Compensall handles strike cases",
      },
      {
        type: "paragraph",
        text: "Strike claims require careful analysis of timing, who was striking, and what the airline knew in advance. Upload your boarding pass and any airline correspondence, our assistant and team review the circumstances and pursue your claim when the law supports it.",
      },
    ],
  },
  {
    slug: "passenger-rights",
    category: "Know your rights",
    date: "16 May 2026",
    readTime: "8 min read",
    title: "EU air passenger rights explained: what airlines owe you when travel goes wrong",
    excerpt:
      "EC 261/2004 is the rulebook airlines hope you never read. Here is a plain-English guide to compensation, refunds, and care.",
    image: "/assets/blog/passenger-rights.jpg",
    imageAlt: "Passenger in an airplane cabin holding travel documents",
    body: [
      {
        type: "paragraph",
        text: "Roughly 85% of passengers never claim compensation they are entitled to, often because the rules feel designed to confuse. EC 261/2004 is simpler than airlines want you to believe. Here is what it actually guarantees.",
      },
      {
        type: "heading",
        text: "Which flights are covered?",
      },
      {
        type: "list",
        items: [
          "Any flight departing from an EU airport, any airline, any nationality",
          "Flights arriving in the EU on an EU-based carrier",
          "Budget fares, reward tickets, and children's tickets all qualify",
        ],
      },
      {
        type: "heading",
        text: "Three pillars of passenger protection",
      },
      {
        type: "paragraph",
        text: "When a qualifying disruption occurs, you may have rights in three categories, and they stack:",
      },
      {
        type: "list",
        items: [
          "Fixed financial compensation (€250 / €400 / €600) for delays, cancellations, and denied boarding",
          "Choice of a full refund or re-routing to your destination",
          "Care during the wait, meals, drinks, hotel, and transport between airport and hotel",
        ],
      },
      {
        type: "heading",
        text: "How long do you have to claim?",
      },
      {
        type: "paragraph",
        text: "In most EU countries you have up to three years from the flight date. In the UK, generally six years (five in Scotland). The sooner you submit, the easier it is to gather evidence.",
      },
      {
        type: "callout",
        text: "You do not need to be European or flying within Europe on holiday, a disrupted departure from Lisbon, Madrid, or Paris is enough.",
      },
      {
        type: "heading",
        text: "Why most people never claim, and how we fix that",
      },
      {
        type: "paragraph",
        text: "Airlines delay responses, reject valid claims, and hide behind legal jargon. Compensall closes the gap: upload your boarding pass, confirm your details, and let our assistant and human team handle the rest, on a no win, no fee basis.",
      },
    ],
  },
  {
    slug: "passengers-with-disabilities",
    category: "Know your rights",
    date: "14 May 2026",
    readTime: "6 min read",
    title: "Flying with a disability: assistance, accessibility, and compensation rights",
    excerpt:
      "EU law guarantees free assistance at every stage of your journey, and disability rights work alongside standard delay and cancellation claims.",
    image: "/assets/blog/passengers-with-disabilities.jpg",
    imageAlt: "Airport staff assisting a passenger in a wheelchair at boarding",
    body: [
      {
        type: "paragraph",
        text: "Air travel with a disability or reduced mobility comes with dedicated protections under EU law, separate from, but alongside, EC 261/2004 compensation rules. Knowing both sets of rights can make the difference between a stressful trip and a dignified one.",
      },
      {
        type: "heading",
        text: "Free assistance under Regulation 1107/2006",
      },
      {
        type: "paragraph",
        text: "Airports and airlines must provide free help throughout your journey, from check-in through boarding, connections, and arrival. This includes wheelchair support, guided boarding, and help moving between gates.",
      },
      {
        type: "list",
        items: [
          "Notify the airline at least 48 hours before departure when possible",
          "Assistance must still be provided for last-minute requests",
          "Help applies at departure, connection, and arrival airports within the EU",
        ],
      },
      {
        type: "heading",
        text: "Damaged or lost mobility equipment",
      },
      {
        type: "paragraph",
        text: "If your wheelchair or mobility device is damaged or lost in transit, you may be entitled to repair or replacement costs. Report damage immediately at the airport and keep all documentation.",
      },
      {
        type: "heading",
        text: "When assistance failures cause a missed flight",
      },
      {
        type: "paragraph",
        text: "If a lack of promised assistance caused you to miss a flight or connection, the airline may be liable for re-routing and related costs, in addition to any standard EC 261/2004 compensation if the overall journey was disrupted.",
      },
      {
        type: "callout",
        text: "Disability rights and delay compensation can overlap. A cancelled flight that also left you without promised wheelchair support may trigger claims under both regulations.",
      },
      {
        type: "heading",
        text: "Get a full review of your case",
      },
      {
        type: "paragraph",
        text: "Every situation is different. Share your boarding pass with Compensall and our team will review the full picture, assistance failures, delays, and cancellations together.",
      },
    ],
  },
];

export const blogPostsBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPost>;
