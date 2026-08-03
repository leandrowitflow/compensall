import { getLocale, getTranslations } from "next-intl/server";
import HeaderClient from "@/components/HeaderClient";
import { buildHeaderNav } from "@/lib/build-header-nav";

/** Server header — catalogs stay on the server; client only hydrates chrome. */
export default async function Header() {
  const locale = await getLocale();
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const nav = buildHeaderNav(locale, (key) => tNav(key), tCommon("openMenu"));

  return <HeaderClient {...nav} />;
}
