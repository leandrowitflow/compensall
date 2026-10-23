"use client";

import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { startTransition, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import ClaimSidebar from "@/components/claim/ClaimSidebar";
import Step1Upload from "@/components/claim/Step1Upload";
import type { ClaimResumePrefill, ClaimSubmitPayload } from "@/components/claim/Step3Panel";

function loadStep2Panel() {
  return import("@/components/claim/Step2Panel");
}

function loadStep3Panel() {
  return import("@/components/claim/Step3Panel");
}

const Step2Panel = dynamic(loadStep2Panel, {
  loading: () => <div className="min-h-[28rem]" aria-hidden />,
});

const Step3Panel = dynamic(loadStep3Panel, {
  loading: () => <div className="min-h-[28rem]" aria-hidden />,
});
import { buildUploadMeta } from "@/lib/boarding-pass-file";
import { readClaimAttribution } from "@/lib/claim-attribution-client";
import { readClaimResumeTokenFromLocation } from "@/lib/claim-draft-token";
import {
  CLAIM_CONTINUE_PENDING_CLASS,
  clearClaimReturn,
  releaseClaimContinueHandoff,
  stripClaimContinueQuery,
  takeClaimContinue,
  type ClaimReturnSnapshot,
} from "@/lib/claim-return";
import { type Step2Issue } from "@/lib/claim-form-issues";
import {
  ClaimSubmitError,
  classifyClaimFailure,
  oversizedClaimFiles,
  readJsonSafe,
} from "@/lib/claim-upload-limits";
import {
  EMPTY_FLIGHT,
  normalizeFlightData,
  type ClaimEntryMode,
  type ClaimFlightData,
  type ClaimPassenger,
  type ClaimStatus,
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

function ClaimStepIndicator({
  step,
  onSelect,
}: {
  step: ClaimStep;
  onSelect: (target: ClaimStep) => void;
}) {
  const t = useTranslations("claim.steps");
  const steps = [
    { num: 1 as const, label: t("upload"), shortLabel: t("upload") },
    { num: 2 as const, label: t("assistantCheck"), shortLabel: t("assistantCheckShort") },
    { num: 3 as const, label: t("signSubmit"), shortLabel: t("signSubmit") },
  ];

  return (
    <div className="claim-stepper-steps">
      {steps.map((s, i) => {
        const isComplete = s.num < step;
        const isActive = s.num === step;
        return (
          <div key={s.num} className="flex items-center gap-2">
            {i > 0 && <StepSeparators />}
            <button
              type="button"
              className="flex items-center gap-2 border-0 bg-transparent p-0 text-left"
              aria-current={isActive ? "step" : undefined}
              onClick={() => onSelect(s.num)}
            >
              <div
                className={`w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-full flex items-center justify-center flex-shrink-0 text-sm sm:text-base font-bold leading-none ${
                  isComplete || isActive
                    ? "bg-[#2669f3] text-white"
                    : "border-2 border-[#d5e0f9] text-[#1f3664]"
                }`}
              >
                {isComplete && s.num === 1 && step > 1 ? (
                  <img src="/assets/claim/claim-checkmark.svg" alt="" aria-hidden="true" width={16} height={16} className="w-4 h-4 object-contain" />
                ) : (
                  s.num
                )}
              </div>
              <span className="text-[#1f3664] font-bold text-sm hidden md:inline 2xl:hidden">{s.shortLabel}</span>
              <span className="text-[#1f3664] font-bold text-sm hidden 2xl:inline">{s.label}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

function AssistantPill({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 bg-[#f1f5fe] rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
      <img src="/assets/icons/stars.svg" alt="" aria-hidden="true" width={24} height={24} decoding="async" fetchPriority="low" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
      <span className="text-blue-accessible font-bold text-sm sm:text-base">{label}</span>
    </div>
  );
}

function validateStep2(
  flight: ClaimFlightData,
  messages: {
    passengerRequired: string;
    flightRequired: string;
    departureRequired: string;
    arrivalRequired: string;
    dateRequired: string;
    typeRequired: string;
    connectingRequired: string;
    connectingDetailsRequired: string;
    delayRequired: string;
    noticeRequired: string;
    reasonRequired: string;
    ineligible: string;
  },
): Step2Issue | null {
  if (!flight.passenger.trim()) return { field: "passenger", message: messages.passengerRequired };
  if (!flight.flight.trim()) return { field: "flight", message: messages.flightRequired };
  if (!flight.routeFrom.trim()) return { field: "routeFrom", message: messages.departureRequired };
  if (!flight.routeTo.trim()) return { field: "routeTo", message: messages.arrivalRequired };
  if (!flight.date.trim()) return { field: "date", message: messages.dateRequired };

  if (flight.hadConnectingFlight === null || flight.hadConnectingFlight === undefined) {
    return { field: "connecting", message: messages.connectingRequired };
  }
  if (flight.hadConnectingFlight === true) {
    const first = flight.connectingFlights?.[0];
    if (!first?.airport.trim()) {
      return { field: "connectingAirport", message: messages.connectingDetailsRequired };
    }
    if (!first.flightNumber.trim()) {
      return { field: "connectingFlight", message: messages.connectingDetailsRequired };
    }
  }

  if (flight.status === "Unknown") return { field: "disruptionType", message: messages.typeRequired };
  if (flight.status === "Delayed" && !flight.delayDuration) return { field: "delay", message: messages.delayRequired };
  if (flight.status === "Cancelled" && !flight.cancellationNotice) {
    return { field: "notice", message: messages.noticeRequired };
  }
  if (
    (flight.status === "Delayed" && flight.delayDuration === "less_than_3") ||
    (flight.status === "Cancelled" && flight.cancellationNotice === "14 days or more")
  ) {
    return { field: "ineligible", message: messages.ineligible };
  }
  if (!flight.disruptionReason) return { field: "reason", message: messages.reasonRequired };
  return null;
}

function prefillFromClaimReturn(snapshot: ClaimReturnSnapshot): ClaimResumePrefill {
  return {
    formSessionId: snapshot.formSessionId,
    odooLeadId: snapshot.odooLeadId,
    signedName: snapshot.signedName,
    contactEmail: snapshot.contactEmail,
    contactPhone: snapshot.contactPhone,
    additionalPassengers: snapshot.additionalPassengers,
    signingPassengerIndex: snapshot.signingPassengerIndex,
    signingDate: snapshot.signingDate,
    signaturePreview: snapshot.signaturePreview,
    documentSignatures: snapshot.documentSignatures,
  };
}

export default function HeroClaimForm() {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const tStep1 = useTranslations("claim.step1");
  const tStep2 = useTranslations("claim.step2");
  const tDisruption = useTranslations("claim.disruption");
  const tConnecting = useTranslations("claim.connecting");
  const tStep3 = useTranslations("claim.step3");
  const tResume = useTranslations("claim.resume");
  const tSteps = useTranslations("claim.steps");

  const [step, setStep] = useState<ClaimStep>(1);
  const [entryMode, setEntryMode] = useState<ClaimEntryMode | null>(null);
  const [resumeToken, setResumeToken] = useState<string | null>(null);
  const [resumePrefill, setResumePrefill] = useState<ClaimResumePrefill | null>(null);
  const [resumeNotice, setResumeNotice] = useState<string | null>(null);
  const [isResuming, setIsResuming] = useState(false);
  const [upload, setUpload] = useState<ClaimUploadMeta | null>(null);
  const [flight, setFlight] = useState<ClaimFlightData>(EMPTY_FLIGHT);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [step2Error, setStep2Error] = useState<Step2Issue | null>(null);
  const [boardingPassFile, setBoardingPassFile] = useState<File | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [stepHint, setStepHint] = useState<string | null>(null);
  const advancingRef = useRef(false);

  const resetClaim = useCallback(() => {
    clearClaimReturn();
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
    setStepHint(null);
    setBoardingPassFile(null);
    setResumeToken(null);
    setResumePrefill(null);
    setResumeNotice(null);
  }, [upload?.previewUrl]);

  useEffect(() => {
    const token = readClaimResumeTokenFromLocation();
    if (!token) {
      return;
    }

    void loadStep3Panel();
    let cancelled = false;
    setIsResuming(true);
    setResumeNotice(tResume("loading"));

    void fetch(`/api/claim/resume/${token}`)
      .then(async (response) => {
        const data = (await response.json()) as {
          draft?: {
            formSessionId: string;
            odooLeadId: number | null;
            signedName: string;
            contactEmail: string;
            contactPhone: string;
            additionalPassengers: ClaimPassenger[];
            flight: ClaimFlightData;
          };
          error?: string;
        };

        if (cancelled) return;

        if (!response.ok || !data.draft) {
          setResumeNotice(response.status === 410 ? tResume("expired") : tResume("invalid"));
          return;
        }

        setFlight(normalizeFlightData(data.draft.flight));
        setEntryMode("manual");
        setResumeToken(token);
        setResumePrefill({
          formSessionId: data.draft.formSessionId,
          odooLeadId: data.draft.odooLeadId,
          signedName: data.draft.signedName,
          contactEmail: data.draft.contactEmail,
          contactPhone: data.draft.contactPhone,
          additionalPassengers: data.draft.additionalPassengers ?? [],
        });
        setIsEditing(false);
        setStep(3);
        setResumeNotice(tResume("loaded"));
        document.getElementById("claim")?.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch(() => {
        if (!cancelled) {
          setResumeNotice(tResume("invalid"));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsResuming(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [tResume]);

  useLayoutEffect(() => {
    const snapshot = readClaimResumeTokenFromLocation() ? null : takeClaimContinue();
    stripClaimContinueQuery();
    document.documentElement.classList.remove(CLAIM_CONTINUE_PENDING_CLASS);
    if (!snapshot) return;

    setFlight(normalizeFlightData(snapshot.flight));
    setEntryMode(snapshot.entryMode);
    setResumePrefill(prefillFromClaimReturn(snapshot));
    setIsEditing(false);
    setStep(3);
    void loadStep3Panel();
    document.getElementById("claim")?.scrollIntoView({ behavior: "auto", block: "start" });
    const handoffTimer = window.setTimeout(releaseClaimContinueHandoff, 0);
    return () => window.clearTimeout(handoffTimer);
  }, []);

  const handleExtract = async (file: File) => {
    void loadStep2Panel();
    setExtractError(null);
    setIsExtracting(true);

    const advanceWithFile = () => {
      setEntryMode("upload");
      setBoardingPassFile(file);
      setUpload(buildUploadMeta(file));
      setStep(2);
      document.getElementById("claim")?.scrollIntoView({ behavior: "auto", block: "start" });
    };

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/claim/extract-boarding-pass", {
        method: "POST",
        body: formData,
      });

      const { ok, status, data, raw } = await readJsonSafe(response);
      const flightData = data.flight as ClaimFlightData | undefined;
      const warning = typeof data.warning === "string" ? data.warning : null;
      const apiError = typeof data.error === "string" ? data.error : undefined;

      if (!ok) {
        const code = classifyClaimFailure(status, raw, apiError);
        if (code === "file_too_large" || code === "payload_too_large") {
          setExtractError(tStep1("errors.tooLarge"));
          return;
        }
        if (code === "unsupported_type") {
          setExtractError(tStep1("errors.unsupportedType"));
          return;
        }
        advanceWithFile();
        setFlight(EMPTY_FLIGHT);
        setIsEditing(true);
        setExtractError(tStep1("errors.extractFailed"));
        return;
      }

      advanceWithFile();
      try {
        setFlight(normalizeFlightData(flightData));
      } catch (normalizeError) {
        console.error("[HeroClaimForm] normalizeFlightData failed:", normalizeError);
        setFlight(EMPTY_FLIGHT);
        setIsEditing(true);
        setExtractError(tStep1("errors.extractFailed"));
        return;
      }
      setIsEditing(Boolean(warning));
      setExtractError(warning);
    } catch (error) {
      const technical = error instanceof Error ? error.message : "";
      if (/unexpected token|not valid json|request entity too large/i.test(technical)) {
        setExtractError(tStep1("errors.tooLarge"));
        return;
      }
      advanceWithFile();
      setFlight(EMPTY_FLIGHT);
      setIsEditing(true);
      setExtractError(tStep1("errors.somethingWentWrong"));
    } finally {
      setIsExtracting(false);
    }
  };

  const handleDisruptionChoice = (status: "Delayed" | "Cancelled") => {
    void loadStep2Panel();
    if (advancingRef.current) return;
    advancingRef.current = true;
    setIsAdvancing(true);
    startTransition(() => {
      setEntryMode("manual");
      setBoardingPassFile(null);
      setUpload(null);
      setFlight(
        normalizeFlightData({
          status,
          delay: status === "Cancelled" ? "more_than_3" : "",
        }),
      );
      setExtractError(null);
      setIsEditing(true);
      setStep(2);
      setIsAdvancing(false);
      advancingRef.current = false;
      document.getElementById("claim")?.scrollIntoView({ behavior: "auto", block: "start" });
    });
  };

  const handleContinueToStep3 = () => {
    const error = validateStep2(flight, {
      passengerRequired: tStep2("errors.passengerRequired"),
      flightRequired: tStep2("errors.flightRequired"),
      departureRequired: tStep2("errors.departureRequired"),
      arrivalRequired: tStep2("errors.arrivalRequired"),
      dateRequired: tStep2("errors.dateRequired"),
      typeRequired: tDisruption("errors.typeRequired"),
      connectingRequired: tConnecting("errors.connectingRequired"),
      connectingDetailsRequired: tConnecting("errors.connectingDetailsRequired"),
      delayRequired: tDisruption("errors.delayRequired"),
      noticeRequired: tDisruption("errors.noticeRequired"),
      reasonRequired: tDisruption("errors.reasonRequired"),
      ineligible: tDisruption("ineligibleTitle"),
    });
    if (error) {
      setStep2Error(error);
      if (
        error.field === "passenger" ||
        error.field === "flight" ||
        error.field === "routeFrom" ||
        error.field === "routeTo" ||
        error.field === "date"
      ) {
        setIsEditing(true);
      }
      return;
    }
    if (advancingRef.current) return;
    advancingRef.current = true;
    setIsAdvancing(true);
    void loadStep3Panel();
    startTransition(() => {
      setStep2Error(null);
      setIsEditing(false);
      setStep(3);
      setIsAdvancing(false);
      advancingRef.current = false;
      document.getElementById("claim")?.scrollIntoView({ behavior: "auto", block: "start" });
    });
  };

  useEffect(() => {
    setStepHint(null);
  }, [step]);

  const handleStepSelect = (target: ClaimStep) => {
    if (isResuming || isAdvancing || target === step) return;
    if (target < step) {
      setStep(target);
      return;
    }
    if (step === 2) {
      handleContinueToStep3();
      return;
    }
    setStepHint(tSteps("finishThisStep"));
  };

  const handleClaimSubmit = async (payload: ClaimSubmitPayload) => {
    if (!entryMode) {
      throw new Error(tStep3("errors.sessionExpired"));
    }

    const formData = new FormData();
    formData.append("entryMode", entryMode);
    formData.append("signedName", payload.signedName);
    formData.append("contactEmail", payload.contactEmail);
    formData.append("contactPhone", payload.contactPhone);
    formData.append("flight", JSON.stringify(flight));
    formData.append("acceptedDocuments", JSON.stringify(payload.acceptedDocuments));
    formData.append("documentSignatures", JSON.stringify(payload.documentSignatures));
    formData.append("additionalPassengers", JSON.stringify(payload.additionalPassengers));
    formData.append("userAgent", navigator.userAgent);
    formData.append("locale", locale);
    if (payload.odooLeadId) {
      formData.append("odooLeadId", String(payload.odooLeadId));
    }
    formData.append("formSessionId", payload.formSessionId);
    formData.append("attribution", JSON.stringify(readClaimAttribution()));
    if (resumeToken) {
      formData.append("resumeToken", resumeToken);
    }

    if (boardingPassFile) {
      formData.append("file", boardingPassFile);
    }
    if (payload.claimDocuments.passportCopy) {
      formData.append("passportCopy", payload.claimDocuments.passportCopy);
    }
    if (payload.claimDocuments.bookingConfirmation) {
      formData.append("bookingConfirmation", payload.claimDocuments.bookingConfirmation);
    }
    if (payload.claimDocuments.expensesReceipts) {
      formData.append("expensesReceipts", payload.claimDocuments.expensesReceipts);
    }
    for (const file of payload.claimDocuments.otherDocuments ?? []) {
      formData.append("otherDocuments", file);
    }

    const uploadFiles = [
      boardingPassFile ? { name: boardingPassFile.name, size: boardingPassFile.size } : null,
      payload.claimDocuments.passportCopy
        ? { name: payload.claimDocuments.passportCopy.name, size: payload.claimDocuments.passportCopy.size }
        : null,
      payload.claimDocuments.bookingConfirmation
        ? {
            name: payload.claimDocuments.bookingConfirmation.name,
            size: payload.claimDocuments.bookingConfirmation.size,
          }
        : null,
      payload.claimDocuments.expensesReceipts
        ? {
            name: payload.claimDocuments.expensesReceipts.name,
            size: payload.claimDocuments.expensesReceipts.size,
          }
        : null,
      ...(payload.claimDocuments.otherDocuments ?? []).map((file) => ({ name: file.name, size: file.size })),
    ].filter((file): file is { name: string; size: number } => Boolean(file));
    const oversized = oversizedClaimFiles(uploadFiles);
    if (oversized.length > 0) {
      throw new ClaimSubmitError(
        "payload_too_large",
        oversized.map((file) => file.name),
      );
    }

    const response = await fetch("/api/claim/submit", {
      method: "POST",
      body: formData,
    });

    const { ok, status, data, raw } = await readJsonSafe(response);
    const trackingNumber = typeof data.trackingNumber === "string" ? data.trackingNumber : undefined;
    const claimStatus = data.status as ClaimStatus | undefined;
    const apiError = typeof data.error === "string" ? data.error : undefined;

    if (!ok || !trackingNumber || !claimStatus) {
      const code = classifyClaimFailure(status, raw, apiError);
      throw new ClaimSubmitError(
        code,
        uploadFiles.map((file) => file.name),
      );
    }

    clearClaimReturn();
    return {
      trackingNumber,
      status: claimStatus,
    };
  };

  const isExpanded = step > 1;

  return (
    <div
      data-clarity-unmask="true"
      data-expanded={isExpanded ? "true" : "false"}
      className={`claim-form-shell bg-[#fefefe] mx-auto text-left overflow-x-clip ${
        isExpanded
          ? "rounded-[24px] xl:rounded-[38px] shadow-[0_1px_1px_1px_rgba(0,0,0,0.05)] max-w-full lg:max-w-[960px] xl:max-w-[1550px] w-full"
          : "rounded-[24px] xl:rounded-[32px] max-w-full lg:max-w-[960px] xl:max-w-[1100px] w-full"
      }`}
    >
      <div className="claim-stepper sticky top-16 xl:top-[90px] z-20 flex items-center justify-between gap-3 sm:gap-4 px-6 sm:px-10 xl:px-14 pt-6 sm:pt-7 xl:pt-8 pb-3 sm:pb-4 bg-[#fefefe]">
        <AssistantPill label={tCommon("assistantName")} />
        <ClaimStepIndicator step={step} onSelect={handleStepSelect} />
      </div>

      {stepHint && (
        <p className="px-6 sm:px-10 xl:px-14 pb-3 text-sm text-[#1f3664] text-left" role="status">
          {stepHint}
        </p>
      )}

      {resumeNotice && (
        <p className="px-6 sm:px-10 xl:px-14 pb-3 text-sm text-[#1f3664] text-left">{resumeNotice}</p>
      )}

      {step === 1 && !isResuming && (
        <Step1Upload
          isExtracting={isExtracting}
          isAdvancing={isAdvancing}
          extractError={extractError}
          onExtract={handleExtract}
          onChooseDisruption={handleDisruptionChoice}
        />
      )}

      {step > 1 && entryMode && (
        <div className="px-4 pb-4 xl:px-6 xl:pb-6">
          <div className={`grid grid-cols-1 gap-4 xl:gap-6 ${entryMode === "upload" ? "xl:grid-cols-[minmax(0,489px)_1fr]" : ""}`}>
            {entryMode === "upload" && (
              <ClaimSidebar entryMode={entryMode} upload={upload} flight={flight} />
            )}
            {step === 2 ? (
              <Step2Panel
                flight={flight}
                isEditing={isEditing}
                isAdvancing={isAdvancing}
                validationError={step2Error}
                extractWarning={extractError}
                onFlightChange={(next) => {
                  setFlight(next);
                  setStep2Error(null);
                }}
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
                resumePrefill={resumePrefill}
                attachedUpload={
                  boardingPassFile
                    ? { name: boardingPassFile.name, size: boardingPassFile.size }
                    : null
                }
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
