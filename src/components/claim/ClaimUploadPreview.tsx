"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ClaimUploadMeta } from "@/lib/claim-types";
import BoardingPassPreviewModal from "@/components/claim/BoardingPassPreviewModal";

function ThumbnailPreview({ upload }: { upload: ClaimUploadMeta }) {
  const t = useTranslations("claim.step1.preview");

  if (upload.previewKind === "pdf" && upload.previewUrl) {
    return (
      <iframe
        src={upload.previewUrl}
        title={t("title")}
        className="pointer-events-none h-full w-full border-0 bg-white"
      />
    );
  }

  if (upload.previewKind === "image" && upload.previewUrl) {
    return (
      <img
        src={upload.previewUrl}
        alt={t("title")}
        className="h-full w-full object-contain object-center bg-[#f8faff]"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#f1f5fe] px-3 text-center">
      <img src="/assets/claim/claim-boarding-pass.png" alt="" className="h-12 w-12 opacity-40 object-contain" />
      <p className="text-[#7b8094] text-xs leading-snug">
        {upload.mimeType.includes("heic") || upload.mimeType.includes("heif")
          ? t("heicUnsupported")
          : t("unavailable")}
      </p>
    </div>
  );
}

export default function ClaimUploadPreview({ upload }: { upload: ClaimUploadMeta }) {
  const t = useTranslations("claim.step1.preview");
  const [previewOpen, setPreviewOpen] = useState(false);
  const canOpenPreview = Boolean(upload.previewUrl);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => canOpenPreview && setPreviewOpen(true)}
          disabled={!canOpenPreview}
          className={`relative h-[160px] w-full sm:h-[140px] sm:w-[200px] flex-shrink-0 overflow-hidden rounded-xl border-2 border-[#d5e0f9] bg-white text-left ${
            canOpenPreview ? "cursor-zoom-in hover:border-[#2669f3]/60" : "cursor-default"
          }`}
          aria-label={canOpenPreview ? t("viewFull") : t("thumbnail")}
        >
          <ThumbnailPreview upload={upload} />
        </button>
        <div className="min-w-0">
          <p className="font-bold text-[#1f3664] text-[15px] sm:text-[17px] mb-1 break-all">{upload.fileName}</p>
          <p className="text-[#1f3664] text-sm sm:text-base mb-2">
            {t("addedJustNow", { fileSize: upload.fileSize })}
          </p>
          {canOpenPreview && (
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="text-[#2669f3] font-bold text-sm sm:text-base hover:underline"
            >
              {t("open")}
            </button>
          )}
        </div>
      </div>

      <BoardingPassPreviewModal upload={upload} open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </>
  );
}
