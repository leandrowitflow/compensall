import { isValidPhoneNumber, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";

/** Map site locale → default phone country. */
export function defaultPhoneCountryFromLocale(locale: string | null | undefined): CountryCode {
  switch (locale) {
    case "pt":
      return "PT";
    case "fr":
      return "FR";
    case "en":
      return "GB";
    default:
      return "PT";
  }
}

export function isValidClaimPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  try {
    return isValidPhoneNumber(trimmed);
  } catch {
    return false;
  }
}

/** Normalize to E.164 when possible; otherwise return trimmed input. */
export function toE164Phone(value: string, defaultCountry?: CountryCode): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const parsed = parsePhoneNumberFromString(trimmed, defaultCountry);
  if (parsed?.isValid()) {
    return parsed.format("E.164");
  }
  return trimmed;
}
