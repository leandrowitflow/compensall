const MONTHS: Record<string, string> = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

/** Parses display dates like "28 May 2026" into ISO 8601. */
export function parseBlogDisplayDate(displayDate: string): string {
  const parts = displayDate.trim().split(/\s+/);
  if (parts.length !== 3) {
    return new Date().toISOString();
  }

  const [day, monthName, year] = parts;
  const month = MONTHS[monthName];
  if (!month) {
    return new Date().toISOString();
  }

  return `${year}-${month}-${day.padStart(2, "0")}`;
}
