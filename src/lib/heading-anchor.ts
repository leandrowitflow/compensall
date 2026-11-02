/** Visible heading text, without markdown markers. */
export function plainHeadingText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "")
    .trim();
}

/** Stable in-page id for a heading. The index keeps duplicate titles unique. */
export function headingDomId(text: string, index: number): string {
  const slug = plainHeadingText(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "section"}-${index}`;
}
