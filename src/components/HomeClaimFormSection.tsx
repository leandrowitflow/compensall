"use client";

import dynamic from "next/dynamic";
import ClaimFormErrorBoundary from "@/components/claim/ClaimFormErrorBoundary";

function ClaimFormLoading() {
  return (
    <div className="bg-[#fefefe] mx-auto text-left overflow-hidden rounded-[24px] xl:rounded-[32px] max-w-full lg:max-w-[960px] xl:max-w-[1100px] w-full shadow-[0_1px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="px-6 sm:px-10 xl:px-14 pt-8 pb-10 animate-pulse">
        <div className="h-8 w-36 rounded-full bg-[#e8eef9] mb-6" />
        <div className="h-4 w-full max-w-xl rounded bg-[#e8eef9] mb-3" />
        <div className="h-4 w-3/4 max-w-lg rounded bg-[#e8eef9] mb-8" />
        <div className="h-40 w-full rounded-[16px] border-2 border-dashed border-[#d5e0f9] bg-[#f8faff]" />
      </div>
    </div>
  );
}

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

const HeroClaimForm = dynamic(() => import("@/components/HeroClaimForm"), {
  loading: () => <ClaimFormLoading />,
});

export default function HomeClaimFormSection() {
  return (
    <ClaimFormErrorBoundary fallback={<ClaimFormCrashFallback />}>
      <HeroClaimForm />
    </ClaimFormErrorBoundary>
  );
}
