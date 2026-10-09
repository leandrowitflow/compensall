export const DISRUPTION_SLUG_PREFIX = "disruption-";

const MIN_GAP_MS = 20 * 60 * 60 * 1000;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_POSTS_PER_WEEK = 3;
const TITLE_OVERLAP = 0.55;
const MAX_TITLE = 110;
const MAX_EXCERPT = 240;
const MAX_CONTENT = 6000;
const MIN_BODY = 400;

const STOPWORDS = new Set([
  "with",
  "from",
  "that",
  "this",
  "have",
  "been",
  "their",
  "into",
  "over",
  "under",
  "about",
  "after",
  "before",
  "during",
  "today",
  "yesterday",
  "major",
  "widespread",
  "closes",
  "closed",
  "closing",
  "reopens",
  "reopen",
  "flight",
  "flights",
  "airport",
  "airports",
  "airline",
  "airlines",
  "strike",
  "strikes",
  "disruption",
  "disruptions",
  "passenger",
  "passengers",
  "cancelled",
  "canceled",
  "cancellation",
  "cancellations",
  "europe",
  "european",
  "united",
  "kingdom",
  "travel",
  "travellers",
  "travelers",
]);

export type DisruptionDraftInput = {
  publish: boolean;
  confidence: "high" | "medium" | "low";
  title: string;
  excerpt: string;
  place: string;
  reason: string;
  eventDate: string;
  contentMd: string;
  sources: { title: string; url: string }[];
  stats: { label: string; value: string; sourceUrl: string }[];
};

export type ExistingDisruption = {
  slug: string;
  publishedAt: string | null;
  title: string;
};

export type AcceptedDisruption = {
  slug: string;
  title: string;
  excerpt: string;
  contentMd: string;
};

export type DisruptionDecision =
  | { ok: false; reason: string }
  | { ok: true; article: AcceptedDisruption };

export function isDisruptionSlug(slug: string): boolean {
  return slug.startsWith(DISRUPTION_SLUG_PREFIX);
}

export function isDisruptionDigestFlagEnabled(): boolean {
  const flag = process.env.DISRUPTION_DIGEST_ENABLED ?? "true";
  return flag !== "false" && flag !== "0";
}

export function isNothingNew(research: string): boolean {
  const trimmed = research.trim();
  if (trimmed.length < 80) return true;
  return /^NOTHING_NEW\b/m.test(trimmed) && trimmed.length < 200;
}

export function disruptionPublishGate(
  posts: ExistingDisruption[],
  now: Date,
): { ok: true } | { ok: false; reason: string } {
  const publishedAt = posts
    .map((post) => Date.parse(post.publishedAt ?? ""))
    .filter((time) => Number.isFinite(time));

  const newest = publishedAt.length > 0 ? Math.max(...publishedAt) : null;
  if (newest !== null && now.getTime() - newest < MIN_GAP_MS) {
    return { ok: false, reason: "recent_post" };
  }

  const weekCount = publishedAt.filter((time) => {
    const age = now.getTime() - time;
    return age >= 0 && age < WEEK_MS;
  }).length;
  if (weekCount >= MAX_POSTS_PER_WEEK) {
    return { ok: false, reason: "weekly_cap" };
  }

  return { ok: true };
}

export function acceptDisruptionDraft(
  draft: DisruptionDraftInput,
  existing: ExistingDisruption[],
  takenSlugs: ReadonlySet<string>,
  now: Date,
): DisruptionDecision {
  if (!draft.publish) {
    return { ok: false, reason: "not_new" };
  }
  if (draft.confidence === "low") {
    return { ok: false, reason: "low_confidence" };
  }

  const eventDate = parseUtcDay(draft.eventDate);
  if (!eventDate || !isRecentEventDate(eventDate, now)) {
    return { ok: false, reason: "stale_or_invalid_date" };
  }

  const sources = acceptedSources(draft.sources);
  if (sources.length < 2) {
    return { ok: false, reason: "insufficient_sources" };
  }
  const hosts = new Set(sources.map((source) => source.host));
  if (hosts.size < 2) {
    return { ok: false, reason: "insufficient_sources" };
  }

  const place = slugPart(draft.place);
  const reason = slugPart(draft.reason);
  if (!place || !reason) {
    return { ok: false, reason: "missing_slug_parts" };
  }

  const slug = `${DISRUPTION_SLUG_PREFIX}${place}-${reason}-${eventDate.replaceAll("-", "")}`;
  if (takenSlugs.has(slug) || existing.some((post) => post.slug === slug)) {
    return { ok: false, reason: "duplicate_slug" };
  }

  const title = clampSentence(draft.title, MAX_TITLE);
  if (title.length < 12) {
    return { ok: false, reason: "thin_title" };
  }
  if (titlesOverlap(title, existing)) {
    return { ok: false, reason: "duplicate_story" };
  }

  let narrative = clampMarkdown(stripModelBoilerplate(draft.contentMd), 3600);
  if (narrative.length < MIN_BODY) {
    return { ok: false, reason: "thin_content" };
  }

  const excerptSource = draft.excerpt.trim().length >= 40 ? draft.excerpt : narrative;
  const excerpt = clampSentence(excerptSource.replace(/[#*[\]]/g, " "), MAX_EXCERPT);
  const sourced = sourcedStats(draft.stats, sources);
  let contentMd = assembleArticle(narrative, sourced, sources);
  if (contentMd.length > MAX_CONTENT) {
    narrative = clampMarkdown(narrative, Math.max(MIN_BODY, narrative.length - (contentMd.length - MAX_CONTENT) - 40));
    contentMd = assembleArticle(narrative, sourced, sources);
  }
  if (narrative.length < MIN_BODY || contentMd.length > MAX_CONTENT) {
    return { ok: false, reason: "content_too_long" };
  }

  return {
    ok: true,
    article: { slug, title, excerpt, contentMd },
  };
}

function assembleArticle(
  narrative: string,
  stats: { label: string; value: string; sourceTitle: string; sourceUrl: string }[],
  sources: { title: string; url: string }[],
): string {
  const parts = [narrative];

  if (stats.length > 0) {
    parts.push(
      ["## What was reported", "", ...stats.map((stat) => `- **${stat.label}:** ${stat.value} ([${markdownLabel(stat.sourceTitle)}](${stat.sourceUrl}))`)].join(
        "\n",
      ),
    );
  }

  parts.push(
    ["## Sources", "", ...sources.map((source) => `- [${markdownLabel(source.title)}](${source.url})`)].join("\n"),
  );
  parts.push(PASSENGER_RIGHTS_SECTION);
  return parts.join("\n\n").trim();
}

const PASSENGER_RIGHTS_SECTION = `## What passengers can expect

This is a summary of public reports, not a decision on an individual booking.

- The airline should offer a reroute or a refund when it cancels the flight or the disruption makes the journey unusable.
- Care still applies while you are waiting: meals, refreshments, a means to communicate, and a hotel plus transfers if you need to stay overnight.
- Fixed compensation under EC 261/2004 or UK261 depends on the cause. Extraordinary circumstances, such as air traffic control restrictions or severe weather, usually mean the airline does not owe that fixed compensation. A strike by the airline's own staff is treated differently from an outside restriction.
- Check the latest status with the airline before you travel.

[Check this flight](/#claim)

[Passenger rights](/know-your-rights)`;

function sourcedStats(
  stats: DisruptionDraftInput["stats"],
  sources: { title: string; url: string; normalized: string }[],
): { label: string; value: string; sourceTitle: string; sourceUrl: string }[] {
  const byUrl = new Map(sources.map((source) => [source.normalized, source]));
  const accepted: { label: string; value: string; sourceTitle: string; sourceUrl: string }[] = [];

  for (const stat of stats) {
    const normalized = normalizeHttpsUrl(stat.sourceUrl);
    const source = normalized ? byUrl.get(normalized) : undefined;
    const label = clampSentence(stat.label, 60);
    const value = clampSentence(stat.value, 48);
    if (!source || !label || !value) continue;
    accepted.push({
      label,
      value,
      sourceTitle: source.title,
      sourceUrl: source.url,
    });
    if (accepted.length === 4) break;
  }

  return accepted;
}

function acceptedSources(
  sources: DisruptionDraftInput["sources"],
): { title: string; url: string; host: string; normalized: string }[] {
  const seen = new Set<string>();
  const accepted: { title: string; url: string; host: string; normalized: string }[] = [];

  for (const source of sources) {
    const parsed = parseSourceUrl(source.url);
    if (!parsed || seen.has(parsed.normalized)) continue;
    seen.add(parsed.normalized);
    const title = source.title.replace(/\s+/g, " ").trim() || parsed.host;
    accepted.push({
      title: markdownLabel(title).slice(0, 120),
      url: parsed.url,
      host: parsed.host,
      normalized: parsed.normalized,
    });
    if (accepted.length === 6) break;
  }

  return accepted;
}

function parseSourceUrl(value: string): { url: string; host: string; normalized: string } | null {
  const normalized = normalizeHttpsUrl(value);
  if (!normalized) return null;
  const host = new URL(normalized).hostname;
  if (isBlockedHost(host)) return null;
  return { url: normalized, host, normalized };
}

function normalizeHttpsUrl(value: string): string | null {
  try {
    const parsed = new URL(value.trim());
    if (parsed.protocol !== "https:") return null;
    parsed.hash = "";
    parsed.hostname = parsed.hostname.replace(/^www\./, "").toLowerCase();
    if (!parsed.hostname.includes(".")) return null;
    const path = parsed.pathname.replace(/\/$/, "");
    return `https://${parsed.hostname}${path}${parsed.search}`;
  } catch {
    return null;
  }
}

function isBlockedHost(host: string): boolean {
  return (
    host === "google.com" ||
    host.endsWith(".google.com") ||
    host === "google.co.uk" ||
    host.endsWith(".google.co.uk") ||
    host === "gstatic.com" ||
    host.endsWith(".gstatic.com") ||
    host.endsWith("googleusercontent.com")
  );
}

function stripModelBoilerplate(content: string): string {
  let next = content.replace(/\r\n/g, "\n").trim();
  const rights = next.search(/^#{1,3}\s+(your rights|passenger rights|what passengers can expect)\b/im);
  if (rights >= 0) next = next.slice(0, rights).trim();
  const sources = next.search(/^#{1,3}\s+sources\b/im);
  if (sources >= 0) next = next.slice(0, sources).trim();
  return next;
}

function titlesOverlap(title: string, existing: ExistingDisruption[]): boolean {
  const nextTokens = titleTokens(title);
  return existing.some((post) => {
    const previous = titleTokens(post.title);
    if (nextTokens.size === 0 || previous.size === 0) return false;
    let shared = 0;
    for (const token of nextTokens) {
      if (previous.has(token)) shared += 1;
    }
    return shared / Math.min(nextTokens.size, previous.size) >= TITLE_OVERLAP;
  });
}

function titleTokens(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length > 3 && !STOPWORDS.has(token)),
  );
}

function slugPart(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

function parseUtcDay(value: string): string | null {
  const iso = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const date = new Date(`${iso}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10) === iso ? iso : null;
}

function isRecentEventDate(eventDate: string, now: Date): boolean {
  const today = now.toISOString().slice(0, 10);
  return eventDate >= shiftUtcDay(today, -4) && eventDate <= shiftUtcDay(today, 1);
}

function shiftUtcDay(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function clampSentence(value: string, max: number): string {
  const trimmed = value.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  const sliced = trimmed.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut = lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced;
  return `${cut.trimEnd()}…`;
}

function clampMarkdown(value: string, max: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= max) return trimmed;
  const sliced = trimmed.slice(0, max);
  const lastBreak = sliced.lastIndexOf("\n\n");
  return (lastBreak > 200 ? sliced.slice(0, lastBreak) : sliced).trim();
}

function markdownLabel(value: string): string {
  const cleaned = value.replace(/[[\]]/g, "").replace(/\s+/g, " ").trim();
  return cleaned || "Source";
}
