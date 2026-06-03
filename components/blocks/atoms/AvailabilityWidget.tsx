"use client";

import { CommonStyles } from "@/lib/blocks/types";
import { DisponibilidadSection } from "@/components/home/DisponibilidadSection";
import { usePageActions } from "@/context/PageActionsContext";

import { InlineText } from "@/components/admin/InlineText";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonColor?: string;
  styles?: CommonStyles;
  isEditing?: boolean;
  onUpdate?: (newFields: any) => void;
};

export function AvailabilityWidget({ id, title, subtitle, buttonText, buttonColor, styles, isEditing, onUpdate }: Props) {
  const { openReservation } = usePageActions();

  return (
    <div style={{ ...styles as any }}>
      <DisponibilidadSection 
        isWidget={true}
        title={isEditing ? (
          <InlineText 
            value={title} 
            onChange={(v) => onUpdate?.({ title: v })}
            isEditing={true}
            placeholder="Ej: Quedan {total} plazas"
          />
        ) : title}
        subtitle={isEditing ? (
          <InlineText 
            value={subtitle || ""} 
            onChange={(v) => onUpdate?.({ subtitle: v })}
            isEditing={true}
            placeholder="SUBTÍTULO"
          />
        ) : subtitle}
        buttonText={buttonText}
        buttonColor={buttonColor}
        onReservar={isEditing ? undefined : openReservation} 
      />
    </div>
  );
}
