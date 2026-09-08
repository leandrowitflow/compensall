import type { ReactNode } from "react";
import { getLegalDocument, type LegalDocumentKey } from "@/content/legal";
import type {
  LegalBlock,
  LegalBrandField,
  LegalInline,
  LegalSection,
} from "@/content/legal/types";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import {
  BRAND_NAME,
  LEGAL_ENTITY_ADDRESS,
  LEGAL_ENTITY_EMAIL,
  LEGAL_ENTITY_NAME,
  LEGAL_ENTITY_NIF,
} from "@/lib/passenger-rights";
import { polishPublicCopy } from "@/lib/public-copy";

const linkClassName = "text-[#2669f3] underline";

function resolveBrand(field: LegalBrandField): string {
  switch (field) {
    case "brandName":
      return BRAND_NAME;
    case "legalEntityName":
      return LEGAL_ENTITY_NAME;
    case "legalEntityNif":
      return LEGAL_ENTITY_NIF;
    case "legalEntityAddress":
      return LEGAL_ENTITY_ADDRESS;
    default: {
      const exhaustiveCheck: never = field;
      return exhaustiveCheck;
    }
  }
}

function renderInline(segment: LegalInline, key: string, locale: AppLocale): ReactNode {
  switch (segment.type) {
    case "text":
      return <span key={key}>{polishPublicCopy(segment.text, locale)}</span>;
    case "strong":
      return (
        <strong key={key} className="text-[#1f3664]">
          {polishPublicCopy(segment.text, locale)}
        </strong>
      );
    case "link":
      return (
        <Link key={key} href={segment.href} className={linkClassName}>
          {polishPublicCopy(segment.label, locale)}
        </Link>
      );
    case "email":
      return (
        <a key={key} href={`mailto:${LEGAL_ENTITY_EMAIL}`} className={linkClassName}>
          {LEGAL_ENTITY_EMAIL}
        </a>
      );
    case "brand":
      return <span key={key}>{resolveBrand(segment.field)}</span>;
    case "strongBrand":
      return (
        <strong key={key} className="text-[#1f3664]">
          {resolveBrand(segment.field)}
        </strong>
      );
    default: {
      const exhaustiveCheck: never = segment;
      return exhaustiveCheck;
    }
  }
}

function renderInlineContent(content: LegalInline[], locale: AppLocale): ReactNode {
  return content.map((segment, index) => renderInline(segment, `${segment.type}-${index}`, locale));
}

function renderBlock(block: LegalBlock, key: string, locale: AppLocale): ReactNode {
  switch (block.type) {
    case "paragraph":
      return <p key={key}>{renderInlineContent(block.content, locale)}</p>;
    case "list":
      return (
        <ul key={key} className="list-disc pl-5 mt-2 space-y-1">
          {block.items.map((item, index) => (
            <li key={`${key}-item-${index}`}>{renderInlineContent(item, locale)}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div key={key} className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
          <p className="text-sm text-muted leading-relaxed">{renderInlineContent(block.content, locale)}</p>
        </div>
      );
    case "table":
      return (
        <div key={key} className="mt-3 overflow-hidden rounded-xl border border-[#d5e0f9]">
          <table className="w-full text-sm">
            <thead className="bg-[#f0f5ff]">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">
                  {polishPublicCopy(block.headers[0], locale)}
                </th>
                <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">
                  {polishPublicCopy(block.headers[1], locale)}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d5e0f9]">
              {block.rows.map((row, index) => (
                <tr key={`${key}-row-${index}`}>
                  <td className="px-4 py-3 text-[#1f3664] font-medium align-top">
                    {polishPublicCopy(row.category, locale)}
                  </td>
                  <td className="px-4 py-3 text-muted">{polishPublicCopy(row.purpose, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default: {
      const exhaustiveCheck: never = block;
      return exhaustiveCheck;
    }
  }
}

function renderSection(section: LegalSection, index: number, locale: AppLocale): ReactNode {
  return (
    <div key={`section-${index}`} className="mb-6">
      <h2 className="font-bold text-[#1f3664] text-lg mb-2">{polishPublicCopy(section.title, locale)}</h2>
      <div className="text-muted text-sm leading-relaxed space-y-2">
        {section.blocks.map((block, blockIndex) =>
          renderBlock(block, `section-${index}-block-${blockIndex}`, locale),
        )}
      </div>
    </div>
  );
}

type LegalDocumentContentProps = {
  document: LegalDocumentKey;
  locale: AppLocale;
};

export default function LegalDocumentContent({ document, locale }: LegalDocumentContentProps) {
  const content = getLegalDocument(document, locale);

  return (
    <>
      {content.intro ? renderBlock(content.intro, "intro", locale) : null}
      {content.sections.map((section, index) => renderSection(section, index, locale))}
      {content.footer ? (
        <p className="text-xs text-[#1f3664]/50 pt-2 border-t border-[#d5e0f9]">
          {polishPublicCopy(content.footer, locale)}
        </p>
      ) : null}
    </>
  );
}
