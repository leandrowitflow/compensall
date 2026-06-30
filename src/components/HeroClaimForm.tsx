"use client";

import { useRef, useState, type ReactNode } from "react";

type ClaimStep = 1 | 2 | 3;

const FLIGHT = {
  fileName: "BA1234_LHR_FCO.pdf",
  fileSize: "512 KB",
  passenger: "Alex Morgan",
  flight: "BA1234",
  routeFrom: "London (LHR)",
  routeTo: "Rome (FCO)",
  date: "14 May 2026",
  status: "Delayed",
  delay: "3h 25m",
};

const ACTION_BTN =
  "font-bold text-base xl:text-[17px] px-6 h-11 xl:h-[51px] rounded-[11px] transition-colors w-full sm:w-auto";

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

function ClaimSidebar() {
  const detailCards = [
    { icon: "/assets/claim/claim-person.svg", label: "Passenger", value: FLIGHT.passenger },
    { icon: "/assets/claim/claim-flight.svg", label: "Flight", value: FLIGHT.flight },
    {
      icon: "/assets/claim/claim-route.svg",
      label: "Route",
      value: (
        <>
          {FLIGHT.routeFrom}
          <br />
          {FLIGHT.routeTo}
        </>
      ),
    },
    { icon: "/assets/claim/claim-calendar.svg", label: "Date", value: FLIGHT.date },
    { icon: "/assets/claim/claim-status.svg", label: "Occurance", value: `${FLIGHT.status} •`, highlight: true },
    { icon: "/assets/claim/claim-delay.svg", label: "Delay", value: FLIGHT.delay, highlight: true },
  ];

  return (
    <div className="border border-[#d5e0f9] rounded-[21px] p-4 sm:p-5 xl:p-6 flex flex-col h-full bg-white">
      <div className="mb-5">
        <div className="flex items-start gap-3 mb-3">
          <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
          <h3 className="font-bold text-[#1f3664] text-[15px] sm:text-[17px] xl:text-[19px]">Uploaded boarding pass</h3>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative border-2 border-[#d5e0f9] rounded-xl w-[207px] h-[100px] flex-shrink-0 bg-white">
            <div className="absolute inset-x-2 inset-y-[3px] overflow-hidden pointer-events-none">
              <img
                src="/assets/claim/claim-boarding-pass.png"
                alt="Boarding pass preview"
                className="absolute h-[108.4%] left-[-4.01%] max-w-none top-[-5.65%] w-[109.99%]"
              />
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[#1f3664] text-[15px] sm:text-[17px] mb-1 break-all">{FLIGHT.fileName}</p>
            <p className="text-[#1f3664] text-sm sm:text-base mb-2">Added just now • {FLIGHT.fileSize}</p>
            <button type="button" className="text-[#2669f3] font-bold text-sm sm:text-base hover:underline">
              Preview
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#d5e0f9] my-5" />

      <div className="flex items-center gap-3 mb-4">
        <img src="/assets/claim/claim-extracted-icon.svg" alt="" className="w-7 h-7 sm:w-8 sm:h-8" />
        <h3 className="font-bold text-[#1f3664] text-[15px] sm:text-[17px] xl:text-[19px]">Extracted flight details</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {detailCards.map((card) => (
          <div
            key={card.label}
            className="bg-[#f9fbfe]/60 border border-[#d5e0f9] rounded-[10px] p-3 min-h-[72px] sm:min-h-[81px]"
          >
            <img src={card.icon} alt="" className="w-5 h-5 mb-2" />
            <p className="text-[#7b8094] text-xs sm:text-sm mb-1">{card.label}</p>
            <p className={`text-sm sm:text-base leading-snug ${card.highlight ? "text-[#fa6d19] font-bold" : "text-[#1f3664]"}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#f0f3fe] rounded-2xl p-4 mt-auto">
        <div className="flex gap-3">
          <img src="/assets/icons/stars.svg" alt="" className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <p className="text-[#1f3664] text-sm sm:text-base leading-relaxed">
            Our AI has scanned your boarding pass and extracted the key details.{" "}
            <span className="text-[#2669f3] font-bold">Please confirm they look correct.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoBoardRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: string;
  label: string;
  value: ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-4 py-2.5 sm:py-3 border-b border-[#d5e0f9]/60 last:border-0">
      <img src={icon} alt="" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 opacity-70" />
      <span className="text-[#7b8094] text-sm sm:text-base w-16 sm:w-24 flex-shrink-0">{label}</span>
      <span className={`text-sm sm:text-base ml-auto text-right ${highlight ? "text-[#fa6d19] font-bold" : "text-[#1f3664]"}`}>
        {value}
      </span>
    </div>
  );
}

function Step2Panel({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="border border-[#d5e0f9] rounded-[21px] p-4 sm:p-5 xl:p-6 flex flex-col h-full bg-white">
      <div className="flex items-start gap-3 mb-4">
        <img src="/assets/claim/claim-ai-icon.svg" alt="" className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-bold text-[#2669f3] text-base sm:text-lg">Compensall AI</p>
            <span className="text-[#7b8094] text-sm">Just now</span>
          </div>
          <p className="text-[#1f3664] text-sm sm:text-base mt-2 leading-relaxed">
            Thanks! I&apos;ve extracted your flight details.
            <br />
            Please confirm the information below is correct.
          </p>
        </div>
      </div>

      <div className="border border-[#1f3664]/10 rounded-[14px] px-3 sm:px-5 py-2 mb-4">
        <InfoBoardRow icon="/assets/claim/claim-person.svg" label="Passenger" value={FLIGHT.passenger} />
        <InfoBoardRow icon="/assets/claim/claim-flight.svg" label="Flight" value={FLIGHT.flight} />
        <InfoBoardRow
          icon="/assets/claim/claim-route.svg"
          label="Route"
          value={`${FLIGHT.routeFrom} → ${FLIGHT.routeTo}`}
        />
        <InfoBoardRow icon="/assets/claim/claim-calendar.svg" label="Date" value={FLIGHT.date} />
        <InfoBoardRow icon="/assets/claim/claim-status.svg" label="Status" value={`${FLIGHT.status} •`} highlight />
        <InfoBoardRow icon="/assets/claim/claim-delay.svg" label="Delay" value={FLIGHT.delay} highlight />
      </div>

      <div className="bg-[#f0f3fe] rounded-[13px] px-4 py-4 mb-4 max-w-sm">
        <p className="text-[#1f3664] text-sm sm:text-base leading-relaxed">
          <span className="font-bold">Is all of this correct?</span>
          <br />
          This helps us assess your eligibility.
        </p>
      </div>

      <div className="relative mb-5">
        <input
          type="text"
          placeholder="Ask me a question..."
          className="w-full border border-[#d5e0f9] rounded-[10px] h-11 pl-4 pr-12 text-sm text-[#1f3664] outline-none focus:border-[#2669f3]"
        />
        <button
          type="button"
          className="absolute right-1 top-1 w-9 h-9 bg-[#2669f3] rounded-lg flex items-center justify-center"
          aria-label="Send message"
        >
          <img src="/assets/claim/claim-send.svg" alt="" className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-auto pt-2">
        <button
          type="button"
          className={`border-2 border-[#e82828] text-[#e82828] hover:bg-[#e82828]/5 ${ACTION_BTN}`}
        >
          Delete data
        </button>
        <button
          type="button"
          className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 ${ACTION_BTN}`}
        >
          Edit details
        </button>
        <button
          type="button"
          onClick={onContinue}
          className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto ${ACTION_BTN}`}
        >
          Yes, continue
        </button>
      </div>
    </div>
  );
}

function Step3Panel() {
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
            Your claim is already ready.
            <br />
            Please review and sign the documents below so we can submit your claim.
          </p>
        </div>
      </div>

      <div className="flex-1 border border-[#d5e0f9] rounded-[14px] bg-[#fafbff] min-h-[200px] sm:min-h-[280px] mb-6" />

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <button
          type="button"
          className={`border-2 border-[#e82828] text-[#e82828] hover:bg-[#e82828]/5 ${ACTION_BTN}`}
        >
          Delete data
        </button>
        <button
          type="button"
          className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 ${ACTION_BTN}`}
        >
          Review documents
        </button>
        <button
          type="button"
          className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto ${ACTION_BTN}`}
        >
          Sign &amp; Submit
        </button>
      </div>
    </div>
  );
}

function Step1Upload({ onUpload }: { onUpload: (fileName: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    onUpload(file.name);
  };

  return (
    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
      <label className="block cursor-pointer">
        <div
          className="border-[3.5px] border-dashed border-[#d5e0f9] rounded-xl py-8 sm:py-10 flex flex-col items-center justify-center text-center hover:border-[#2669f3]/60 transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <img src="/assets/icons/cloud-upload.svg" alt="" className="w-12 h-12 sm:w-14 sm:h-14 xl:w-[75px] xl:h-[75px] mb-4" />
          <p className="font-bold text-[#1f3664] text-base sm:text-lg mb-1">Upload your boarding pass</p>
          <p className="text-[#1f3664]/60 text-xs sm:text-sm">Drag &amp; drop or click to upload (PDF, JPG, PNG)</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </label>

      <p className="text-center text-sm text-[#1f3664] my-3">
        <strong className="font-bold">Or</strong> check mannually
      </p>

      <div className="flex flex-col md:flex-row md:items-stretch border-2 border-[#d5e0f9] rounded-[13px] overflow-hidden">
        <div className="flex items-center flex-1 min-w-0">
          <div className="flex-1 px-4 sm:px-5 py-3 sm:py-4">
            <p className="text-[#1f3664] text-base sm:text-lg">Departure airport</p>
          </div>
          <div className="flex-shrink-0 px-2">
            <img src="/assets/icons/arrow-right-left.svg" alt="swap" className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1 px-4 sm:px-5 py-3 sm:py-4">
            <p className="text-[#1f3664] text-base sm:text-lg">Arrival airport</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onUpload(FLIGHT.fileName)}
          className="w-full md:w-auto flex-shrink-0 bg-[#2669f3] text-white font-bold text-base sm:text-lg px-6 md:px-8 xl:px-10 py-3.5 md:py-0 md:self-stretch flex items-center justify-center hover:bg-[#1a55d4] transition-colors md:rounded-r-[11px]"
        >
          Check compensation
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <img src="/assets/icons/shield-lock.svg" alt="" className="w-6 h-6 opacity-50" />
        <p className="text-[#8f8f9f] font-bold text-sm">Your data is protected, Always.</p>
      </div>
    </div>
  );
}

export default function HeroClaimForm() {
  const [step, setStep] = useState<ClaimStep>(1);

  const handleUpload = (_fileName: string) => {
    setStep(2);
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

      {step === 1 && <Step1Upload onUpload={handleUpload} />}

      {step > 1 && (
        <div className="px-4 pb-4 xl:px-6 xl:pb-6">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,489px)_1fr] gap-4 xl:gap-6">
            <ClaimSidebar />
            {step === 2 ? (
              <Step2Panel onContinue={() => setStep(3)} />
            ) : (
              <Step3Panel />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
