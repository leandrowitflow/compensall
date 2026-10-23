"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, type DragEvent } from "react";
import { validateBoardingPassFile, BOARDING_PASS_ACCEPT } from "@/lib/boarding-pass-file";
import { prepareClaimFile } from "@/lib/prepare-claim-file";
import { gtmId } from "@/lib/gtm";

type DisruptionChoice = "Delayed" | "Cancelled";

type Step1UploadProps = {
  isExtracting: boolean;
  isAdvancing?: boolean;
  extractError: string | null;
  onExtract: (file: File) => Promise<void>;
  onChooseDisruption: (status: DisruptionChoice) => void;
};

export default function Step1Upload({
  isExtracting,
  isAdvancing = false,
  extractError,
  onExtract,
  onChooseDisruption,
}: Step1UploadProps) {
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

  const choices: Array<{ status: DisruptionChoice; label: string; gtm: string }> = [
    { status: "Delayed", label: tStep1("delayedFlight"), gtm: "claim_step1_delayed" },
    { status: "Cancelled", label: tStep1("cancelledFlight"), gtm: "claim_step1_cancelled" },
  ];

  return (
    <div className="px-6 sm:px-10 xl:px-14 pt-4 sm:pt-5 xl:pt-6 pb-6 sm:pb-8 xl:pb-10">
      <p className="text-sm text-muted text-center mb-4 max-w-lg mx-auto leading-relaxed">
        {tStep1("rightsContext")}
      </p>

      <label
        aria-busy={isExtracting}
        className={`relative block w-full border-[3.5px] border-dashed rounded-xl py-8 sm:py-10 flex flex-col items-center justify-center text-center transition-colors bg-transparent ${
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
            <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 rounded-full border-4 border-[#d5e0f9] border-t-[#2669f3] animate-spin" aria-hidden />
            <p className="font-bold text-[#1f3664] text-base sm:text-lg mb-1">{tStep1("readingBoardingPass")}</p>
            <p className="text-muted text-xs sm:text-sm">
              {tStep1("extractingDetails", { assistantName: tCommon("assistantName") })}
            </p>
          </>
        ) : (
          <>
            <img src="/assets/icons/cloud-upload.svg" alt="" aria-hidden="true" width={75} height={75} decoding="async" fetchPriority="low" className="w-12 h-12 sm:w-14 sm:h-14 xl:w-[75px] xl:h-[75px] mb-4 object-contain" />
            <p className="font-bold text-[#1f3664] text-base sm:text-lg mb-1">{tStep1("uploadTitle")}</p>
            <p className="text-[#1f3664] text-sm font-semibold mb-1">{tStep1("uploadOptional")}</p>
            <p className="text-muted text-xs sm:text-sm">{tStep1("uploadHint")}</p>
          </>
        )}
      </label>

      {(uploadError || extractError) && (
        <p className="mt-3 text-sm text-[#e82828] text-center" role="alert">
          {uploadError ?? extractError}
        </p>
      )}

      <p className={`text-center text-sm text-[#1f3664] my-5 sm:my-6 ${isExtracting ? "opacity-50" : ""}`}>
        <strong className="font-bold">{tStep1("orCheckManually")}</strong> {tStep1("checkManually")}
      </p>

      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto ${isExtracting ? "opacity-50 pointer-events-none" : ""}`}>
        {choices.map((choice) => (
          <button
            key={choice.status}
            type="button"
            disabled={isExtracting || isAdvancing}
            onClick={() => onChooseDisruption(choice.status)}
            className="min-h-14 rounded-2xl border-2 border-[#d5e0f9] bg-white px-5 py-4 text-base sm:text-lg font-bold text-[#1f3664] hover:border-[#2669f3] hover:bg-[#f5f8ff] disabled:cursor-not-allowed disabled:opacity-60"
            {...gtmId(choice.gtm)}
          >
            {choice.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 xl:mt-10">
        <img src="/assets/icons/shield-lock.svg" alt="" aria-hidden="true" width={24} height={24} decoding="async" fetchPriority="low" className="w-6 h-6 opacity-50 object-contain" />
        <p className="text-muted font-bold text-sm">{tStep1("dataProtected")}</p>
      </div>
    </div>
  );
}
