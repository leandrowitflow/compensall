import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetailPage from "@/components/CatalogDetailPage";
import { airportsCatalog } from "@/lib/catalog";
import {
  buildCatalogMetadataDescription,
  getCatalogItem,
} from "@/lib/catalog-detail";

type AirportPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return airportsCatalog.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: AirportPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCatalogItem("airports", slug);

  if (!item) {
    return { title: "Airport not found | Compensall" };
  }

  return {
    title: `${item.name} compensation claims | Compensall`,
    description: buildCatalogMetadataDescription(item, "airports"),
  };
}

export default async function AirportPage({ params }: AirportPageProps) {
  const { slug } = await params;
  const item = getCatalogItem("airports", slug);

  if (!item) {
    notFound();
  }

  return <CatalogDetailPage item={item} kind="airports" />;
}
