"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { startTransition, useState } from "react";
import { FIELD_INPUT, FIELD_LABEL } from "@/components/claim/claim-ui";
import { findAirportById, formatAirportRouteLabel, type AirportOption } from "@/lib/airport-search";
import type { ClaimFlightData, ConnectingFlightLeg } from "@/lib/claim-types";
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

const EMPTY_LEG: ConnectingFlightLeg = { airport: "", flightNumber: "" };

export default function Step2Airports({ flight, onFlightChange }: Step2AirportsProps) {
  const tStep1 = useTranslations("claim.step1");
  const tStep2 = useTranslations("claim.step2");
  const tConnecting = useTranslations("claim.connecting");
  const [manualError, setManualError] = useState<string | null>(null);
  const [loadAirportSelect, setLoadAirportSelect] = useState(false);
  const [autoOpenAirportId, setAutoOpenAirportId] = useState<string | null>(null);

  const departure = airportFromRoute(flight.routeFrom);
  const arrival = airportFromRoute(flight.routeTo);
  const connection = flight.connectingFlights?.[0] ?? EMPTY_LEG;
  const hasConnection = flight.hadConnectingFlight === true;
  const connectionAirport = airportFromRoute(connection.airport);

  const activateAirportSelect = (id: string) => {
    setAutoOpenAirportId(id);
    void loadAirportSelectChunk();
    startTransition(() => setLoadAirportSelect(true));
  };

  const applyRoute = (
    nextDeparture: AirportOption | null,
    nextArrival: AirportOption | null,
    nextConnection: ConnectingFlightLeg | null,
  ) => {
    onFlightChange({
      ...flight,
      routeFrom: nextDeparture ? formatAirportRouteLabel(nextDeparture) : "",
      routeTo: nextArrival ? formatAirportRouteLabel(nextArrival) : "",
      hadConnectingFlight: Boolean(nextConnection),
      connectingFlights: nextConnection ? [nextConnection] : [],
    });
  };

  const handleDepartureChange = (airport: AirportOption | null) => {
    if (airport && arrival?.id === airport.id) {
      setManualError(tStep1("errors.airportsMustDiffer"));
      applyRoute(airport, null, hasConnection ? connection : null);
      return;
    }
    setManualError(null);
    applyRoute(airport, arrival, hasConnection ? connection : null);
  };

  const handleArrivalChange = (airport: AirportOption | null) => {
    if (airport && departure?.id === airport.id) {
      setManualError(tStep1("errors.airportsMustDiffer"));
      applyRoute(departure, null, hasConnection ? connection : null);
      return;
    }
    setManualError(null);
    applyRoute(departure, airport, hasConnection ? connection : null);
  };

  const airportField = (
    id: "route-departure" | "route-arrival" | "route-connection",
    placeholder: string,
    value: AirportOption | null,
    excludeAirportId: string | undefined,
    onChange: (airport: AirportOption | null) => void,
  ) =>
    loadAirportSelect ? (
      <AirportSelect
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        excludeAirportId={excludeAirportId}
        autoOpen={autoOpenAirportId === id}
        variant={id === "route-connection" ? "field" : undefined}
      />
    ) : (
      <AirportSelectPlaceholder
        id={id}
        placeholder={value ? formatAirportRouteLabel(value) : placeholder}
        onActivate={() => activateAirportSelect(id)}
      />
    );

  return (
    <div className="mb-4">
      <p className="font-bold text-[#1f3664] text-sm sm:text-base">{tStep2("routeTitle")}</p>
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex items-stretch border-2 border-[#d5e0f9] rounded-[13px] bg-white min-h-[73px] min-w-0">
          {airportField("route-departure", tStep1("departureAirport"), departure, arrival?.id, handleDepartureChange)}
          <button
            type="button"
            onClick={() => {
              setManualError(null);
              applyRoute(arrival, departure, hasConnection ? connection : null);
            }}
            className="flex-shrink-0 self-center min-h-11 min-w-11 mr-2 flex items-center justify-center rounded-full hover:bg-[#f8faff] active:bg-[#e7eeff] transition-colors"
            aria-label={tStep1("swapAirports")}
            {...gtmId("claim_step2_swap_airports")}
          >
            <img src="/assets/icons/arrow-right-left.svg" alt="" aria-hidden="true" width={23} height={23} decoding="async" className="w-[23px] h-[23px] object-contain" />
          </button>
        </div>

        {hasConnection ? (
          <div className="border-2 border-dashed border-[#d5e0f9] rounded-[13px] bg-[#f8faff] p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="font-bold text-[#1f3664] text-sm">{tConnecting("legLabel", { number: 1 })}</p>
              <button
                type="button"
                className="text-sm font-semibold text-[#7b8094] hover:text-[#1f3664]"
                onClick={() => applyRoute(departure, arrival, null)}
                {...gtmId("claim_step2_remove_connection")}
              >
                {tConnecting("removeFlight")}
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#7b8094] mb-3">{tConnecting("flightNumberHint")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className={FIELD_LABEL}>{tConnecting("airport")}</p>
                {airportField(
                  "route-connection",
                  tConnecting("airportPlaceholder"),
                  connectionAirport,
                  undefined,
                  (airport) => {
                    applyRoute(departure, arrival, {
                      ...connection,
                      airport: airport ? formatAirportRouteLabel(airport) : "",
                    });
                  },
                )}
              </div>
              <div>
                <label className={FIELD_LABEL} htmlFor="connecting-flight-0">
                  {tConnecting("flightNumber")}
                </label>
                <input
                  id="connecting-flight-0"
                  className={FIELD_INPUT}
                  value={connection.flightNumber}
                  placeholder={tConnecting("flightNumberPlaceholder")}
                  onChange={(event) =>
                    applyRoute(departure, arrival, {
                      ...connection,
                      flightNumber: event.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="min-h-12 rounded-[13px] border-2 border-dashed border-[#2669f3] bg-white px-4 text-sm sm:text-base font-bold text-[#2669f3] hover:bg-[#f5f8ff]"
            onClick={() => {
              void loadAirportSelectChunk();
              startTransition(() => setLoadAirportSelect(true));
              applyRoute(departure, arrival, EMPTY_LEG);
            }}
            {...gtmId("claim_step2_add_connection")}
          >
            {tConnecting("addFlight")}
          </button>
        )}

        <div className="border-2 border-[#d5e0f9] rounded-[13px] bg-white min-h-[73px] min-w-0">
          {airportField("route-arrival", tStep1("arrivalAirport"), arrival, departure?.id, handleArrivalChange)}
        </div>
      </div>
      {manualError && (
        <p className="mt-3 text-sm text-[#e82828]" role="alert">
          {manualError}
        </p>
      )}
      {departure && arrival ? (
        <div className="mt-4 rounded-[13px] border border-[#d5e0f9] bg-white px-4 py-3 text-center">
          <p className="font-bold text-[#1f3664] text-base sm:text-lg">
            {formatAirportRouteLabel(departure)} — {formatAirportRouteLabel(arrival)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
