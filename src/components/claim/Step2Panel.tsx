"use client";

import type { ClaimFlightData } from "@/lib/claim-types";
import FlightDetailsForm from "@/components/claim/FlightDetailsForm";
import { InfoBoardRow } from "@/components/claim/ClaimSidebar";
import { ACTION_BTN } from "@/components/claim/claim-ui";

type Step2PanelProps = {
  flight: ClaimFlightData;
  isEditing: boolean;
  validationError: string | null;
  onFlightChange: (flight: ClaimFlightData) => void;
  onToggleEdit: () => void;
  onDelete: () => void;
  onContinue: () => void;
};

export default function Step2Panel({
  flight,
  isEditing,
  validationError,
  onFlightChange,
  onToggleEdit,
  onDelete,
  onContinue,
}: Step2PanelProps) {
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

      {isEditing ? (
        <div className="border border-[#1f3664]/10 rounded-[14px] px-3 sm:px-5 py-4 mb-4">
          <FlightDetailsForm flight={flight} onChange={onFlightChange} idPrefix="edit" />
        </div>
      ) : (
        <div className="border border-[#1f3664]/10 rounded-[14px] px-3 sm:px-5 py-2 mb-4">
          <InfoBoardRow icon="/assets/claim/claim-person.svg" label="Passenger" value={flight.passenger || "—"} />
          <InfoBoardRow icon="/assets/claim/claim-flight.svg" label="Flight" value={flight.flight || "—"} />
          <InfoBoardRow
            icon="/assets/claim/claim-route.svg"
            label="Route"
            value={`${flight.routeFrom || "—"} → ${flight.routeTo || "—"}`}
          />
          <InfoBoardRow icon="/assets/claim/claim-calendar.svg" label="Date" value={flight.date || "—"} />
          <InfoBoardRow
            icon="/assets/claim/claim-status.svg"
            label="Status"
            value={flight.status !== "Unknown" ? `${flight.status} •` : "—"}
            highlight={flight.status !== "Unknown"}
          />
          <InfoBoardRow
            icon="/assets/claim/claim-delay.svg"
            label="Delay"
            value={flight.delay || "—"}
            highlight={Boolean(flight.delay)}
          />
        </div>
      )}

      <div className="bg-[#f0f3fe] rounded-[13px] px-4 py-4 mb-4 max-w-sm">
        <p className="text-[#1f3664] text-sm sm:text-base leading-relaxed">
          <span className="font-bold">Is all of this correct?</span>
          <br />
          This helps us assess your eligibility.
        </p>
      </div>

      {validationError && (
        <p className="text-sm text-[#e82828] mb-4" role="alert">
          {validationError}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-auto pt-2">
        <button
          type="button"
          onClick={onDelete}
          className={`border-2 border-[#e82828] text-[#e82828] hover:bg-[#e82828]/5 ${ACTION_BTN}`}
        >
          Delete data
        </button>
        <button
          type="button"
          onClick={onToggleEdit}
          className={`border-2 border-[#2669f3] text-[#2669f3] hover:bg-[#2669f3]/5 ${ACTION_BTN}`}
        >
          {isEditing ? "Done editing" : "Edit details"}
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
