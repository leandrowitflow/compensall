"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState, type PointerEvent, type UIEvent } from "react";
import { CLAIM_DOCUMENTS } from "@/lib/claim-documents";
import {
  EMPTY_PASSENGER,
  type ClaimFlightData,
  type ClaimPassenger,
  type ClaimStatus,
} from "@/lib/claim-types";
import { ACTION_BTN, ASSISTANT_NAME, FIELD_INPUT, FIELD_LABEL } from "@/components/claim/claim-ui";
import PhoneInputField from "@/components/claim/PhoneInputField";
import PowerOfAttorneyDocument from "@/components/claim/PowerOfAttorneyDocument";
import { gtmId } from "@/lib/gtm";
import { isValidClaimPhone, toE164Phone } from "@/lib/phone";

const SCROLL_END_THRESHOLD_PX = 8;
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

type Step3PanelProps = {
  flight: ClaimFlightData;
  entryMode: "upload" | "manual";
  locale: string;
  onDelete: () => void;
  onSubmit: (payload: ClaimSubmitPayload) => Promise<{ trackingNumber: string; status: ClaimStatus }>;
};

type WizardPhase = "contact" | "documents" | "sign" | "review";

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

function formatFlightDateForDisplay(date: string): string {
  if (!date) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return date;
}

function FileUploadField({
  id,
  label,
  hint,
  file,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <div className="bg-white border border-[#d5e0f9] rounded-xl p-4 space-y-2">
      <label className={FIELD_LABEL} htmlFor={id}>
        {label}
      </label>
      <p className="text-[#7b8094] text-xs leading-relaxed">{hint}</p>
      <input
        id={id}
        type="file"
        accept="image/*,.pdf,application/pdf"
        className="block w-full text-sm text-[#1f3664] file:mr-3 file:rounded-lg file:border-0 file:bg-[#2669f3] file:px-3 file:py-2 file:text-sm file:font-bold file:text-white"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        {...gtmId(`claim_step3_upload_${id.replace(/-/g, "_")}`)}
      />
      {file && <p className="text-[#7b8094] text-xs">{file.name}</p>}
    </div>
  );
}

export default function Step3Panel({ flight, entryMode, locale, onDelete, onSubmit }: Step3PanelProps) {
  const t = useTranslations("claim.step3");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const [phase, setPhase] = useState<WizardPhase>("contact");
  const [signedName, setSignedName] = useState(flight.passenger);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);
  const [additionalPassengers, setAdditionalPassengers] = useState<ClaimPassenger[]>([]);

  const [passportCopy, setPassportCopy] = useState<File | null>(null);
  const [bookingConfirmation, setBookingConfirmation] = useState<File | null>(null);
  const [expensesReceipts, setExpensesReceipts] = useState<File | null>(null);
  const [otherDocuments, setOtherDocuments] = useState<File[]>([]);

  const [sessionId] = useState(createSessionId);
  const [docSignatures, setDocSignatures] = useState<Record<string, ClaimDocumentSignaturePayload>>({});
  const docSignaturesRef = useRef<Record<string, ClaimDocumentSignaturePayload>>({});
  const [signingPassengerIndex, setSigningPassengerIndex] = useState(0);
  const [hasReadDocument, setHasReadDocument] = useState(false);
  const [signingDate, setSigningDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [signError, setSignError] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const documentViewerRef = useRef<HTMLDivElement>(null);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);
  const [odooLeadId, setOdooLeadId] = useState<number | null>(null);
  const [isSyncingLead, setIsSyncingLead] = useState(false);

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
      ? signedName.trim()
      : `${activePassenger.firstName} ${activePassenger.lastName}`.trim();

  const checkScrolledToEnd = (element: HTMLDivElement | null) => {
    if (!element) return;
    const reachedEnd =
      element.scrollTop + element.clientHeight >= element.scrollHeight - SCROLL_END_THRESHOLD_PX;
    if (reachedEnd) setHasReadDocument(true);
  };

  const handleDocumentScroll = (event: UIEvent<HTMLDivElement>) => {
    checkScrolledToEnd(event.currentTarget);
  };

  useEffect(() => {
    docSignaturesRef.current = docSignatures;
  }, [docSignatures]);

  useEffect(() => {
    const element = documentViewerRef.current;
    if (!element || phase !== "sign") return;
    element.scrollTop = 0;
    setHasReadDocument(false);
    setSignaturePreview(null);
    const frame = requestAnimationFrame(() => checkScrolledToEnd(element));
    return () => cancelAnimationFrame(frame);
  }, [phase, signingPassengerIndex]);

  const getCanvasPoint = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const point = getCanvasPoint(event);
    if (!canvas || !point) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#1f3664";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    setIsDrawing(true);
    canvas.setPointerCapture(event.pointerId);
  };

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const point = getCanvasPoint(event);
    if (!canvas || !point) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    refreshSignaturePreview();
  };

  const stopDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    canvasRef.current?.releasePointerCapture(event.pointerId);
    setIsDrawing(false);
    refreshSignaturePreview();
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
    setContactError(null);
    if (!signedName.trim()) {
      setContactError(t("errors.nameRequired"));
      return;
    }
    if (!contactEmail.trim() || !EMAIL_PATTERN.test(contactEmail.trim())) {
      setContactError(t("errors.emailInvalid"));
      return;
    }
    if (!contactPhone.trim() || !isValidClaimPhone(contactPhone.trim())) {
      setContactError(t("errors.phoneInvalid"));
      return;
    }

    for (const [index, passenger] of additionalPassengers.entries()) {
      if (!passenger.firstName.trim() || !passenger.lastName.trim()) {
        setContactError(t("errors.passengerNameRequired", { number: index + 2 }));
        return;
      }
      if (passenger.email.trim() && !EMAIL_PATTERN.test(passenger.email.trim())) {
        setContactError(t("errors.passengerEmailInvalid", { number: index + 2 }));
        return;
      }
      if (passenger.phone.trim() && !isValidClaimPhone(passenger.phone.trim())) {
        setContactError(t("errors.passengerPhoneInvalid", { number: index + 2 }));
        return;
      }
    }

    const normalizedPhone = toE164Phone(contactPhone);
    setContactPhone(normalizedPhone);

    setIsSyncingLead(true);
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
          locale,
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
    if (!hasReadDocument) {
      setSignError(t("errors.scrollBeforeSign"));
      return;
    }
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

      const data = (await response.json()) as { token?: string; signatureHash?: string; error?: string };
      if (!response.ok || !data.token || !data.signatureHash) {
        setSignError(data.error ?? t("errors.signFailed"));
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

  const handleSubmit = async () => {
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
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t("errors.submitFailed"));
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
            <p className="font-bold text-[#2669f3] text-base sm:text-lg">{ASSISTANT_NAME}</p>
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
            {phase === "review" && t("signedReview")}
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
              className={FIELD_INPUT}
              value={signedName}
              onChange={(e) => setSignedName(e.target.value)}
              placeholder={t("namePlaceholder")}
            />
          </div>
          <div>
            <label className={FIELD_LABEL} htmlFor="contact-email">
              {t("emailAddress")} <span className="text-[#e82828]">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              className={FIELD_INPUT}
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              autoComplete="email"
            />
          </div>
          <div>
            <label className={FIELD_LABEL} htmlFor="contact-phone">
              {t("phoneNumber")} <span className="text-[#e82828]">*</span>
            </label>
            <PhoneInputField
              id="contact-phone"
              required
              value={contactPhone}
              onChange={setContactPhone}
              placeholder={t("phonePlaceholder")}
              autoComplete="tel"
            />
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
                  <div>
                    <label className={FIELD_LABEL}>{t("firstName")}</label>
                    <input
                      className={FIELD_INPUT}
                      value={passenger.firstName}
                      onChange={(e) => updateAdditionalPassenger(index, { firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>{t("lastName")}</label>
                    <input
                      className={FIELD_INPUT}
                      value={passenger.lastName}
                      onChange={(e) => updateAdditionalPassenger(index, { lastName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>{t("emailAddress")}</label>
                    <input
                      type="email"
                      className={FIELD_INPUT}
                      value={passenger.email}
                      onChange={(e) => updateAdditionalPassenger(index, { email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>{t("phoneNumber")}</label>
                    <PhoneInputField
                      value={passenger.phone}
                      onChange={(phone) => updateAdditionalPassenger(index, { phone })}
                      placeholder={t("phonePlaceholder")}
                      aria-label={t("phoneNumber")}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {contactError && (
            <p className="text-sm text-[#e82828]" role="alert">
              {contactError}
            </p>
          )}
        </div>
      )}

      {phase === "documents" && (
        <div className="flex-1 border border-[#d5e0f9] rounded-[14px] bg-[#fafbff] p-4 sm:p-5 mb-4 space-y-3 overflow-y-auto">
          <p className="text-[#7b8094] text-xs sm:text-sm leading-relaxed">{t("documentsHint")}</p>
          <FileUploadField
            id="passport-copy"
            label={t("docs.passport")}
            hint={t("docs.passportHint")}
            file={passportCopy}
            onChange={setPassportCopy}
          />
          <FileUploadField
            id="booking-confirmation"
            label={t("docs.booking")}
            hint={t("docs.bookingHint")}
            file={bookingConfirmation}
            onChange={setBookingConfirmation}
          />
          <FileUploadField
            id="expenses-receipts"
            label={t("docs.expenses")}
            hint={t("docs.expensesHint")}
            file={expensesReceipts}
            onChange={setExpensesReceipts}
          />
          <div className="bg-white border border-[#d5e0f9] rounded-xl p-4 space-y-2">
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
              onChange={(event) => setOtherDocuments(Array.from(event.target.files ?? []).slice(0, 6))}
              {...gtmId("claim_step3_upload_other_documents")}
            />
            {otherDocuments.length > 0 && (
              <ul className="text-[#7b8094] text-xs space-y-1">
                {otherDocuments.map((file) => (
                  <li key={`${file.name}-${file.size}`}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {phase === "sign" && (
        <div className="flex-1 border border-[#d5e0f9] rounded-[14px] bg-[#fafbff] p-4 sm:p-5 mb-4 space-y-4">
          <div className="rounded-xl border-2 border-[#2669f3] bg-gradient-to-r from-[#1f3664] to-[#2669f3] px-4 py-3 text-white">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
              {t("signPassenger", { current: signingPassengerIndex + 1, total: allPassengers.length })}
            </p>
            <h4 className="font-bold text-lg leading-tight">{currentDoc.title}</h4>
            <p className="text-white/80 text-sm mt-1">{currentDoc.description}</p>
          </div>

          <div className="bg-white border border-[#d5e0f9] rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#d5e0f9] bg-[#fafbff]">
              <p className="text-[#7b8094] text-xs font-bold uppercase tracking-wide">{t("documentPreview")}</p>
              <Link
                href={currentDoc.href}
                target="_blank"
                className="text-[#2669f3] font-bold text-xs whitespace-nowrap hover:underline"
                {...gtmId("claim_step3_open_poa")}
              >
                {t("openFullPage")}
              </Link>
            </div>
            <div
              ref={documentViewerRef}
              onScroll={handleDocumentScroll}
              className="max-h-64 sm:max-h-96 overflow-y-auto p-4"
            >
              <PowerOfAttorneyDocument
                name={activePassengerName}
                flight={flight.flight}
                routeFrom={flight.routeFrom}
                routeTo={flight.routeTo}
                flightDate={formatFlightDateForDisplay(flight.date)}
                signingDate={signingDate}
                onSigningDateChange={setSigningDate}
                signatureImageUrl={signaturePreview}
                interactiveSigning
                showContactFooter={false}
              />
            </div>
            <div
              className={`px-4 py-2.5 text-xs font-bold border-t border-[#d5e0f9] ${
                hasReadDocument ? "bg-[#eafaf0] text-[#1a9c5a]" : "bg-[#fff7e6] text-[#a06a00]"
              }`}
            >
              {hasReadDocument ? t("readComplete") : t("scrollToUnlock")}
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
              className={`w-full h-40 border border-[#d5e0f9] rounded-xl bg-white touch-none ${
                hasReadDocument ? "border-[#2669f3]/40" : "opacity-50 pointer-events-none"
              }`}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
            <p className="text-[#7b8094] text-xs mt-2">
              {hasReadDocument ? t("drawSignatureHint") : t("scrollToUnlockSigning")}
            </p>
          </div>

          {signError && (
            <p className="text-sm text-[#e82828]" role="alert">
              {signError}
            </p>
          )}
        </div>
      )}

      {phase === "review" && (
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
              disabled={isSigning || !hasReadDocument}
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
              className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 ${ACTION_BTN}`}
              {...gtmId("claim_step3_documents_back")}
            >
              {t("back")}
            </button>
            <button
              type="button"
              onClick={() => setPhase("review")}
              className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto ${ACTION_BTN}`}
              {...gtmId("claim_step3_continue_to_review")}
            >
              {t("continueToReview")}
            </button>
          </>
        )}

        {phase === "review" && (
          <>
            <button
              type="button"
              onClick={() => setPhase("documents")}
              disabled={isSubmitting}
              className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 disabled:opacity-50 ${ACTION_BTN}`}
              {...gtmId("claim_step3_review_back")}
            >
              {t("back")}
            </button>
            <button
              type="button"
              onClick={() => void handleSubmit()}
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
