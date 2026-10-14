"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import type { ClaimFlightData, ConnectingFlightLeg } from "@/lib/claim-types";
import { formatAirportRouteLabel, type AirportOption } from "@/lib/airport-option";
import { lookupAirportByIata, normalizeIata } from "@/lib/lookup-airport";
import { FieldIssue } from "@/components/claim/FieldIssue";
import { FIELD_INPUT, FIELD_LABEL, FIELD_SELECT, fieldControlClass } from "@/components/claim/claim-ui";
import type { Step2Issue } from "@/lib/claim-form-issues";

const AirportSelect = dynamic(() => import("@/components/claim/AirportSelect"), {
  ssr: false,
});

type ConnectingFlightsFormProps = {
  flight: ClaimFlightData;
  onChange: (flight: ClaimFlightData) => void;
  issue?: Step2Issue | null;
};

const EMPTY_LEG: ConnectingFlightLeg = { airport: "", flightNumber: "" };

function airportFromRoute(route: string): AirportOption | null {
  const iata = normalizeIata(route);
  return iata ? lookupAirportByIata(iata) : null;
}

export default function ConnectingFlightsForm({ flight, onChange, issue = null }: ConnectingFlightsFormProps) {
  const t = useTranslations("claim.connecting");

  const legs = flight.connectingFlights?.length
    ? [
        flight.connectingFlights[0] ?? EMPTY_LEG,
        flight.connectingFlights[1] ?? EMPTY_LEG,
      ]
    : [EMPTY_LEG, EMPTY_LEG];

  const showSecondLeg = (flight.connectingFlights?.length ?? 0) > 1;

  const update = (patch: Partial<ClaimFlightData>) => {
    onChange({ ...flight, ...patch });
  };

  const updateLeg = (index: number, patch: Partial<ConnectingFlightLeg>) => {
    const next: ConnectingFlightLeg[] = [
      { ...EMPTY_LEG, ...legs[0] },
      { ...EMPTY_LEG, ...legs[1] },
    ];
    next[index] = { ...next[index]!, ...patch };
    update({ connectingFlights: next });
  };

  const renderLeg = (index: number, required: boolean) => {
    const leg = legs[index] ?? EMPTY_LEG;
    const selectedAirport = airportFromRoute(leg.airport);

    return (
      <div key={`connecting-leg-${index}`} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <p className="font-bold text-[#1f3664] text-sm mb-1">
            {t("legLabel", { number: index + 1 })}
          </p>
        </div>
        <div>
          <label className={FIELD_LABEL} htmlFor={`connecting-airport-${index}`}>
            {t("airport")} {required && <span className="text-[#e82828]">*</span>}
          </label>
          <AirportSelect
            id={`connecting-airport-${index}`}
            placeholder={t("airportPlaceholder")}
            value={selectedAirport}
            variant="field"
            onChange={(airport) =>
              updateLeg(index, {
                airport: airport ? formatAirportRouteLabel(airport) : "",
              })
            }
          />
          {index === 0 && (
            <FieldIssue
              id="connecting-airport-0-error"
              message={issue?.field === "connectingAirport" ? issue.message : null}
            />
          )}
        </div>
        <div>
          <label className={FIELD_LABEL} htmlFor={`connecting-flight-${index}`}>
            {t("flightNumber")} {required && <span className="text-[#e82828]">*</span>}
          </label>
          <input
            id={`connecting-flight-${index}`}
            className={fieldControlClass(FIELD_INPUT, index === 0 && issue?.field === "connectingFlight")}
            value={leg.flightNumber}
            onChange={(event) => updateLeg(index, { flightNumber: event.target.value })}
            placeholder={t("flightNumberPlaceholder")}
            aria-invalid={(index === 0 && issue?.field === "connectingFlight") || undefined}
            aria-describedby={
              index === 0 && issue?.field === "connectingFlight" ? "connecting-flight-0-error" : undefined
            }
          />
          {index === 0 && <FieldIssue id="connecting-flight-0-error" message={issue?.field === "connectingFlight" ? issue.message : null} />}
        </div>
      </div>
    );
  };

  return (
    <div className="border border-[#1f3664]/10 rounded-[14px] px-3 sm:px-5 py-4 space-y-4">
      <div>
        <p className="font-bold text-[#1f3664] text-sm sm:text-base">{t("title")}</p>
        <p className="text-[#7b8094] text-xs sm:text-sm mt-1">{t("subtitle")}</p>
      </div>

      <div>
        <label className={FIELD_LABEL} htmlFor="had-connecting-flight">
          {t("hadConnecting")} <span className="text-[#e82828]">*</span>
        </label>
        <select
          id="had-connecting-flight"
          className={fieldControlClass(FIELD_SELECT, issue?.field === "connecting")}
          aria-invalid={issue?.field === "connecting" || undefined}
          aria-describedby={issue?.field === "connecting" ? "had-connecting-flight-error" : undefined}
          value={
            flight.hadConnectingFlight === true
              ? "yes"
              : flight.hadConnectingFlight === false
                ? "no"
                : ""
          }
          onChange={(event) => {
            const value = event.target.value;
            if (value === "yes") {
              update({
                hadConnectingFlight: true,
                connectingFlights: [legs[0] ?? EMPTY_LEG],
              });
              return;
            }
            if (value === "no") {
              update({
                hadConnectingFlight: false,
                connectingFlights: [],
              });
              return;
            }
            update({
              hadConnectingFlight: null,
              connectingFlights: [],
            });
          }}
        >
          <option value="">{t("selectPlaceholder")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
        <FieldIssue id="had-connecting-flight-error" message={issue?.field === "connecting" ? issue.message : null} />
      </div>

      {flight.hadConnectingFlight === true && (
        <div className="space-y-4">
          {renderLeg(0, true)}

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-[#d5e0f9] text-[#2669f3] focus:ring-[#2669f3]"
              checked={showSecondLeg}
              onChange={(event) => {
                if (event.target.checked) {
                  update({
                    connectingFlights: [legs[0] ?? EMPTY_LEG, legs[1] ?? EMPTY_LEG],
                  });
                  return;
                }
                update({
                  connectingFlights: [legs[0] ?? EMPTY_LEG],
                });
              }}
            />
            <span className="text-sm text-[#1f3664] leading-snug">{t("anotherConnecting")}</span>
          </label>

          {showSecondLeg && renderLeg(1, false)}
        </div>
      )}
    </div>
  );
}
