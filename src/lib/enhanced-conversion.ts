import { isValidClaimPhone, toE164Phone } from "@/lib/phone";

const STORAGE_PREFIX = "compensall_ec:";

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
}

export function takeEnhancedConversionUserData(
  trackingNumber: string,
): EnhancedConversionUserData | null {
  if (typeof window === "undefined" || !trackingNumber.trim()) {
    return null;
  }

  const key = `${STORAGE_PREFIX}${trackingNumber.trim()}`;
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
    return {
      email: parsed.email.trim().toLowerCase(),
      ...(phoneNumber.startsWith("+") ? { phone_number: phoneNumber } : {}),
      ...(Object.keys(address).length > 0 ? { address } : {}),
    };
  } catch {
    return null;
  }
}
