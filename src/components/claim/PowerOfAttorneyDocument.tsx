import type { ReactNode } from "react";
import { FIELD_INPUT } from "@/components/claim/claim-ui";
import {
  formatPoaDate,
  getPoaCopy,
  POA_CONTACT_EMAIL,
  POA_CONTACT_PHONE,
  POA_CONTACT_PHONE_DISPLAY,
  POA_FOOTER_LINE,
} from "@/lib/poa-content";

export {
  POA_CONTACT_EMAIL,
  POA_CONTACT_PHONE,
  POA_CONTACT_PHONE_DISPLAY,
  POWER_OF_ATTORNEY_BODY,
} from "@/lib/poa-content";

type PowerOfAttorneyDocumentProps = {
  locale?: string | null;
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

function PoaVerificationBlock({
  qrAlt,
  euFlagAlt,
  europeanUnion,
  structuralFundsLine1,
  structuralFundsLine2,
}: {
  qrAlt: string;
  euFlagAlt: string;
  europeanUnion: string;
  structuralFundsLine1: string;
  structuralFundsLine2: string;
}) {
  return (
    <div className="flex flex-col items-center text-center w-[140px] shrink-0">
      <img
        src="/assets/documents/poa-qr.png"
        alt={qrAlt}
        width={112}
        height={112}
        className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
      />
      <img
        src="/assets/documents/eu-flag.svg"
        alt={euFlagAlt}
        width={80}
        height={54}
        className="w-20 h-auto mt-3"
      />
      <p className="font-bold text-[11px] text-[#1f3664] mt-2 leading-tight">{europeanUnion}</p>
      <p className="text-[9px] text-[#1f3664]/80 leading-snug mt-0.5">
        {structuralFundsLine1}
        <br />
        {structuralFundsLine2}
      </p>
    </div>
  );
}

export default function PowerOfAttorneyDocument({
  locale = "en",
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
  const copy = getPoaCopy(locale);

  return (
    <article className="bg-white text-[#1f3664]">
      <header className="border-b border-[#c5c5c5] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png?v=3" alt="Compensall" width={177} height={36} className="h-9 w-auto" />
        </div>
      </header>

      <h1 className="text-center font-bold text-2xl md:text-[28px] text-black mb-6">{copy.title}</h1>

      <p className="text-sm md:text-[15px] leading-relaxed text-justify mb-8">{copy.body}</p>

      <div className="space-y-4 mb-8">
        <FieldLine label={copy.name} value={name} />

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-[#1f3664]">
          <span className="font-semibold whitespace-nowrap">{copy.flights}</span>
          <span className="font-medium">{flight?.trim() || "\u00a0"}</span>
          <span className="font-semibold">{copy.from}</span>
          <span className="flex-1 min-w-[80px] border-b border-[#1f3664]/40 pb-0.5 font-medium">
            {routeFrom?.trim() || "\u00a0"}
          </span>
          <span className="font-semibold">{copy.to}</span>
          <span className="flex-1 min-w-[80px] border-b border-[#1f3664]/40 pb-0.5 font-medium">
            {routeTo?.trim() || "\u00a0"}
          </span>
        </div>

        {flightDateInput ? (
          <div>
            <span className="font-semibold text-sm">{copy.flightsDate}</span>
            <div className="mt-1">{flightDateInput}</div>
          </div>
        ) : (
          <FieldLine label={copy.flightsDate} value={flightDate} />
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
        <div className="space-y-6 flex-1 min-w-0">
          <div className="text-sm text-[#1f3664]">
            <span className="font-semibold">{copy.thePassenger}</span>
            <div className="mt-2 min-h-[72px] border-b border-[#1f3664]/40 flex items-end pb-1">
              {signatureImageUrl ? (
                <img
                  src={signatureImageUrl}
                  alt={copy.passengerSignatureAlt}
                  className="max-h-[68px] max-w-full object-contain object-left"
                />
              ) : (
                <span className="text-[#1f3664]/35 text-xs italic">
                  {interactiveSigning ? copy.signaturePlaceholder : "\u00a0"}
                </span>
              )}
            </div>
          </div>

          {interactiveSigning && onSigningDateChange ? (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#1f3664]">
              <label htmlFor="poa-signing-date" className="font-semibold whitespace-nowrap">
                {copy.date}
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
            <FieldLine label={copy.date} value={formatPoaDate(signingDate, locale)} />
          )}
        </div>

        {showVerificationBlock && (
          <PoaVerificationBlock
            qrAlt={copy.qrAlt}
            euFlagAlt={copy.euFlagAlt}
            europeanUnion={copy.europeanUnion}
            structuralFundsLine1={copy.structuralFundsLine1}
            structuralFundsLine2={copy.structuralFundsLine2}
          />
        )}
      </div>

      {showContactFooter && (
        <footer className="border-t border-[#d5e0f9] pt-4 text-xs text-[#1f3664]/70 space-y-2">
          <p>{POA_FOOTER_LINE}</p>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <a href={`mailto:${POA_CONTACT_EMAIL}`} className="hover:text-[#2669f3]">
              {POA_CONTACT_EMAIL}
            </a>
            <a href={`tel:+351${POA_CONTACT_PHONE}`} className="hover:text-[#2669f3]">
              {POA_CONTACT_PHONE_DISPLAY}
            </a>
          </div>
        </footer>
      )}
    </article>
  );
}
