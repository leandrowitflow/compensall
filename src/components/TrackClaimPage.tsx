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
    <ol className="space-y-4">
      {CLAIM_STATUS_ORDER.map((status, index) => {
        const isComplete = index <= currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <li key={status} className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                isComplete ? "bg-[#2669f3] text-white" : "border-2 border-[#d5e0f9] text-[#7b8094]"
              }`}
            >
              {index + 1}
            </div>
            <div>
              <p className={`font-bold ${isCurrent ? "text-[#2669f3]" : "text-[#1f3664]"}`}>
                {CLAIM_STATUS_LABELS[status]}
              </p>
              {isCurrent && (
                <p className="text-[#7b8094] text-sm mt-1">
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
    <main className="pb-16">
      <PageHero
        title="Track your claim"
        subtitle={
          <>
            Reference <strong>{trackingNumber}</strong>
          </>
        }
      />

      <section className="px-4 md:px-8 lg:px-8 xl:px-12 -mt-6">
        <div className="max-w-[760px] mx-auto">
          <div className="bg-white border border-[#d5e0f9] rounded-[24px] p-6 sm:p-8 shadow-sm">
            {loading && <p className="text-[#1f3664]">Loading claim status…</p>}

            {!loading && error && (
              <div className="text-center">
                <p className="text-[#e82828] mb-4">{error}</p>
                <Link href="/#claim" className="text-[#2669f3] font-bold hover:underline">
                  Start a new claim
                </Link>
              </div>
            )}

            {!loading && claim && (
              <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
                <div>
                  <h2 className="font-bold text-[#1f3664] text-xl mb-4">Claim details</h2>
                  <dl className="space-y-3 text-sm sm:text-base">
                    <div>
                      <dt className="text-[#7b8094]">Passenger</dt>
                      <dd className="font-semibold text-[#1f3664]">{claim.signedName}</dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094]">Flight</dt>
                      <dd className="font-semibold text-[#1f3664]">{claim.flight.flight}</dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094]">Route</dt>
                      <dd className="font-semibold text-[#1f3664]">
                        {claim.flight.routeFrom} → {claim.flight.routeTo}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094]">Date</dt>
                      <dd className="font-semibold text-[#1f3664]">{claim.flight.date}</dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094]">Submitted</dt>
                      <dd className="font-semibold text-[#1f3664]">
                        {new Date(claim.createdAt).toLocaleString()}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h2 className="font-bold text-[#1f3664] text-xl mb-4">Status</h2>
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
