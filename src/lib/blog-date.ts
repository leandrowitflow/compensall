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

const DISPLAY_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** Formats ISO or parseable dates into display dates like "28 May 2026". */
export function formatBlogDisplayDate(isoOrDate: string): string {
  const parsed = new Date(isoOrDate);
  if (Number.isNaN(parsed.getTime())) {
    return isoOrDate.trim();
  }

  const day = parsed.getUTCDate();
  const month = DISPLAY_MONTHS[parsed.getUTCMonth()];
  const year = parsed.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

/** Parses display dates like "28 May 2026" or ISO strings into ISO 8601 (YYYY-MM-DD). */
export function parseBlogDisplayDate(displayDate: string): string {
  const trimmed = displayDate.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return trimmed.slice(0, 10);
  }

  const parts = trimmed.split(/\s+/);
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
