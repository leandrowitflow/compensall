import type { ReactNode } from "react";
import ClaimUploadPreview from "@/components/claim/ClaimUploadPreview";
import type { ClaimEntryMode, ClaimFlightData, ClaimUploadMeta } from "@/lib/claim-types";

type ClaimSidebarProps = {
  entryMode: ClaimEntryMode;
  upload: ClaimUploadMeta | null;
  flight: ClaimFlightData;
};

export default function ClaimSidebar({ entryMode, upload, flight }: ClaimSidebarProps) {
  const detailCards = [
    { icon: "/assets/claim/claim-person.svg", label: "Passenger", value: flight.passenger || "N/A" },
    { icon: "/assets/claim/claim-flight.svg", label: "Flight", value: flight.flight || "N/A" },
    {
      icon: "/assets/claim/claim-route.svg",
      label: "Route",
      value: (
        <>
          {flight.routeFrom || "N/A"}
          <br />
          {flight.routeTo || "N/A"}
        </>
      ),
    },
    { icon: "/assets/claim/claim-calendar.svg", label: "Date", value: flight.date || "N/A" },
  ];

  return (
    <div className="border border-[#d5e0f9] rounded-[21px] p-4 sm:p-5 xl:p-6 flex flex-col h-full bg-white">
      <div className="mb-5">
        <div className="flex items-start gap-3 mb-3">
          <img src="/assets/claim/claim-checkmark.svg" alt="" className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
          <h3 className="font-bold text-[#1f3664] text-[15px] sm:text-[17px] xl:text-[19px]">
            {entryMode === "upload" ? "Uploaded boarding pass" : "Manual flight entry"}
          </h3>
        </div>

        {entryMode === "upload" && upload ? (
          <ClaimUploadPreview upload={upload} />
        ) : (
          <div className="bg-[#f1f5fe] rounded-xl px-4 py-3 text-left">
            <p className="text-[#1f3664] text-sm sm:text-base leading-relaxed">
              You entered your route and flight details manually. Confirm everything looks correct before signing.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-[#d5e0f9] my-5" />

      <div className="flex items-center gap-3 mb-4">
        <img src="/assets/claim/claim-extracted-icon.svg" alt="" className="w-7 h-7 sm:w-8 sm:h-8" />
        <h3 className="font-bold text-[#1f3664] text-[15px] sm:text-[17px] xl:text-[19px]">Extracted flight details</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {detailCards.map((card) => (
          <div
            key={card.label}
            className="bg-[#f9fbfe]/60 border border-[#d5e0f9] rounded-[10px] p-3 min-h-[72px] sm:min-h-[81px]"
          >
            <img src={card.icon} alt="" className="w-5 h-5 mb-2" />
            <p className="text-[#7b8094] text-xs sm:text-sm mb-1">{card.label}</p>
            <p className="text-sm sm:text-base leading-snug text-[#1f3664]">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#f0f3fe] rounded-2xl p-4 mt-auto">
        <div className="flex gap-3">
          <img src="/assets/icons/stars.svg" alt="" className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <p className="text-[#1f3664] text-sm sm:text-base leading-relaxed">
            {entryMode === "upload"
              ? "Our AI has scanned your boarding pass and extracted the key details. "
              : "Your flight details are ready for review. "}
            <span className="text-[#2669f3] font-bold">Please confirm they look correct.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoBoardRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: string;
  label: string;
  value: ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-4 py-2.5 sm:py-3 border-b border-[#d5e0f9]/60 last:border-0">
      <img src={icon} alt="" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 opacity-70" />
      <span className="text-[#7b8094] text-sm sm:text-base w-16 sm:w-24 flex-shrink-0">{label}</span>
      <span className={`text-sm sm:text-base ml-auto text-right ${highlight ? "text-[#fa6d19] font-bold" : "text-[#1f3664]"}`}>
        {value}
      </span>
    </div>
  );
}

export { InfoBoardRow };
