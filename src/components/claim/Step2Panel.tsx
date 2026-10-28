"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import type { ClaimFlightData } from "@/lib/claim-types";
import CompensationEstimateBanner from "@/components/claim/CompensationEstimateBanner";
import DisruptionDetailsForm from "@/components/claim/DisruptionDetailsForm";
import FlightDetailsForm from "@/components/claim/FlightDetailsForm";
import Step2Airports from "@/components/claim/Step2Airports";
import { focusClaimField } from "@/components/claim/FieldIssue";
import { ACTION_BTN } from "@/components/claim/claim-ui";
import { isIneligibleForCompensation } from "@/lib/claim-types";
import { STEP2_FIELD_ELEMENT, type Step2Issue } from "@/lib/claim-form-issues";
import { gtmId } from "@/lib/gtm";

type Step2PanelProps = {
  flight: ClaimFlightData;
  isAdvancing?: boolean;
  validationError: Step2Issue | null;
  extractWarning: string | null;
  onFlightChange: (flight: ClaimFlightData) => void;
  onDelete: () => void;
  onContinue: () => void;
};

export default function Step2Panel({
  flight,
  isAdvancing = false,
  validationError,
  extractWarning,
  onFlightChange,
  onDelete,
  onContinue,
}: Step2PanelProps) {
  const tStep2 = useTranslations("claim.step2");
  const ineligible = isIneligibleForCompensation(flight);
  const fieldIssue = validationError && validationError.field !== "ineligible" ? validationError : null;

  useEffect(() => {
    if (!fieldIssue || fieldIssue.field === "ineligible") return;
    focusClaimField(STEP2_FIELD_ELEMENT[fieldIssue.field]);
  }, [fieldIssue]);

  return (
    <div className="border border-[#d5e0f9] rounded-[21px] p-4 sm:p-5 xl:p-6 flex flex-col h-full bg-white">
      <Step2Airports flight={flight} onFlightChange={onFlightChange} />

      {extractWarning && (
        <p className="text-sm text-[#fa6d19] bg-[#fff7f0] border border-[#ffd9b8] rounded-[12px] px-4 py-3 mb-4" role="status">
          {extractWarning}
        </p>
      )}

      <div className="border border-[#1f3664]/10 rounded-[14px] px-3 sm:px-5 py-4 mb-4">
        <FlightDetailsForm flight={flight} onChange={onFlightChange} idPrefix="edit" issue={fieldIssue} hideRoute />
      </div>

      <div className="mb-4">
        <DisruptionDetailsForm flight={flight} onChange={onFlightChange} issue={fieldIssue} />
      </div>

      {flight.routeFrom.trim() && flight.routeTo.trim() && flight.flight.trim() && flight.date.trim() ? (
        <CompensationEstimateBanner
          routeFrom={flight.routeFrom}
          routeTo={flight.routeTo}
          estimate={flight.compensationEstimate}
          prominent
          className="mb-4"
        />
      ) : null}

      <div className="bg-[#f0f3fe] rounded-[13px] px-4 py-4 mb-4 max-w-sm">
        <p className="text-[#1f3664] text-sm sm:text-base leading-relaxed">
          <span className="font-bold">{tStep2("confirmPrompt")}</span>
          <br />
          {tStep2("confirmHint")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-auto pt-2">
        <button
          type="button"
          onClick={onDelete}
          className={`border-2 border-[#e82828] text-[#e82828] hover:bg-[#e82828]/5 ${ACTION_BTN}`}
          {...gtmId("claim_step2_delete_data")}
        >
          {tStep2("deleteData")}
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={ineligible || isAdvancing}
          className={`bg-[#2669f3] text-white hover:bg-[#1a55d4] sm:ml-auto disabled:opacity-50 disabled:cursor-not-allowed ${ACTION_BTN}`}
          {...gtmId("claim_step2_yes_continue")}
        >
          {tStep2("yesContinue")}
        </button>
      </div>
    </div>
  );
}
