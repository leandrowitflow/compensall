import type { BlogBlock } from "@/lib/blog";
import { RenderInlineMarkdown } from "@/lib/blog/inline-markdown";

export default function BlogPostContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6 text-[#1f3664] text-base xl:text-[17px] leading-relaxed pb-12 xl:pb-16">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index}>
                <RenderInlineMarkdown text={block.text} />
              </p>
            );
          case "heading":
            return (
              <h2
                key={index}
                className="font-bold text-xl xl:text-2xl text-[#1f3664] pt-2"
              >
                <RenderInlineMarkdown text={block.text} />
              </h2>
            );
          case "subheading":
            return (
              <h3
                key={index}
                className="font-bold text-lg xl:text-xl text-[#1f3664] pt-1"
              >
                <RenderInlineMarkdown text={block.text} />
              </h3>
            );
          case "list":
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 marker:text-[#2669f3]">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <RenderInlineMarkdown text={item} />
                  </li>
                ))}
              </ul>
            );
          case "ordered-list":
            return (
              <ol key={index} className="list-decimal pl-6 space-y-2 marker:font-semibold marker:text-[#2669f3]">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <RenderInlineMarkdown text={item} />
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <div
                key={index}
                className="bg-[#f0f5fe] border-l-4 border-[#2669f3] rounded-r-xl px-5 py-4 text-[#1f3664]"
              >
                <p className="font-semibold">
                  <RenderInlineMarkdown text={block.text} />
                </p>
              </div>
            );
          default: {
            const _exhaustive: never = block;
            return _exhaustive;
          }
        }
      })}
    </div>
  );
}
