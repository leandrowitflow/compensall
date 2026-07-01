const TRACKING_PREFIX = "CMP";

export function generateTrackingNumber(date = new Date()): string {
  const y = date.getFullYear().toString().slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${TRACKING_PREFIX}-${y}${m}${d}-${random}`;
}

export function isValidTrackingNumber(value: string): boolean {
  return /^CMP-\d{6}-[A-Z0-9]{5}$/.test(value.trim().toUpperCase());
}

export function normalizeTrackingNumber(value: string): string {
  return value.trim().toUpperCase();
}
