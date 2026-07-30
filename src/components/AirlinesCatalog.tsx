"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import CatalogLogo from "@/components/CatalogLogo";
import { Link } from "@/i18n/routing";
import type { CatalogItem } from "@/lib/catalog";
import { airlinesCatalog, airportsCatalog } from "@/lib/catalog";
import { buildCatalogCardDescription } from "@/lib/catalog-detail";
import { filterCatalog, sortCatalogByLocale } from "@/lib/localize-catalog";

function SearchField({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative w-full sm:w-[280px] xl:w-[363px] flex-shrink-0">
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full h-11 border border-[#d5e0f9] rounded-[10px] pl-4 pr-12 text-sm text-[#1f3664] placeholder:text-[#7b8094] outline-none focus:border-[#2669f3] bg-white"
      />
      <span className="absolute right-1 top-1 w-9 h-9 flex items-center justify-center text-[#2669f3] pointer-events-none">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}

function CatalogCard({
  item,
  kind,
  description,
  cta,
}: {
  item: CatalogItem;
  kind: "airlines" | "airports";
  description: string;
  cta: string;
}) {
  return (
    <div className="bg-white border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8 flex flex-col min-h-[280px] xl:min-h-[312px]">
      <div className="h-12 xl:h-[60px] mb-5 flex items-start rounded-[10px] bg-[#f8faff] px-2">
        <CatalogLogo id={item.id} kind={kind} name={item.name} logo={item.logo} />
      </div>
      <h3 className="font-bold text-[#1f3664] text-[17px] xl:text-[18px] mb-3 leading-snug">{item.name}</h3>
      <p className="text-[#1f3664] text-sm xl:text-[15px] leading-[1.7] flex-1">{description}</p>
      <Link
        href={kind === "airlines" ? `/airlines/${item.id}` : `/airports/${item.id}`}
        className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-[17px] xl:text-[18px] mt-5 hover:opacity-80 transition-opacity"
      >
        {cta}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path
            d="M1 6h14M10 1l5 5-5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}

function CatalogSection({
  title,
  searchPlaceholder,
  items,
  language,
  kind,
}: {
  title: string;
  searchPlaceholder: string;
  items: CatalogItem[];
  language: string;
  kind: "airlines" | "airports";
}) {
  const t = useTranslations("airlinesCatalog");
  const tCommon = useTranslations("common");
  const tDetail = useTranslations("catalogDetail");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const visibleItems = useMemo(() => {
    const sorted = sortCatalogByLocale(items, language, kind);
    return filterCatalog(sorted, query);
  }, [items, language, query, kind]);

  const isSearching = query.trim().length > 0;
  const isExpanded = showAll || isSearching;

  // Country / text search: show the full result set in one grid.
  const featuredItems = isSearching ? visibleItems : visibleItems.slice(0, 4);
  const remainingItems = isSearching ? [] : visibleItems.slice(4);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setShowAll(false);
    }
  };

  const cta = kind === "airlines" ? tCommon("learnMore") : tCommon("checkClaims");
  const sectionLabel = title.toLowerCase();

  const cardDescription = (item: CatalogItem) =>
    buildCatalogCardDescription(tDetail, item, kind);

  return (
    <section className="pt-8 lg:pt-10 xl:pt-[80px] pb-0 px-4 md:px-8 lg:px-8 xl:px-12 bg-white">
      <div className="max-w-[960px] lg:max-w-[960px] xl:max-w-[1550px] mx-auto">
        <h2 className="font-bold text-3xl md:text-4xl lg:text-[32px] xl:text-[57px] text-[#1f3664] text-center mb-6 lg:mb-8 xl:mb-10 leading-[1.2]">
          {title}
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 xl:mb-8">
          <p className="font-bold text-[#1f3664] text-[17px] xl:text-[18px]">{t("mostPopular")}</p>
          <SearchField placeholder={searchPlaceholder} value={query} onChange={handleQueryChange} />
        </div>

        {visibleItems.length === 0 ? (
          <p className="text-center text-[#7b8094] text-sm py-8">{t("noResults")}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
              {featuredItems.map((item) => (
                <CatalogCard
                  key={item.id}
                  item={item}
                  kind={kind}
                  description={cardDescription(item)}
                  cta={cta}
                />
              ))}
            </div>

            {remainingItems.length > 0 && !isExpanded && (
              <div className="flex justify-center mt-10 xl:mt-12">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-[17px] xl:text-[18px] hover:opacity-80 transition-opacity"
                >
                  {t("seeMore", { section: sectionLabel })}
                  <span className="text-[#7b8094] font-normal text-sm">({remainingItems.length})</span>
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true" className="rotate-90">
                    <path
                      d="M1 6h14M10 1l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}

            {remainingItems.length > 0 && isExpanded && (
              <>
                <p className="font-bold text-[#1f3664] text-[17px] xl:text-[18px] mt-10 xl:mt-12 mb-6 xl:mb-8">
                  {t("allSection", { section: sectionLabel })}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
                  {remainingItems.map((item) => (
                    <CatalogCard
                      key={item.id}
                      item={item}
                      kind={kind}
                      description={cardDescription(item)}
                      cta={cta}
                    />
                  ))}
                </div>
                {!isSearching && (
                  <div className="flex justify-center mt-10 xl:mt-12">
                    <button
                      type="button"
                      onClick={() => setShowAll(false)}
                      className="inline-flex items-center gap-2 text-[#2669f3] font-bold text-[17px] xl:text-[18px] hover:opacity-80 transition-opacity"
                    >
                      {t("showLess")}
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true" className="-rotate-90">
                        <path
                          d="M1 6h14M10 1l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default function AirlinesCatalog() {
  const locale = useLocale();
  const t = useTranslations("airlinesCatalog");

  return (
    <>
      <CatalogSection
        title={t("airlines")}
        searchPlaceholder={t("searchAirline")}
        items={airlinesCatalog}
        language={locale}
        kind="airlines"
      />
      <CatalogSection
        title={t("airports")}
        searchPlaceholder={t("searchAirport")}
        items={airportsCatalog}
        language={locale}
        kind="airports"
      />
    </>
  );
}
