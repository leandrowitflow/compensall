import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetailPage from "@/components/CatalogDetailPage";
import { airlinesCatalog } from "@/lib/catalog";
import { getCatalogItem } from "@/lib/catalog-detail";
import { buildCatalogMetadata } from "@/lib/site-metadata";

type AirlinePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return airlinesCatalog.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: AirlinePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCatalogItem("airlines", slug);

  if (!item) {
    return { title: "Airline not found | Compensall" };
  }

  return buildCatalogMetadata(item, "airlines");
}

export default async function AirlinePage({ params }: AirlinePageProps) {
  const { slug } = await params;
  const item = getCatalogItem("airlines", slug);

  if (!item) {
    notFound();
  }

  return <CatalogDetailPage item={item} kind="airlines" />;
}
