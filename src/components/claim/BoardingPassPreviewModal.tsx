"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import type { ClaimUploadMeta } from "@/lib/claim-types";

type BoardingPassPreviewModalProps = {
  upload: ClaimUploadMeta;
  open: boolean;
  onClose: () => void;
};

function ModalPreview({ upload }: { upload: ClaimUploadMeta }) {
  const t = useTranslations("claim.step1.preview");

  if (!upload.previewUrl) {
    return <p className="text-[#1f3664] text-sm text-center px-6">{t("notAvailableSaved")}</p>;
  }

  if (upload.previewKind === "pdf") {
    return (
      <iframe
        src={upload.previewUrl}
        title={t("fullTitle")}
        className="h-[min(80vh,720px)] w-full max-w-3xl rounded-xl border border-[#d5e0f9] bg-white"
      />
    );
  }

  if (upload.previewKind === "image") {
    return (
      <img
        src={upload.previewUrl}
        alt={t("fullTitle")}
        className="max-h-[min(80vh,720px)] max-w-full rounded-xl border border-[#d5e0f9] bg-[#f8faff] object-contain"
      />
    );
  }

  return (
    <div className="text-center px-6">
      <p className="text-[#1f3664] text-sm mb-4">
        {t("formatCannotPreview", {
          heicHint: upload.mimeType.includes("heic") ? t("heicHint") : "",
        })}
      </p>
      <a
        href={upload.previewUrl}
        download={upload.fileName}
        className="inline-flex bg-[#2669f3] text-white font-bold px-5 py-3 rounded-[11px] hover:bg-[#1a55d4]"
      >
        {t("downloadFile")}
      </a>
    </div>
  );
}

export default function BoardingPassPreviewModal({ upload, open, onClose }: BoardingPassPreviewModalProps) {
  const t = useTranslations("claim.step1.preview");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#1f3664]/50 backdrop-blur-[2px]"
        aria-label={t("closePreview")}
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[20px] bg-white shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-[#d5e0f9] px-4 py-3">
          <div className="min-w-0">
            <p className="font-bold text-[#1f3664] truncate">{upload.fileName}</p>
            <p className="text-[#7b8094] text-xs">{upload.fileSize}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#d5e0f9] text-[#1f3664]"
            aria-label={t("closePreview")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center overflow-auto p-4 sm:p-6">
          <ModalPreview upload={upload} />
        </div>
      </div>
    </div>
  );
}
