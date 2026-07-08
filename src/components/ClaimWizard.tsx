"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = ["Assisted", "Smart", "Pro"] as const;
type Tab = (typeof TABS)[number];

export default function ClaimWizard() {
  const [activeTab, setActiveTab] = useState<Tab>("Assisted");
  const [step, setStep] = useState(1);

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-[760px] mx-auto overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-[#d5e0f9]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? "text-[#2669f3] border-b-2 border-[#2669f3] -mb-px"
                : "text-[#1f3664]/50 hover:text-[#1f3664]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "Assisted" ? (
          <AssistedForm step={step} setStep={setStep} />
        ) : (
          <div className="text-center py-8">
            <p className="text-[#1f3664]/60 text-sm mb-4">
              {activeTab === "Smart"
                ? "Upload your boarding pass and let our assistant handle the rest automatically."
                : "Full professional claim management with dedicated case handler."}
            </p>
            <Link
              href="/#claim"
              className="inline-block bg-[#2669f3] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#1a55d4] transition-colors text-sm"
            >
              Get started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function AssistedForm({
  step,
  setStep,
}: {
  step: number;
  setStep: (s: number) => void;
}) {
  return (
    <>
      {step === 1 && (
        <>
          {/* Upload zone */}
          <div className="border-2 border-dashed border-[#d5e0f9] rounded-xl p-6 text-center mb-5 hover:border-[#2669f3]/50 transition-colors cursor-pointer">
            <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2669f3" strokeWidth="1.5">
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>
            <p className="text-[#1f3664] text-sm font-semibold mb-1">Upload your boarding pass</p>
            <p className="text-[#1f3664]/50 text-xs">Flight details in seconds (PDF, JPG or PNG)</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className="text-[#1f3664] text-xs font-semibold mb-1 block">Flight number</label>
              <input
                type="text"
                placeholder="e.g. FR2481"
                className="w-full border border-[#d5e0f9] rounded-lg px-3 py-2.5 text-sm text-[#1f3664] outline-none focus:border-[#2669f3] transition-colors"
              />
            </div>
            <div>
              <label className="text-[#1f3664] text-xs font-semibold mb-1 block">Airport of origin</label>
              <input
                type="text"
                placeholder="e.g. LHR"
                className="w-full border border-[#d5e0f9] rounded-lg px-3 py-2.5 text-sm text-[#1f3664] outline-none focus:border-[#2669f3] transition-colors"
              />
            </div>
            <div>
              <label className="text-[#1f3664] text-xs font-semibold mb-1 block">Flight date</label>
              <input
                type="date"
                className="w-full border border-[#d5e0f9] rounded-lg px-3 py-2.5 text-sm text-[#1f3664] outline-none focus:border-[#2669f3] transition-colors"
              />
            </div>
            <div>
              <label className="text-[#1f3664] text-xs font-semibold mb-1 block">Passengers</label>
              <select className="w-full border border-[#d5e0f9] rounded-lg px-3 py-2.5 text-sm text-[#1f3664] outline-none focus:border-[#2669f3] transition-colors">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 border border-[#d5e0f9] text-[#1f3664] font-semibold py-3 rounded-full text-sm hover:border-[#2669f3] transition-colors">
              Retry step
            </button>
            <button
              onClick={() => setStep(2)}
              className="flex-1 bg-[#2669f3] text-white font-semibold py-3 rounded-full text-sm hover:bg-[#1a55d4] transition-colors"
            >
              Check compensation
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-[#f0f5ff] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2669f3" strokeWidth="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
              <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="font-bold text-[#1f3664] text-xl mb-2">Checking your eligibility…</h3>
          <p className="text-[#1f3664]/60 text-sm mb-6">Our assistant is verifying your claim. This takes just a moment.</p>
          <button
            onClick={() => setStep(1)}
            className="text-[#2669f3] text-sm font-semibold underline"
          >
            Start over
          </button>
        </div>
      )}
    </>
  );
}
