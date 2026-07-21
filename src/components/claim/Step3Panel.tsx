"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent, type UIEvent } from "react";
import { CLAIM_DOCUMENTS } from "@/lib/claim-documents";
import type { ClaimFlightData, ClaimStatus } from "@/lib/claim-types";
import { ACTION_BTN, ASSISTANT_NAME, FIELD_INPUT, FIELD_LABEL } from "@/components/claim/claim-ui";
import PowerOfAttorneyDocument from "@/components/claim/PowerOfAttorneyDocument";

const SCROLL_END_THRESHOLD_PX = 8;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SIGNATURE_BYTES = 800;

export type ClaimDocumentSignaturePayload = {
  documentId: string;
  signatureDataUrl: string;
  signedAt: string;
  token: string;
  signatureHash: string;
};

function createSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export type ClaimSubmitPayload = {
  signedName: string;
  contactEmail: string;
  acceptedDocuments: string[];
  documentSignatures: ClaimDocumentSignaturePayload[];
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

type WizardPhase = "contact" | "sign" | "review";

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

export default function Step3Panel({ flight, entryMode, locale, onDelete, onSubmit }: Step3PanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const [phase, setPhase] = useState<WizardPhase>("contact");
  const [signedName, setSignedName] = useState(flight.passenger);
  const [contactEmail, setContactEmail] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);

  const [sessionId] = useState(createSessionId);
  const [docSignatures, setDocSignatures] = useState<Record<string, ClaimDocumentSignaturePayload>>({});
  const docSignaturesRef = useRef<Record<string, ClaimDocumentSignaturePayload>>({});
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

  const currentDoc = CLAIM_DOCUMENTS[0];

  const checkScrolledToEnd = (element: HTMLDivElement | null) => {
    if (!element) return;
    const reachedEnd = element.scrollTop + element.clientHeight >= element.scrollHeight - SCROLL_END_THRESHOLD_PX;
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
    const frame = requestAnimationFrame(() => checkScrolledToEnd(element));
    return () => cancelAnimationFrame(frame);
  }, [phase]);

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

  const handleContinueFromContact = async () => {
    setContactError(null);
    if (!signedName.trim()) {
      setContactError("Enter your full legal name.");
      return;
    }
    if (!contactEmail.trim() || !EMAIL_PATTERN.test(contactEmail.trim())) {
      setContactError("Enter a valid email address. We need it to send your tracking number and case updates.");
      return;
    }

    setIsSyncingLead(true);
    try {
      const response = await fetch("/api/claim/odoo-partial-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formSessionId: sessionId,
          signedName: signedName.trim(),
          contactEmail: contactEmail.trim(),
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
      // Non-blocking: user can still continue signing even if Odoo sync fails.
    } finally {
      setIsSyncingLead(false);
      setPhase("sign");
    }
  };

  const handleSignDocument = async () => {
    setSignError(null);
    if (!hasReadDocument) {
      setSignError("Please scroll to the end of the document before signing.");
      return;
    }
    const canvas = canvasRef.current;
    const dataUrl = canvas?.toDataURL("image/png") ?? "";
    if (!hasInk(dataUrl)) {
      setSignError("Draw your signature to confirm you have read and agree to this document.");
      return;
    }

    const signedAt = new Date().toISOString();
    const documentId = currentDoc.id;
    setIsSigning(true);
    try {
      const response = await fetch("/api/claim/sign-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          documentId,
          signatureDataUrl: dataUrl,
          signedAt,
        }),
      });

      const data = (await response.json()) as { token?: string; signatureHash?: string; error?: string };
      if (!response.ok || !data.token || !data.signatureHash) {
        setSignError(data.error ?? "Could not record your signature. Please try again.");
        return;
      }

      const signed: ClaimDocumentSignaturePayload = {
        documentId,
        signatureDataUrl: dataUrl,
        signedAt,
        token: data.token,
        signatureHash: data.signatureHash,
      };

      const updated = { ...docSignaturesRef.current, [documentId]: signed };
      docSignaturesRef.current = updated;
      setDocSignatures(updated);
      clearSignature();
      setPhase("review");
    } catch {
      setSignError("Could not record your signature. Check your connection and try again.");
    } finally {
      setIsSigning(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    const documentSignatures = CLAIM_DOCUMENTS.map((doc) => docSignatures[doc.id]).filter(
      (signature): signature is ClaimDocumentSignaturePayload => Boolean(signature),
    );
    if (documentSignatures.length !== CLAIM_DOCUMENTS.length) {
      setSubmitError("Please sign the Power of Attorney before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await onSubmit({
        signedName: signedName.trim(),
        contactEmail: contactEmail.trim(),
        acceptedDocuments: documentSignatures.map((signature) => signature.documentId),
        documentSignatures,
        odooLeadId,
        formSessionId: sessionId,
      });
      setTrackingNumber(result.trackingNumber);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not submit your claim.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (trackingNumber) {
    return (
      <div className="border border-[#d5e0f9] rounded-[21px] p-6 sm:p-8 flex flex-col items-center text-center bg-white min-h-[320px] justify-center">
        <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-14 h-14 mb-4 object-contain" />
        <h3 className="font-bold text-[#1f3664] text-xl mb-2">Claim submitted</h3>
        <p className="text-[#1f3664] text-sm sm:text-base max-w-md leading-relaxed mb-4">
          Thank you, {signedName}. We&apos;ve received your signed Power of Attorney and will start working on your claim
          for flight {flight.flight}.
        </p>
        <div className="bg-[#f0f3fe] rounded-[14px] px-5 py-4 mb-5 w-full max-w-md">
          <p className="text-[#7b8094] text-xs font-bold uppercase tracking-wide mb-1">Your tracking number</p>
          <p className="font-bold text-[#1f3664] text-lg sm:text-xl tracking-wide">{trackingNumber}</p>
        </div>
        <Link
          href={`/track/${trackingNumber}`}
          className="bg-[#2669f3] text-white font-bold px-6 py-3 rounded-[11px] hover:bg-[#1a55d4] transition-colors text-sm sm:text-base"
        >
          Track your claim
        </Link>
        <p className="text-[#7b8094] text-sm mt-4 max-w-md">
          We&apos;ll send confirmation and updates to {contactEmail.trim()}.
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
            <span className="text-[#7b8094] text-sm">Just now</span>
          </div>
          <p className="text-[#1f3664] text-sm sm:text-base mt-2 leading-relaxed">
            Your claim is ready.
            <br />
            {phase === "contact" && "Confirm your contact details."}
            {phase === "sign" && "Read the Power of Attorney fully, then sign once to continue."}
            {phase === "review" && "Your Power of Attorney is signed. Review and submit."}
          </p>
        </div>
      </div>

      {phase === "contact" && (
        <div className="flex-1 border border-[#d5e0f9] rounded-[14px] bg-[#fafbff] p-4 sm:p-5 mb-4 space-y-4">
          <div>
            <label className={FIELD_LABEL} htmlFor="signed-name">
              Full legal name
            </label>
            <input
              id="signed-name"
              className={FIELD_INPUT}
              value={signedName}
              onChange={(e) => setSignedName(e.target.value)}
              placeholder="As shown on your boarding pass"
            />
          </div>
          <div>
            <label className={FIELD_LABEL} htmlFor="contact-email">
              Email address <span className="text-[#e82828]">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              className={FIELD_INPUT}
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          {contactError && (
            <p className="text-sm text-[#e82828]" role="alert">
              {contactError}
            </p>
          )}
        </div>
      )}

      {phase === "sign" && (
        <div className="flex-1 border border-[#d5e0f9] rounded-[14px] bg-[#fafbff] p-4 sm:p-5 mb-4 space-y-4">
          <div className="rounded-xl border-2 border-[#2669f3] bg-gradient-to-r from-[#1f3664] to-[#2669f3] px-4 py-3 text-white">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">Sign once</p>
            <h4 className="font-bold text-lg leading-tight">{currentDoc.title}</h4>
            <p className="text-white/80 text-sm mt-1">{currentDoc.description}</p>
          </div>

          <div className="bg-white border border-[#d5e0f9] rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#d5e0f9] bg-[#fafbff]">
              <p className="text-[#7b8094] text-xs font-bold uppercase tracking-wide">Document preview</p>
              <Link
                href={currentDoc.href}
                target="_blank"
                className="text-[#2669f3] font-bold text-xs whitespace-nowrap hover:underline"
              >
                Open full page ↗
              </Link>
            </div>
            <div
              ref={documentViewerRef}
              onScroll={handleDocumentScroll}
              className="max-h-64 sm:max-h-96 overflow-y-auto p-4"
            >
              <PowerOfAttorneyDocument
                name={signedName}
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
              {hasReadDocument
                ? "✓ You've read the Power of Attorney. You can sign below"
                : "Scroll to the end of the Power of Attorney to unlock signing ↓"}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={FIELD_LABEL}>Your signature</label>
              <button type="button" onClick={clearSignature} className="text-[#2669f3] text-sm font-bold hover:underline">
                Clear
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
              {hasReadDocument
                ? "Draw here — your signature appears on the document under “The passenger”. Set the signing date on the document too."
                : "Scroll to the end of the document to unlock signing."}
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
          <div className="bg-white border border-[#d5e0f9] rounded-xl p-4 flex items-center gap-3">
            <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-6 h-6 flex-shrink-0 object-contain" />
            <div>
              <p className="font-bold text-[#1f3664] text-sm">{currentDoc.title}</p>
              <p className="text-[#7b8094] text-xs mt-0.5">
                Signed {new Date(docSignatures[currentDoc.id]?.signedAt ?? "").toLocaleString()}
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#d5e0f9] rounded-xl p-4">
            <p className="text-[#7b8094] text-xs">Signed by</p>
            <p className="font-bold text-[#1f3664] text-sm">{signedName}</p>
            <p className="text-[#7b8094] text-xs mt-2">{contactEmail}</p>
            <p className="text-[#7b8094] text-xs mt-2">Flight date: {formatFlightDateForDisplay(flight.date)}</p>
            <p className="text-[#7b8094] text-xs mt-2">Signing date: {formatFlightDateForDisplay(signingDate)}</p>
          </div>
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
        >
          Delete data
        </button>

        {phase === "contact" && (
          <button
            type="button"
            onClick={handleContinueFromContact}
            disabled={isSyncingLead}
            className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto disabled:opacity-60 ${ACTION_BTN}`}
          >
            {isSyncingLead ? "Saving..." : "Continue to signing"}
          </button>
        )}

        {phase === "sign" && (
          <>
            <button
              type="button"
              onClick={() => {
                setSignError(null);
                clearSignature();
                setPhase("contact");
              }}
              disabled={isSigning}
              className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 disabled:opacity-50 ${ACTION_BTN}`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => void handleSignDocument()}
              disabled={isSigning || !hasReadDocument}
              className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto disabled:opacity-50 ${ACTION_BTN}`}
            >
              {isSigning ? "Signing…" : "Sign & review"}
            </button>
          </>
        )}

        {phase === "review" && (
          <>
            <button
              type="button"
              onClick={() => {
                setPhase("sign");
                setHasReadDocument(false);
                setSignaturePreview(null);
              }}
              disabled={isSubmitting}
              className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 disabled:opacity-50 ${ACTION_BTN}`}
            >
              Re-sign
            </button>
            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={isSubmitting}
              className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto disabled:opacity-50 ${ACTION_BTN}`}
            >
              {isSubmitting ? "Submitting…" : "Submit claim"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
