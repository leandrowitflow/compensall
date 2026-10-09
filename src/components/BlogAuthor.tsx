import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { gtmId } from "@/lib/gtm";

export function AuthorMonogram({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const box =
    size === "lg" ? "h-16 w-16 text-xl" : size === "sm" ? "h-10 w-10 text-sm" : "h-12 w-12 text-base";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#2669f3] font-bold text-white ${box}`}
    >
      FA
    </span>
  );
}

export async function BlogAuthorByline() {
  const t = await getTranslations("authorPage");

  return (
    <Link
      href="/about/francisca"
      className="inline-flex items-center gap-3 mb-8 group"
      {...gtmId("blog_author")}
    >
      <AuthorMonogram size="sm" />
      <span className="text-sm leading-snug">
        <span className="block text-[#7b8094]">{t("writtenBy")}</span>
        <span className="block font-bold text-[#1f3664] group-hover:text-[#2669f3]">
          {t("name")}, <span className="font-normal text-[#7b8094]">{t("role")}</span>
        </span>
      </span>
    </Link>
  );
}

export async function BlogAuthorCard() {
  const t = await getTranslations("authorPage");

  return (
    <aside className="mt-10 border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8 bg-[#f0f5fe]">
      <div className="flex items-start gap-4">
        <AuthorMonogram />
        <div>
          <p className="text-sm text-[#7b8094] mb-1">{t("writtenBy")}</p>
          <p className="font-bold text-[#1f3664] text-lg leading-snug">{t("name")}</p>
          <p className="text-[#2669f3] font-bold text-sm mb-3">{t("role")}</p>
          <p className="text-[#1f3664] text-sm xl:text-[15px] leading-relaxed mb-4">{t("shortBio")}</p>
          <Link
            href="/about/francisca"
            className="inline-flex text-[#2669f3] font-bold text-[17px] hover:opacity-80"
            {...gtmId("blog_author_story")}
          >
            {t("readStory")}
          </Link>
        </div>
      </div>
    </aside>
  );
}

export async function FounderTeaser() {
  const t = await getTranslations("authorPage");

  return (
    <div className="mt-12 xl:mt-16 border-2 border-[#d5e0f9] rounded-[20px] p-6 xl:p-8 flex flex-col sm:flex-row gap-5 items-start">
      <AuthorMonogram size="lg" />
      <div>
        <h2 className="font-bold text-2xl xl:text-[28px] text-[#1f3664] leading-[1.2] mb-3">
          {t("meetTitle")}
        </h2>
        <p className="text-[#1f3664] text-base xl:text-[17px] leading-relaxed mb-4">{t("meetBody")}</p>
        <Link
          href="/about/francisca"
          className="inline-flex text-[#2669f3] font-bold text-[17px] hover:opacity-80"
          {...gtmId("about_founder")}
        >
          {t("readStory")}
        </Link>
      </div>
    </div>
  );
}
