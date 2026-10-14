"use client";

import { useTranslations } from "next-intl";
import type { ClaimFlightData } from "@/lib/claim-types";
import { FieldIssue } from "@/components/claim/FieldIssue";
import { FIELD_INPUT, FIELD_LABEL, fieldControlClass } from "@/components/claim/claim-ui";
import type { Step2Issue } from "@/lib/claim-form-issues";
import {
  normalizeFlightDate,
  toDateInputValue,
} from "@/lib/resolve-boarding-pass-references";

type FlightDetailsFormProps = {
  flight: ClaimFlightData;
  onChange: (flight: ClaimFlightData) => void;
  idPrefix?: string;
  issue?: Step2Issue | null;
};

export default function FlightDetailsForm({
  flight,
  onChange,
  idPrefix = "flight",
  issue = null,
}: FlightDetailsFormProps) {
  const t = useTranslations("claim.step2.fields");
  const update = (patch: Partial<ClaimFlightData>) => onChange({ ...flight, ...patch });
  const messageFor = (field: Step2Issue["field"]) => (issue?.field === field ? issue.message : null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="sm:col-span-2 scroll-mt-28">
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-passenger`}>
          {t("passenger")}
        </label>
        <input
          id={`${idPrefix}-passenger`}
          className={fieldControlClass(FIELD_INPUT, issue?.field === "passenger")}
          value={flight.passenger}
          onChange={(e) => update({ passenger: e.target.value })}
          placeholder={t("passengerPlaceholder")}
          aria-invalid={issue?.field === "passenger" || undefined}
          aria-describedby={issue?.field === "passenger" ? `${idPrefix}-passenger-error` : undefined}
        />
        <FieldIssue id={`${idPrefix}-passenger-error`} message={messageFor("passenger")} />
      </div>
      <div className="scroll-mt-28">
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-flight`}>
          {t("flightNumber")}
        </label>
        <input
          id={`${idPrefix}-flight`}
          className={fieldControlClass(FIELD_INPUT, issue?.field === "flight")}
          value={flight.flight}
          onChange={(e) => update({ flight: e.target.value })}
          placeholder={t("flightPlaceholder")}
          aria-invalid={issue?.field === "flight" || undefined}
          aria-describedby={issue?.field === "flight" ? `${idPrefix}-flight-error` : undefined}
        />
        <FieldIssue id={`${idPrefix}-flight-error`} message={messageFor("flight")} />
      </div>
      <div className="scroll-mt-28">
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-date`}>
          {t("date")}
        </label>
        <input
          id={`${idPrefix}-date`}
          type="date"
          className={fieldControlClass(`${FIELD_INPUT} cursor-pointer`, issue?.field === "date")}
          value={toDateInputValue(flight.date)}
          onChange={(e) =>
            update({
              date: e.target.value ? normalizeFlightDate(e.target.value) : "",
            })
          }
          onClick={(e) => {
            const input = e.currentTarget;
            try {
              input.showPicker?.();
            } catch {
              // showPicker can throw if the input is not available yet
            }
          }}
          onFocus={(e) => {
            const input = e.currentTarget;
            try {
              input.showPicker?.();
            } catch {
              // ignore
            }
          }}
          aria-invalid={issue?.field === "date" || undefined}
          aria-describedby={issue?.field === "date" ? `${idPrefix}-date-error` : undefined}
        />
        <FieldIssue id={`${idPrefix}-date-error`} message={messageFor("date")} />
      </div>
      <div className="scroll-mt-28">
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-from`}>
          {t("departure")}
        </label>
        <input
          id={`${idPrefix}-from`}
          className={fieldControlClass(FIELD_INPUT, issue?.field === "routeFrom")}
          value={flight.routeFrom}
          onChange={(e) => update({ routeFrom: e.target.value })}
          placeholder={t("departurePlaceholder")}
          aria-invalid={issue?.field === "routeFrom" || undefined}
          aria-describedby={issue?.field === "routeFrom" ? `${idPrefix}-from-error` : undefined}
        />
        <FieldIssue id={`${idPrefix}-from-error`} message={messageFor("routeFrom")} />
      </div>
      <div className="scroll-mt-28">
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-to`}>
          {t("arrival")}
        </label>
        <input
          id={`${idPrefix}-to`}
          className={fieldControlClass(FIELD_INPUT, issue?.field === "routeTo")}
          value={flight.routeTo}
          onChange={(e) => update({ routeTo: e.target.value })}
          placeholder={t("arrivalPlaceholder")}
          aria-invalid={issue?.field === "routeTo" || undefined}
          aria-describedby={issue?.field === "routeTo" ? `${idPrefix}-to-error` : undefined}
        />
        <FieldIssue id={`${idPrefix}-to-error`} message={messageFor("routeTo")} />
      </div>
    </div>
  );
}
