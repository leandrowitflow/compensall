"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import {
  CLAIM_STATUS_LABELS,
  CLAIM_STATUS_MESSAGES,
  CLAIM_STATUS_ORDER,
  type ClaimStatus,
} from "@/lib/claim-types";

type TrackResponse = {
  trackingNumber: string;
  status: ClaimStatus;
  flight: {
    flight: string;
    routeFrom: string;
    routeTo: string;
    date: string;
    status: string;
  };
  signedName: string;
  verificationResult: string;
  createdAt: string;
};

function StatusTimeline({ currentStatus }: { currentStatus: ClaimStatus }) {
  const currentIndex = CLAIM_STATUS_ORDER.indexOf(currentStatus);

  return (
    <ol className="space-y-5">
      {CLAIM_STATUS_ORDER.map((status, index) => {
        const isComplete = index <= currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <li key={status} className="flex items-start gap-3.5">
            <div
              className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                isComplete ? "bg-[#2669f3] text-white" : "border-2 border-[#d5e0f9] text-[#7b8094]"
              }`}
            >
              {index + 1}
            </div>
            <div className="min-w-0 pt-0.5">
              <p className={`font-bold leading-snug ${isCurrent ? "text-[#2669f3]" : "text-[#1f3664]"}`}>
                {CLAIM_STATUS_LABELS[status]}
              </p>
              {isCurrent && (
                <p className="text-[#7b8094] text-sm mt-1.5 leading-relaxed">
                  {CLAIM_STATUS_MESSAGES[status]}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function TrackClaimPage({ trackingNumber }: { trackingNumber: string }) {
  const [claim, setClaim] = useState<TrackResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadClaim() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/claim/track/${encodeURIComponent(trackingNumber)}`);
        const data = (await response.json()) as TrackResponse & { error?: string };

        if (!response.ok) {
          if (!cancelled) {
            setError(data.error ?? "Could not find this claim.");
            setClaim(null);
          }
          return;
        }

        if (!cancelled) {
          setClaim(data);
        }
      } catch {
        if (!cancelled) {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadClaim();
    return () => {
      cancelled = true;
    };
  }, [trackingNumber]);

  return (
    <main className="pb-16 md:pb-24">
      <PageHero
        title="Track your claim"
        subtitle={
          <>
            Reference <strong>{trackingNumber}</strong>
          </>
        }
      />

      <section className="relative z-10 px-4 md:px-8 lg:px-8 xl:px-12 -mt-8">
        <div className="max-w-[960px] mx-auto">
          <div className="bg-white border border-[#d5e0f9] rounded-[24px] p-8 sm:p-10 md:p-12 shadow-sm">
            {loading && <p className="text-[#1f3664]">Loading claim status…</p>}

            {!loading && error && (
              <div className="text-center py-4">
                <p className="text-[#e82828] mb-4">{error}</p>
                <Link href="/#claim" className="text-[#2669f3] font-bold hover:underline">
                  Start a new claim
                </Link>
              </div>
            )}

            {!loading && claim && (
              <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
                <div>
                  <h2 className="font-bold text-[#1f3664] text-xl mb-6">Claim details</h2>
                  <dl className="space-y-5 text-sm sm:text-base">
                    <div>
                      <dt className="text-[#7b8094] mb-1">Passenger</dt>
                      <dd className="font-semibold text-[#1f3664] break-words">{claim.signedName}</dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094] mb-1">Flight</dt>
                      <dd className="font-semibold text-[#1f3664]">{claim.flight.flight}</dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094] mb-1">Route</dt>
                      <dd className="font-semibold text-[#1f3664]">
                        {claim.flight.routeFrom} → {claim.flight.routeTo}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094] mb-1">Date</dt>
                      <dd className="font-semibold text-[#1f3664]">{claim.flight.date}</dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094] mb-1">Submitted</dt>
                      <dd className="font-semibold text-[#1f3664]">
                        {new Date(claim.createdAt).toLocaleString()}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h2 className="font-bold text-[#1f3664] text-xl mb-6">Status</h2>
                  <StatusTimeline currentStatus={claim.status} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
