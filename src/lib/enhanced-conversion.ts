import { hasAnalyticsConsent } from "@/lib/cookie-consent";
import { isValidClaimPhone, toE164Phone } from "@/lib/phone";

const STORAGE_PREFIX = "compensall_ec:";
const FORM_ID = "compensall-enhanced-conversion";

/** Survives a strict-mode remount after sessionStorage has already been read. */
let activeUserData: { trackingNumber: string; userData: EnhancedConversionUserData } | null = null;

/** Fields the Google Ads enhanced-conversion tag reads from the `claim_submitted` event. */
export type EnhancedConversionUserData = {
  email: string;
  phone_number?: string;
  address?: {
    first_name?: string;
    last_name?: string;
  };
};

function stripNameTitle(value: string): string {
  return value.replace(/\b(MR|MRS|MS|MISS|DR|M|MME|MLLE)\b\.?/gi, "").replace(/\s+/g, " ").trim();
}

function splitClaimName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  if (trimmed.includes("/")) {
    const [lastName, firstName] = trimmed.split("/").map((part) => part.trim());
    return {
      firstName: stripNameTitle(firstName || trimmed),
      lastName: lastName || "",
    };
  }

  if (trimmed.includes(",")) {
    const [lastName, firstPart = ""] = trimmed.split(",").map((part) => part.trim());
    return {
      firstName: stripNameTitle(firstPart) || firstPart,
      lastName: lastName || "",
    };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: stripNameTitle(parts[0]), lastName: "" };
  }

  return {
    firstName: stripNameTitle(parts[0]),
    lastName: parts.slice(1).join(" "),
  };
}

/** Normalized user data for Google Ads. The tag hashes it; we do not. */
export function buildEnhancedConversionUserData(input: {
  name: string;
  email: string;
  phone?: string;
}): EnhancedConversionUserData | null {
  const email = input.email.trim().toLowerCase();
  if (!email) {
    return null;
  }

  const { firstName, lastName } = splitClaimName(input.name);
  const address: NonNullable<EnhancedConversionUserData["address"]> = {};
  const normalizedFirst = firstName.trim().toLowerCase();
  const normalizedLast = lastName.trim().toLowerCase();
  if (normalizedFirst) {
    address.first_name = normalizedFirst;
  }
  if (normalizedLast) {
    address.last_name = normalizedLast;
  }

  const phone = input.phone?.trim() ?? "";
  const phoneNumber = phone && isValidClaimPhone(phone) ? toE164Phone(phone) : "";

  return {
    email,
    ...(phoneNumber.startsWith("+") ? { phone_number: phoneNumber } : {}),
    ...(Object.keys(address).length > 0 ? { address } : {}),
  };
}

export function storeEnhancedConversionUserData(
  trackingNumber: string,
  input: { name: string; email: string; phone?: string },
): void {
  if (typeof window === "undefined" || !trackingNumber.trim()) {
    return;
  }

  const userData = buildEnhancedConversionUserData(input);
  if (!userData) {
    return;
  }

  try {
    sessionStorage.setItem(`${STORAGE_PREFIX}${trackingNumber.trim()}`, JSON.stringify(userData));
  } catch {
    // sessionStorage can be blocked; the conversion still fires without user data
  }

  activeUserData = { trackingNumber: trackingNumber.trim(), userData };
  mountEnhancedConversionFields(userData);
}

function field(id: string, name: string, type: string, autoComplete: string, value: string): HTMLInputElement {
  const input = document.createElement("input");
  input.id = id;
  input.name = name;
  input.type = type;
  input.autocomplete = autoComplete;
  input.value = value;
  input.readOnly = true;
  input.tabIndex = -1;
  return input;
}

/** Off-screen fields the Google tag can read on the thank-you page. Not shown in the page copy. */
export function mountEnhancedConversionFields(userData: EnhancedConversionUserData | null): void {
  if (typeof document === "undefined") {
    return;
  }

  document.getElementById(FORM_ID)?.remove();
  if (!userData || !hasAnalyticsConsent()) {
    return;
  }

  const form = document.createElement("form");
  form.id = FORM_ID;
  form.setAttribute("aria-hidden", "true");
  form.autocomplete = "on";
  form.noValidate = true;
  form.style.cssText =
    "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";
  form.addEventListener("submit", (event) => event.preventDefault());
  form.append(field("compensall-email", "email", "email", "email", userData.email));
  if (userData.address?.first_name) {
    form.append(field("compensall-first-name", "first_name", "text", "given-name", userData.address.first_name));
  }
  if (userData.address?.last_name) {
    form.append(field("compensall-last-name", "last_name", "text", "family-name", userData.address.last_name));
  }
  if (userData.phone_number) {
    form.append(field("compensall-phone", "phone", "tel", "tel", userData.phone_number));
  }
  document.body.append(form);
}

export function removeEnhancedConversionFields(): void {
  if (typeof document === "undefined") {
    return;
  }
  document.getElementById(FORM_ID)?.remove();
}

export function takeEnhancedConversionUserData(
  trackingNumber: string,
): EnhancedConversionUserData | null {
  const normalizedTrackingNumber = trackingNumber.trim();
  if (typeof window === "undefined" || !normalizedTrackingNumber) {
    return null;
  }

  if (activeUserData?.trackingNumber === normalizedTrackingNumber) {
    try {
      sessionStorage.removeItem(`${STORAGE_PREFIX}${normalizedTrackingNumber}`);
    } catch {
      // sessionStorage can be blocked
    }
    return activeUserData.userData;
  }

  const key = `${STORAGE_PREFIX}${normalizedTrackingNumber}`;
  try {
    const raw = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<EnhancedConversionUserData>;
    if (typeof parsed.email !== "string" || !parsed.email.trim()) {
      return null;
    }

    const address: NonNullable<EnhancedConversionUserData["address"]> = {};
    const firstName = parsed.address?.first_name?.trim().toLowerCase() ?? "";
    const lastName = parsed.address?.last_name?.trim().toLowerCase() ?? "";
    if (firstName) {
      address.first_name = firstName;
    }
    if (lastName) {
      address.last_name = lastName;
    }

    const phoneNumber = parsed.phone_number?.trim() ?? "";
    const userData: EnhancedConversionUserData = {
      email: parsed.email.trim().toLowerCase(),
      ...(phoneNumber.startsWith("+") ? { phone_number: phoneNumber } : {}),
      ...(Object.keys(address).length > 0 ? { address } : {}),
    };
    activeUserData = { trackingNumber: normalizedTrackingNumber, userData };
    return userData;
  } catch {
    return null;
  }
}
