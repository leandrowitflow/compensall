import {
  attributionFromTrackingParams,
  parseClaimAttribution,
  type ClaimAttribution,
} from "@/lib/claim-attribution";

const STORAGE_KEY = "compensall.attribution.v1";
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

type StoredAttribution = {
  capturedAt: number;
  attribution: ClaimAttribution;
};

function hasCampaignParams(search: string): boolean {
  const params = new URLSearchParams(search);
  return Boolean(
    params.get("utm_source") ||
      params.get("utm_medium") ||
      params.get("utm_campaign") ||
      params.get("gclid") ||
      params.get("gbraid") ||
      params.get("wbraid") ||
      params.get("gad_source") ||
      params.get("fbclid") ||
      params.get("msclkid") ||
      params.get("ttclid"),
  );
}

function parseStored(raw: string | null): ClaimAttribution | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && "attribution" in parsed && "capturedAt" in parsed) {
      const record = parsed as StoredAttribution;
      if (typeof record.capturedAt !== "number" || Date.now() - record.capturedAt > ATTRIBUTION_TTL_MS) {
        return null;
      }
      return parseClaimAttribution(record.attribution);
    }
    return parseClaimAttribution(parsed);
  } catch {
    return null;
  }
}

function readFromStorage(storage: Storage): ClaimAttribution | null {
  try {
    return parseStored(storage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function persistAttribution(attribution: ClaimAttribution): void {
  const payload = JSON.stringify({
    capturedAt: Date.now(),
    attribution,
  } satisfies StoredAttribution);

  try {
    window.localStorage.setItem(STORAGE_KEY, payload);
  } catch {
    // Private mode can block localStorage.
  }
  try {
    window.sessionStorage.setItem(STORAGE_KEY, payload);
  } catch {
    // Private mode can block sessionStorage.
  }
}

function readStoredAttribution(): ClaimAttribution | null {
  const local = readFromStorage(window.localStorage);
  if (local) {
    return local;
  }

  const session = readFromStorage(window.sessionStorage);
  if (session) {
    persistAttribution(session);
    return session;
  }

  return null;
}

export function captureClaimAttribution(): ClaimAttribution {
  const current = attributionFromTrackingParams({
    searchParams: new URLSearchParams(window.location.search),
    referrer: document.referrer,
    pageHost: window.location.hostname,
  });

  if (hasCampaignParams(window.location.search)) {
    persistAttribution(current);
    return current;
  }

  const stored = readStoredAttribution();
  if (stored) {
    return stored;
  }

  persistAttribution(current);
  return current;
}

export function readClaimAttribution(): ClaimAttribution {
  return readStoredAttribution() ?? captureClaimAttribution();
}
