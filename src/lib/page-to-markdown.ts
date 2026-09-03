/**
 * Convert the visible page main content into a Markdown outline for AEO/GEO.
 * Skips chrome (header/nav/footer) and interactive noise.
 */

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "SVG",
  "PATH",
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "IFRAME",
  "NAV",
  "HEADER",
  "FOOTER",
]);

const SKIP_SELECTOR =
  "header, footer, nav, [data-md-download], [aria-hidden='true'], .site-viewport > script";

function isSkipped(el: Element): boolean {
  if (SKIP_TAGS.has(el.tagName)) return true;
  if (el.closest(SKIP_SELECTOR)) return true;
  if (el.getAttribute("data-md-download") != null) return true;
  const role = el.getAttribute("role");
  if (role === "navigation" || role === "banner" || role === "contentinfo") return true;
  return false;
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function cellText(node: Node): string {
  return collapseWhitespace(node.textContent ?? "");
}

function slugifyFilename(title: string): string {
  const base = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return base || "page";
}

function serializeList(list: Element, ordered: boolean, depth: number): string {
  const items = [...list.children].filter((c) => c.tagName === "LI");
  return items
    .map((li, index) => {
      const prefix = ordered ? `${index + 1}.` : "-";
      const indent = "  ".repeat(depth);
      const parts: string[] = [];
      let inline = "";
      for (const child of li.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          inline += child.textContent ?? "";
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const el = child as Element;
          if (el.tagName === "UL" || el.tagName === "OL") {
            if (inline.trim()) {
              parts.push(`${indent}${prefix} ${collapseWhitespace(inline)}`);
              inline = "";
            }
            parts.push(serializeList(el, el.tagName === "OL", depth + 1));
          } else if (!isSkipped(el)) {
            inline += el.textContent ?? "";
          }
        }
      }
      if (inline.trim() || parts.length === 0) {
        parts.unshift(`${indent}${prefix} ${collapseWhitespace(inline)}`);
      }
      return parts.join("\n");
    })
    .join("\n");
}

function serializeElement(el: Element, lines: string[]): void {
  if (isSkipped(el)) return;

  const tag = el.tagName;

  if (/^H[1-6]$/.test(tag)) {
    const level = Number(tag[1]);
    const text = collapseWhitespace(
      [...el.childNodes]
        .filter((n) => {
          if (n.nodeType === Node.TEXT_NODE) return true;
          if (n.nodeType !== Node.ELEMENT_NODE) return false;
          return !(n as Element).matches("[data-md-download], button, svg");
        })
        .map((n) => n.textContent ?? "")
        .join(""),
    );
    if (text) {
      lines.push("");
      lines.push(`${"#".repeat(level)} ${text}`);
      lines.push("");
    }
    return;
  }

  if (tag === "P") {
    const text = collapseWhitespace(el.textContent ?? "");
    if (text) {
      lines.push(text);
      lines.push("");
    }
    return;
  }

  if (tag === "UL" || tag === "OL") {
    lines.push(serializeList(el, tag === "OL", 0));
    lines.push("");
    return;
  }

  if (tag === "TABLE") {
    const rows = [...el.querySelectorAll("tr")];
    if (rows.length === 0) return;
    const matrix = rows.map((row) =>
      [...row.querySelectorAll("th,td")].map((cell) => cellText(cell).replace(/\|/g, "\\|")),
    );
    const width = Math.max(...matrix.map((r) => r.length), 0);
    if (width === 0) return;
    const padded = matrix.map((r) => [...r, ...Array(Math.max(0, width - r.length)).fill("")]);
    lines.push(`| ${padded[0].join(" | ")} |`);
    lines.push(`| ${padded[0].map(() => "---").join(" | ")} |`);
    for (const row of padded.slice(1)) {
      lines.push(`| ${row.join(" | ")} |`);
    }
    lines.push("");
    return;
  }

  if (tag === "BLOCKQUOTE") {
    const text = collapseWhitespace(el.textContent ?? "");
    if (text) {
      lines.push(`> ${text}`);
      lines.push("");
    }
    return;
  }

  if (tag === "A") {
    // Handled via parent text; skip standalone walk into links when parent already captured.
    return;
  }

  if (tag === "BR") {
    lines.push("");
    return;
  }

  // Generic container: walk children in order (avoid double-counting text-only wrappers).
  for (const child of el.children) {
    serializeElement(child, lines);
  }
}

function findContentRoot(): Element {
  return (
    document.querySelector("main") ??
    document.querySelector("[role='main']") ??
    document.querySelector(".site-viewport") ??
    document.body
  );
}

export function buildPageMarkdown(): string {
  const root = findContentRoot();
  const h1 = document.querySelector("h1");
  const title =
    collapseWhitespace(
      h1
        ? [...h1.childNodes]
            .filter((n) => {
              if (n.nodeType === Node.TEXT_NODE) return true;
              if (n.nodeType !== Node.ELEMENT_NODE) return false;
              return !(n as Element).matches("[data-md-download], button, svg");
            })
            .map((n) => n.textContent ?? "")
            .join(" ")
        : document.title,
    ) || document.title;

  const lines: string[] = [
    `# ${title}`,
    "",
    `> Source: ${window.location.href}`,
    "",
  ];

  serializeElement(root, lines);

  return `${lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`;
}

export function downloadPageAsMarkdown(): void {
  const markdown = buildPageMarkdown();
  const h1 = document.querySelector("h1");
  const titleText = collapseWhitespace(
    h1
      ? [...h1.childNodes]
          .filter((n) => {
            if (n.nodeType === Node.TEXT_NODE) return true;
            if (n.nodeType !== Node.ELEMENT_NODE) return false;
            return !(n as Element).matches("[data-md-download], button, svg");
          })
          .map((n) => n.textContent ?? "")
          .join(" ")
      : "page",
  );
  const filename = `${slugifyFilename(titleText)}.md`;
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
