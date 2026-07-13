"use client";

import { useTranslations } from "next-intl";
import type { ClaimFlightData } from "@/lib/claim-types";
import { FIELD_INPUT, FIELD_LABEL } from "@/components/claim/claim-ui";

type FlightDetailsFormProps = {
  flight: ClaimFlightData;
  onChange: (flight: ClaimFlightData) => void;
  idPrefix?: string;
};

export default function FlightDetailsForm({ flight, onChange, idPrefix = "flight" }: FlightDetailsFormProps) {
  const t = useTranslations("claim.step2.fields");
  const update = (patch: Partial<ClaimFlightData>) => onChange({ ...flight, ...patch });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="sm:col-span-2">
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-passenger`}>
          {t("passenger")}
        </label>
        <input
          id={`${idPrefix}-passenger`}
          className={FIELD_INPUT}
          value={flight.passenger}
          onChange={(e) => update({ passenger: e.target.value })}
          placeholder={t("passengerPlaceholder")}
        />
      </div>
      <div>
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-flight`}>
          {t("flightNumber")}
        </label>
        <input
          id={`${idPrefix}-flight`}
          className={FIELD_INPUT}
          value={flight.flight}
          onChange={(e) => update({ flight: e.target.value })}
          placeholder={t("flightPlaceholder")}
        />
      </div>
      <div>
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-date`}>
          {t("date")}
        </label>
        <input
          id={`${idPrefix}-date`}
          type="date"
          className={FIELD_INPUT}
          value={flight.date}
          onChange={(e) => update({ date: e.target.value })}
        />
      </div>
      <div>
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-from`}>
          {t("departure")}
        </label>
        <input
          id={`${idPrefix}-from`}
          className={FIELD_INPUT}
          value={flight.routeFrom}
          onChange={(e) => update({ routeFrom: e.target.value })}
          placeholder={t("departurePlaceholder")}
        />
      </div>
      <div>
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-to`}>
          {t("arrival")}
        </label>
        <input
          id={`${idPrefix}-to`}
          className={FIELD_INPUT}
          value={flight.routeTo}
          onChange={(e) => update({ routeTo: e.target.value })}
          placeholder={t("arrivalPlaceholder")}
        />
      </div>
    </div>
  );
}
