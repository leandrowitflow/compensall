"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent, type UIEvent } from "react";
import { CLAIM_DOCUMENTS } from "@/lib/claim-documents";
import type { ClaimFlightData, ClaimStatus } from "@/lib/claim-types";
import { ACTION_BTN, FIELD_INPUT, FIELD_LABEL } from "@/components/claim/claim-ui";
import { LEGAL_DOCUMENT_CONTENT } from "@/components/claim/legal-document-content";

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
};

type Step3PanelProps = {
  flight: ClaimFlightData;
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

type DocumentStepStatus = "completed" | "current" | "upcoming";

function getDocumentStepStatus(
  docId: string,
  index: number,
  docIndex: number,
  docSignatures: Record<string, ClaimDocumentSignaturePayload>,
): DocumentStepStatus {
  if (docSignatures[docId]) return "completed";
  if (index === docIndex) return "current";
  return "upcoming";
}

function DocumentSigningStepper({
  docIndex,
  docSignatures,
}: {
  docIndex: number;
  docSignatures: Record<string, ClaimDocumentSignaturePayload>;
}) {
  const signedCount = CLAIM_DOCUMENTS.filter((doc) => docSignatures[doc.id]).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[#7b8094] text-xs font-bold uppercase tracking-wide">
          Document {docIndex + 1} of {CLAIM_DOCUMENTS.length}
        </p>
        <p className="text-[#2669f3] text-xs font-bold">
          {signedCount} signed
        </p>
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-2" aria-label="Document signing progress">
        {CLAIM_DOCUMENTS.map((doc, index) => {
          const status = getDocumentStepStatus(doc.id, index, docIndex, docSignatures);
          const isCurrent = status === "current";

          return (
            <li
              key={doc.id}
              aria-current={isCurrent ? "step" : undefined}
              className={`rounded-xl border px-3 py-2.5 transition-colors ${
                status === "completed"
                  ? "border-[#1a9c5a]/30 bg-[#eafaf0]"
                  : isCurrent
                    ? "border-[#2669f3] bg-[#f0f3fe] ring-2 ring-[#2669f3]/20"
                    : "border-[#d5e0f9] bg-white"
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    status === "completed"
                      ? "bg-[#1a9c5a] text-white"
                      : isCurrent
                        ? "bg-[#2669f3] text-white"
                        : "bg-[#d5e0f9] text-[#7b8094]"
                  }`}
                >
                  {status === "completed" ? "✓" : index + 1}
                </span>
                <div className="min-w-0">
                  <p
                    className={`text-xs font-bold leading-snug ${
                      isCurrent ? "text-[#2669f3]" : status === "completed" ? "text-[#1a9c5a]" : "text-[#7b8094]"
                    }`}
                  >
                    {doc.title}
                  </p>
                  <p className="text-[10px] text-[#7b8094] mt-0.5 leading-snug">
                    {status === "completed" ? "Signed" : isCurrent ? "Read & sign now" : "Up next"}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Step3Panel({ flight, onDelete, onSubmit }: Step3PanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const [phase, setPhase] = useState<WizardPhase>("contact");
  const [signedName, setSignedName] = useState(flight.passenger);
  const [contactEmail, setContactEmail] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);

  const [sessionId] = useState(createSessionId);
  const [docIndex, setDocIndex] = useState(0);
  const [docSignatures, setDocSignatures] = useState<Record<string, ClaimDocumentSignaturePayload>>({});
  const docSignaturesRef = useRef<Record<string, ClaimDocumentSignaturePayload>>({});
  const [readDocuments, setReadDocuments] = useState<Record<string, boolean>>({});
  const [signError, setSignError] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const documentViewerRef = useRef<HTMLDivElement>(null);
  const [transitionNotice, setTransitionNotice] = useState<string | null>(null);
  const [docEnterNonce, setDocEnterNonce] = useState(0);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);

  const currentDoc = CLAIM_DOCUMENTS[docIndex];
  const totalDocs = CLAIM_DOCUMENTS.length;
  const hasReadCurrentDoc = Boolean(readDocuments[currentDoc.id]);
  const CurrentDocContent = LEGAL_DOCUMENT_CONTENT[currentDoc.id];

  const markCurrentDocRead = () => {
    setReadDocuments((current) => (current[currentDoc.id] ? current : { ...current, [currentDoc.id]: true }));
  };

  const checkScrolledToEnd = (element: HTMLDivElement | null) => {
    if (!element) return;
    const reachedEnd = element.scrollTop + element.clientHeight >= element.scrollHeight - SCROLL_END_THRESHOLD_PX;
    if (reachedEnd) markCurrentDocRead();
  };

  const handleDocumentScroll = (event: UIEvent<HTMLDivElement>) => {
    checkScrolledToEnd(event.currentTarget);
  };

  useEffect(() => {
    docSignaturesRef.current = docSignatures;
  }, [docSignatures]);

  useEffect(() => {
    const element = documentViewerRef.current;
    if (!element) return;
    element.scrollTop = 0;
    // Short documents may not need scrolling at all — check once layout settles.
    const frame = requestAnimationFrame(() => checkScrolledToEnd(element));
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docIndex]);

  useEffect(() => {
    if (phase !== "sign") {
      setTransitionNotice(null);
      return;
    }

    setDocEnterNonce((nonce) => nonce + 1);
    const doc = CLAIM_DOCUMENTS[docIndex];
    const previousDoc = docIndex > 0 ? CLAIM_DOCUMENTS[docIndex - 1] : null;

    if (previousDoc && docSignatures[previousDoc.id]) {
      setTransitionNotice(`"${previousDoc.title}" is signed. Now read and sign "${doc.title}".`);
      const timer = window.setTimeout(() => setTransitionNotice(null), 6000);
      return () => window.clearTimeout(timer);
    }

    setTransitionNotice(null);
    // Only re-run when navigating between documents — not when the current one is signed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docIndex, phase]);

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
  };

  const stopDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    canvasRef.current?.releasePointerCapture(event.pointerId);
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleContinueFromContact = () => {
    setContactError(null);
    if (!signedName.trim()) {
      setContactError("Enter your full legal name.");
      return;
    }
    if (!contactEmail.trim() || !EMAIL_PATTERN.test(contactEmail.trim())) {
      setContactError("Enter a valid email address. We need it to send your tracking number and case updates.");
      return;
    }
    setPhase("sign");
  };

  const handleSignCurrentDocument = async () => {
    setSignError(null);
    if (!hasReadCurrentDoc) {
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

      const updated: Record<string, ClaimDocumentSignaturePayload> = {
        ...docSignaturesRef.current,
        [documentId]: signed,
      };
      docSignaturesRef.current = updated;
      setDocSignatures(updated);
      clearSignature();
      setTransitionNotice(null);

      const allSigned = CLAIM_DOCUMENTS.every((doc) => updated[doc.id]);
      if (allSigned) {
        setPhase("review");
      } else if (docIndex < totalDocs - 1) {
        setDocIndex((index) => index + 1);
      } else {
        const missingTitles = CLAIM_DOCUMENTS.filter((doc) => !updated[doc.id]).map((doc) => doc.title);
        setSignError(`Missing signature for ${missingTitles.join(", ")}. Please use Back to sign those documents.`);
      }
    } catch {
      setSignError("Could not record your signature. Check your connection and try again.");
    } finally {
      setIsSigning(false);
    }
  };

  const handleBackToPreviousDocument = () => {
    setSignError(null);
    clearSignature();
    setDocIndex((current) => Math.max(0, current - 1));
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    const documentSignatures = CLAIM_DOCUMENTS.map((doc) => docSignatures[doc.id]).filter(
      (signature): signature is ClaimDocumentSignaturePayload => Boolean(signature),
    );
    if (documentSignatures.length !== totalDocs) {
      setSubmitError("Please sign every document before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await onSubmit({
        signedName: signedName.trim(),
        contactEmail: contactEmail.trim(),
        acceptedDocuments: documentSignatures.map((signature) => signature.documentId),
        documentSignatures,
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
        <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-14 h-14 mb-4" />
        <h3 className="font-bold text-[#1f3664] text-xl mb-2">Claim submitted</h3>
        <p className="text-[#1f3664] text-sm sm:text-base max-w-md leading-relaxed mb-4">
          Thank you, {signedName}. We&apos;ve received your signed documents and will start working on your claim for flight{" "}
          {flight.flight}.
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
        <img src="/assets/claim/claim-ai-icon.svg" alt="" className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-bold text-[#2669f3] text-base sm:text-lg">Compensall AI</p>
            <span className="text-[#7b8094] text-sm">Just now</span>
          </div>
          <p className="text-[#1f3664] text-sm sm:text-base mt-2 leading-relaxed">
            Your claim is ready.
            <br />
            {phase === "contact" && "Let's start with your contact details."}
            {phase === "sign" && "Read each document fully, then sign to continue."}
            {phase === "review" && "Everything is signed. Review and submit."}
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
            <p className="text-[#7b8094] text-xs mt-2">
              Required. We&apos;ll send your tracking number and case updates here.
            </p>
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
          <DocumentSigningStepper docIndex={docIndex} docSignatures={docSignatures} />

          {transitionNotice && (
            <div
              role="status"
              className="rounded-xl border border-[#2669f3]/30 bg-[#f0f3fe] px-4 py-3 text-sm text-[#1f3664] leading-relaxed claim-doc-enter"
            >
              {transitionNotice}
            </div>
          )}

          <div key={`${currentDoc.id}-${docEnterNonce}`} className="space-y-4 claim-doc-enter">
            <div className="rounded-xl border-2 border-[#2669f3] bg-gradient-to-r from-[#1f3664] to-[#2669f3] px-4 py-3 text-white">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                Now signing: document {docIndex + 1} of {totalDocs}
              </p>
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
                className="max-h-56 sm:max-h-64 overflow-y-auto p-4"
              >
                {CurrentDocContent ? <CurrentDocContent /> : null}
              </div>
              <div
                className={`px-4 py-2.5 text-xs font-bold border-t border-[#d5e0f9] ${
                  hasReadCurrentDoc ? "bg-[#eafaf0] text-[#1a9c5a]" : "bg-[#fff7e6] text-[#a06a00]"
                }`}
              >
                {hasReadCurrentDoc
                  ? `✓ You've read "${currentDoc.title}". You can sign below`
                  : `Scroll to the end of "${currentDoc.title}" to unlock signing ↓`}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={FIELD_LABEL}>
                  Your signature for &quot;{currentDoc.title}&quot;
                </label>
                <button type="button" onClick={clearSignature} className="text-[#2669f3] text-sm font-bold hover:underline">
                  Clear
                </button>
              </div>
              <canvas
                ref={canvasRef}
                width={600}
                height={160}
                className={`w-full h-40 border border-[#d5e0f9] rounded-xl bg-white touch-none ${
                  hasReadCurrentDoc ? "border-[#2669f3]/40" : "opacity-50 pointer-events-none"
                }`}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
              />
              <p className="text-[#7b8094] text-xs mt-2">
                {hasReadCurrentDoc
                  ? "Draw your signature to confirm you agree to this document only."
                  : "Finish reading the document above to enable your signature."}
              </p>
            </div>
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
          {CLAIM_DOCUMENTS.map((doc) => (
            <div key={doc.id} className="bg-white border border-[#d5e0f9] rounded-xl p-4 flex items-center gap-3">
              <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-bold text-[#1f3664] text-sm">{doc.title}</p>
                <p className="text-[#7b8094] text-xs mt-0.5">
                  Signed {new Date(docSignatures[doc.id]?.signedAt ?? "").toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          <div className="bg-white border border-[#d5e0f9] rounded-xl p-4">
            <p className="text-[#7b8094] text-xs">Signed by</p>
            <p className="font-bold text-[#1f3664] text-sm">{signedName}</p>
            <p className="text-[#7b8094] text-xs mt-2">{contactEmail}</p>
          </div>
        </div>
      )}

      {submitError && (
        <p className="text-sm text-[#e82828] mb-4" role="alert">
          {submitError}
        </p>
      )}

      {phase === "sign" && docIndex + 1 < totalDocs && hasReadCurrentDoc && (
        <p className="text-xs text-[#2669f3] font-bold mb-3 -mt-1">
          After you sign, the next document is: {CLAIM_DOCUMENTS[docIndex + 1].title}
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
            className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto ${ACTION_BTN}`}
          >
            Continue to signing
          </button>
        )}

        {phase === "sign" && (
          <>
            {docIndex > 0 && (
              <button
                type="button"
                onClick={handleBackToPreviousDocument}
                disabled={isSigning}
                className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 disabled:opacity-50 ${ACTION_BTN}`}
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={() => void handleSignCurrentDocument()}
              disabled={isSigning || !hasReadCurrentDoc}
              className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto disabled:opacity-50 ${ACTION_BTN}`}
            >
              {isSigning
                ? "Signing…"
                : docIndex + 1 < totalDocs
                  ? `Sign "${currentDoc.title}" & next`
                  : `Sign "${currentDoc.title}" & review`}
            </button>
          </>
        )}

        {phase === "review" && (
          <>
            <button
              type="button"
              onClick={() => {
                setPhase("sign");
                setDocIndex(0);
              }}
              disabled={isSubmitting}
              className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 disabled:opacity-50 ${ACTION_BTN}`}
            >
              Re-sign documents
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
