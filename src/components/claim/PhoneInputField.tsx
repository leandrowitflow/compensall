"use client";

import { useLocale } from "next-intl";
import { useMemo } from "react";
import PhoneInput, { type Country, type Labels } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import enLabels from "react-phone-number-input/locale/en";
import frLabels from "react-phone-number-input/locale/fr";
import ptLabels from "react-phone-number-input/locale/pt";
import { defaultPhoneCountryFromLocale } from "@/lib/phone";

import "react-phone-number-input/style.css";

type PhoneInputFieldProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  "aria-label"?: string;
};

function labelsForLocale(locale: string): Labels {
  switch (locale) {
    case "pt":
      return ptLabels;
    case "fr":
      return frLabels;
    case "en":
      return enLabels;
    default:
      return ptLabels;
  }
}

export default function PhoneInputField({
  id,
  value,
  onChange,
  placeholder,
  required,
  autoComplete = "tel",
  "aria-label": ariaLabel,
}: PhoneInputFieldProps) {
  const locale = useLocale();
  const defaultCountry = useMemo(
    () => defaultPhoneCountryFromLocale(locale) as Country,
    [locale],
  );
  const labels = useMemo(() => labelsForLocale(locale), [locale]);

  return (
    <PhoneInput
      id={id}
      international
      countryCallingCodeEditable={false}
      defaultCountry={defaultCountry}
      flags={flags}
      labels={labels}
      value={value || undefined}
      onChange={(next) => onChange(next ?? "")}
      placeholder={placeholder}
      numberInputProps={{
        required,
        autoComplete,
        "aria-label": ariaLabel,
        className:
          "flex-1 min-w-0 h-11 px-3 text-sm text-[#1f3664] outline-none bg-transparent placeholder:text-[#7b8094]",
      }}
      className="PhoneInputClaim flex w-full items-stretch border border-[#d5e0f9] rounded-[10px] bg-white overflow-hidden focus-within:border-[#2669f3]"
    />
  );
}
