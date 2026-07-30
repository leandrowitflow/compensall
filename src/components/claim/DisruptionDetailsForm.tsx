"use client";

import { useTranslations } from "next-intl";
import type {
  CancellationNoticeOption,
  ClaimFlightData,
  DelayDurationOption,
  DisruptionReasonOption,
  FlightStatus,
} from "@/lib/claim-types";
import { FIELD_LABEL, FIELD_SELECT } from "@/components/claim/claim-ui";

type DisruptionDetailsFormProps = {
  flight: ClaimFlightData;
  onChange: (flight: ClaimFlightData) => void;
};

const STATUS_OPTIONS: Array<{ value: Exclude<FlightStatus, "Unknown">; labelKey: "delay" | "cancellation" | "deniedBoarding" }> = [
  { value: "Delayed", labelKey: "delay" },
  { value: "Cancelled", labelKey: "cancellation" },
  { value: "Denied boarding", labelKey: "deniedBoarding" },
];

export default function DisruptionDetailsForm({ flight, onChange }: DisruptionDetailsFormProps) {
  const t = useTranslations("claim.disruption");

  const update = (patch: Partial<ClaimFlightData>) => {
    onChange({ ...flight, ...patch });
  };

  const onStatusChange = (status: FlightStatus | "Unknown") => {
    if (status === "Unknown") {
      update({
        status,
        delayDuration: "",
        hadConnectingFlight: null,
        cancellationNotice: "",
      });
      return;
    }

    update({
      status,
      delayDuration: status === "Delayed" ? flight.delayDuration || "" : "",
      hadConnectingFlight: status === "Delayed" ? flight.hadConnectingFlight : null,
      cancellationNotice: status === "Cancelled" ? flight.cancellationNotice || "" : "",
      delay:
        status === "Delayed"
          ? flight.delayDuration || flight.delay
          : status === "Cancelled" || status === "Denied boarding"
            ? "more_than_3"
            : flight.delay,
    });
  };

  return (
    <div className="border border-[#1f3664]/10 rounded-[14px] px-3 sm:px-5 py-4 space-y-4">
      <div>
        <p className="font-bold text-[#1f3664] text-sm sm:text-base">{t("title")}</p>
        <p className="text-[#7b8094] text-xs sm:text-sm mt-1">{t("subtitle")}</p>
      </div>

      <div>
        <label className={FIELD_LABEL} htmlFor="disruption-type">
          {t("type")} <span className="text-[#e82828]">*</span>
        </label>
        <select
          id="disruption-type"
          className={FIELD_SELECT}
          value={flight.status === "Unknown" ? "" : flight.status}
          onChange={(event) => {
            const value = event.target.value as FlightStatus | "";
            onStatusChange(value || "Unknown");
          }}
        >
          <option value="">{t("typePlaceholder")}</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status.value} value={status.value}>
              {t(`types.${status.labelKey}`)}
            </option>
          ))}
        </select>
      </div>

      {flight.status === "Delayed" && (
        <>
          <div>
            <label className={FIELD_LABEL} htmlFor="connecting-flight">
              {t("connectingFlight")} <span className="text-[#e82828]">*</span>
            </label>
            <select
              id="connecting-flight"
              className={FIELD_SELECT}
              value={
                flight.hadConnectingFlight === true
                  ? "yes"
                  : flight.hadConnectingFlight === false
                    ? "no"
                    : ""
              }
              onChange={(event) => {
                const value = event.target.value;
                update({
                  hadConnectingFlight: value === "yes" ? true : value === "no" ? false : null,
                });
              }}
            >
              <option value="">{t("selectPlaceholder")}</option>
              <option value="yes">{t("yes")}</option>
              <option value="no">{t("no")}</option>
            </select>
          </div>

          <div>
            <label className={FIELD_LABEL} htmlFor="delay-duration">
              {t("delayDuration")} <span className="text-[#e82828]">*</span>
            </label>
            <select
              id="delay-duration"
              className={FIELD_SELECT}
              value={flight.delayDuration || ""}
              onChange={(event) => {
                const delayDuration = event.target.value as DelayDurationOption;
                update({
                  delayDuration,
                  delay: delayDuration || flight.delay,
                });
              }}
            >
              <option value="">{t("selectPlaceholder")}</option>
              <option value="less_than_3">{t("delayLessThan3")}</option>
              <option value="more_than_3">{t("delayMoreThan3")}</option>
            </select>
          </div>
        </>
      )}

      {flight.status === "Cancelled" && (
        <div>
          <label className={FIELD_LABEL} htmlFor="cancellation-notice">
            {t("cancellationNotice")} <span className="text-[#e82828]">*</span>
          </label>
          <select
            id="cancellation-notice"
            className={FIELD_SELECT}
            value={flight.cancellationNotice || ""}
            onChange={(event) => {
              update({
                cancellationNotice: event.target.value as CancellationNoticeOption,
              });
            }}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="14 days or more">{t("notice14OrMore")}</option>
            <option value="Less than 14 days">{t("noticeLessThan14")}</option>
          </select>
          {flight.cancellationNotice === "14 days or more" && (
            <p className="text-[#7b8094] text-xs mt-2 leading-relaxed">{t("noticeInfo")}</p>
          )}
        </div>
      )}

      {flight.status !== "Unknown" && (
        <div>
          <label className={FIELD_LABEL} htmlFor="disruption-reason">
            {t("reason")} <span className="text-[#e82828]">*</span>
          </label>
          <select
            id="disruption-reason"
            className={FIELD_SELECT}
            value={flight.disruptionReason || ""}
            onChange={(event) => {
              update({
                disruptionReason: event.target.value as DisruptionReasonOption,
              });
            }}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="technical">{t("reasons.technical")}</option>
            <option value="weather">{t("reasons.weather")}</option>
            <option value="strike">{t("reasons.strike")}</option>
            <option value="crew">{t("reasons.crew")}</option>
            <option value="airport">{t("reasons.airport")}</option>
            <option value="other">{t("reasons.other")}</option>
          </select>
        </div>
      )}
    </div>
  );
}
