import { Fragment } from "react";

const STEPS = [
  {
    num: 1,
    icon: "/assets/icons/step-cloud-upload.svg",
    title: "Upload your boarding pass",
    desc: "Add your boarding pass in seconds.",
  },
  {
    num: 2,
    icon: "/assets/icons/step-sparkles.svg",
    title: "Assistant checks your claim",
    desc: "Our assistant verifies your eligibility.",
  },
  {
    num: 3,
    icon: "/assets/icons/step-handshake.svg",
    title: "We handle the airline",
    desc: "We fight for your compensation.",
  },
] as const;

function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div className="bg-white border-2 border-[#d5e0f9] rounded-[21px] p-6 lg:p-6 xl:p-8 flex flex-col items-center text-center w-full xl:w-[363px] xl:flex-shrink-0 min-h-[220px] lg:min-h-[240px] xl:min-h-[267px]">
      <div className="w-[26px] h-[26px] xl:w-[30px] xl:h-[30px] bg-[#2669f3] rounded-full flex items-center justify-center text-white font-bold text-sm mb-4 xl:mb-5 flex-shrink-0">
        {step.num}
      </div>
      <img
        src={step.icon}
        alt=""
        className="w-12 h-12 lg:w-14 lg:h-14 xl:w-[75px] xl:h-[75px] object-contain mb-4 xl:mb-5 flex-shrink-0"
      />
      <h3 className="font-bold text-[#1f3664] text-base lg:text-[17px] xl:text-[19px] mb-1 leading-snug">
        {step.title}
      </h3>
      <p className="text-[#1f3664] text-sm lg:text-[15px] xl:text-base leading-relaxed">{step.desc}</p>
    </div>
  );
}

function StepArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center flex-shrink-0 ${
        vertical ? "py-3" : "self-center"
      }`}
    >
      <img
        src="/assets/icons/step-arrow.svg"
        alt=""
        className={`flex-shrink-0 object-contain ${
          vertical ? "w-6 h-6 rotate-90" : "w-8 h-8"
        }`}
      />
    </div>
  );
}

export default function HowItWorksSteps() {
  return (
    <>
      {/* Phone / small tablet: vertical stack */}
      <div className="flex flex-col lg:hidden w-full">
        {STEPS.map((step, i, arr) => (
          <Fragment key={step.num}>
            <StepCard step={step} />
            {i < arr.length - 1 && <StepArrow vertical />}
          </Fragment>
        ))}
      </div>

      {/* Laptop: equal 3-column grid — fixed-width row does not fit in 960px container */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-5 xl:hidden w-full">
        {STEPS.map((step) => (
          <StepCard key={step.num} step={step} />
        ))}
      </div>

      {/* Desktop: horizontal row with arrows */}
      <div className="hidden xl:flex xl:items-stretch xl:justify-between w-full">
        {STEPS.map((step, i, arr) => (
          <Fragment key={step.num}>
            <StepCard step={step} />
            {i < arr.length - 1 && <StepArrow />}
          </Fragment>
        ))}
      </div>
    </>
  );
}
