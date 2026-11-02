import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

export type TocItem = {
  id: string;
  text: string;
  level?: 2 | 3;
};

export async function ArticleToc({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;

  const t = await getTranslations("common");

  return (
    <nav aria-label={t("onThisPage")} className="mb-8 lg:sticky lg:top-28 lg:mb-0 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <p className="text-xs font-bold uppercase tracking-wide text-[#7b8094] mb-3">{t("onThisPage")}</p>
      <ol className="space-y-2 border-l border-[#d5e0f9]">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-6" : "pl-3"}>
            <a href={`#${item.id}`} className="block text-sm leading-snug text-[#1f3664] hover:text-[#2669f3]">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ArticleWithToc({
  items,
  children,
}: {
  items: TocItem[];
  children: ReactNode;
}) {
  const show = items.length >= 2;

  return (
    <div className={show ? "lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-10" : undefined}>
      {show ? <ArticleToc items={items} /> : null}
      <div className="min-w-0">{children}</div>
    </div>
  );
}
