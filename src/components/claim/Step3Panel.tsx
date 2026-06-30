"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import { CLAIM_DOCUMENTS } from "@/lib/claim-documents";
import type { ClaimFlightData } from "@/lib/claim-types";
import { ACTION_BTN, FIELD_INPUT, FIELD_LABEL } from "@/components/claim/claim-ui";

type Step3PanelProps = {
  flight: ClaimFlightData;
  onDelete: () => void;
  onSubmit: (payload: { signedName: string; signatureDataUrl: string | null }) => void;
  submitted: boolean;
};

export default function Step3Panel({ flight, onDelete, onSubmit, submitted }: Step3PanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signedName, setSignedName] = useState(flight.passenger);
  const [acceptedDocs, setAcceptedDocs] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const allDocsAccepted = CLAIM_DOCUMENTS.every((doc) => acceptedDocs[doc.id]);

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

  const handleSubmit = () => {
    setSubmitError(null);
    if (!signedName.trim()) {
      setSubmitError("Enter your full name to sign.");
      return;
    }
    if (!allDocsAccepted) {
      setSubmitError("Please confirm you have read all documents.");
      return;
    }
    const signatureDataUrl = canvasRef.current?.toDataURL("image/png") ?? null;
    onSubmit({ signedName: signedName.trim(), signatureDataUrl });
  };

  if (submitted) {
    return (
      <div className="border border-[#d5e0f9] rounded-[21px] p-6 sm:p-8 flex flex-col items-center text-center bg-white min-h-[320px] justify-center">
        <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-14 h-14 mb-4" />
        <h3 className="font-bold text-[#1f3664] text-xl mb-2">Claim submitted</h3>
        <p className="text-[#1f3664] text-sm sm:text-base max-w-md leading-relaxed">
          Thank you, {signedName}. We&apos;ve received your signed documents and will start working on your claim for flight{" "}
          {flight.flight}.
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
            Review the documents below and sign to submit.
          </p>
        </div>
      </div>

      <div className="flex-1 border border-[#d5e0f9] rounded-[14px] bg-[#fafbff] p-4 sm:p-5 mb-4 space-y-4 overflow-y-auto">
        {CLAIM_DOCUMENTS.map((doc) => (
          <div key={doc.id} className="bg-white border border-[#d5e0f9] rounded-xl p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="font-bold text-[#1f3664] text-base">{doc.title}</h4>
                <p className="text-[#7b8094] text-sm mt-1">{doc.description}</p>
              </div>
              <Link
                href={doc.href}
                target="_blank"
                className="text-[#2669f3] font-bold text-sm whitespace-nowrap hover:underline"
              >
                Review
              </Link>
            </div>
            <label className="flex items-center gap-2 text-sm text-[#1f3664] cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(acceptedDocs[doc.id])}
                onChange={(e) =>
                  setAcceptedDocs((current) => ({ ...current, [doc.id]: e.target.checked }))
                }
                className="w-4 h-4 accent-[#2669f3]"
              />
              I have read and agree to this document
            </label>
          </div>
        ))}

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
          <div className="flex items-center justify-between mb-2">
            <label className={FIELD_LABEL}>Signature</label>
            <button type="button" onClick={clearSignature} className="text-[#2669f3] text-sm font-bold hover:underline">
              Clear
            </button>
          </div>
          <canvas
            ref={canvasRef}
            width={600}
            height={160}
            className="w-full h-40 border border-[#d5e0f9] rounded-xl bg-white touch-none"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
          />
          <p className="text-[#7b8094] text-xs mt-2">Draw your signature above or type your name to sign electronically.</p>
        </div>
      </div>

      {submitError && (
        <p className="text-sm text-[#e82828] mb-4" role="alert">
          {submitError}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <button
          type="button"
          onClick={onDelete}
          className={`border-2 border-[#e82828] text-[#e82828] hover:bg-[#e82828]/5 ${ACTION_BTN}`}
        >
          Delete data
        </button>
        <button
          type="button"
          onClick={() => window.open("/documents/authority-to-act", "_blank")}
          className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 ${ACTION_BTN}`}
        >
          Review documents
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto ${ACTION_BTN}`}
        >
          Sign &amp; Submit
        </button>
      </div>
    </div>
  );
}
