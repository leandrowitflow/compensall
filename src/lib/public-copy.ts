export function isPortugueseLocale(locale?: string | null): boolean {
  const normalized = locale?.trim().toLowerCase() ?? "";
  return normalized === "pt" || normalized.startsWith("pt-");
}

export function isFrenchLocale(locale?: string | null): boolean {
  const normalized = locale?.trim().toLowerCase() ?? "";
  return normalized === "fr" || normalized.startsWith("fr-");
}

/** Portuguese site copy puts the euro after the number, with no space: 600€. */
export function formatEuroAmount(amount: number, locale?: string | null): string {
  return isPortugueseLocale(locale) ? `${amount}€` : `€${amount}`;
}

export function localizeEuroAmountLabel(label: string, locale?: string | null): string {
  if (!isPortugueseLocale(locale)) {
    return label;
  }
  return attachEuroAfterAmount(label);
}

export function attachEuroAfterAmount(text: string): string {
  return text
    .replace(/€\s*(\d[\d.]*)/g, "$1€")
    .replace(/(\d[\d.]*)\s+€/g, "$1€")
    .replace(/(\d[\d.]*)\s+euros\b/gi, "$1€")
    .replace(/(\d[\d.]*)\s+EUR\b/g, "$1€")
    .replace(/(\d[\d.]*)\s*,\s*(\d[\d.]*)\s+e\s+(\d[\d.]*)€/g, "$1€, $2€ e $3€");
}

export function polishPortuguesePublicCopy(text: string): string {
  return attachEuroAfterAmount(
    text
      .replace(/acordo de não ganho, não pagamento/gi, "acordo No win, no fee")
      .replace(/acordo não ganho, não pagamento/gi, "acordo No win, no fee")
      .replace(/acordo não pagamento sem ganhos/gi, "acordo No win, no fee")
      .replace(/não ganho, não pagamento/gi, "No win, no fee")
      .replace(/não pagamento sem ganhos/gi, "No win, no fee")
      .replace(/\*(chargebacks?|chargerbacks?)\*/gi, "$1")
      .replace(/\*(premium)\*/gi, "$1")
      .replace(/chargerback/gi, "chargeback")
      .replace(/'circunstâncias extraordinárias'/g, '"circunstâncias extraordinárias"')
      .replace(/'circunstância extraordinária'/g, '"circunstância extraordinária"'),
  );
}

/** Francisca: French ? : ! and quotes sit against the word, with no extra space. */
export function polishFrenchPublicCopy(text: string): string {
  return text
    .replace(/\u202f([?!:;])/g, "$1")
    .replace(/\u00a0([?!:;])/g, "$1")
    .replace(/ \?/g, "?")
    .replace(/ !/g, "!")
    .replace(/ :/g, ":")
    .replace(/« /g, "«")
    .replace(/ »/g, "»");
}

export function polishPublicCopy(text: string, locale?: string | null): string {
  if (isPortugueseLocale(locale)) {
    return polishPortuguesePublicCopy(text);
  }
  if (isFrenchLocale(locale)) {
    return polishFrenchPublicCopy(text);
  }
  return text;
}
