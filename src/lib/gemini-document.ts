import type { ProviderOptions } from "@ai-sdk/provider-utils";

const BROWSER_IMAGE_MIMES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/** High resolution helps read small boarding-pass text (flight no., airports, date). */
export const GEMINI_VISION_PROVIDER_OPTIONS: ProviderOptions = {
  google: {
    mediaResolution: "MEDIA_RESOLUTION_HIGH",
  },
};

/** File part for Gemini multimodal input (images + PDFs). */
export function buildGeminiDocumentPart(fileBuffer: Buffer, mimeType: string) {
  return {
    type: "file" as const,
    data: fileBuffer,
    mediaType: mimeType.toLowerCase(),
  };
}

export function isBrowserImagePreview(mimeType: string): boolean {
  return BROWSER_IMAGE_MIMES.has(mimeType.toLowerCase());
}

export function isPdfMime(mimeType: string): boolean {
  return mimeType.toLowerCase() === "application/pdf";
}

export function createPreviewBlob(file: File, mimeType: string): Blob {
  if (file.type && file.type !== "application/octet-stream") {
    return file;
  }
  return new Blob([file], { type: mimeType });
}

export type UploadPreviewKind = "image" | "pdf" | "file" | "none";

export function getUploadPreviewKind(mimeType: string): UploadPreviewKind {
  if (isBrowserImagePreview(mimeType)) return "image";
  if (isPdfMime(mimeType)) return "pdf";
  if (mimeType) return "file";
  return "none";
}

export function parseJsonFromModelText(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = (fenced?.[1] ?? trimmed).trim();

  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start === -1 || end <= start) {
      throw new Error("Model did not return JSON.");
    }
    return JSON.parse(candidate.slice(start, end + 1));
  }
}
