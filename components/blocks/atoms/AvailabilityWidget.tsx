"use client";

import { CommonStyles } from "@/lib/blocks/types";
import { DisponibilidadSection } from "@/components/home/DisponibilidadSection";
import { usePageActions } from "@/context/PageActionsContext";

type Props = {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonColor?: string;
  styles?: CommonStyles;
  isEditing?: boolean;
};

export function AvailabilityWidget({ title, subtitle, buttonText, buttonColor, styles, isEditing }: Props) {
  const { openReservation } = usePageActions();

  return (
    <div style={{ ...styles as any }}>
      <DisponibilidadSection 
        title={title}
        subtitle={subtitle}
        buttonText={buttonText}
        buttonColor={buttonColor}
        onReservar={isEditing ? undefined : openReservation} 
      />
    </div>
  );
}
