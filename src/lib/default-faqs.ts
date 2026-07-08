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
      "You can receive up to €600 per passenger depending on the flight distance. Flights under 1,500 km qualify for €250, 1,500–3,500 km for €400, and over 3,500 km for €600.",
  },
  {
    question: "What does 'no win, no fee' mean?",
    answer:
      "It means you pay nothing if we don't win your claim. We only charge a success fee when we successfully recover compensation on your behalf.",
  },
  {
    question: "What does the assistant do?",
    answer:
      "Our assistant analyzes your boarding pass, checks eligibility under EU regulation EC 261/2004, and prepares all necessary documentation to file your compensation claim.",
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
