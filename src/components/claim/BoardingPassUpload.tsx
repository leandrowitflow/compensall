"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, type DragEvent } from "react";
import { BOARDING_PASS_ACCEPT, validateBoardingPassFile } from "@/lib/boarding-pass-file";
import { prepareClaimFile } from "@/lib/prepare-claim-file";
import { gtmId } from "@/lib/gtm";

type BoardingPassUploadProps = {
  isExtracting: boolean;
  extractError: string | null;
  attachedName?: string | null;
  onExtract: (file: File) => Promise<void>;
};

export default function BoardingPassUpload({
  isExtracting,
  extractError,
  attachedName,
  onExtract,
}: BoardingPassUploadProps) {
  const tStep1 = useTranslations("claim.step1");
  const tCommon = useTranslations("common");
  const inputRef = useRef<HTMLInputElement>(null);
  const processingRef = useRef(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File | null) => {
    if (!file || isExtracting || processingRef.current) return;

    const prepared = await prepareClaimFile(file);
    const validationError = validateBoardingPassFile(prepared);
    if (validationError) {
      setUploadError(tStep1(`errors.${validationError}`));
      return;
    }

    setUploadError(null);
    processingRef.current = true;
    try {
      await onExtract(prepared);
    } finally {
      processingRef.current = false;
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const onDrop = async (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    await handleFile(event.dataTransfer.files[0] ?? null);
  };

  return (
    <div className="mt-4">
      <label
        aria-busy={isExtracting}
        className={`relative block w-full border-[3.5px] border-dashed rounded-xl py-6 sm:py-8 flex flex-col items-center justify-center text-center transition-colors bg-transparent ${
          isDragging ? "border-[#2669f3] bg-[#f1f5fe]/50" : "border-[#d5e0f9] hover:border-[#2669f3]/60"
        } ${isExtracting ? "opacity-70 pointer-events-none" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={BOARDING_PASS_ACCEPT}
          disabled={isExtracting}
          className="claim-native-file absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          onChange={(event) => void handleFile(event.target.files?.[0] ?? null)}
          {...gtmId("claim_step1_upload_boarding_pass")}
        />
        {isExtracting ? (
          <>
            <div className="w-10 h-10 mb-3 rounded-full border-4 border-[#d5e0f9] border-t-[#2669f3] animate-spin" aria-hidden />
            <p className="font-bold text-[#1f3664] text-base mb-1">{tStep1("readingBoardingPass")}</p>
            <p className="text-muted text-xs sm:text-sm">
              {tStep1("extractingDetails", { assistantName: tCommon("assistantName") })}
            </p>
          </>
        ) : (
          <>
            <img src="/assets/icons/cloud-upload.svg" alt="" aria-hidden="true" width={56} height={56} decoding="async" className="w-12 h-12 mb-3 object-contain" />
            <p className="font-bold text-[#1f3664] text-base mb-1">{tStep1("uploadTitle")}</p>
            <p className="text-[#1f3664] text-sm font-semibold mb-1">{tStep1("uploadOptional")}</p>
            <p className="text-muted text-xs sm:text-sm">{tStep1("uploadHint")}</p>
            {attachedName ? (
              <p className="mt-3 text-sm font-semibold text-[#2669f3]">{attachedName}</p>
            ) : null}
          </>
        )}
      </label>
      {(uploadError || extractError) && (
        <p className="mt-3 text-sm text-[#e82828]" role="alert">
          {uploadError ?? extractError}
        </p>
      )}
    </div>
  );
}
