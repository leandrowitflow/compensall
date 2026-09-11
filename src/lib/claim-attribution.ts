export type UserDevice = "mobile" | "tablet" | "desktop" | "other";

export type ClaimAttribution = {
  source: string;
  medium: string;
  campaign: string;
};

export const DEFAULT_CLAIM_ATTRIBUTION: ClaimAttribution = {
  source: "direct",
  medium: "none",
  campaign: "",
};

const KNOWN_REFERRERS: Array<{ match: RegExp; source: string; medium: string }> = [
  { match: /(^|\.)google\./i, source: "google", medium: "organic" },
  { match: /(^|\.)bing\./i, source: "bing", medium: "organic" },
  { match: /(^|\.)yahoo\./i, source: "yahoo", medium: "organic" },
  { match: /(^|\.)duckduckgo\./i, source: "duckduckgo", medium: "organic" },
  { match: /(^|\.)facebook\.|fb\.com|l\.facebook\./i, source: "facebook", medium: "social" },
  { match: /(^|\.)instagram\.|l\.instagram\./i, source: "instagram", medium: "social" },
  { match: /(^|\.)tiktok\./i, source: "tiktok", medium: "social" },
  { match: /(^|\.)linkedin\./i, source: "linkedin", medium: "social" },
  { match: /(^|\.)t\.co$|(^|\.)twitter\.|(^|\.)x\.com$/i, source: "twitter", medium: "social" },
  { match: /(^|\.)youtube\./i, source: "youtube", medium: "social" },
];

function cleanParam(value: string | null | undefined): string {
  return value?.trim().slice(0, 120) ?? "";
}

function hostnameFromUrl(value: string | null | undefined): string {
  if (!value) return "";
  try {
    return new URL(value).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

export function userDeviceFromUserAgent(userAgent: string | null | undefined): UserDevice {
  if (!userAgent?.trim()) {
    return "other";
  }

  const value = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk|kindle/.test(value) || (/android/.test(value) && !/mobile/.test(value))) {
    return "tablet";
  }
  if (/mobi|iphone|ipod|android.+mobile|windows phone|opera mini/.test(value)) {
    return "mobile";
  }
  if (/mozilla|chrome|safari|firefox|edg|opr\//.test(value)) {
    return "desktop";
  }
  return "other";
}

export function attributionFromTrackingParams(input: {
  searchParams?: URLSearchParams | null;
  referrer?: string | null;
  pageHost?: string | null;
}): ClaimAttribution {
  const params = input.searchParams;
  const utmSource = cleanParam(params?.get("utm_source"));
  const utmMedium = cleanParam(params?.get("utm_medium"));
  const utmCampaign = cleanParam(params?.get("utm_campaign"));

  if (utmSource) {
    return {
      source: utmSource,
      medium: utmMedium || "campaign",
      campaign: utmCampaign,
    };
  }

  if (params?.get("gclid") || params?.get("gbraid") || params?.get("wbraid") || params?.get("gad_source")) {
    return { source: "google", medium: "cpc", campaign: utmCampaign };
  }
  if (params?.get("fbclid")) {
    return { source: "facebook", medium: "paid", campaign: utmCampaign };
  }
  if (params?.get("msclkid")) {
    return { source: "bing", medium: "cpc", campaign: utmCampaign };
  }
  if (params?.get("ttclid")) {
    return { source: "tiktok", medium: "paid", campaign: utmCampaign };
  }

  const referrerHost = hostnameFromUrl(input.referrer);
  const pageHost = input.pageHost?.replace(/^www\./i, "").toLowerCase() ?? "";
  if (referrerHost && referrerHost !== pageHost) {
    const known = KNOWN_REFERRERS.find((entry) => entry.match.test(referrerHost));
    if (known) {
      return { source: known.source, medium: known.medium, campaign: utmCampaign };
    }
    return { source: referrerHost, medium: "referral", campaign: utmCampaign };
  }

  return { ...DEFAULT_CLAIM_ATTRIBUTION, campaign: utmCampaign };
}

export function parseClaimAttribution(raw: unknown): ClaimAttribution {
  if (!raw || typeof raw !== "object") {
    return { ...DEFAULT_CLAIM_ATTRIBUTION };
  }

  const record = raw as Record<string, unknown>;
  const source = typeof record.source === "string" ? cleanParam(record.source) : "";
  const medium = typeof record.medium === "string" ? cleanParam(record.medium) : "";
  const campaign = typeof record.campaign === "string" ? cleanParam(record.campaign) : "";

  return {
    source: source || DEFAULT_CLAIM_ATTRIBUTION.source,
    medium: medium || DEFAULT_CLAIM_ATTRIBUTION.medium,
    campaign,
  };
}
