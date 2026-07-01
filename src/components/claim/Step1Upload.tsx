"use client";

import { useRef, useState, type DragEvent } from "react";
import AirportSelect from "@/components/claim/AirportSelect";
import {
  normalizeFlightData,
  type ClaimFlightData,
} from "@/lib/claim-types";
import { formatAirportRouteLabel, type AirportOption } from "@/lib/airport-search";

type Step1UploadProps = {
  isExtracting: boolean;
  extractError: string | null;
  onExtract: (file: File) => Promise<void>;
  onManualSubmit: (flight: ClaimFlightData) => void;
};

export default function Step1Upload({
  isExtracting,
  extractError,
  onExtract,
  onManualSubmit,
}: Step1UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const processingRef = useRef(false);
  const [departure, setDeparture] = useState<AirportOption | null>(null);
  const [arrival, setArrival] = useState<AirportOption | null>(null);
  const [manualError, setManualError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openFilePicker = () => {
    if (isExtracting || processingRef.current) return;
    inputRef.current?.click();
  };

  const handleFile = async (file: File | null) => {
    if (!file || isExtracting || processingRef.current) return;

    processingRef.current = true;
    try {
      await onExtract(file);
    } finally {
      processingRef.current = false;
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const onDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    await handleFile(event.dataTransfer.files[0] ?? null);
  };

  const swapAirports = () => {
    setDeparture(arrival);
    setArrival(departure);
    setManualError(null);
  };

  const handleDepartureChange = (airport: AirportOption | null) => {
    setDeparture(airport);
    if (airport && arrival?.id === airport.id) {
      setArrival(null);
    }
    setManualError(null);
  };

  const handleArrivalChange = (airport: AirportOption | null) => {
    setArrival(airport);
    if (airport && departure?.id === airport.id) {
      setDeparture(null);
    }
    setManualError(null);
  };

  const submitManual = () => {
    setManualError(null);

    if (!departure || !arrival) {
      setManualError("Select both departure and arrival airports from the list.");
      return;
    }

    if (departure.id === arrival.id) {
      setManualError("Departure and arrival airports must be different.");
      return;
    }

    onManualSubmit(
      normalizeFlightData({
        routeFrom: formatAirportRouteLabel(departure),
        routeTo: formatAirportRouteLabel(arrival),
      }),
    );
  };

  return (
    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif,application/pdf,image/jpeg,image/png,image/webp,image/heic,image/heif"
        onChange={(e) => void handleFile(e.target.files?.[0] ?? null)}
      />

      <div
        role="button"
        tabIndex={0}
        aria-label="Upload boarding pass"
        aria-busy={isExtracting}
        className={`border-[3.5px] border-dashed rounded-xl py-8 sm:py-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
          isDragging ? "border-[#2669f3] bg-[#f1f5fe]/50" : "border-[#d5e0f9] hover:border-[#2669f3]/60"
        } ${isExtracting ? "opacity-70 pointer-events-none" : ""}`}
        onClick={openFilePicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFilePicker();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        {isExtracting ? (
          <>
            <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 rounded-full border-4 border-[#d5e0f9] border-t-[#2669f3] animate-spin" />
            <p className="font-bold text-[#1f3664] text-base sm:text-lg mb-1">Reading your boarding pass…</p>
            <p className="text-[#1f3664]/60 text-xs sm:text-sm">Compensall AI is extracting your flight details</p>
          </>
        ) : (
          <>
            <img src="/assets/icons/cloud-upload.svg" alt="" className="w-12 h-12 sm:w-14 sm:h-14 xl:w-[75px] xl:h-[75px] mb-4" />
            <p className="font-bold text-[#1f3664] text-base sm:text-lg mb-1">Upload your boarding pass</p>
            <p className="text-[#1f3664]/60 text-xs sm:text-sm">Drag &amp; drop or click to upload (PDF, JPG, PNG)</p>
          </>
        )}
      </div>

      {extractError && (
        <p className="mt-3 text-sm text-[#e82828] text-center" role="alert">
          {extractError}
        </p>
      )}

      <p className="text-center text-sm text-[#1f3664] my-3">
        <strong className="font-bold">Or</strong> check manually
      </p>

      <div className="flex flex-col lg:flex-row lg:items-stretch border-2 border-[#d5e0f9] rounded-[13px] bg-white min-h-[87px] min-w-0">
        <div className="flex flex-col md:flex-row flex-1 min-w-0 items-stretch">
          <AirportSelect
            id="manual-departure"
            placeholder="Departure airport"
            value={departure}
            onChange={handleDepartureChange}
            excludeAirportId={arrival?.id}
          />
          <button
            type="button"
            onClick={swapAirports}
            className="flex-shrink-0 self-center sm:self-stretch px-4 sm:px-0 sm:w-12 flex items-center justify-center hover:bg-[#f8faff]/50 transition-colors"
            aria-label="Swap airports"
          >
            <img src="/assets/icons/arrow-right-left.svg" alt="" className="w-[23px] h-[23px]" />
          </button>
          <AirportSelect
            id="manual-arrival"
            placeholder="Arrival airport"
            value={arrival}
            onChange={handleArrivalChange}
            excludeAirportId={departure?.id}
          />
        </div>
        <button
          type="button"
          onClick={submitManual}
          className="w-full lg:w-auto flex-shrink-0 bg-[#2669f3] text-white font-bold text-base sm:text-[19px] leading-[27px] px-6 sm:px-8 xl:px-10 py-4 lg:py-0 lg:min-h-[73px] lg:my-[7px] lg:mr-[7px] lg:ml-2 flex items-center justify-center hover:bg-[#1a55d4] transition-colors rounded-[11px] lg:rounded-[10.557px]"
        >
          Check compensation
        </button>
      </div>

      {manualError && (
        <p className="mt-3 text-sm text-[#e82828] text-center" role="alert">
          {manualError}
        </p>
      )}

      <div className="flex items-center justify-center gap-2 mt-4">
        <img src="/assets/icons/shield-lock.svg" alt="" className="w-6 h-6 opacity-50" />
        <p className="text-[#8f8f9f] font-bold text-sm">Your data is protected, Always.</p>
      </div>
    </div>
  );
}
