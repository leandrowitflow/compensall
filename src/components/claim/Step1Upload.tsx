"use client";

import { useTranslations } from "next-intl";
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
  const tStep1 = useTranslations("claim.step1");
  const tCommon = useTranslations("common");
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

  const onDrop = async (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    await handleFile(event.dataTransfer.files[0] ?? null);
  };

  const swapAirports = () => {
    if (isExtracting) return;

    setDeparture(arrival);
    setArrival(departure);
    setManualError(null);
  };

  const handleDepartureChange = (airport: AirportOption | null) => {
    if (isExtracting) return;

    setDeparture(airport);
    if (airport && arrival?.id === airport.id) {
      setArrival(null);
    }
    setManualError(null);
  };

  const handleArrivalChange = (airport: AirportOption | null) => {
    if (isExtracting) return;

    setArrival(airport);
    if (airport && departure?.id === airport.id) {
      setDeparture(null);
    }
    setManualError(null);
  };

  const submitManual = () => {
    if (isExtracting) return;

    setManualError(null);

    if (!departure || !arrival) {
      setManualError(tStep1("errors.selectBothAirports"));
      return;
    }

    if (departure.id === arrival.id) {
      setManualError(tStep1("errors.airportsMustDiffer"));
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
    <div className="px-6 sm:px-10 xl:px-14 pt-4 sm:pt-5 xl:pt-6 pb-6 sm:pb-8 xl:pb-10">
      <p className="text-sm text-muted text-center mb-4 max-w-lg mx-auto leading-relaxed">
        {tStep1("rightsContext")}
      </p>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif,application/pdf,image/jpeg,image/png,image/webp,image/heic,image/heif"
        onChange={(e) => void handleFile(e.target.files?.[0] ?? null)}
      />

      <button
        type="button"
        aria-busy={isExtracting}
        disabled={isExtracting}
        className={`w-full border-[3.5px] border-dashed rounded-xl py-8 sm:py-10 flex flex-col items-center justify-center text-center transition-colors bg-transparent ${
          isDragging ? "border-[#2669f3] bg-[#f1f5fe]/50" : "border-[#d5e0f9] hover:border-[#2669f3]/60"
        } ${isExtracting ? "opacity-70" : ""}`}
        onClick={openFilePicker}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        {isExtracting ? (
          <>
            <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 rounded-full border-4 border-[#d5e0f9] border-t-[#2669f3] animate-spin" aria-hidden />
            <p className="font-bold text-[#1f3664] text-base sm:text-lg mb-1">{tStep1("readingBoardingPass")}</p>
            <p className="text-muted text-xs sm:text-sm">
              {tStep1("extractingDetails", { assistantName: tCommon("assistantName") })}
            </p>
          </>
        ) : (
          <>
            <img src="/assets/icons/cloud-upload.svg" alt="" aria-hidden="true" className="w-12 h-12 sm:w-14 sm:h-14 xl:w-[75px] xl:h-[75px] mb-4 object-contain" />
            <p className="font-bold text-[#1f3664] text-base sm:text-lg mb-1">{tStep1("uploadTitle")}</p>
            <p className="text-muted text-xs sm:text-sm">{tStep1("uploadHint")}</p>
          </>
        )}
      </button>

      {extractError && (
        <p className="mt-3 text-sm text-[#e82828] text-center" role="alert">
          {extractError}
        </p>
      )}

      <p className={`text-center text-sm text-[#1f3664] my-5 sm:my-6 ${isExtracting ? "opacity-50" : ""}`}>
        <strong className="font-bold">{tStep1("orCheckManually")}</strong> {tStep1("checkManually")}
      </p>

      <div
        aria-busy={isExtracting}
        className={`flex flex-col lg:flex-row lg:items-stretch border-2 border-[#d5e0f9] rounded-[13px] bg-white min-h-[87px] min-w-0 transition-opacity ${
          isExtracting ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="flex flex-col md:flex-row flex-1 min-w-0 items-stretch">
          <AirportSelect
            id="manual-departure"
            placeholder={tStep1("departureAirport")}
            value={departure}
            onChange={handleDepartureChange}
            excludeAirportId={arrival?.id}
            disabled={isExtracting}
          />
          <button
            type="button"
            onClick={swapAirports}
            disabled={isExtracting}
            className="flex-shrink-0 self-center sm:self-stretch min-h-11 min-w-11 px-4 sm:px-0 sm:min-w-12 flex items-center justify-center hover:bg-[#f8faff]/50 transition-colors disabled:cursor-not-allowed disabled:hover:bg-transparent"
            aria-label={tStep1("swapAirports")}
          >
            <img src="/assets/icons/arrow-right-left.svg" alt="" aria-hidden="true" className="w-[23px] h-[23px] object-contain" />
          </button>
          <AirportSelect
            id="manual-arrival"
            placeholder={tStep1("arrivalAirport")}
            value={arrival}
            onChange={handleArrivalChange}
            excludeAirportId={departure?.id}
            disabled={isExtracting}
          />
        </div>
        <button
          type="button"
          onClick={submitManual}
          disabled={isExtracting}
          className="w-full lg:w-auto flex-shrink-0 bg-[#2669f3] text-white font-bold text-base sm:text-[19px] leading-[27px] px-6 sm:px-8 xl:px-10 py-4 lg:py-0 lg:min-h-[73px] lg:my-[7px] lg:mr-[7px] lg:ml-2 flex items-center justify-center hover:bg-[#1a55d4] transition-colors rounded-[11px] lg:rounded-[10.557px] disabled:cursor-not-allowed disabled:bg-[#2669f3]/70 disabled:hover:bg-[#2669f3]/70"
        >
          {tCommon("checkCompensation")}
        </button>
      </div>

      {manualError && (
        <p className="mt-3 text-sm text-[#e82828] text-center" role="alert">
          {manualError}
        </p>
      )}

      <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 xl:mt-10">
        <img src="/assets/icons/shield-lock.svg" alt="" aria-hidden="true" className="w-6 h-6 opacity-50 object-contain" />
        <p className="text-muted font-bold text-sm">{tStep1("dataProtected")}</p>
      </div>
    </div>
  );
}
