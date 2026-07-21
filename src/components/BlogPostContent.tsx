import type { BlogBlock } from "@/lib/blog";

export default function BlogPostContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6 text-[#1f3664] text-base xl:text-[17px] leading-relaxed pb-12 xl:pb-16">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "heading":
            return (
              <h2
                key={index}
                className="font-bold text-xl xl:text-2xl text-[#1f3664] pt-2"
              >
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 marker:text-[#2669f3]">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div
                key={index}
                className="bg-[#f0f5fe] border-l-4 border-[#2669f3] rounded-r-xl px-5 py-4 text-[#1f3664]"
              >
                <p className="font-semibold">{block.text}</p>
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
