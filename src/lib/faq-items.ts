export type FaqItem = {
  question: string;
  answer: string;
};

export function parseFaqItems(raw: unknown): FaqItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const question = (item as { question?: unknown }).question;
      const answer = (item as { answer?: unknown }).answer;

      if (typeof question !== "string" || typeof answer !== "string") {
        return null;
      }

      return { question, answer };
    })
    .filter((item): item is FaqItem => item !== null);
}
