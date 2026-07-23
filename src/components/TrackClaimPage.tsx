"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { Link } from "@/i18n/routing";
import { CLAIM_STATUS_ORDER, type ClaimStatus } from "@/lib/claim-types";

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
  const t = useTranslations("trackPage");
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
                {t(`statuses.${status}.label`)}
              </p>
              {isCurrent && (
                <p className="text-[#7b8094] text-sm mt-1.5 leading-relaxed">
                  {t(`statuses.${status}.message`)}
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
  const t = useTranslations("trackPage");
  const locale = useLocale();
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
            if (response.status === 404) {
              setError(t("notFound"));
            } else if (response.status === 400) {
              setError(t("invalidReference"));
            } else {
              setError(t("errorGeneric"));
            }
            setClaim(null);
          }
          return;
        }

        if (!cancelled) {
          setClaim(data);
        }
      } catch {
        if (!cancelled) {
          setError(t("errorGeneric"));
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
  }, [trackingNumber, t]);

  return (
    <main className="pb-16 md:pb-24">
      <PageHero
        title={t("title")}
        subtitle={t.rich("reference", {
          trackingNumber,
          tracking: (chunks) => <strong>{chunks}</strong>,
        })}
      />

      <section className="relative z-10 px-4 md:px-8 lg:px-8 xl:px-12 -mt-8">
        <div className="max-w-[960px] mx-auto">
          <div className="bg-white border border-[#d5e0f9] rounded-[24px] p-8 sm:p-10 md:p-12 shadow-sm">
            {loading && <p className="text-[#1f3664]">{t("loading")}</p>}

            {!loading && error && (
              <div className="text-center py-4">
                <p className="text-[#e82828] mb-4">{error}</p>
                <Link href="/#claim" className="text-[#2669f3] font-bold hover:underline">
                  {t("startNewClaim")}
                </Link>
              </div>
            )}

            {!loading && claim && (
              <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
                <div>
                  <h2 className="font-bold text-[#1f3664] text-xl mb-6">{t("claimDetails")}</h2>
                  <dl className="space-y-5 text-sm sm:text-base">
                    <div>
                      <dt className="text-[#7b8094] mb-1">{t("fields.passenger")}</dt>
                      <dd className="font-semibold text-[#1f3664] break-words">{claim.signedName}</dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094] mb-1">{t("fields.flight")}</dt>
                      <dd className="font-semibold text-[#1f3664]">{claim.flight.flight}</dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094] mb-1">{t("fields.route")}</dt>
                      <dd className="font-semibold text-[#1f3664]">
                        {claim.flight.routeFrom} → {claim.flight.routeTo}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094] mb-1">{t("fields.date")}</dt>
                      <dd className="font-semibold text-[#1f3664]">{claim.flight.date}</dd>
                    </div>
                    <div>
                      <dt className="text-[#7b8094] mb-1">{t("fields.submitted")}</dt>
                      <dd className="font-semibold text-[#1f3664]">
                        {new Date(claim.createdAt).toLocaleString(locale)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h2 className="font-bold text-[#1f3664] text-xl mb-6">{t("status")}</h2>
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
