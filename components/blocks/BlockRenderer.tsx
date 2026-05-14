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
  HeaderContent,
  FooterContent,
} from "@/lib/blocks/types";

import dynamic from "next/dynamic";

const HeroBlock = dynamic(() => import("./HeroBlock").then(mod => mod.HeroBlock));
const TextBlock = dynamic(() => import("./TextBlock").then(mod => mod.TextBlock));
const ImageBlock = dynamic(() => import("./ImageBlock").then(mod => mod.ImageBlock));
const GalleryBlock = dynamic(() => import("./GalleryBlock").then(mod => mod.GalleryBlock));
const SectionBlock = dynamic(() => import("./SectionBlock").then(mod => mod.SectionBlock));
const CtaBlock = dynamic(() => import("./CtaBlock").then(mod => mod.CtaBlock));
const SpacerBlock = dynamic(() => import("./SpacerBlock").then(mod => mod.SpacerBlock));
const AvailabilityBlock = dynamic(() => import("./AvailabilityBlock").then(mod => mod.AvailabilityBlock));
const StepsBlock = dynamic(() => import("./StepsBlock").then(mod => mod.StepsBlock));
const HeaderBlock = dynamic(() => import("./HeaderBlock").then(mod => mod.HeaderBlock));
const FooterBlock = dynamic(() => import("./FooterBlock").then(mod => mod.FooterBlock));
const ReviewsBlock = dynamic(() => import("./ReviewsBlock").then(mod => mod.ReviewsBlock));
const FormBlock = dynamic(() => import("./FormBlock").then(mod => mod.FormBlock));

type Props = {
  block: BlockData;
  isEditing?: boolean;
  onUpdateBlock?: (id: string, newContent: any) => void;
  onSelectElement?: (path: string) => void,
  selectedElementPath?: string | null;
};

import React, { memo } from "react";

/**
 * Renders a single block based on its type.
 * This is the central dispatch component for the page builder.
 */
export const BlockRenderer = memo(function BlockRenderer({ block, isEditing = false, onUpdateBlock, onSelectElement, selectedElementPath }: Props) {
  const { id = "temp-id", type, content } = block;

  const handleUpdate = (newContent: any) => {
    if (onUpdateBlock) onUpdateBlock(id, newContent);
  };

  switch (type as BlockType) {
    case "HEADER":
      return (
        <HeaderBlock 
          content={content as HeaderContent} 
          isEditing={isEditing} 
          onUpdate={handleUpdate} 
          onSelectElement={onSelectElement}
          selectedElementPath={selectedElementPath}
          id={id}
        />
      );
    case "FOOTER":
      return (
        <FooterBlock 
          content={content as FooterContent} 
          isEditing={isEditing} 
          onUpdate={handleUpdate} 
          onSelectElement={onSelectElement}
          selectedElementPath={selectedElementPath}
          id={id}
        />
      );
    case "HERO":
      return (
        <HeroBlock 
          id={id}
          content={content as HeroContent} 
          isEditing={isEditing} 
          onUpdate={handleUpdate} 
          onSelectElement={(path) => onSelectElement?.(path)}
          selectedElementPath={selectedElementPath}
        />
      );
    case "TEXT":
      return (
        <TextBlock 
          id={id}
          content={content as TextContent} 
          isEditing={isEditing} 
          onUpdate={handleUpdate} 
          onSelectElement={(path) => onSelectElement?.(path)}
          selectedElementPath={selectedElementPath}
        />
      );
    case "IMAGE":
      return <ImageBlock content={content as ImageContent} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "GALLERY":
      return <GalleryBlock content={content as GalleryContent} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "SECTION":
      return (
        <SectionBlock 
          id={id}
          content={content as SectionContent} 
          isEditing={isEditing} 
          onUpdate={handleUpdate} 
          onSelectElement={(path) => onSelectElement?.(path)}
          selectedElementPath={selectedElementPath}
        />
      );
    case "CTA":
      return (
        <CtaBlock 
          id={id}
          content={content as CtaContent} 
          isEditing={isEditing} 
          onUpdate={handleUpdate} 
          onSelectElement={(path) => onSelectElement?.(path)}
          selectedElementPath={selectedElementPath}
        />
      );
    case "SPACER":
      return <SpacerBlock content={content as SpacerContent} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "AVAILABILITY":
      return <AvailabilityBlock content={content as AvailabilityContent} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "REVIEWS":
      return <ReviewsBlock content={content as any} isEditing={isEditing} onUpdate={handleUpdate} />;
    case "FORM":
      return <FormBlock content={content as any} isEditing={isEditing} onUpdate={onUpdateBlock ? (nc) => onUpdateBlock(id, nc) : undefined} />;
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
            Unknown block type: <strong>{(type as any)}</strong>
          </div>
        );
      }
      return null;
  }
}, (prevProps, nextProps) => {
  return (
    prevProps.block === nextProps.block &&
    prevProps.isEditing === nextProps.isEditing &&
    prevProps.selectedElementPath === nextProps.selectedElementPath
  );
});

/**
 * Renders an array of blocks in order.
 * Used by the dynamic page route.
 */
import { MasterStylesProvider } from "./MasterStylesProvider";

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
  onSelectElement?: (path: string) => void,
  selectedElementPath?: string | null
}) {
  return (
    <MasterStylesProvider>
      {blocks.map((block, idx) => (
        <BlockRenderer 
          key={block.id || `block-${idx}`} 
          block={block} 
          isEditing={isEditing} 
          onUpdateBlock={onUpdateBlock} 
          onSelectElement={onSelectElement}
          selectedElementPath={selectedElementPath}
        />
      ))}
    </MasterStylesProvider>
  );
}
