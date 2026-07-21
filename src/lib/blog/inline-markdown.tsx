import { Link } from "@/i18n/routing";

export type InlineSegment =
  | { type: "text"; value: string }
  | { type: "strong"; value: string }
  | { type: "link"; label: string; href: string };

export function parseInlineMarkdown(input: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let i = 0;

  while (i < input.length) {
    const linkMatch = input.slice(i).match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      segments.push({ type: "link", label: linkMatch[1]!, href: linkMatch[2]! });
      i += linkMatch[0]!.length;
      continue;
    }

    if (input.startsWith("**", i)) {
      const end = input.indexOf("**", i + 2);
      if (end !== -1) {
        segments.push({ type: "strong", value: input.slice(i + 2, end) });
        i = end + 2;
        continue;
      }
    }

    const nextSpecial = [input.indexOf("**", i), input.indexOf("[", i)]
      .filter((pos) => pos >= 0)
      .reduce((min, pos) => Math.min(min, pos), input.length);

    if (nextSpecial > i) {
      segments.push({ type: "text", value: input.slice(i, nextSpecial) });
    }
    i = nextSpecial === i ? i + 1 : nextSpecial;
  }

  return segments.filter((segment) => segment.type !== "text" || segment.value.length > 0);
}

export function RenderInlineMarkdown({ text }: { text: string }) {
  return (
    <>
      {parseInlineMarkdown(text).map((segment, index) => {
        if (segment.type === "strong") {
          return <strong key={index}>{segment.value}</strong>;
        }
        if (segment.type === "link") {
          if (segment.href.startsWith("/")) {
            return (
              <Link key={index} href={segment.href} className="text-[#2669f3] font-semibold underline-offset-2 hover:underline">
                {segment.label}
              </Link>
            );
          }
          return (
            <a
              key={index}
              href={segment.href}
              className="text-[#2669f3] font-semibold underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {segment.label}
            </a>
          );
        }
        return <span key={index}>{segment.value}</span>;
      })}
    </>
  );
}
