import { createHash } from "node:crypto";

const MIN_SIGNATURE_BYTES = 800;

export function dataUrlToBase64(dataUrl: string | null): string | null {
  if (!dataUrl) return null;
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) return null;
  return dataUrl.slice(commaIndex + 1);
}

export function hasSignatureInk(dataUrl: string | null): boolean {
  const base64 = dataUrlToBase64(dataUrl);
  if (!base64) return false;
  const buffer = Buffer.from(base64, "base64");
  return buffer.length > MIN_SIGNATURE_BYTES;
}

export function hashSignature(dataUrl: string): string {
  const base64 = dataUrlToBase64(dataUrl) ?? "";
  return createHash("sha256").update(base64, "utf8").digest("hex");
}

export function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || null;
  return request.headers.get("x-real-ip");
}
