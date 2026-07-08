"use client";

import dynamic from "next/dynamic";

const AnchorScroll = dynamic(() => import("@/components/AnchorScroll"), {
  ssr: false,
});

export default function DeferredAnchorScroll() {
  return <AnchorScroll />;
}
