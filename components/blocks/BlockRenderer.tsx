"use client";

import type {
  BlockData,
  BlockType,
  HeroContent,
  TextContent,
  ImageContent,
  GalleryContent,
  ColumnsContent,
  CtaContent,
  SpacerContent,
} from "@/lib/blocks/types";

import { HeroBlock } from "./HeroBlock";
import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { GalleryBlock } from "./GalleryBlock";
import { ColumnsBlock } from "./ColumnsBlock";
import { CtaBlock } from "./CtaBlock";
import { SpacerBlock } from "./SpacerBlock";
import { AvailabilityBlock } from "./AvailabilityBlock";

type Props = {
  block: BlockData;
};

/**
 * Renders a single block based on its type.
 * This is the central dispatch component for the page builder.
 */
export function BlockRenderer({ block }: Props) {
  const { type, content } = block;

  switch (type as BlockType) {
    case "HERO":
      return <HeroBlock content={content as HeroContent} />;
    case "TEXT":
      return <TextBlock content={content as TextContent} />;
    case "IMAGE":
      return <ImageBlock content={content as ImageContent} />;
    case "GALLERY":
      return <GalleryBlock content={content as GalleryContent} />;
    case "COLUMNS":
      return <ColumnsBlock content={content as ColumnsContent} />;
    case "CTA":
      return <CtaBlock content={content as CtaContent} />;
    case "SPACER":
      return <SpacerBlock content={content as SpacerContent} />;
    case "AVAILABILITY":
      return <AvailabilityBlock />;
    default:
      // Unknown block type — render nothing in production
      if (process.env.NODE_ENV === "development") {
        return (
          <div
            style={{
              padding: "2rem",
              background: "#FEF3C7",
              color: "#92400E",
              textAlign: "center",
              fontSize: "0.85rem",
            }}
          >
            Unknown block type: <strong>{type}</strong>
          </div>
        );
      }
      return null;
  }
}

/**
 * Renders an array of blocks in order.
 * Used by the dynamic page route.
 */
export function PageBlockList({ blocks }: { blocks: BlockData[] }) {
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
