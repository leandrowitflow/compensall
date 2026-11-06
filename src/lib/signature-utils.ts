import { createHash } from "node:crypto";
import { inflateSync } from "node:zlib";

/** A blank 600×160 canvas is about 2.6 KB, so size alone accepts an empty signature. */
const MIN_INK_PIXELS = 40;
const MAX_SIGNATURE_BYTES = 1_500_000;

export function dataUrlToBase64(dataUrl: string | null): string | null {
  if (!dataUrl) return null;
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) return null;
  return dataUrl.slice(commaIndex + 1);
}

function countPngInkPixels(buffer: Buffer): number {
  if (buffer.length < 8 || buffer.toString("ascii", 1, 4) !== "PNG") return 0;
  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = -1;
  const idats: Buffer[] = [];
  while (offset + 8 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    if (offset + 12 + length > buffer.length) return 0;
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      colorType = data[9] ?? -1;
    } else if (type === "IDAT") {
      idats.push(data);
    } else if (type === "IEND") {
      break;
    }
    offset += 12 + length;
  }
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 4 ? 2 : colorType === 0 ? 1 : 0;
  if (!channels || width < 1 || height < 1 || width > 2000 || height > 2000 || idats.length === 0) return 0;

  let raw: Buffer;
  try {
    raw = inflateSync(Buffer.concat(idats));
  } catch {
    return 0;
  }

  const expected = height * (1 + width * channels);
  if (raw.length < expected) return 0;

  let ink = 0;
  let cursor = 0;
  let previous = Buffer.alloc(width * channels);
  for (let y = 0; y < height; y += 1) {
    const filter = raw[cursor] ?? 0;
    cursor += 1;
    const row = Buffer.alloc(width * channels);
    for (let i = 0; i < row.length; i += 1) {
      const x = raw[cursor + i] ?? 0;
      const left = i >= channels ? row[i - channels] ?? 0 : 0;
      const up = previous[i] ?? 0;
      const upLeft = i >= channels ? previous[i - channels] ?? 0 : 0;
      if (filter === 1) row[i] = (x + left) & 255;
      else if (filter === 2) row[i] = (x + up) & 255;
      else if (filter === 3) row[i] = (x + Math.floor((left + up) / 2)) & 255;
      else if (filter === 4) {
        const estimate = left + up - upLeft;
        const pa = Math.abs(estimate - left);
        const pb = Math.abs(estimate - up);
        const pc = Math.abs(estimate - upLeft);
        const predictor = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
        row[i] = (x + predictor) & 255;
      } else {
        row[i] = x;
      }
    }
    cursor += row.length;
    for (let x = 0; x < width; x += 1) {
      const index = x * channels;
      const alpha = channels === 4 || channels === 2 ? row[index + channels - 1] ?? 0 : 255;
      const red = row[index] ?? 255;
      if (alpha > 16 && red < 80) ink += 1;
    }
    previous = row;
  }
  return ink;
}

export function hasSignatureInk(dataUrl: string | null): boolean {
  const base64 = dataUrlToBase64(dataUrl);
  if (!base64) return false;
  const buffer = Buffer.from(base64, "base64");
  if (buffer.length === 0 || buffer.length > MAX_SIGNATURE_BYTES) return false;
  return countPngInkPixels(buffer) >= MIN_INK_PIXELS;
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
