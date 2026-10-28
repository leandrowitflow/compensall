"use client";

import { useTranslations } from "next-intl";
import BoardingPassUpload from "@/components/claim/BoardingPassUpload";
import { gtmId } from "@/lib/gtm";

type DisruptionChoice = "Delayed" | "Cancelled" | "Denied boarding";

type Step1UploadProps = {
  isAdvancing?: boolean;
  isExtracting?: boolean;
  extractError?: string | null;
  attachedName?: string | null;
  onExtract: (file: File) => Promise<void>;
  onChooseDisruption: (status: DisruptionChoice) => void;
};

export default function Step1Upload({
  isAdvancing = false,
  isExtracting = false,
  extractError = null,
  attachedName = null,
  onExtract,
  onChooseDisruption,
}: Step1UploadProps) {
  const tStep1 = useTranslations("claim.step1");

  const choices: Array<{ status: DisruptionChoice; label: string; hint?: string; gtm: string }> = [
    { status: "Delayed", label: tStep1("delayedFlight"), gtm: "claim_step1_delayed" },
    { status: "Cancelled", label: tStep1("cancelledFlight"), gtm: "claim_step1_cancelled" },
    {
      status: "Denied boarding",
      label: tStep1("deniedBoarding"),
      hint: tStep1("deniedBoardingOther"),
      gtm: "claim_step1_denied_boarding",
    },
  ];

  return (
    <div className="px-6 sm:px-10 xl:px-14 pt-4 sm:pt-5 xl:pt-6 pb-6 sm:pb-8 xl:pb-10">
      <p className="text-sm text-muted text-center mb-5 max-w-lg mx-auto leading-relaxed">
        {tStep1("rightsContext")}
      </p>

      <BoardingPassUpload
        isExtracting={isExtracting}
        extractError={extractError}
        attachedName={attachedName}
        onExtract={onExtract}
      />

      <p className="mt-6 mb-4 text-center font-bold text-[#1f3664] text-base sm:text-lg max-w-xl mx-auto">
        {tStep1("orCheckManually")} {tStep1("checkManually")}
      </p>

      <div className="grid grid-cols-1 gap-3 max-w-xl mx-auto">
        {choices.map((choice) => (
          <button
            key={choice.status}
            type="button"
            disabled={isAdvancing || isExtracting}
            onClick={() => onChooseDisruption(choice.status)}
            className="min-h-14 rounded-2xl border-2 border-[#d5e0f9] bg-white px-5 py-4 text-base sm:text-lg font-bold text-[#1f3664] hover:border-[#2669f3] hover:bg-[#f5f8ff] disabled:cursor-not-allowed disabled:opacity-60"
            {...gtmId(choice.gtm)}
          >
            <span>{choice.label}</span>
            {choice.hint ? (
              <span className="ml-1.5 text-sm sm:text-base font-semibold text-[#7b8094]">{choice.hint}</span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 xl:mt-10">
        <img src="/assets/icons/shield-lock.svg" alt="" aria-hidden="true" width={24} height={24} decoding="async" className="w-6 h-6 opacity-50 object-contain" />
        <p className="text-muted font-bold text-sm">{tStep1("dataProtected")}</p>
      </div>
    </div>
  );
}
