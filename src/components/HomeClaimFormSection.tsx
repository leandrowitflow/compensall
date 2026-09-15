"use client";

import ClaimFormErrorBoundary from "@/components/claim/ClaimFormErrorBoundary";
import HeroClaimForm from "@/components/HeroClaimForm";

function ClaimFormCrashFallback() {
  return (
    <div className="bg-[#fefefe] mx-auto text-left overflow-hidden rounded-[24px] xl:rounded-[32px] max-w-full lg:max-w-[960px] xl:max-w-[1100px] w-full shadow-[0_1px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="px-6 sm:px-10 xl:px-14 pt-8 pb-10">
        <p className="font-bold text-[#1f3664] text-lg mb-2">Something went wrong loading the claim form</p>
        <p className="text-[#5a6d8f] text-sm mb-5 leading-relaxed">
          Please refresh the page. If the problem continues, use manual entry after reload or contact{" "}
          <a href="mailto:help@compensall.com" className="text-[#2669f3] font-bold underline">
            help@compensall.com
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-[#2669f3] text-white font-bold px-5 py-3 rounded-[11px] hover:bg-[#1a55d4]"
        >
          Refresh page
        </button>
      </div>
    </div>
  );
}

export default function HomeClaimFormSection() {
  return (
    <ClaimFormErrorBoundary fallback={<ClaimFormCrashFallback />}>
      <HeroClaimForm />
    </ClaimFormErrorBoundary>
  );
}
