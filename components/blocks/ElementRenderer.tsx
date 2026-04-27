"use client";

import { ElementData } from "@/lib/blocks/types";
import { HeadingElement } from "./atoms/HeadingElement";
import { ButtonElement } from "./atoms/ButtonElement";
import { TextElement } from "./atoms/TextElement";
import { ImageElement } from "./atoms/ImageElement";
import { AnimatedWrapper } from "./AnimatedWrapper";

type Props = {
  element: ElementData;
  isEditing?: boolean;
  onUpdate?: (newElement: ElementData) => void;
};

export function ElementRenderer({ element, isEditing = false, onUpdate }: Props) {
  const renderContent = () => {
    switch (element.type) {
      case "HEADING":
        return <HeadingElement element={element} isEditing={isEditing} onUpdate={onUpdate as any} />;
      case "BUTTON":
        return <ButtonElement element={element} isEditing={isEditing} onUpdate={onUpdate as any} />;
      case "TEXT":
        return <TextElement element={element} isEditing={isEditing} onUpdate={onUpdate as any} />;
      case "IMAGE":
        return <ImageElement element={element} isEditing={isEditing} onUpdate={onUpdate as any} />;
      case "SPACER":
        return <div style={{ height: element.height }} />;
      default:
        return <div style={{ color: "red" }}>Unknown Element: {element.type}</div>;
    }
  };

  return (
    <AnimatedWrapper animation={element.styles?.animation}>
      {renderContent()}
    </AnimatedWrapper>
  );
}
