import { formatFileSize } from "@/lib/claim-types";
import type { ClaimUploadMeta } from "@/lib/claim-types";
import {
  createPreviewBlob,
  getUploadPreviewKind,
  isBrowserImagePreview,
  isPdfMime,
} from "@/lib/gemini-document";

const EXTENSION_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
  pdf: "application/pdf",
};

export function inferMimeType(fileName: string, reportedType = ""): string {
  const normalized = reportedType.trim().toLowerCase();
  if (normalized && normalized !== "application/octet-stream") {
    return normalized;
  }

  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_MIME[extension] ?? "";
}

export const BOARDING_PASS_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
]);

export function isAllowedBoardingPassMime(mimeType: string): boolean {
  return BOARDING_PASS_MIME_TYPES.has(mimeType.toLowerCase());
}

export function buildUploadMeta(file: File): ClaimUploadMeta {
  const mimeType = inferMimeType(file.name, file.type);
  const previewKind = getUploadPreviewKind(mimeType);
  const canShowInlinePreview =
    isBrowserImagePreview(mimeType) || isPdfMime(mimeType) || mimeType.startsWith("image/");

  let previewUrl: string | null = null;
  if (canShowInlinePreview) {
    previewUrl = URL.createObjectURL(createPreviewBlob(file, mimeType));
  }

  return {
    fileName: file.name,
    fileSize: formatFileSize(file.size),
    previewUrl,
    mimeType,
    previewKind,
  };
}
