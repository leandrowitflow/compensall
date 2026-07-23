import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

function SectionHeading({
  children,
  accent,
}: {
  children: ReactNode;
  accent?: string;
}) {
  return (
    <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[48px] text-[#1f3664] text-center mb-4 leading-[1.2]">
      {children}
      {accent && (
        <>
          {" "}
          <span className="text-[#005ffe]">{accent}</span>
        </>
      )}
    </h2>
  );
}

export default async function HomePassengerRightsSection() {
  const t = await getTranslations("passengerRights");
  const rightsCards = [
    { title: t("uk261Card.title"), body: t("uk261Card.body") },
    { title: t("ec261Card.title"), body: t("ec261Card.body") },
  ];
  const eligibilityItems = [
    { title: t("eligibility.ukEuDeparture.title"), body: t("eligibility.ukEuDeparture.body") },
    { title: t("eligibility.significantDisruption.title"), body: t("eligibility.significantDisruption.body") },
    { title: t("eligibility.airlineResponsibility.title"), body: t("eligibility.airlineResponsibility.body") },
    { title: t("eligibility.validBooking.title"), body: t("eligibility.validBooking.body") },
    { title: t("eligibility.withinTimeLimits.title"), body: t("eligibility.withinTimeLimits.body") },
  ];

  return (
    <section className="pt-8 lg:pt-8 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1340px] mx-auto">
        <div className="rounded-[21px] xl:rounded-[28px] border-2 border-[#d5e0f9] bg-[#f8faff] px-5 py-8 sm:px-8 sm:py-10 xl:px-12 xl:py-14">
          <SectionHeading accent={t("rightsAccent")}>{t("rightsHeading")}</SectionHeading>
          <p className="text-[#1f3664]/80 text-base text-center max-w-[720px] mx-auto mb-8 xl:mb-10 leading-relaxed">
            {t("rightsIntro")}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6 mb-6 xl:mb-8">
            {rightsCards.map((card) => (
              <div
                key={card.title}
                className="bg-white border-2 border-[#d5e0f9] rounded-[21px] p-5 sm:p-6 xl:p-8"
              >
                <h3 className="font-bold text-[#1f3664] text-lg xl:text-xl mb-3 leading-snug">{card.title}</h3>
                <p className="text-[#1f3664]/80 text-sm sm:text-base leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border-2 border-[#d5e0f9] rounded-[21px] p-5 sm:p-6 xl:p-8 text-[#1f3664]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>{t("rightsDetailP1")}</p>
            <p>{t("rightsDetailP2")}</p>
          </div>

          <div className="my-8 xl:my-12 h-px bg-[#d5e0f9]" />

          <SectionHeading accent={t("eligibilityAccent")}>{t("eligibilityHeading")}</SectionHeading>
          <p className="text-[#1f3664]/80 text-base text-center max-w-[640px] mx-auto mb-8 xl:mb-10 leading-relaxed">
            {t("eligibilityIntro")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-5">
            {eligibilityItems.map((item, index) => (
              <div
                key={item.title}
                className={`bg-white border-2 border-[#d5e0f9] rounded-[21px] p-5 sm:p-6 flex gap-4 ${
                  index === eligibilityItems.length - 1 ? "sm:col-span-2 xl:col-span-1" : ""
                }`}
              >
                <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-full bg-[#2669f3] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#1f3664] text-base xl:text-[17px] mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[#1f3664]/75 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
