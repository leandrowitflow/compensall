export function isPortugueseLocale(locale?: string | null): boolean {
  const normalized = locale?.trim().toLowerCase() ?? "";
  return normalized === "pt" || normalized.startsWith("pt-");
}

export function isFrenchLocale(locale?: string | null): boolean {
  const normalized = locale?.trim().toLowerCase() ?? "";
  return normalized === "fr" || normalized.startsWith("fr-");
}

export function isSpanishLocale(locale?: string | null): boolean {
  const normalized = locale?.trim().toLowerCase() ?? "";
  return normalized === "es" || normalized.startsWith("es-");
}

export function isRomanianLocale(locale?: string | null): boolean {
  const normalized = locale?.trim().toLowerCase() ?? "";
  return normalized === "ro" || normalized.startsWith("ro-");
}

export function isHungarianLocale(locale?: string | null): boolean {
  const normalized = locale?.trim().toLowerCase() ?? "";
  return normalized === "hu" || normalized.startsWith("hu-");
}

export function isAlbanianLocale(locale?: string | null): boolean {
  const normalized = locale?.trim().toLowerCase() ?? "";
  return normalized === "sq" || normalized.startsWith("sq-");
}

export function isGermanLocale(locale?: string | null): boolean {
  const normalized = locale?.trim().toLowerCase() ?? "";
  return normalized === "de" || normalized.startsWith("de-");
}

export function isDutchLocale(locale?: string | null): boolean {
  const normalized = locale?.trim().toLowerCase() ?? "";
  return normalized === "nl" || normalized.startsWith("nl-");
}

/** Portuguese: 600€. Spanish: 600 €. Other locales: €600. */
export function formatEuroAmount(amount: number, locale?: string | null): string {
  if (isPortugueseLocale(locale)) {
    return `${amount}€`;
  }
  if (
    isSpanishLocale(locale) ||
    isRomanianLocale(locale) ||
    isHungarianLocale(locale) ||
    isAlbanianLocale(locale) ||
    isGermanLocale(locale) ||
    isDutchLocale(locale)
  ) {
    return `${amount} €`;
  }
  return `€${amount}`;
}

export function localizeEuroAmountLabel(label: string, locale?: string | null): string {
  if (isPortugueseLocale(locale)) {
    return attachEuroAfterAmount(label);
  }
  if (
    isSpanishLocale(locale) ||
    isRomanianLocale(locale) ||
    isHungarianLocale(locale) ||
    isAlbanianLocale(locale) ||
    isGermanLocale(locale) ||
    isDutchLocale(locale)
  ) {
    return attachEuroAfterAmountWithSpace(label);
  }
  return label;
}

/** Spanish site copy puts the euro after the number, with a space: 600 €. */
export function attachEuroAfterAmountWithSpace(text: string): string {
  return text
    .replace(/€\s*(\d[\d.]*)/g, "$1 €")
    .replace(/(\d[\d.]*)\s*€/g, "$1 €")
    .replace(/(\d[\d.]*)\s+euros\b/gi, "$1 €")
    .replace(/(\d[\d.]*)\s+EUR\b/g, "$1 €");
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

export function polishSpanishPublicCopy(text: string): string {
  return attachEuroAfterAmountWithSpace(
    text
      .replace(/sin ganar, no hay honorarios/gi, "No win, no fee")
      .replace(/sin premio, no hay honorarios/gi, "No win, no fee")
      .replace(/\bEC 261\b/g, "CE 261"),
  );
}

export function polishRomanianPublicCopy(text: string): string {
  return attachEuroAfterAmountWithSpace(
    text
      .replace(/fără câștig, fără onorariu/gi, "No win, no fee")
      .replace(/fara castig, fara onorariu/gi, "No win, no fee")
      .replace(/\bEC 261\b/g, "CE 261"),
  );
}

export function polishHungarianPublicCopy(text: string): string {
  return attachEuroAfterAmountWithSpace(
    text
      .replace(/nincs nyeremény, nincs díj/gi, "No win, no fee")
      .replace(/nincs nyereség, nincs díj/gi, "No win, no fee")
      .replace(/\bEC 261\b/g, "EK 261"),
  );
}

export function polishAlbanianPublicCopy(text: string): string {
  return attachEuroAfterAmountWithSpace(
    text
      .replace(/pa fitim, pa tarifë/gi, "No win, no fee")
      .replace(/pa fitim, pa pagesë/gi, "No win, no fee")
      .replace(/\bEC 261\b/g, "KE 261"),
  );
}

export function polishGermanPublicCopy(text: string): string {
  return attachEuroAfterAmountWithSpace(
    text
      .replace(/kein gewinn, keine gebühr/gi, "No win, no fee")
      .replace(/ohne erfolg, ohne honorar/gi, "No win, no fee")
      .replace(/\bEC 261\b/g, "EG 261"),
  );
}

export function polishDutchPublicCopy(text: string): string {
  return attachEuroAfterAmountWithSpace(
    text
      .replace(/geen winst, geen honorarium/gi, "No win, no fee")
      .replace(/geen succes, geen fee/gi, "No win, no fee")
      .replace(/\bEC 261\b/g, "EG 261"),
  );
}

export function polishPublicCopy(text: string, locale?: string | null): string {
  if (isPortugueseLocale(locale)) {
    return polishPortuguesePublicCopy(text);
  }
  if (isFrenchLocale(locale)) {
    return polishFrenchPublicCopy(text);
  }
  if (isSpanishLocale(locale)) {
    return polishSpanishPublicCopy(text);
  }
  if (isRomanianLocale(locale)) {
    return polishRomanianPublicCopy(text);
  }
  if (isHungarianLocale(locale)) {
    return polishHungarianPublicCopy(text);
  }
  if (isAlbanianLocale(locale)) {
    return polishAlbanianPublicCopy(text);
  }
  if (isGermanLocale(locale)) {
    return polishGermanPublicCopy(text);
  }
  if (isDutchLocale(locale)) {
    return polishDutchPublicCopy(text);
  }
  return text;
}
