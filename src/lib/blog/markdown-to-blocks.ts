import type { BlogBlock } from "./types";

export function markdownToBlocks(contentMd: string): BlogBlock[] {
  const lines = contentMd.replace(/\r\n/g, "\n").split("\n");
  const blocks: BlogBlock[] = [];
  let paragraphLines: string[] = [];
  let listItems: string[] = [];
  let orderedItems: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) {
      return;
    }
    blocks.push({
      type: "paragraph",
      text: paragraphLines.join(" ").trim(),
    });
    paragraphLines = [];
  };

  const flushList = () => {
    if (listItems.length === 0) {
      return;
    }
    blocks.push({
      type: "list",
      items: listItems.map((item) => item.trim()),
    });
    listItems = [];
  };

  const flushOrderedList = () => {
    if (orderedItems.length === 0) {
      return;
    }
    blocks.push({
      type: "ordered-list",
      items: orderedItems.map((item) => item.trim()),
    });
    orderedItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushOrderedList();
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      blocks.push({ type: "subheading", text: trimmed.slice(4).trim() });
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      blocks.push({ type: "heading", text: trimmed.slice(3).trim() });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      flushOrderedList();
      listItems.push(trimmed.replace(/^[-*]\s+/, ""));
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      orderedItems.push(trimmed.replace(/^\d+\.\s+/, ""));
      continue;
    }

    if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      blocks.push({ type: "callout", text: trimmed.slice(2).trim() });
      continue;
    }

    if (/^\*\*(.+)\*\*$/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushOrderedList();
      blocks.push({ type: "callout", text: trimmed });
      continue;
    }

    if (trimmed.startsWith("![")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      continue;
    }

    if (trimmed.startsWith("<div")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      continue;
    }

    flushList();
    flushOrderedList();
    paragraphLines.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushOrderedList();

  return blocks;
}

export function estimateReadTime(contentMd: string): string {
  const words = contentMd.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
