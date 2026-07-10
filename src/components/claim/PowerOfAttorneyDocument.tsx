import type { ReactNode } from "react";
import { FIELD_INPUT } from "@/components/claim/claim-ui";

/** Exact PoA wording for EU court use — only the company name is Compensall-specific. */
export const POWER_OF_ATTORNEY_BODY =
  "As air passenger of the bellow mentioned flight(s), I grant Compensall Ltd also known as Compensall, the authority to initiate and fulfil a claim based on my rights as set by Regulation (EC) 261/2004 of the European Parliament and of the Council and related rulings and to undertake all necessary related actions including to delegate or transfer, to process payments and to hold, request or supply personal data, though exclusively with the related entities and for this purpose, abiding to the Terms and Conditions of Compensall's web page that I declare to accept. This PoA is exclusive, irrevocable and replaces others previously issued, if any. Furthermore I request that all communications be addressed exclusively to the mentioned company.";

export const POA_CONTACT_EMAIL = "help@compensall.com";
export const POA_CONTACT_PHONE = "928370420";
export const POA_CONTACT_PHONE_DISPLAY = "+351 928 370 420";
/** Official EU portal — encoded in the PoA QR code. */
export const POA_EU_QR_URL = "https://european-union.europa.eu/index_en";

type PowerOfAttorneyDocumentProps = {
  name?: string;
  flight?: string;
  routeFrom?: string;
  routeTo?: string;
  flightDate?: string;
  signingDate?: string;
  onSigningDateChange?: (date: string) => void;
  signatureImageUrl?: string | null;
  showContactFooter?: boolean;
  showVerificationBlock?: boolean;
  interactiveSigning?: boolean;
  flightDateInput?: ReactNode;
};

function FieldLine({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-[#1f3664]">
      <span className="font-semibold whitespace-nowrap">{label}</span>
      <span className="flex-1 min-w-[120px] border-b border-[#1f3664]/40 pb-0.5 font-medium">
        {value?.trim() || "\u00a0"}
      </span>
    </div>
  );
}

function formatSigningDateDisplay(date: string): string {
  if (!date) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return date;
}

function PoaVerificationBlock() {
  return (
    <div className="flex flex-col items-center text-center w-[140px] shrink-0">
      <img
        src="/assets/documents/poa-qr.png"
        alt="QR code linking to the European Union official website"
        width={112}
        height={112}
        className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
      />
      <img
        src="/assets/documents/eu-flag.svg"
        alt="Flag of Europe"
        width={80}
        height={54}
        className="w-20 h-auto mt-3"
      />
      <p className="font-bold text-[11px] text-[#1f3664] mt-2 leading-tight">European Union</p>
      <p className="text-[9px] text-[#1f3664]/80 leading-snug mt-0.5">
        European Structural
        <br />
        and Investment Funds
      </p>
    </div>
  );
}

export default function PowerOfAttorneyDocument({
  name,
  flight,
  routeFrom,
  routeTo,
  flightDate,
  signingDate = "",
  onSigningDateChange,
  signatureImageUrl,
  showContactFooter = true,
  showVerificationBlock = true,
  interactiveSigning = false,
  flightDateInput,
}: PowerOfAttorneyDocumentProps) {
  return (
    <article className="bg-white text-[#1f3664]">
      <header className="border-b border-[#c5c5c5] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.svg?v=2" alt="Compensall" className="h-9 w-auto" />
        </div>
      </header>

      <h1 className="text-center font-bold text-2xl md:text-[28px] text-black mb-6">Power of Attorney</h1>

      <p className="text-sm md:text-[15px] leading-relaxed text-justify mb-8">{POWER_OF_ATTORNEY_BODY}</p>

      <div className="space-y-4 mb-8">
        <FieldLine label="Name:" value={name} />

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-[#1f3664]">
          <span className="font-semibold whitespace-nowrap">Flight(s):</span>
          <span className="font-medium">{flight?.trim() || "\u00a0"}</span>
          <span className="font-semibold">from</span>
          <span className="flex-1 min-w-[80px] border-b border-[#1f3664]/40 pb-0.5 font-medium">
            {routeFrom?.trim() || "\u00a0"}
          </span>
          <span className="font-semibold">to</span>
          <span className="flex-1 min-w-[80px] border-b border-[#1f3664]/40 pb-0.5 font-medium">
            {routeTo?.trim() || "\u00a0"}
          </span>
        </div>

        {flightDateInput ? (
          <div>
            <span className="font-semibold text-sm">Flight(s) Date:</span>
            <div className="mt-1">{flightDateInput}</div>
          </div>
        ) : (
          <FieldLine label="Flight(s) Date:" value={flightDate} />
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
        <div className="space-y-6 flex-1 min-w-0">
          <div className="text-sm text-[#1f3664]">
            <span className="font-semibold">The passenger:</span>
            <div className="mt-2 min-h-[72px] border-b border-[#1f3664]/40 flex items-end pb-1">
              {signatureImageUrl ? (
                <img
                  src={signatureImageUrl}
                  alt="Passenger signature"
                  className="max-h-[68px] max-w-full object-contain object-left"
                />
              ) : (
                <span className="text-[#1f3664]/35 text-xs italic">
                  {interactiveSigning ? "Your signature will appear here as you draw below" : "\u00a0"}
                </span>
              )}
            </div>
          </div>

          {interactiveSigning && onSigningDateChange ? (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#1f3664]">
              <label htmlFor="poa-signing-date" className="font-semibold whitespace-nowrap">
                Date:
              </label>
              <input
                id="poa-signing-date"
                type="date"
                className={`${FIELD_INPUT} max-w-[220px] h-10`}
                value={signingDate}
                onChange={(e) => onSigningDateChange(e.target.value)}
              />
            </div>
          ) : (
            <FieldLine label="Date:" value={formatSigningDateDisplay(signingDate)} />
          )}
        </div>

        {showVerificationBlock && <PoaVerificationBlock />}
      </div>

      {showContactFooter && (
        <footer className="border-t border-[#d5e0f9] pt-4 text-xs text-[#1f3664]/70 flex flex-col sm:flex-row sm:justify-between gap-2">
          <a href={`mailto:${POA_CONTACT_EMAIL}`} className="hover:text-[#2669f3]">
            {POA_CONTACT_EMAIL}
          </a>
          <a href={`tel:+351${POA_CONTACT_PHONE}`} className="hover:text-[#2669f3]">
            {POA_CONTACT_PHONE_DISPLAY}
          </a>
        </footer>
      )}
    </article>
  );
}
