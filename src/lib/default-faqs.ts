export type FaqItem = {
  question: string;
  answer: string;
};

export const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "Is it safe to upload my boarding pass?",
    answer:
      "Yes, absolutely. Your boarding pass is encrypted and stored securely. We only use the information necessary to process your claim and never share it with third parties.",
  },
  {
    question: "Does the assistant handle everything?",
    answer:
      "The assistant helps speed up the process, but your claim is also supported by real people. Our team can review your case, contact the airline and help manage the claim from start to finish.",
  },
  {
    question: "How much compensation can I receive?",
    answer:
      "For UK flights, UK261 provides up to £520 per passenger (£220 for flights under 1,500 km, £350 for 1,500–3,500 km, and £520 over 3,500 km). For eligible EU flights, EC 261/2004 provides €250, €400, or €600 on the same distance bands.",
  },
  {
    question: "What does 'no win, no fee' mean?",
    answer:
      "It means you pay nothing if we don't win your claim. We only charge a success fee when we successfully recover compensation on your behalf.",
  },
  {
    question: "What does the assistant do?",
    answer:
      "Our assistant analyzes your boarding pass, checks eligibility under UK261 and EU Regulation EC 261/2004, and prepares all necessary documentation to file your compensation claim.",
  },
  {
    question: "Can I speak to a real person?",
    answer:
      "Yes! Our human support team is available to assist you throughout the claim process. You can reach us via chat, email or phone.",
  },
  {
    question: "How much does it cost?",
    answer:
      "There is no upfront cost. Compensall works on a no win, no fee basis, which means we only charge a fee if your claim is successful.",
  },
  {
    question: "Can I delete my data?",
    answer:
      "Yes. You can request deletion of your personal data at any time. Contact our support team and we will process your request within 30 days in compliance with GDPR.",
  },
];

export const UK_FAQS: FaqItem[] = [
  {
    question: "What is UK261 and how is it different from EC 261?",
    answer:
      "After Brexit, the UK retained passenger rights through UK261, which mirrors EU Regulation EC 261/2004 for flights departing from the UK. UK261 sets compensation in pounds (£220, £350, or £520) while EC 261 uses euros (€250, €400, or €600) for eligible EU departures.",
  },
  {
    question: "Does UK261 apply to my flight?",
    answer:
      "UK261 generally applies to flights departing from UK airports. EC 261/2004 may apply to flights departing from EU airports, and in some cases to flights arriving in the EU on EU or UK carriers. The regulation that applies depends on your route and airline.",
  },
  {
    question: "Can I claim for a delayed flight under UK261?",
    answer:
      "Yes. If your flight arrived at its final destination more than three hours late, and the delay was not caused by extraordinary circumstances, you may be entitled to compensation under UK261 or EC 261/2004, depending on which regulation applies to your journey.",
  },
  {
    question: "How long do I have to claim flight compensation in the UK?",
    answer:
      "Time limits depend on where your claim is pursued. In England and Wales, you generally have six years to bring a claim. We recommend starting as soon as possible while flight records and evidence are easier to obtain.",
  },
];

export const ALL_FAQS: FaqItem[] = [...DEFAULT_FAQS, ...UK_FAQS];
