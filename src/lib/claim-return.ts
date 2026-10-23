import { parseAppLocale } from "@/i18n/routing";
import {
  normalizeFlightData,
  type ClaimEntryMode,
  type ClaimFlightData,
  type ClaimPassenger,
  type FlightStatus,
} from "@/lib/claim-types";

/** Query that reopens the in-progress claim on the signature step. */
export const CLAIM_CONTINUE_QUERY = "claimContinue";

/** Hides the empty step-1 form until the saved claim is put back. */
export const CLAIM_CONTINUE_PENDING_CLASS = "claim-continue";

const STORAGE_KEY = "compensall.claim.return";
const RELOAD_KEY = "compensall.claim.returnReload";
const MAX_AGE_MS = 2 * 60 * 60 * 1000;
const HANDOFF_MS = 2000;
const MAX_SIGNATURE_CHARS = 400_000;

const FLIGHT_STATUSES: readonly FlightStatus[] = ["Delayed", "Cancelled", "Denied boarding", "Unknown"];

export type ClaimReturnSignature = {
  documentId: string;
  passengerIndex: number;
  passengerName: string;
  signatureDataUrl: string;
  signedAt: string;
  token: string;
  signatureHash: string;
};

export type ClaimReturnSnapshot = {
  v: 1;
  savedAt: number;
  entryMode: ClaimEntryMode;
  flight: ClaimFlightData;
  formSessionId: string;
  odooLeadId: number | null;
  signedName: string;
  contactEmail: string;
  contactPhone: string;
  additionalPassengers: ClaimPassenger[];
  signingPassengerIndex: number;
  signingDate: string;
  signaturePreview: string | null;
  documentSignatures: ClaimReturnSignature[];
};

export type ClaimReturnInput = Omit<ClaimReturnSnapshot, "v" | "savedAt">;

let handoff: { snapshot: ClaimReturnSnapshot; at: number } | null = null;

function clip(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}

function isFlightStatus(value: unknown): value is FlightStatus {
  return typeof value === "string" && (FLIGHT_STATUSES as readonly string[]).includes(value);
}

function usableSignature(value: unknown): string | null {
  if (typeof value !== "string" || !value.startsWith("data:image/")) return null;
  if (value.length > MAX_SIGNATURE_CHARS) return null;
  const comma = value.indexOf(",");
  if (comma === -1) return null;
  const bytes = Math.floor((value.slice(comma + 1).length * 3) / 4);
  return bytes >= 800 ? value : null;
}

function sanitizePassengers(value: unknown): ClaimPassenger[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 10).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const passenger = item as Partial<ClaimPassenger>;
    const next = {
      firstName: clip(passenger.firstName, 80),
      lastName: clip(passenger.lastName, 80),
      email: clip(passenger.email, 120),
      phone: clip(passenger.phone, 32),
    };
    return next.firstName || next.lastName || next.email || next.phone ? [next] : [];
  });
}

function sanitizeSignatures(value: unknown): ClaimReturnSignature[] {
  if (!Array.isArray(value)) return [];
  const signatures: ClaimReturnSignature[] = [];
  for (const item of value.slice(0, 10)) {
    if (!item || typeof item !== "object") continue;
    const signature = item as Partial<ClaimReturnSignature>;
    const documentId = clip(signature.documentId, 80);
    const passengerName = clip(signature.passengerName, 160);
    const signedAt = clip(signature.signedAt, 40);
    const token = clip(signature.token, 200);
    const signatureHash = clip(signature.signatureHash, 200);
    const signatureDataUrl = usableSignature(signature.signatureDataUrl);
    const passengerIndex = signature.passengerIndex;
    if (!documentId || !token || !signatureHash || !signatureDataUrl) continue;
    if (typeof passengerIndex !== "number" || !Number.isInteger(passengerIndex) || passengerIndex < 0 || passengerIndex > 9) {
      continue;
    }
    signatures.push({
      documentId,
      passengerIndex,
      passengerName,
      signatureDataUrl,
      signedAt,
      token,
      signatureHash,
    });
  }
  return signatures;
}

function sanitizeStored(value: unknown): ClaimReturnSnapshot | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<ClaimReturnSnapshot>;
  if (raw.v !== 1 || typeof raw.savedAt !== "number" || !Number.isFinite(raw.savedAt)) return null;
  const age = Date.now() - raw.savedAt;
  if (age > MAX_AGE_MS || raw.savedAt - Date.now() > 5 * 60 * 1000) return null;
  if (raw.entryMode !== "upload" && raw.entryMode !== "manual") return null;
  if (!raw.flight || typeof raw.flight !== "object" || Array.isArray(raw.flight)) return null;

  let flight: ClaimFlightData;
  try {
    flight = normalizeFlightData(raw.flight);
  } catch {
    return null;
  }
  if (!isFlightStatus(flight.status)) flight.status = "Unknown";

  const signedName = clip(raw.signedName, 160);
  const contactEmail = clip(raw.contactEmail, 120);
  const contactPhone = clip(raw.contactPhone, 32);
  if (!flight.flight && !flight.passenger && !signedName && !contactEmail) return null;

  const signingDate = /^\d{4}-\d{2}-\d{2}$/.test(clip(raw.signingDate, 10)) ? clip(raw.signingDate, 10) : "";
  const signingPassengerIndex =
    typeof raw.signingPassengerIndex === "number" &&
    Number.isInteger(raw.signingPassengerIndex) &&
    raw.signingPassengerIndex >= 0 &&
    raw.signingPassengerIndex <= 9
      ? raw.signingPassengerIndex
      : 0;
  const odooLeadId =
    typeof raw.odooLeadId === "number" && Number.isInteger(raw.odooLeadId) && raw.odooLeadId > 0
      ? raw.odooLeadId
      : null;

  return {
    v: 1,
    savedAt: raw.savedAt,
    entryMode: raw.entryMode,
    flight,
    formSessionId: clip(raw.formSessionId, 80),
    odooLeadId,
    signedName,
    contactEmail,
    contactPhone,
    additionalPassengers: sanitizePassengers(raw.additionalPassengers),
    signingPassengerIndex,
    signingDate,
    signaturePreview: usableSignature(raw.signaturePreview),
    documentSignatures: sanitizeSignatures(raw.documentSignatures),
  };
}

function readStored(): ClaimReturnSnapshot | null {
  if (typeof window === "undefined") return null;
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const snapshot = sanitizeStored(JSON.parse(raw) as unknown);
    if (!snapshot) removeStored();
    return snapshot;
  } catch {
    removeStored();
    return null;
  }
}

function removeStored(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Private mode or blocked storage.
  }
}

function writeStored(snapshot: ClaimReturnSnapshot): void {
  const save = (value: ClaimReturnSnapshot) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  try {
    save(snapshot);
  } catch {
    try {
      save({ ...snapshot, signaturePreview: null, documentSignatures: [] });
    } catch {
      // The tab can still close back onto the live form.
    }
  }
}

export function claimContinueHref(locale: string): string {
  return `/${parseAppLocale(locale)}?${CLAIM_CONTINUE_QUERY}=1#claim`;
}

export function claimDocumentUrl(locale: string, href: string): string {
  const path = href.startsWith("/") ? href : `/${href}`;
  return `/${parseAppLocale(locale)}${path}`;
}

/** Remember the claim before the full power of attorney opens in another tab. */
export function saveClaimReturn(input: ClaimReturnInput): void {
  if (typeof window === "undefined") return;
  const snapshot = sanitizeStored({ ...input, v: 1, savedAt: Date.now() });
  if (!snapshot) return;
  handoff = null;
  writeStored(snapshot);
}

export function peekClaimReturn(): ClaimReturnSnapshot | null {
  return readStored();
}

export function markClaimReloadRestore(): void {
  try {
    sessionStorage.setItem(RELOAD_KEY, "1");
  } catch {
    // Ignore.
  }
}

export function claimReloadRestorePending(): boolean {
  try {
    return sessionStorage.getItem(RELOAD_KEY) === "1";
  } catch {
    return false;
  }
}

export function clearClaimReloadFlag(): void {
  try {
    sessionStorage.removeItem(RELOAD_KEY);
  } catch {
    // Ignore.
  }
}

export function clearClaimReturn(): void {
  handoff = null;
  removeStored();
  clearClaimReloadFlag();
}

export function releaseClaimContinueHandoff(): void {
  handoff = null;
}

function navigationNeedsSavedClaim(): boolean {
  const entry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return entry?.type === "reload" || entry?.type === "back_forward";
}

export function shouldRestoreClaimContinue(): boolean {
  if (typeof window === "undefined") return false;
  const requested = new URLSearchParams(window.location.search).get(CLAIM_CONTINUE_QUERY) === "1";
  if (requested) return true;
  return claimReloadRestorePending() && navigationNeedsSavedClaim();
}

/**
 * Read the saved claim once. A second call within the same tick (React strict mode)
 * returns the same snapshot after storage has already been cleared.
 */
export function takeClaimContinue(): ClaimReturnSnapshot | null {
  if (typeof window === "undefined") return null;
  const requested = shouldRestoreClaimContinue();
  if (!requested) {
    if (handoff && Date.now() - handoff.at < HANDOFF_MS) return handoff.snapshot;
    return null;
  }
  if (handoff && Date.now() - handoff.at < HANDOFF_MS) return handoff.snapshot;
  const snapshot = readStored();
  removeStored();
  clearClaimReloadFlag();
  if (!snapshot) {
    handoff = null;
    return null;
  }
  handoff = { snapshot, at: Date.now() };
  return snapshot;
}

export function stripClaimContinueQuery(): void {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(CLAIM_CONTINUE_QUERY)) return;
  url.searchParams.delete(CLAIM_CONTINUE_QUERY);
  const search = url.searchParams.toString();
  const hash = url.hash || "#claim";
  window.history.replaceState(window.history.state, "", `${url.pathname}${search ? `?${search}` : ""}${hash}`);
}

function sameOriginOpener(): Window | null {
  try {
    if (!window.opener || window.opener.closed) return null;
    if (window.opener.location.origin !== window.location.origin) return null;
    return window.opener as Window;
  } catch {
    return null;
  }
}

/** Leave the full document and reopen the claim that was being signed. */
export function returnFromClaimDocument(locale: string): boolean {
  const sameTab = claimReloadRestorePending() && window.history.length > 1;
  const opener = sameOriginOpener();
  const snapshot = peekClaimReturn();
  if (!sameTab && !opener && !snapshot) return false;

  if (sameTab) {
    window.history.back();
    return true;
  }

  if (opener) {
    try {
      opener.focus();
    } catch {
      // The original tab can still be focused by closing this one.
    }
    window.close();
    const href = claimContinueHref(locale);
    window.setTimeout(() => {
      if (document.visibilityState !== "visible") return;
      if (!window.location.pathname.includes("/documents/")) return;
      window.location.assign(href);
    }, 300);
    return true;
  }

  window.location.assign(claimContinueHref(locale));
  return true;
}
