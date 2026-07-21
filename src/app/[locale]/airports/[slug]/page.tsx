import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetailPage from "@/components/CatalogDetailPage";
import type { AppLocale } from "@/i18n/routing";
import { airportsCatalog } from "@/lib/catalog";
import { getCatalogItem } from "@/lib/catalog-detail";
import { buildCatalogMetadata } from "@/lib/site-metadata";

type AirportPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return airportsCatalog.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: AirportPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getCatalogItem("airports", slug);

  if (!item) {
    return { title: "Airport not found | Compensall" };
  }

  return buildCatalogMetadata(item, "airports", locale as AppLocale);
}

export default async function AirportPage({ params }: AirportPageProps) {
  const { slug } = await params;
  const item = getCatalogItem("airports", slug);

  if (!item) {
    notFound();
  }

  return <CatalogDetailPage item={item} kind="airports" />;
}
