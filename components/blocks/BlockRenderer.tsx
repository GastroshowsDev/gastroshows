"use client";

import type {
  BlockData,
  BlockType,
  HeroContent,
  TextContent,
  ImageContent,
  GalleryContent,
  SectionContent,
  CtaContent,
  SpacerContent,
  AvailabilityContent,
  StepsContent,
} from "@/lib/blocks/types";

import { HeroBlock } from "./HeroBlock";
import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { GalleryBlock } from "./GalleryBlock";
import { SectionBlock } from "./SectionBlock";
import { CtaBlock } from "./CtaBlock";
import { SpacerBlock } from "./SpacerBlock";
import { AvailabilityBlock } from "./AvailabilityBlock";
import { StepsBlock } from "./StepsBlock";

type Props = {
  block: BlockData;
  isEditing?: boolean;
  onUpdateBlock?: (id: string, newContent: any) => void;
  onSelectElement?: (id: string, col: number, el: number) => void;
  selectedElementPath?: { col: number; el: number } | null;
};

/**
 * Renders a single block based on its type.
 * This is the central dispatch component for the page builder.
 */
export function BlockRenderer({ block, isEditing = false, onUpdateBlock, onSelectElement, selectedElementPath }: Props) {
  const { id, type, content } = block;

  const handleUpdate = (newContent: any) => {
    if (onUpdateBlock) onUpdateBlock(id, newContent);
  };

  switch (type as BlockType) {
    case "HERO":
      return <HeroBlock content={content as HeroContent} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "TEXT":
      return <TextBlock content={content as TextContent} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "IMAGE":
      return <ImageBlock content={content as ImageContent} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "GALLERY":
      return <GalleryBlock content={content as GalleryContent} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "SECTION":
      return (
        <SectionBlock 
          content={content as SectionContent} 
          isEditing={isEditing} 
          onUpdate={handleUpdate} 
          onSelectElement={(col, el) => onSelectElement?.(id, col, el)}
          selectedElement={selectedElementPath}
        />
      );
    case "CTA":
      return <CtaBlock content={content as CtaContent} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "SPACER":
      return <SpacerBlock content={content as SpacerContent} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "AVAILABILITY":
      return <AvailabilityBlock content={content as AvailabilityContent} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "STEPS":
      return <StepsBlock content={content as StepsContent} isEditing={isEditing} onUpdate={handleUpdate} />;
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
export function PageBlockList({ 
  blocks, 
  isEditing = false, 
  onUpdateBlock,
  onSelectElement,
  selectedElementPath
}: { 
  blocks: BlockData[], 
  isEditing?: boolean,
  onUpdateBlock?: (id: string, newContent: any) => void,
  onSelectElement?: (id: string, col: number, el: number) => void,
  selectedElementPath?: { col: number; el: number } | null
}) {
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer 
          key={block.id} 
          block={block} 
          isEditing={isEditing} 
          onUpdateBlock={onUpdateBlock} 
          onSelectElement={onSelectElement}
          selectedElementPath={selectedElementPath}
        />
      ))}
    </>
  );
}
