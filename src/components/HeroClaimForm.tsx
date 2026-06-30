"use client";

import { useCallback, useState } from "react";
import ClaimSidebar from "@/components/claim/ClaimSidebar";
import Step1Upload, { buildUploadMeta } from "@/components/claim/Step1Upload";
import Step2Panel from "@/components/claim/Step2Panel";
import Step3Panel from "@/components/claim/Step3Panel";
import {
  EMPTY_FLIGHT,
  normalizeFlightData,
  type ClaimEntryMode,
  type ClaimFlightData,
  type ClaimUploadMeta,
} from "@/lib/claim-types";

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
  const steps = [
    { num: 1, label: "Upload" },
    { num: 2, label: "AI check" },
    { num: 3, label: "Sign & submit" },
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
                  <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-4 h-4" />
                ) : (
                  s.num
                )}
              </div>
              <span className="text-[#1f3664] font-bold text-sm hidden md:inline">{s.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AssistantPill({ label = "Assistant" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 bg-[#f1f5fe] rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
      <img src="/assets/icons/stars.svg" alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-[#2669f3] font-bold text-sm sm:text-base">{label}</span>
    </div>
  );
}

function validateStep2(flight: ClaimFlightData): string | null {
  if (!flight.passenger.trim()) return "Passenger name is required.";
  if (!flight.flight.trim()) return "Flight number is required.";
  if (!flight.routeFrom.trim() || !flight.routeTo.trim()) return "Route is required.";
  if (!flight.date.trim()) return "Flight date is required.";
  if (flight.status === "Unknown") return "Select what happened to your flight.";
  if (flight.status === "Delayed" && !flight.delay.trim()) return "Enter the delay duration.";
  return null;
}

export default function HeroClaimForm() {
  const [step, setStep] = useState<ClaimStep>(1);
  const [entryMode, setEntryMode] = useState<ClaimEntryMode | null>(null);
  const [upload, setUpload] = useState<ClaimUploadMeta | null>(null);
  const [flight, setFlight] = useState<ClaimFlightData>(EMPTY_FLIGHT);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [step2Error, setStep2Error] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(false);
  }, [upload?.previewUrl]);

  const handleExtract = async (file: File) => {
    setExtractError(null);
    setIsExtracting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/claim/extract-boarding-pass", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { flight?: ClaimFlightData; error?: string };

      if (!response.ok) {
        setExtractError(data.error ?? "Could not extract boarding pass details.");
        return;
      }

      setEntryMode("upload");
      setUpload(buildUploadMeta(file));
      setFlight(normalizeFlightData(data.flight));
      setStep(2);
    } catch {
      setExtractError("Something went wrong. Please try again or use manual entry.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleManualSubmit = (manualFlight: ClaimFlightData) => {
    setEntryMode("manual");
    setUpload(null);
    setFlight(manualFlight);
    setExtractError(null);
    setIsEditing(true);
    setStep(2);
  };

  const handleContinueToStep3 = () => {
    const error = validateStep2(flight);
    if (error) {
      setStep2Error(error);
      setIsEditing(true);
      return;
    }
    setStep2Error(null);
    setIsEditing(false);
    setStep(3);
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
      <div className="flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-5 flex-wrap">
        <AssistantPill label={isExpanded ? "Compensall AI" : "Assistant"} />
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
                onDelete={resetClaim}
                onSubmit={() => setSubmitted(true)}
                submitted={submitted}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
