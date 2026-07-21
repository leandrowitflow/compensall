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

function renderInline(segment: LegalInline, key: string): ReactNode {
  switch (segment.type) {
    case "text":
      return <span key={key}>{segment.text}</span>;
    case "strong":
      return (
        <strong key={key} className="text-[#1f3664]">
          {segment.text}
        </strong>
      );
    case "link":
      return (
        <Link key={key} href={segment.href} className={linkClassName}>
          {segment.label}
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

function renderInlineContent(content: LegalInline[]): ReactNode {
  return content.map((segment, index) => renderInline(segment, `${segment.type}-${index}`));
}

function renderBlock(block: LegalBlock, key: string): ReactNode {
  switch (block.type) {
    case "paragraph":
      return <p key={key}>{renderInlineContent(block.content)}</p>;
    case "list":
      return (
        <ul key={key} className="list-disc pl-5 mt-2 space-y-1">
          {block.items.map((item, index) => (
            <li key={`${key}-item-${index}`}>{renderInlineContent(item)}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div key={key} className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
          <p className="text-sm text-muted leading-relaxed">{renderInlineContent(block.content)}</p>
        </div>
      );
    case "table":
      return (
        <div key={key} className="mt-3 overflow-hidden rounded-xl border border-[#d5e0f9]">
          <table className="w-full text-sm">
            <thead className="bg-[#f0f5ff]">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">{block.headers[0]}</th>
                <th className="text-left px-4 py-3 font-semibold text-[#1f3664]">{block.headers[1]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d5e0f9]">
              {block.rows.map((row, index) => (
                <tr key={`${key}-row-${index}`}>
                  <td className="px-4 py-3 text-[#1f3664] font-medium align-top">{row.category}</td>
                  <td className="px-4 py-3 text-muted">{row.purpose}</td>
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

function renderSection(section: LegalSection, index: number): ReactNode {
  return (
    <div key={`section-${index}`} className="mb-6">
      <h2 className="font-bold text-[#1f3664] text-lg mb-2">{section.title}</h2>
      <div className="text-muted text-sm leading-relaxed space-y-2">
        {section.blocks.map((block, blockIndex) => renderBlock(block, `section-${index}-block-${blockIndex}`))}
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
      {content.intro ? renderBlock(content.intro, "intro") : null}
      {content.sections.map((section, index) => renderSection(section, index))}
      {content.footer ? (
        <p className="text-xs text-[#1f3664]/50 pt-2 border-t border-[#d5e0f9]">{content.footer}</p>
      ) : null}
    </>
  );
}
