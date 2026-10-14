import { inferMimeType } from "@/lib/boarding-pass-file";
import { MAX_CLAIM_FILE_BYTES } from "@/lib/claim-upload-limits";

const COMPRESSIBLE = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);

function loadImage(file: File): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    image.src = url;
  });
}

function renderJpeg(
  image: HTMLImageElement,
  originalName: string,
  maxEdge: number,
  quality: number,
): Promise<File | null> {
  const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return Promise.resolve(null);
  context.drawImage(image, 0, 0, width, height);
  const base = originalName.replace(/\.[^.]+$/, "") || "document";
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        resolve(new File([blob], `${base}.jpg`, { type: "image/jpeg", lastModified: Date.now() }));
      },
      "image/jpeg",
      quality,
    );
  });
}

/**
 * Shrink phone photos before upload. PDFs and formats the browser cannot
 * decode are returned unchanged so the form can reject them with a clear message.
 */
export async function prepareClaimFile(file: File): Promise<File> {
  if (typeof document === "undefined") return file;
  const mime = inferMimeType(file.name, file.type);
  if (!COMPRESSIBLE.has(mime) || file.size < 700_000) return file;

  const image = await loadImage(file);
  if (!image) return file;

  const first = await renderJpeg(image, file.name, 1800, 0.72);
  if (!first) return file;
  if (first.size <= MAX_CLAIM_FILE_BYTES && first.size <= 900_000) return first;

  const smaller = await renderJpeg(image, file.name, 1400, 0.55);
  const best = smaller && smaller.size < first.size ? smaller : first;
  return best.size < file.size ? best : file;
}
