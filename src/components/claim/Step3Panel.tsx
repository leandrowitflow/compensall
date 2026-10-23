"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent, type TouchEvent } from "react";
import { CLAIM_RESUME_EMAIL_IDLE_MS } from "@/lib/claim-draft-token";
import { CLAIM_DOCUMENTS } from "@/lib/claim-documents";
import {
  EMPTY_PASSENGER,
  type ClaimFlightData,
  type ClaimPassenger,
  type ClaimStatus,
} from "@/lib/claim-types";
import { FieldIssue, focusClaimField } from "@/components/claim/FieldIssue";
import { ACTION_BTN, FIELD_INPUT, FIELD_LABEL, fieldControlClass } from "@/components/claim/claim-ui";
import PhoneInputField from "@/components/claim/PhoneInputField";
import PowerOfAttorneyDocument from "@/components/claim/PowerOfAttorneyDocument";
import { useRouter } from "@/i18n/routing";
import { claimDocumentUrl, markClaimReloadRestore, saveClaimReturn, type ClaimReturnSignature } from "@/lib/claim-return";
import { readClaimAttribution } from "@/lib/claim-attribution-client";
import { type ContactIssue } from "@/lib/claim-form-issues";
import { formatFileSize } from "@/lib/claim-types";
import {
  isClaimSubmitError,
  oversizedClaimFiles,
  type ClaimSubmitError,
} from "@/lib/claim-upload-limits";
import { prepareClaimFile } from "@/lib/prepare-claim-file";
import { validateBoardingPassFile } from "@/lib/boarding-pass-file";
import { storeEnhancedConversionUserData } from "@/lib/enhanced-conversion";
import { gtmId } from "@/lib/gtm";
import { afterNextPaint } from "@/lib/after-next-paint";
import { formatPoaDate } from "@/lib/poa-content";
import { isBlankOrValidClaimPhone, isValidClaimPhone, toE164Phone } from "@/lib/phone";

const DRAFT_HEARTBEAT_MS = 60_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SIGNATURE_BYTES = 800;
const MAX_PASSENGERS = 10;
const POA_DOCUMENT_ID = CLAIM_DOCUMENTS[0]!.id;

export type ClaimDocumentSignaturePayload = {
  documentId: string;
  passengerIndex: number;
  passengerName: string;
  signatureDataUrl: string;
  signedAt: string;
  token: string;
  signatureHash: string;
};

export type ClaimDocumentsPayload = {
  passportCopy?: File | null;
  bookingConfirmation?: File | null;
  expensesReceipts?: File | null;
  otherDocuments?: File[];
};

export type ClaimSubmitPayload = {
  signedName: string;
  contactEmail: string;
  contactPhone: string;
  acceptedDocuments: string[];
  documentSignatures: ClaimDocumentSignaturePayload[];
  additionalPassengers: ClaimPassenger[];
  claimDocuments: ClaimDocumentsPayload;
  additionalDocuments?: File[];
  odooLeadId?: number | null;
  formSessionId: string;
};

export type ClaimResumePrefill = {
  formSessionId: string;
  odooLeadId: number | null;
  signedName: string;
  contactEmail: string;
  contactPhone: string;
  additionalPassengers: ClaimPassenger[];
  signingPassengerIndex?: number;
  signingDate?: string;
  signaturePreview?: string | null;
  documentSignatures?: ClaimReturnSignature[];
};

function signatureRecord(
  signatures: ClaimReturnSignature[] | undefined,
): Record<string, ClaimDocumentSignaturePayload> {
  const record: Record<string, ClaimDocumentSignaturePayload> = {};
  for (const signature of signatures ?? []) {
    record[`${signature.documentId}:${signature.passengerIndex}`] = signature;
  }
  return record;
}

type Step3PanelProps = {
  flight: ClaimFlightData;
  entryMode: "upload" | "manual";
  locale: string;
  resumePrefill?: ClaimResumePrefill | null;
  attachedUpload?: { name: string; size: number } | null;
  onDelete: () => void;
  onSubmit: (payload: ClaimSubmitPayload) => Promise<{ trackingNumber: string; status: ClaimStatus }>;
};

type WizardPhase = "contact" | "documents" | "sign";

function createSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function hasInk(dataUrl: string): boolean {
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) return false;
  const base64 = dataUrl.slice(commaIndex + 1);
  return Math.floor((base64.length * 3) / 4) > MIN_SIGNATURE_BYTES;
}

function FileUploadField({
  id,
  label,
  hint,
  file,
  error,
  marked = false,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  file: File | null;
  error?: string | null;
  marked?: boolean;
  onChange: (file: File | null) => void;
}) {
  const invalid = Boolean(error) || marked;
  return (
    <div
      id={`${id}-field`}
      className={`scroll-mt-28 bg-white border rounded-xl p-4 space-y-2 ${invalid ? "border-[#e82828]" : "border-[#d5e0f9]"}`}
    >
      <label className={FIELD_LABEL} htmlFor={id}>
        {label}
      </label>
      <p className="text-[#7b8094] text-xs leading-relaxed">{hint}</p>
      <input
        id={id}
        type="file"
        accept="image/*,.pdf,application/pdf"
        className="block w-full text-sm text-[#1f3664] file:mr-3 file:rounded-lg file:border-0 file:bg-[#2669f3] file:px-3 file:py-2 file:text-sm file:font-bold file:text-white"
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => {
          const selected = event.target.files?.[0] ?? null;
          event.target.value = "";
          onChange(selected);
        }}
        {...gtmId(`claim_step3_upload_${id.replace(/-/g, "_")}`)}
      />
      {file && <p className="text-[#7b8094] text-xs">{file.name}</p>}
      <FieldIssue id={`${id}-error`} message={error} />
    </div>
  );
}

export default function Step3Panel({
  flight,
  entryMode,
  locale,
  resumePrefill,
  attachedUpload = null,
  onDelete,
  onSubmit,
}: Step3PanelProps) {
  const t = useTranslations("claim.step3");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const openingFullPageRef = useRef(false);

  const [phase, setPhase] = useState<WizardPhase>(
    resumePrefill?.contactEmail ? "sign" : "contact",
  );
  const [signedName, setSignedName] = useState(resumePrefill?.signedName.trim() || flight.passenger);
  const [contactEmail, setContactEmail] = useState(resumePrefill?.contactEmail ?? "");
  const [contactPhone, setContactPhone] = useState(resumePrefill?.contactPhone ?? "");
  const [contactIssue, setContactIssue] = useState<ContactIssue | null>(null);
  const [additionalPassengers, setAdditionalPassengers] = useState<ClaimPassenger[]>(
    resumePrefill?.additionalPassengers ?? [],
  );

  const [passportCopy, setPassportCopy] = useState<File | null>(null);
  const [bookingConfirmation, setBookingConfirmation] = useState<File | null>(null);
  const [expensesReceipts, setExpensesReceipts] = useState<File | null>(null);
  const [otherDocuments, setOtherDocuments] = useState<File[]>([]);
  const [docErrors, setDocErrors] = useState<Partial<Record<"passport" | "booking" | "expenses" | "other", string>>>({});
  const [forcedPayload, setForcedPayload] = useState(false);

  const [sessionId] = useState(resumePrefill?.formSessionId || createSessionId);
  const [odooLeadId, setOdooLeadId] = useState<number | null>(resumePrefill?.odooLeadId ?? null);
  const restoredSignatures = signatureRecord(resumePrefill?.documentSignatures);
  const [docSignatures, setDocSignatures] = useState(restoredSignatures);
  const docSignaturesRef = useRef(restoredSignatures);
  const [signingPassengerIndex, setSigningPassengerIndex] = useState(
    () => resumePrefill?.signingPassengerIndex ?? 0,
  );
  const [signingDate, setSigningDate] = useState(
    () => resumePrefill?.signingDate || new Date().toISOString().slice(0, 10),
  );
  const [signaturePreview, setSignaturePreview] = useState<string | null>(
    () => resumePrefill?.signaturePreview ?? null,
  );
  const keepRestoredSignature = useRef(Boolean(resumePrefill?.signaturePreview));
  const [signError, setSignError] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const documentViewerRef = useRef<HTMLDivElement>(null);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);
  const [isSyncingLead, setIsSyncingLead] = useState(false);

  const uploadName = attachedUpload?.name ?? "";
  const uploadSize = attachedUpload?.size ?? 0;

  const selectedFiles = useMemo(() => {
    const files: { name: string; size: number }[] = [];
    if (uploadSize > 0) files.push({ name: uploadName, size: uploadSize });
    if (passportCopy) files.push({ name: passportCopy.name, size: passportCopy.size });
    if (bookingConfirmation) files.push({ name: bookingConfirmation.name, size: bookingConfirmation.size });
    if (expensesReceipts) files.push({ name: expensesReceipts.name, size: expensesReceipts.size });
    for (const file of otherDocuments) files.push({ name: file.name, size: file.size });
    return files;
  }, [uploadName, uploadSize, passportCopy, bookingConfirmation, expensesReceipts, otherDocuments]);

  const payloadNotice = useMemo(() => {
    const oversized = oversizedClaimFiles(selectedFiles);
    if (oversized.length === 0 && !forcedPayload) return null;
    const named = oversized.length > 0 ? oversized : selectedFiles;
    const names = named.map((file) => file.name).filter(Boolean);
    const total = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    return {
      names,
      message: t("errors.payloadTooLarge", {
        size: formatFileSize(total),
        names: names.join(", "),
      }),
    };
  }, [forcedPayload, selectedFiles, t]);

  useEffect(() => {
    setForcedPayload(false);
  }, [passportCopy, bookingConfirmation, expensesReceipts, otherDocuments, uploadName, uploadSize]);

  useEffect(() => {
    if (!payloadNotice || phase !== "documents") return;
    focusClaimField("claim-documents-error");
  }, [payloadNotice?.message, phase]);

  useEffect(() => {
    if (!contactIssue || phase !== "contact") return;
    focusClaimField(contactIssue.field);
  }, [contactIssue, phase]);

  const currentDoc = CLAIM_DOCUMENTS[0]!;
  const allPassengers = useMemo(() => {
    const primaryName = signedName.trim() || flight.passenger.trim();
    const primary: ClaimPassenger = {
      firstName: primaryName.split(/\s+/)[0] || primaryName,
      lastName: primaryName.split(/\s+/).slice(1).join(" "),
      email: contactEmail.trim(),
      phone: contactPhone.trim(),
    };
    return [primary, ...additionalPassengers];
  }, [additionalPassengers, contactEmail, contactPhone, flight.passenger, signedName]);

  const activePassenger = allPassengers[signingPassengerIndex] ?? allPassengers[0]!;
  const activePassengerName =
    signingPassengerIndex === 0
      ? signedName.trim() || flight.passenger.trim()
      : `${activePassenger.firstName} ${activePassenger.lastName}`.trim();

  const poaFullPageHref = useMemo(() => {
    const params = new URLSearchParams();
    const fields: Array<[string, string]> = [
      ["name", activePassengerName],
      ["flight", flight.flight.trim()],
      ["from", flight.routeFrom.trim()],
      ["to", flight.routeTo.trim()],
      ["flightDate", flight.date.trim()],
      ["signed", signingDate],
    ];
    for (const [key, value] of fields) {
      if (value) params.set(key, value);
    }
    const query = params.toString();
    return query ? `${currentDoc.href}?${query}` : currentDoc.href;
  }, [
    activePassengerName,
    currentDoc.href,
    flight.date,
    flight.flight,
    flight.routeFrom,
    flight.routeTo,
    signingDate,
  ]);
  const fullPageUrl = claimDocumentUrl(locale, poaFullPageHref);

  const rememberClaimForFullPage = () => {
    saveClaimReturn({
      entryMode,
      flight,
      formSessionId: sessionId,
      odooLeadId,
      signedName,
      contactEmail,
      contactPhone,
      additionalPassengers,
      signingPassengerIndex,
      signingDate,
      signaturePreview,
      documentSignatures: Object.values(docSignaturesRef.current),
    });
    markClaimReloadRestore();
  };

  const openFullPoa = (event: MouseEvent<HTMLAnchorElement>) => {
    rememberClaimForFullPage();
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const opened = window.open(fullPageUrl, "_blank");
    if (!opened) {
      openingFullPageRef.current = true;
      window.location.assign(fullPageUrl);
    }
  };

  useEffect(() => {
    docSignaturesRef.current = docSignatures;
  }, [docSignatures]);

  useEffect(() => {
    if (phase === "contact" || trackingNumber) {
      return;
    }

    const lastActivityAt = { current: Date.now() };
    let lastTouchAt = 0;
    let idleEmailSent = false;

    const postResumeEmail = () => {
      if (openingFullPageRef.current) return;
      void fetch("/api/claim/send-resume-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formSessionId: sessionId }),
        keepalive: true,
      }).catch(() => undefined);
    };

    const touchDraft = () => {
      const now = Date.now();
      if (now - lastTouchAt < DRAFT_HEARTBEAT_MS) {
        return;
      }
      lastTouchAt = now;
      void fetch("/api/claim/draft-heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formSessionId: sessionId }),
        keepalive: true,
      }).catch(() => undefined);
    };

    const markActivity = () => {
      lastActivityAt.current = Date.now();
      touchDraft();
    };

    const sendIfIdle = () => {
      if (idleEmailSent || Date.now() - lastActivityAt.current < CLAIM_RESUME_EMAIL_IDLE_MS) {
        return;
      }
      idleEmailSent = true;
      postResumeEmail();
    };

    markActivity();
    const intervalId = window.setInterval(sendIfIdle, DRAFT_HEARTBEAT_MS);
    const activityEvents = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    for (const eventName of activityEvents) {
      document.addEventListener(eventName, markActivity, { passive: true, capture: true });
    }
    window.addEventListener("pagehide", postResumeEmail);
    return () => {
      window.clearInterval(intervalId);
      for (const eventName of activityEvents) {
        document.removeEventListener(eventName, markActivity, { capture: true });
      }
      window.removeEventListener("pagehide", postResumeEmail);
    };
  }, [phase, sessionId, trackingNumber]);

  useEffect(() => {
    const element = documentViewerRef.current;
    if (!element || phase !== "sign") return;
    element.scrollTop = 0;
    if (keepRestoredSignature.current) {
      keepRestoredSignature.current = false;
      return;
    }
    setSignaturePreview(null);
  }, [phase, signingPassengerIndex]);

  useEffect(() => {
    const preview = resumePrefill?.signaturePreview;
    if (!preview || phase !== "sign") return;
    const image = new Image();
    let cancelled = false;
    image.onload = () => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = preview;
    return () => {
      cancelled = true;
    };
  }, [phase, resumePrefill?.signaturePreview]);

  useEffect(() => {
    document.getElementById("claim")?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [phase]);

  const getCanvasPoint = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const beginStroke = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const point = getCanvasPoint(clientX, clientY);
    if (!canvas || !point) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#1f3664";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    isDrawingRef.current = true;
  };

  const continueStroke = (clientX: number, clientY: number) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const point = getCanvasPoint(clientX, clientY);
    if (!canvas || !point) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    refreshSignaturePreview();
  };

  const endStroke = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    refreshSignaturePreview();
  };

  const startDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    beginStroke(event.clientX, event.clientY);
    try {
      canvasRef.current?.setPointerCapture(event.pointerId);
    } catch {
      // Facebook / Instagram WebViews throw "java exception" on pointer capture.
    }
  };

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    continueStroke(event.clientX, event.clientY);
  };

  const stopDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    try {
      canvasRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      // Same WebView bridge — ignore.
    }
    endStroke();
  };

  const startTouchDrawing = (event: TouchEvent<HTMLCanvasElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    event.preventDefault();
    beginStroke(touch.clientX, touch.clientY);
  };

  const moveTouchDrawing = (event: TouchEvent<HTMLCanvasElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    event.preventDefault();
    continueStroke(touch.clientX, touch.clientY);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignaturePreview(null);
  };

  const refreshSignaturePreview = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setSignaturePreview(canvas.toDataURL("image/png"));
  };

  const updateAdditionalPassenger = (index: number, patch: Partial<ClaimPassenger>) => {
    setAdditionalPassengers((current) =>
      current.map((passenger, passengerIndex) =>
        passengerIndex === index ? { ...passenger, ...patch } : passenger,
      ),
    );
  };

  const handleContinueFromContact = async () => {
    const fail = (issue: ContactIssue) => {
      setContactIssue(issue);
    };
    if (!signedName.trim()) {
      fail({ field: "signed-name", message: t("errors.nameRequired") });
      return;
    }
    if (!contactEmail.trim() || !EMAIL_PATTERN.test(contactEmail.trim())) {
      fail({ field: "contact-email", message: t("errors.emailInvalid") });
      return;
    }
    if (!isBlankOrValidClaimPhone(contactPhone)) {
      fail({ field: "contact-phone", message: t("errors.phoneInvalid") });
      return;
    }

    for (const [index, passenger] of additionalPassengers.entries()) {
      if (!passenger.firstName.trim() || !passenger.lastName.trim()) {
        fail({
          field: `passenger-${index}-first`,
          message: t("errors.passengerNameRequired", { number: index + 2 }),
        });
        return;
      }
      if (passenger.email.trim() && !EMAIL_PATTERN.test(passenger.email.trim())) {
        fail({
          field: `passenger-${index}-email`,
          message: t("errors.passengerEmailInvalid", { number: index + 2 }),
        });
        return;
      }
      if (passenger.phone.trim() && !isValidClaimPhone(passenger.phone.trim())) {
        fail({
          field: `passenger-${index}-phone`,
          message: t("errors.passengerPhoneInvalid", { number: index + 2 }),
        });
        return;
      }
    }

    const normalizedPhone = toE164Phone(contactPhone);
    setContactPhone(normalizedPhone);

    setIsSyncingLead(true);
    await afterNextPaint();
    try {
      const response = await fetch("/api/claim/odoo-partial-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formSessionId: sessionId,
          signedName: signedName.trim(),
          contactEmail: contactEmail.trim(),
          contactPhone: normalizedPhone,
          entryMode,
          flight,
          additionalPassengers,
          locale,
          attribution: readClaimAttribution(),
          odooLeadId,
          step: "contact_confirmed",
        }),
      });

      const data = (await response.json()) as { odooLeadId?: number; error?: string };
      if (response.ok && data.odooLeadId) {
        setOdooLeadId(data.odooLeadId);
      }
    } catch {
      // Non-blocking
    } finally {
      setIsSyncingLead(false);
      setSigningPassengerIndex(0);
      setPhase("sign");
    }
  };

  const handleSignDocument = async () => {
    setSignError(null);
    const canvas = canvasRef.current;
    const dataUrl = canvas?.toDataURL("image/png") ?? "";
    if (!hasInk(dataUrl)) {
      setSignError(t("errors.signatureRequired"));
      return;
    }

    const signedAt = new Date().toISOString();
    setIsSigning(true);
    try {
      const response = await fetch("/api/claim/sign-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          documentId: POA_DOCUMENT_ID,
          signatureDataUrl: dataUrl,
          signedAt,
        }),
      });

      const raw = await response.text();
      let data: { token?: string; signatureHash?: string } = {};
      try {
        data = raw ? (JSON.parse(raw) as { token?: string; signatureHash?: string }) : {};
      } catch {
        setSignError(t("errors.signConnectionError"));
        return;
      }
      if (!response.ok || !data.token || !data.signatureHash) {
        setSignError(t("errors.signFailed"));
        return;
      }

      const signed: ClaimDocumentSignaturePayload = {
        documentId: POA_DOCUMENT_ID,
        passengerIndex: signingPassengerIndex,
        passengerName: activePassengerName,
        signatureDataUrl: dataUrl,
        signedAt,
        token: data.token,
        signatureHash: data.signatureHash,
      };

      const key = `${POA_DOCUMENT_ID}:${signingPassengerIndex}`;
      const updated = { ...docSignaturesRef.current, [key]: signed };
      docSignaturesRef.current = updated;
      setDocSignatures(updated);
      clearSignature();

      const nextIndex = signingPassengerIndex + 1;
      if (nextIndex < allPassengers.length) {
        setSigningPassengerIndex(nextIndex);
        return;
      }
      setPhase("documents");
    } catch {
      setSignError(t("errors.signConnectionError"));
    } finally {
      setIsSigning(false);
    }
  };

  const showSubmitFailure = (error: ClaimSubmitError) => {
    setSubmitError(null);
    switch (error.code) {
      case "payload_too_large":
      case "file_too_large":
        setForcedPayload(true);
        setPhase("documents");
        return;
      case "unsupported_type":
        setPhase("documents");
        setDocErrors((current) => ({
          ...current,
          other: t("errors.unsupportedFile", { name: error.names[0] || t("docs.other") }),
        }));
        return;
      case "duplicate_claim":
        setSubmitError(t("errors.duplicateClaim"));
        return;
      case "name_required":
        setPhase("contact");
        setContactIssue({ field: "signed-name", message: t("errors.nameRequired") });
        return;
      case "email_invalid":
        setPhase("contact");
        setContactIssue({ field: "contact-email", message: t("errors.emailInvalid") });
        return;
      case "phone_invalid":
        setPhase("contact");
        setContactIssue({ field: "contact-phone", message: t("errors.phoneInvalid") });
        return;
      case "signature_invalid":
        setPhase("sign");
        setSignError(t("errors.signFailed"));
        return;
      case "submit_failed":
        setSubmitError(t("errors.submitFailed"));
        return;
      default: {
        const unreachable: never = error.code;
        setSubmitError(t("errors.submitFailed"));
        return unreachable;
      }
    }
  };

  const acceptDocument = async (
    field: "passport" | "booking" | "expenses",
    fieldId: string,
    file: File | null,
    setFile: (next: File | null) => void,
  ) => {
    if (!file) {
      setFile(null);
      setDocErrors((current) => ({ ...current, [field]: undefined }));
      return;
    }
    const prepared = await prepareClaimFile(file);
    const issue = validateBoardingPassFile(prepared);
    if (issue === "unsupportedType") {
      setFile(null);
      setDocErrors((current) => ({
        ...current,
        [field]: t("errors.unsupportedFile", { name: file.name }),
      }));
      focusClaimField(fieldId);
      return;
    }
    if (issue === "tooLarge") {
      setFile(null);
      setDocErrors((current) => ({
        ...current,
        [field]: t("errors.fileTooLarge", { name: file.name, size: formatFileSize(file.size) }),
      }));
      focusClaimField(fieldId);
      return;
    }
    setFile(prepared);
    setDocErrors((current) => ({ ...current, [field]: undefined }));
  };

  const acceptOtherDocuments = async (files: File[]) => {
    const prepared: File[] = [];
    const problems: string[] = [];
    for (const file of files.slice(0, 6)) {
      const next = await prepareClaimFile(file);
      const issue = validateBoardingPassFile(next);
      if (issue === "unsupportedType") {
        problems.push(t("errors.unsupportedFile", { name: file.name }));
        continue;
      }
      if (issue === "tooLarge") {
        problems.push(t("errors.fileTooLarge", { name: file.name, size: formatFileSize(file.size) }));
        continue;
      }
      prepared.push(next);
    }
    setOtherDocuments(prepared);
    setDocErrors((current) => ({ ...current, other: problems.join(" ") || undefined }));
    if (problems.length > 0) focusClaimField("other-documents-field");
  };

  const handleSubmit = async () => {
    if (payloadNotice || docErrors.passport || docErrors.booking || docErrors.expenses || docErrors.other) {
      setPhase("documents");
      setSubmitError(null);
      return;
    }
    setSubmitError(null);
    const documentSignatures = allPassengers
      .map((_, index) => docSignatures[`${POA_DOCUMENT_ID}:${index}`])
      .filter((signature): signature is ClaimDocumentSignaturePayload => Boolean(signature));

    if (documentSignatures.length !== allPassengers.length) {
      setSubmitError(t("errors.signBeforeSubmit"));
      return;
    }

    const normalizedPhone = toE164Phone(contactPhone);
    const normalizedPassengers = additionalPassengers.map((passenger) => ({
      ...passenger,
      phone: passenger.phone.trim() ? toE164Phone(passenger.phone) : "",
    }));
    setContactPhone(normalizedPhone);
    setAdditionalPassengers(normalizedPassengers);

    setIsSubmitting(true);
    try {
      const result = await onSubmit({
        signedName: signedName.trim(),
        contactEmail: contactEmail.trim(),
        contactPhone: normalizedPhone,
        acceptedDocuments: [POA_DOCUMENT_ID],
        documentSignatures,
        additionalPassengers: normalizedPassengers,
        claimDocuments: {
          passportCopy,
          bookingConfirmation,
          expensesReceipts,
          otherDocuments,
        },
        additionalDocuments: otherDocuments,
        odooLeadId,
        formSessionId: sessionId,
      });
      setTrackingNumber(result.trackingNumber);
      storeEnhancedConversionUserData(result.trackingNumber, {
        name: signedName.trim(),
        email: contactEmail.trim(),
        phone: normalizedPhone,
      });
      router.replace({
        pathname: "/claim/thank-you",
        query: {
          ref: result.trackingNumber,
          mode: entryMode,
          ...(flight.flight.trim() ? { flight: flight.flight.trim() } : {}),
        },
      });
    } catch (error) {
      if (isClaimSubmitError(error)) {
        showSubmitFailure(error);
        return;
      }
      setSubmitError(t("errors.submitFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (trackingNumber) {
    return (
      <div className="border border-[#d5e0f9] rounded-[21px] p-6 sm:p-8 flex flex-col items-center text-center bg-white min-h-[320px] justify-center">
        <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-14 h-14 mb-4 object-contain" />
        <h3 className="font-bold text-[#1f3664] text-xl mb-2">{t("claimSubmitted")}</h3>
        <p className="text-[#1f3664] text-sm sm:text-base max-w-md leading-relaxed mb-4">
          {t("thankYou", { name: signedName, flight: flight.flight })}
        </p>
        <div className="bg-[#f0f3fe] rounded-[14px] px-5 py-4 mb-5 w-full max-w-md">
          <p className="text-[#7b8094] text-xs font-bold uppercase tracking-wide mb-1">{t("trackingNumber")}</p>
          <p className="font-bold text-[#1f3664] text-lg sm:text-xl tracking-wide">{trackingNumber}</p>
        </div>
        <Link
          href={`/track/${trackingNumber}`}
          className="bg-[#2669f3] text-white font-bold px-6 py-3 rounded-[11px] hover:bg-[#1a55d4] transition-colors text-sm sm:text-base"
          {...gtmId("claim_success_track_claim")}
        >
          {t("trackYourClaim")}
        </Link>
        <p className="text-[#7b8094] text-sm mt-4 max-w-md">
          {t("confirmationEmail", { email: contactEmail.trim() })}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[#d5e0f9] rounded-[21px] p-4 sm:p-5 xl:p-6 flex flex-col h-full bg-white min-h-[320px] sm:min-h-[400px]">
      <div className="flex items-start gap-3 mb-6">
        <img src="/assets/claim/claim-ai-icon.svg" alt="" className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 object-contain" />
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-bold text-[#2669f3] text-base sm:text-lg">{tCommon("assistantName")}</p>
            <span className="text-[#7b8094] text-sm">{t("justNow")}</span>
          </div>
          <p className="text-[#1f3664] text-sm sm:text-base mt-2 leading-relaxed">
            {phase === "contact" && (
              <>
                {t("claimReady")}
                <br />
                {t("confirmContact")}
              </>
            )}
            {phase === "sign" &&
              t("readAndSignPassenger", {
                name: activePassengerName,
                current: signingPassengerIndex + 1,
                total: allPassengers.length,
              })}
            {phase === "documents" && t("uploadDocuments")}
          </p>
        </div>
      </div>

      {phase === "contact" && (
        <div className="flex-1 border border-[#d5e0f9] rounded-[14px] bg-[#fafbff] p-4 sm:p-5 mb-4 space-y-4 overflow-y-auto">
          <div>
            <label className={FIELD_LABEL} htmlFor="signed-name">
              {t("fullLegalName")}
            </label>
            <input
              id="signed-name"
              className={fieldControlClass(FIELD_INPUT, contactIssue?.field === "signed-name")}
              value={signedName}
              onChange={(e) => {
                setSignedName(e.target.value);
                if (contactIssue?.field === "signed-name") setContactIssue(null);
              }}
              placeholder={t("namePlaceholder")}
              aria-invalid={contactIssue?.field === "signed-name" || undefined}
              aria-describedby={contactIssue?.field === "signed-name" ? "signed-name-error" : undefined}
            />
            <FieldIssue id="signed-name-error" message={contactIssue?.field === "signed-name" ? contactIssue.message : null} />
          </div>
          <div>
            <label className={FIELD_LABEL} htmlFor="contact-email">
              {t("emailAddress")} <span className="text-[#e82828]">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              className={fieldControlClass(FIELD_INPUT, contactIssue?.field === "contact-email")}
              value={contactEmail}
              onChange={(e) => {
                setContactEmail(e.target.value);
                if (contactIssue?.field === "contact-email") setContactIssue(null);
              }}
              placeholder={t("emailPlaceholder")}
              autoComplete="email"
              aria-invalid={contactIssue?.field === "contact-email" || undefined}
              aria-describedby={contactIssue?.field === "contact-email" ? "contact-email-error" : undefined}
            />
            <FieldIssue id="contact-email-error" message={contactIssue?.field === "contact-email" ? contactIssue.message : null} />
          </div>
          <div>
            <label className={FIELD_LABEL} htmlFor="contact-phone">
              {t("phoneNumber")}
            </label>
            <PhoneInputField
              id="contact-phone"
              value={contactPhone}
              invalid={contactIssue?.field === "contact-phone"}
              onChange={(phone) => {
                setContactPhone(phone);
                if (contactIssue?.field === "contact-phone") setContactIssue(null);
              }}
              placeholder={t("phonePlaceholder")}
              autoComplete="tel"
            />
            <FieldIssue id="contact-phone-error" message={contactIssue?.field === "contact-phone" ? contactIssue.message : null} />
          </div>

          <div className="border-t border-[#d5e0f9] pt-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-[#1f3664] text-sm">{t("otherPassengers")}</p>
                <p className="text-[#7b8094] text-xs mt-1">{t("otherPassengersHint")}</p>
              </div>
              <button
                type="button"
                disabled={additionalPassengers.length >= MAX_PASSENGERS - 1}
                onClick={() =>
                  setAdditionalPassengers((current) =>
                    current.length >= MAX_PASSENGERS - 1 ? current : [...current, { ...EMPTY_PASSENGER }],
                  )
                }
                className="shrink-0 border-2 border-[#2669f3] text-[#2669f3] font-bold text-sm px-3 h-10 rounded-[11px] hover:bg-[#2669f3]/5 disabled:opacity-40"
                {...gtmId("claim_step3_add_passenger")}
              >
                {t("addPassenger")}
              </button>
            </div>

            {additionalPassengers.map((passenger, index) => (
              <div key={`passenger-${index}`} className="bg-white border border-[#d5e0f9] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-[#1f3664] text-sm">{t("passengerNumber", { number: index + 2 })}</p>
                  <button
                    type="button"
                    className="text-[#e82828] text-xs font-bold hover:underline"
                    onClick={() =>
                      setAdditionalPassengers((current) => current.filter((_, i) => i !== index))
                    }
                    {...gtmId("claim_step3_remove_passenger")}
                  >
                    {t("removePassenger")}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="scroll-mt-28">
                    <label className={FIELD_LABEL}>{t("firstName")}</label>
                    <input
                      id={`passenger-${index}-first`}
                      className={fieldControlClass(FIELD_INPUT, contactIssue?.field === `passenger-${index}-first`)}
                      value={passenger.firstName}
                      aria-invalid={contactIssue?.field === `passenger-${index}-first` || undefined}
                      onChange={(e) => {
                        updateAdditionalPassenger(index, { firstName: e.target.value });
                        if (contactIssue?.field === `passenger-${index}-first`) setContactIssue(null);
                      }}
                    />
                    <FieldIssue
                      id={`passenger-${index}-first-error`}
                      message={contactIssue?.field === `passenger-${index}-first` ? contactIssue.message : null}
                    />
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>{t("lastName")}</label>
                    <input
                      id={`passenger-${index}-last`}
                      className={fieldControlClass(FIELD_INPUT, contactIssue?.field === `passenger-${index}-first`)}
                      value={passenger.lastName}
                      onChange={(e) => {
                        updateAdditionalPassenger(index, { lastName: e.target.value });
                        if (contactIssue?.field === `passenger-${index}-first`) setContactIssue(null);
                      }}
                    />
                  </div>
                  <div className="scroll-mt-28">
                    <label className={FIELD_LABEL}>{t("emailAddress")}</label>
                    <input
                      id={`passenger-${index}-email`}
                      type="email"
                      className={fieldControlClass(FIELD_INPUT, contactIssue?.field === `passenger-${index}-email`)}
                      value={passenger.email}
                      aria-invalid={contactIssue?.field === `passenger-${index}-email` || undefined}
                      onChange={(e) => {
                        updateAdditionalPassenger(index, { email: e.target.value });
                        if (contactIssue?.field === `passenger-${index}-email`) setContactIssue(null);
                      }}
                    />
                    <FieldIssue
                      id={`passenger-${index}-email-error`}
                      message={contactIssue?.field === `passenger-${index}-email` ? contactIssue.message : null}
                    />
                  </div>
                  <div className="scroll-mt-28">
                    <label className={FIELD_LABEL}>{t("phoneNumber")}</label>
                    <PhoneInputField
                      id={`passenger-${index}-phone`}
                      value={passenger.phone}
                      invalid={contactIssue?.field === `passenger-${index}-phone`}
                      onChange={(phone) => {
                        updateAdditionalPassenger(index, { phone });
                        if (contactIssue?.field === `passenger-${index}-phone`) setContactIssue(null);
                      }}
                      placeholder={t("phonePlaceholder")}
                      aria-label={t("phoneNumber")}
                    />
                    <FieldIssue
                      id={`passenger-${index}-phone-error`}
                      message={contactIssue?.field === `passenger-${index}-phone` ? contactIssue.message : null}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === "documents" && (
        <div className="flex-1 border border-[#d5e0f9] rounded-[14px] bg-[#fafbff] p-4 sm:p-5 mb-4 space-y-3 overflow-y-auto">
          {allPassengers.map((_, index) => {
            const signature = docSignatures[`${POA_DOCUMENT_ID}:${index}`];
            if (!signature) return null;
            return (
              <div key={signature.token} className="bg-white border border-[#d5e0f9] rounded-xl p-4 flex items-center gap-3">
                <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-6 h-6 flex-shrink-0 object-contain" />
                <div>
                  <p className="font-bold text-[#1f3664] text-sm">{signature.passengerName}</p>
                  <p className="text-[#7b8094] text-xs mt-0.5">
                    {t("signedAt", { date: new Date(signature.signedAt).toLocaleString() })}
                  </p>
                </div>
              </div>
            );
          })}
          <p className="text-[#7b8094] text-xs sm:text-sm leading-relaxed">{t("documentsHint")}</p>
          {payloadNotice && (
            <p id="claim-documents-error" role="alert" className="text-sm leading-snug text-[#e82828]">
              {payloadNotice.message}
            </p>
          )}
          <FileUploadField
            id="passport-copy"
            label={t("docs.passport")}
            hint={t("docs.passportHint")}
            file={passportCopy}
            error={docErrors.passport}
            marked={Boolean(payloadNotice?.names.includes(passportCopy?.name ?? ""))}
            onChange={(file) => void acceptDocument("passport", "passport-copy-field", file, setPassportCopy)}
          />
          <FileUploadField
            id="booking-confirmation"
            label={t("docs.booking")}
            hint={t("docs.bookingHint")}
            file={bookingConfirmation}
            error={docErrors.booking}
            marked={Boolean(payloadNotice?.names.includes(bookingConfirmation?.name ?? ""))}
            onChange={(file) => void acceptDocument("booking", "booking-confirmation-field", file, setBookingConfirmation)}
          />
          <FileUploadField
            id="expenses-receipts"
            label={t("docs.expenses")}
            hint={t("docs.expensesHint")}
            file={expensesReceipts}
            error={docErrors.expenses}
            marked={Boolean(payloadNotice?.names.includes(expensesReceipts?.name ?? ""))}
            onChange={(file) => void acceptDocument("expenses", "expenses-receipts-field", file, setExpensesReceipts)}
          />
          <div
            id="other-documents-field"
            className={`scroll-mt-28 bg-white border rounded-xl p-4 space-y-2 ${
              docErrors.other || otherDocuments.some((file) => payloadNotice?.names.includes(file.name))
                ? "border-[#e82828]"
                : "border-[#d5e0f9]"
            }`}
          >
            <label className={FIELD_LABEL} htmlFor="other-documents">
              {t("docs.other")}
            </label>
            <p className="text-[#7b8094] text-xs leading-relaxed">{t("docs.otherHint")}</p>
            <input
              id="other-documents"
              type="file"
              multiple
              accept="image/*,.pdf,application/pdf"
              className="block w-full text-sm text-[#1f3664] file:mr-3 file:rounded-lg file:border-0 file:bg-[#2669f3] file:px-3 file:py-2 file:text-sm file:font-bold file:text-white"
              onChange={(event) => {
                const files = Array.from(event.target.files ?? []).slice(0, 6);
                event.target.value = "";
                void acceptOtherDocuments(files);
              }}
              {...gtmId("claim_step3_upload_other_documents")}
            />
            {otherDocuments.length > 0 && (
              <ul className="text-[#7b8094] text-xs space-y-1">
                {otherDocuments.map((file) => (
                  <li key={`${file.name}-${file.size}`}>{file.name}</li>
                ))}
              </ul>
            )}
            <FieldIssue id="other-documents-error" message={docErrors.other} />
          </div>
        </div>
      )}

      {phase === "sign" && (
        <div className="flex-1 border border-[#d5e0f9] rounded-[14px] bg-[#fafbff] p-4 sm:p-5 mb-4 space-y-4">
          <div className="rounded-xl border-2 border-[#2669f3] bg-gradient-to-r from-[#1f3664] to-[#2669f3] px-4 py-3 text-white">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
              {t("signPassenger", { current: signingPassengerIndex + 1, total: allPassengers.length })}
            </p>
            <h4 className="font-bold text-lg leading-tight">{t("powerOfAttorney.title")}</h4>
            <p className="text-white/80 text-sm mt-1">{t("powerOfAttorney.description")}</p>
          </div>

          <div className="bg-white border border-[#d5e0f9] rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#d5e0f9] bg-[#fafbff]">
              <p className="text-[#7b8094] text-xs font-bold uppercase tracking-wide">{t("documentPreview")}</p>
              <a
                href={fullPageUrl}
                target="_blank"
                rel="opener"
                className="text-[#2669f3] font-bold text-xs whitespace-nowrap hover:underline"
                onClick={openFullPoa}
                {...gtmId("claim_step3_open_poa")}
              >
                {t("openFullPage")}
              </a>
            </div>
            <div ref={documentViewerRef} className="max-h-64 sm:max-h-96 overflow-y-auto p-4">
              <PowerOfAttorneyDocument
                locale={locale}
                name={activePassengerName}
                flight={flight.flight}
                routeFrom={flight.routeFrom}
                routeTo={flight.routeTo}
                flightDate={formatPoaDate(flight.date, locale)}
                signingDate={signingDate}
                onSigningDateChange={setSigningDate}
                signatureImageUrl={signaturePreview}
                interactiveSigning
                showContactFooter={false}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={FIELD_LABEL}>{t("yourSignature")}</label>
              <button
                type="button"
                onClick={clearSignature}
                className="text-[#2669f3] text-sm font-bold hover:underline"
                {...gtmId("claim_step3_clear_signature")}
              >
                {t("clear")}
              </button>
            </div>
            <canvas
              ref={canvasRef}
              width={600}
              height={160}
              className="w-full h-40 rounded-xl bg-white touch-none border border-[#2669f3]/40"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
              onPointerCancel={stopDrawing}
              onTouchStart={startTouchDrawing}
              onTouchMove={moveTouchDrawing}
              onTouchEnd={endStroke}
              onTouchCancel={endStroke}
            />
            <p className="text-[#7b8094] text-xs mt-2">{t("drawSignatureHint")}</p>
          </div>

          {signError && (
            <p className="text-sm text-[#e82828]" role="alert">
              {signError}
            </p>
          )}
        </div>
      )}

      {submitError && (
        <p className="text-sm text-[#e82828] mb-4" role="alert">
          {submitError}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <button
          type="button"
          onClick={onDelete}
          disabled={isSubmitting}
          className={`border-2 border-[#e82828] text-[#e82828] hover:bg-[#e82828]/5 disabled:opacity-50 ${ACTION_BTN}`}
          {...gtmId("claim_step3_delete_data")}
        >
          {t("deleteData")}
        </button>

        {phase === "contact" && (
          <button
            type="button"
            onClick={handleContinueFromContact}
            disabled={isSyncingLead}
            className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto disabled:opacity-60 ${ACTION_BTN}`}
            {...gtmId("claim_step3_continue_to_signing")}
          >
            {isSyncingLead ? t("saving") : t("continueToSigning")}
          </button>
        )}

        {phase === "sign" && (
          <>
            <button
              type="button"
              onClick={() => {
                setSignError(null);
                clearSignature();
                if (signingPassengerIndex > 0) {
                  setSigningPassengerIndex((index) => index - 1);
                  return;
                }
                setPhase("contact");
              }}
              disabled={isSigning}
              className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 disabled:opacity-50 ${ACTION_BTN}`}
              {...gtmId("claim_step3_sign_back")}
            >
              {t("back")}
            </button>
            <button
              type="button"
              onClick={() => void handleSignDocument()}
              disabled={isSigning}
              className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto disabled:opacity-50 ${ACTION_BTN}`}
              {...gtmId("claim_step3_sign_continue")}
            >
              {isSigning
                ? t("signing")
                : signingPassengerIndex < allPassengers.length - 1
                  ? t("signAndNext")
                  : t("signAndContinue")}
            </button>
          </>
        )}

        {phase === "documents" && (
          <>
            <button
              type="button"
              onClick={() => {
                setSigningPassengerIndex(Math.max(0, allPassengers.length - 1));
                setPhase("sign");
              }}
              disabled={isSubmitting}
              className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 disabled:opacity-50 ${ACTION_BTN}`}
              {...gtmId("claim_step3_documents_back")}
            >
              {t("back")}
            </button>
            <button
              type="button"
              onClick={() => {
                if (payloadNotice) {
                  focusClaimField("claim-documents-error");
                  return;
                }
                if (docErrors.passport) {
                  focusClaimField("passport-copy-field");
                  return;
                }
                if (docErrors.booking) {
                  focusClaimField("booking-confirmation-field");
                  return;
                }
                if (docErrors.expenses) {
                  focusClaimField("expenses-receipts-field");
                  return;
                }
                if (docErrors.other) {
                  focusClaimField("other-documents-field");
                  return;
                }
                void handleSubmit();
              }}
              disabled={isSubmitting}
              className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto disabled:opacity-50 ${ACTION_BTN}`}
              {...gtmId("claim_step3_submit_claim")}
            >
              {isSubmitting ? t("submitting") : t("submitClaim")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
