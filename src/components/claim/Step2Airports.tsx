"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { startTransition, useState } from "react";
import CompensationEstimateBanner from "@/components/claim/CompensationEstimateBanner";
import { findAirportById, formatAirportRouteLabel, type AirportOption } from "@/lib/airport-search";
import type { ClaimFlightData } from "@/lib/claim-types";
import { normalizeIata } from "@/lib/iata";
import { gtmId } from "@/lib/gtm";

function loadAirportSelectChunk() {
  return import("@/components/claim/AirportSelect");
}

const AirportSelect = dynamic(loadAirportSelectChunk, {
  ssr: false,
  loading: () => (
    <div className="relative flex-1 min-w-0 self-stretch">
      <div className="w-full h-full min-h-[73px]" aria-hidden />
    </div>
  ),
});

function AirportSelectPlaceholder({
  id,
  placeholder,
  onActivate,
}: {
  id: string;
  placeholder: string;
  onActivate: () => void;
}) {
  return (
    <div className="relative flex-1 min-w-0 self-stretch">
      <span className="sr-only" id={`${id}-label`}>
        {placeholder}
      </span>
      <button
        type="button"
        id={id}
        aria-labelledby={`${id}-label`}
        onClick={onActivate}
        onFocus={onActivate}
        className="w-full h-full min-h-[73px] px-4 sm:px-6 flex items-center justify-center text-center hover:bg-[#f8faff]/50 transition-colors"
      >
        <span className="text-[#1f3664] text-base sm:text-lg">{placeholder}</span>
      </button>
    </div>
  );
}

function airportFromRoute(label: string): AirportOption | null {
  const iata = normalizeIata(label);
  if (!iata) return null;
  return findAirportById(iata);
}

type Step2AirportsProps = {
  flight: ClaimFlightData;
  onFlightChange: (flight: ClaimFlightData) => void;
};

export default function Step2Airports({ flight, onFlightChange }: Step2AirportsProps) {
  const tStep1 = useTranslations("claim.step1");
  const tStep2 = useTranslations("claim.step2");
  const [manualError, setManualError] = useState<string | null>(null);
  const [loadAirportSelect, setLoadAirportSelect] = useState(false);
  const [autoOpenAirportId, setAutoOpenAirportId] = useState<string | null>(null);

  const departure = airportFromRoute(flight.routeFrom);
  const arrival = airportFromRoute(flight.routeTo);

  const activateAirportSelect = (id: string) => {
    setAutoOpenAirportId(id);
    void loadAirportSelectChunk();
    startTransition(() => setLoadAirportSelect(true));
  };

  const applyAirports = (nextDeparture: AirportOption | null, nextArrival: AirportOption | null) => {
    onFlightChange({
      ...flight,
      routeFrom: nextDeparture ? formatAirportRouteLabel(nextDeparture) : "",
      routeTo: nextArrival ? formatAirportRouteLabel(nextArrival) : "",
    });
  };

  const handleDepartureChange = (airport: AirportOption | null) => {
    if (airport && arrival?.id === airport.id) {
      setManualError(tStep1("errors.airportsMustDiffer"));
      applyAirports(airport, null);
      return;
    }
    setManualError(null);
    applyAirports(airport, arrival);
  };

  const handleArrivalChange = (airport: AirportOption | null) => {
    if (airport && departure?.id === airport.id) {
      setManualError(tStep1("errors.airportsMustDiffer"));
      applyAirports(departure, null);
      return;
    }
    setManualError(null);
    applyAirports(departure, airport);
  };

  return (
    <div className="mb-4">
      <p className="font-bold text-[#1f3664] text-sm sm:text-base">{tStep2("routeTitle")}</p>
      <div className="mt-3 flex flex-col md:flex-row md:items-stretch border-2 border-[#d5e0f9] rounded-[13px] bg-white min-h-[87px] min-w-0">
        {loadAirportSelect ? (
          <AirportSelect
            id="route-departure"
            placeholder={tStep1("departureAirport")}
            value={departure}
            onChange={handleDepartureChange}
            excludeAirportId={arrival?.id}
            autoOpen={autoOpenAirportId === "route-departure"}
          />
        ) : (
          <AirportSelectPlaceholder
            id="route-departure"
            placeholder={departure ? formatAirportRouteLabel(departure) : tStep1("departureAirport")}
            onActivate={() => activateAirportSelect("route-departure")}
          />
        )}
        <button
          type="button"
          onClick={() => {
            setManualError(null);
            applyAirports(arrival, departure);
          }}
          className="flex-shrink-0 self-center md:self-stretch min-h-11 min-w-11 px-4 md:px-0 md:min-w-12 flex items-center justify-center rounded-full hover:bg-[#f8faff] active:bg-[#e7eeff] transition-colors"
          aria-label={tStep1("swapAirports")}
          {...gtmId("claim_step2_swap_airports")}
        >
          <img src="/assets/icons/arrow-right-left.svg" alt="" aria-hidden="true" width={23} height={23} decoding="async" className="w-[23px] h-[23px] object-contain" />
        </button>
        {loadAirportSelect ? (
          <AirportSelect
            id="route-arrival"
            placeholder={tStep1("arrivalAirport")}
            value={arrival}
            onChange={handleArrivalChange}
            excludeAirportId={departure?.id}
            autoOpen={autoOpenAirportId === "route-arrival"}
          />
        ) : (
          <AirportSelectPlaceholder
            id="route-arrival"
            placeholder={arrival ? formatAirportRouteLabel(arrival) : tStep1("arrivalAirport")}
            onActivate={() => activateAirportSelect("route-arrival")}
          />
        )}
      </div>
      {manualError && (
        <p className="mt-3 text-sm text-[#e82828]" role="alert">
          {manualError}
        </p>
      )}
      <CompensationEstimateBanner
        routeFrom={flight.routeFrom}
        routeTo={flight.routeTo}
        estimate={flight.compensationEstimate}
        prominent
        className="mt-4"
      />
    </div>
  );
}
