"use client";

import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import Step1Upload from "@/components/claim/Step1Upload";
import type { ClaimSubmitPayload } from "@/components/claim/Step3Panel";
import { buildUploadMeta } from "@/lib/boarding-pass-file";
import {
  EMPTY_FLIGHT,
  normalizeFlightData,
  type ClaimEntryMode,
  type ClaimFlightData,
  type ClaimStatus,
  type ClaimUploadMeta,
} from "@/lib/claim-types";

const ClaimSidebar = dynamic(() => import("@/components/claim/ClaimSidebar"));
const Step2Panel = dynamic(() => import("@/components/claim/Step2Panel"));
const Step3Panel = dynamic(() => import("@/components/claim/Step3Panel"));

type ClaimStep = 1 | 2 | 3;

function StepSeparators() {
  return (
    <div className="hidden md:flex gap-0.5 mx-1">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-2 h-0.5 bg-[#d5e0f9] rounded-full" />
      ))}
    </div>
  );
}

function ClaimStepIndicator({ step }: { step: ClaimStep }) {
  const t = useTranslations("claim.steps");
  const tCommon = useTranslations("common");
  const steps = [
    { num: 1, label: t("upload"), shortLabel: t("upload") },
    { num: 2, label: t("assistantCheck"), shortLabel: t("assistantCheckShort") },
    { num: 3, label: t("signSubmit"), shortLabel: t("signSubmit") },
  ] as const;

  return (
    <div className="flex items-center gap-2 flex-wrap justify-end">
      {steps.map((s, i) => {
        const isComplete = s.num < step;
        const isActive = s.num === step;
        return (
          <div key={s.num} className="flex items-center gap-2">
            {i > 0 && <StepSeparators />}
            <div className="flex items-center gap-2">
              <div
                className={`w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-full flex items-center justify-center flex-shrink-0 text-sm sm:text-base font-bold leading-none ${
                  isComplete || isActive
                    ? "bg-[#2669f3] text-white"
                    : "border-2 border-[#d5e0f9] text-[#1f3664]"
                }`}
              >
                {isComplete && s.num === 1 && step > 1 ? (
                  <img src="/assets/claim/claim-checkmark.svg" alt={tCommon("assistantStepLabel")} aria-hidden="true" className="w-4 h-4 object-contain" />
                ) : (
                  s.num
                )}
              </div>
              <span className="text-[#1f3664] font-bold text-sm hidden md:inline 2xl:hidden">{s.shortLabel}</span>
              <span className="text-[#1f3664] font-bold text-sm hidden 2xl:inline">{s.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AssistantPill({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 bg-[#f1f5fe] rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
      <img src="/assets/icons/stars.svg" alt="" aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
      <span className="text-blue-accessible font-bold text-sm sm:text-base">{label}</span>
    </div>
  );
}

function validateStep2(
  flight: ClaimFlightData,
  t: (key: "errors.passengerRequired" | "errors.flightRequired" | "errors.routeRequired" | "errors.dateRequired") => string,
): string | null {
  if (!flight.passenger.trim()) return t("errors.passengerRequired");
  if (!flight.flight.trim()) return t("errors.flightRequired");
  if (!flight.routeFrom.trim() || !flight.routeTo.trim()) return t("errors.routeRequired");
  if (!flight.date.trim()) return t("errors.dateRequired");
  return null;
}

export default function HeroClaimForm() {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const tStep1 = useTranslations("claim.step1");
  const tStep2 = useTranslations("claim.step2");
  const tStep3 = useTranslations("claim.step3");

  const [step, setStep] = useState<ClaimStep>(1);
  const [entryMode, setEntryMode] = useState<ClaimEntryMode | null>(null);
  const [upload, setUpload] = useState<ClaimUploadMeta | null>(null);
  const [flight, setFlight] = useState<ClaimFlightData>(EMPTY_FLIGHT);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [step2Error, setStep2Error] = useState<string | null>(null);
  const [boardingPassFile, setBoardingPassFile] = useState<File | null>(null);

  const resetClaim = useCallback(() => {
    if (upload?.previewUrl) {
      URL.revokeObjectURL(upload.previewUrl);
    }
    setStep(1);
    setEntryMode(null);
    setUpload(null);
    setFlight(EMPTY_FLIGHT);
    setIsExtracting(false);
    setExtractError(null);
    setIsEditing(false);
    setStep2Error(null);
    setBoardingPassFile(null);
  }, [upload?.previewUrl]);

  const handleExtract = async (file: File) => {
    setExtractError(null);
    setIsExtracting(true);

    const advanceWithFile = () => {
      setEntryMode("upload");
      setBoardingPassFile(file);
      setUpload(buildUploadMeta(file));
      setStep(2);
    };

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/claim/extract-boarding-pass", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as {
        flight?: ClaimFlightData;
        warning?: string | null;
        error?: string;
      };

      if (!response.ok) {
        advanceWithFile();
        setFlight(EMPTY_FLIGHT);
        setIsEditing(true);
        setExtractError(
          data.error ??
            tStep1("errors.extractFailed"),
        );
        return;
      }

      advanceWithFile();
      setFlight(normalizeFlightData(data.flight));
      setIsEditing(Boolean(data.warning));
      setExtractError(data.warning ?? null);
    } catch {
      advanceWithFile();
      setFlight(EMPTY_FLIGHT);
      setIsEditing(true);
      setExtractError(tStep1("errors.somethingWentWrong"));
    } finally {
      setIsExtracting(false);
    }
  };

  const handleManualSubmit = (manualFlight: ClaimFlightData) => {
    setEntryMode("manual");
    setBoardingPassFile(null);
    setUpload(null);
    setFlight(manualFlight);
    setExtractError(null);
    setIsEditing(true);
    setStep(2);
  };

  const handleContinueToStep3 = () => {
    const error = validateStep2(flight, tStep2);
    if (error) {
      setStep2Error(error);
      setIsEditing(true);
      return;
    }
    setStep2Error(null);
    setIsEditing(false);
    setStep(3);
  };

  const handleClaimSubmit = async (payload: ClaimSubmitPayload) => {
    if (!entryMode) {
      throw new Error(tStep3("errors.sessionExpired"));
    }

    const formData = new FormData();
    formData.append("entryMode", entryMode);
    formData.append("signedName", payload.signedName);
    formData.append("contactEmail", payload.contactEmail);
    formData.append("flight", JSON.stringify(flight));
    formData.append("acceptedDocuments", JSON.stringify(payload.acceptedDocuments));
    formData.append("documentSignatures", JSON.stringify(payload.documentSignatures));
    formData.append("userAgent", navigator.userAgent);
    formData.append("locale", locale);
    if (payload.odooLeadId) {
      formData.append("odooLeadId", String(payload.odooLeadId));
    }
    formData.append("formSessionId", payload.formSessionId);

    if (boardingPassFile) {
      formData.append("file", boardingPassFile);
    }

    const response = await fetch("/api/claim/submit", {
      method: "POST",
      body: formData,
    });

    const data = (await response.json()) as {
      trackingNumber?: string;
      status?: ClaimStatus;
      error?: string;
    };

    if (!response.ok || !data.trackingNumber || !data.status) {
      throw new Error(data.error ?? tStep3("errors.submitFailed"));
    }

    return {
      trackingNumber: data.trackingNumber,
      status: data.status,
    };
  };

  const isExpanded = step > 1;

  return (
    <div
      className={`bg-[#fefefe] mx-auto text-left overflow-hidden transition-all ${
        isExpanded
          ? "rounded-[24px] xl:rounded-[38px] shadow-[0_1px_1px_1px_rgba(0,0,0,0.05)] max-w-full lg:max-w-[960px] xl:max-w-[1550px] w-full"
          : "rounded-[24px] xl:rounded-[32px] max-w-full lg:max-w-[960px] xl:max-w-[1100px] w-full"
      }`}
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4 px-6 sm:px-10 xl:px-14 pt-6 sm:pt-7 xl:pt-8 pb-3 sm:pb-4 flex-wrap">
        <AssistantPill label={tCommon("assistantName")} />
        <ClaimStepIndicator step={step} />
      </div>

      {step === 1 && (
        <Step1Upload
          isExtracting={isExtracting}
          extractError={extractError}
          onExtract={handleExtract}
          onManualSubmit={handleManualSubmit}
        />
      )}

      {step > 1 && entryMode && (
        <div className="px-4 pb-4 xl:px-6 xl:pb-6">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,489px)_1fr] gap-4 xl:gap-6">
            <ClaimSidebar entryMode={entryMode} upload={upload} flight={flight} />
            {step === 2 ? (
              <Step2Panel
                flight={flight}
                isEditing={isEditing}
                validationError={step2Error}
                extractWarning={extractError}
                onFlightChange={setFlight}
                onToggleEdit={() => {
                  setIsEditing((editing) => !editing);
                  setStep2Error(null);
                }}
                onDelete={resetClaim}
                onContinue={handleContinueToStep3}
              />
            ) : (
              <Step3Panel
                flight={flight}
                entryMode={entryMode}
                locale={locale}
                onDelete={resetClaim}
                onSubmit={handleClaimSubmit}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
