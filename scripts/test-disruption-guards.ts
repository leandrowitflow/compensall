import {
  acceptDisruptionDraft,
  disruptionPublishGate,
  isNothingNew,
  type DisruptionDraftInput,
} from "../src/lib/disruptions/guards";

const now = new Date("2026-10-08T06:15:00.000Z");
const body = `${"Oslo Gardermoen remains closed after an air traffic control restriction in Norway. Airlines have cancelled departures and arrivals while the restriction continues. ".repeat(8)}

## Your rights

Invented compensation of 600 euro.

## Sources

- [Unverified](https://example.com/nope)`;

function draft(overrides: Partial<DisruptionDraftInput> = {}): DisruptionDraftInput {
  return {
    publish: true,
    confidence: "high",
    title: "Oslo Gardermoen closed by Norway ATC action",
    excerpt:
      "Oslo Gardermoen is closed after an air traffic control restriction in Norway, with widespread cancellations.",
    place: "Oslo Gardermoen",
    reason: "ATC restriction",
    eventDate: "2026-10-07",
    contentMd: body,
    sources: [
      { title: "BBC News", url: "https://www.bbc.com/news/oslo-strike" },
      { title: "Reuters", url: "https://www.reuters.com/world/europe/oslo-strike" },
    ],
    stats: [
      {
        label: "Cancelled flights",
        value: "120",
        sourceUrl: "https://www.reuters.com/world/europe/oslo-strike/",
      },
      { label: "Guess", value: "999", sourceUrl: "https://example.com/not-a-source" },
    ],
    ...overrides,
  };
}

let failed = 0;

function assert(name: string, condition: boolean): void {
  if (!condition) {
    failed += 1;
    console.error(`FAIL ${name}`);
    return;
  }
  console.log(`ok ${name}`);
}

const accepted = acceptDisruptionDraft(draft(), [], new Set(), now);
assert("publishes a sourced story", accepted.ok);
if (accepted.ok) {
  assert("slug is stable", accepted.article.slug === "disruption-oslo-gardermoen-atc-restriction-20261007");
  assert("keeps the sourced stat", accepted.article.contentMd.includes("120"));
  assert("drops the unsourced stat", !accepted.article.contentMd.includes("999"));
  assert("strips the model rights section", !accepted.article.contentMd.includes("Invented compensation"));
  assert("adds the fixed rights section", accepted.article.contentMd.includes("## What passengers can expect"));
  assert("does not add the fee slogan", !accepted.article.contentMd.toLowerCase().includes("no win, no fee"));
  assert("lists both sources", accepted.article.contentMd.includes("https://bbc.com/news/oslo-strike"));
}

assert(
  "rejects a single website",
  !acceptDisruptionDraft(
    draft({
      sources: [
        { title: "BBC", url: "https://www.bbc.com/a" },
        { title: "BBC sport", url: "https://bbc.com/b" },
      ],
    }),
    [],
    new Set(),
    now,
  ).ok,
);

assert(
  "rejects a search-page source",
  !acceptDisruptionDraft(
    draft({
      sources: [
        { title: "BBC", url: "https://www.bbc.com/a" },
        { title: "Google", url: "https://news.google.com/search?q=oslo" },
      ],
    }),
    [],
    new Set(),
    now,
  ).ok,
);

assert(
  "rejects an old event",
  !acceptDisruptionDraft(draft({ eventDate: "2026-10-01" }), [], new Set(), now).ok,
);
assert(
  "rejects low confidence",
  !acceptDisruptionDraft(draft({ confidence: "low" }), [], new Set(), now).ok,
);
assert("rejects a thin day", !acceptDisruptionDraft(draft({ publish: false }), [], new Set(), now).ok);

const duplicate = acceptDisruptionDraft(
  draft(),
  [{ slug: "disruption-older", publishedAt: "2026-09-01T00:00:00.000Z", title: "Oslo Gardermoen closed by Norway ATC action" }],
  new Set(),
  now,
);
assert("rejects a repeated title", !duplicate.ok);

const taken = acceptDisruptionDraft(draft(), [], new Set(["disruption-oslo-gardermoen-atc-restriction-20261007"]), now);
assert("rejects an existing slug", !taken.ok);

assert(
  "blocks a second post inside 20 hours",
  !disruptionPublishGate(
    [{ slug: "disruption-a", publishedAt: "2026-10-07T20:00:00.000Z", title: "A" }],
    now,
  ).ok,
);
assert(
  "allows a post after 20 hours",
  disruptionPublishGate(
    [{ slug: "disruption-a", publishedAt: "2026-10-07T08:00:00.000Z", title: "A" }],
    now,
  ).ok,
);
assert(
  "blocks a fourth post in seven days",
  !disruptionPublishGate(
    [
      { slug: "disruption-a", publishedAt: "2026-10-05T00:00:00.000Z", title: "A" },
      { slug: "disruption-b", publishedAt: "2026-10-04T00:00:00.000Z", title: "B" },
      { slug: "disruption-c", publishedAt: "2026-10-03T00:00:00.000Z", title: "C" },
    ],
    now,
  ).ok,
);

assert("treats a short note as nothing new", isNothingNew("NOTHING_NEW"));
assert("treats a long note as a story", !isNothingNew(`${"A sourced disruption. ".repeat(20)}\nNOTHING_NEW`));

if (failed > 0) {
  console.error(`${failed} failed`);
  process.exit(1);
}

console.log("disruption guards passed");
