import type { CatalogItem } from "@/lib/catalog";
import { localePopularIds } from "@/lib/catalog-popular-ids";

/**
 * Lightweight popular items for the site header.
 * Avoids pulling world-airports / full catalog sort into the client bundle.
 */
export function getPopularNavItems(
  items: CatalogItem[],
  language: string,
  kind: "airlines" | "airports",
  limit = 6,
): CatalogItem[] {
  const byId = new Map(items.map((item) => [item.id, item]));
  const result: CatalogItem[] = [];

  for (const id of localePopularIds(language, kind)) {
    const item = byId.get(id);
    if (!item) continue;
    result.push(item);
    if (result.length >= limit) break;
  }

  if (result.length >= limit) {
    return result;
  }

  for (const item of items) {
    if (result.some((entry) => entry.id === item.id)) continue;
    result.push(item);
    if (result.length >= limit) break;
  }

  return result;
}
