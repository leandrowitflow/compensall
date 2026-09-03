"use client";

import { useTranslations } from "next-intl";
import { downloadPageAsMarkdown } from "@/lib/page-to-markdown";

type MarkdownDownloadButtonProps = {
  /** Match H1 colour: dark hero banners vs light pages. */
  tone?: "onDark" | "onLight";
  className?: string;
};

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

export default function MarkdownDownloadButton({
  tone = "onLight",
  className = "",
}: MarkdownDownloadButtonProps) {
  const t = useTranslations("common");
  const label = t("downloadPageMarkdown");

  const toneClass =
    tone === "onDark"
      ? "text-white/45 hover:text-white/90"
      : "text-[#1f3664]/35 hover:text-[#1f3664]/85";

  return (
    <span
      data-md-download="true"
      className="inline-flex items-center align-middle"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          downloadPageAsMarkdown();
        }}
        className={`inline-flex items-center justify-center ml-2 sm:ml-3 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2669f3]/50 rounded-sm align-middle ${toneClass} ${className}`}
      >
        <FileTextIcon className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" />
      </button>
    </span>
  );
}
