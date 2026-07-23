import { getTranslations } from "next-intl/server";

const STEP_ICONS = [
  "/assets/icons/step-cloud-upload.svg",
  "/assets/icons/step-sparkles.svg",
  "/assets/icons/step-handshake.svg",
] as const;

function StepCard({ num, icon, title, desc }: { num: number; icon: string; title: string; desc: string }) {
  return (
    <div className="bg-white border-2 border-[#d5e0f9] rounded-[21px] p-6 lg:p-6 xl:p-8 flex flex-col items-center text-center w-full min-h-[220px] lg:min-h-[240px] xl:min-h-[267px]">
      <div className="w-[26px] h-[26px] xl:w-[30px] xl:h-[30px] bg-[#2669f3] rounded-full flex items-center justify-center text-white font-bold text-sm mb-4 xl:mb-5 flex-shrink-0">
        {num}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        width={75}
        height={75}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="w-12 h-12 lg:w-14 lg:h-14 xl:w-[75px] xl:h-[75px] object-contain mb-4 xl:mb-5 flex-shrink-0"
      />
      <h3 className="font-bold text-[#1f3664] text-base lg:text-[17px] xl:text-[19px] mb-1 leading-snug">
        {title}
      </h3>
      <p className="text-[#1f3664] text-sm lg:text-[15px] xl:text-base leading-relaxed">{desc}</p>
    </div>
  );
}

export default async function HowItWorksSteps() {
  const t = await getTranslations("home.howItWorks.steps");
  const steps = [
    { num: 1, icon: STEP_ICONS[0], title: t("upload.title"), desc: t("upload.description") },
    { num: 2, icon: STEP_ICONS[1], title: t("assistant.title"), desc: t("assistant.description") },
    { num: 3, icon: STEP_ICONS[2], title: t("airline.title"), desc: t("airline.description") },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 xl:gap-8 w-full">
      {steps.map((step) => (
        <StepCard key={step.num} num={step.num} icon={step.icon} title={step.title} desc={step.desc} />
      ))}
    </div>
  );
}
