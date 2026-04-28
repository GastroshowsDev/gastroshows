"use client";

import { DisponibilidadSection } from "@/components/home/DisponibilidadSection";
import { usePageActions } from "@/context/PageActionsContext";
import type { AvailabilityContent } from "@/lib/blocks/types";
import { InlineText } from "@/components/admin/InlineText";

type Props = { 
  content: AvailabilityContent;
  isEditing?: boolean;
  onUpdate?: (newContent: AvailabilityContent) => void;
};

export function AvailabilityBlock({ content, isEditing = false, onUpdate }: Props) {
  const { openReservation } = usePageActions();

  const updateField = (field: keyof AvailabilityContent, value: string) => {
    if (onUpdate) {
      onUpdate({ ...content, [field]: value });
    }
  };

  return (
    <DisponibilidadSection 
      title={isEditing ? (
        <InlineText
          tagName="span"
          value={content.title}
          onChange={(v) => updateField("title", v)}
          isEditing={true}
          placeholder="Ej: Quedan {total} plazas"
        />
      ) : content.title}
      subtitle={isEditing ? (
        <InlineText
          tagName="span"
          value={content.subtitle || ""}
          onChange={(v) => updateField("subtitle", v)}
          isEditing={true}
          placeholder="SUBTÍTULO"
        />
      ) : content.subtitle}
      buttonText={content.buttonText}
      buttonColor={content.buttonColor}
      onReservar={isEditing ? undefined : openReservation} 
    />
  );
}
