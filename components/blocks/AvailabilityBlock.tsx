"use client";

import { DisponibilidadSection } from "@/components/home/DisponibilidadSection";

import type { AvailabilityContent } from "@/lib/blocks/types";

type Props = { content: AvailabilityContent };

export function AvailabilityBlock({ content }: Props) {
  return (
    <DisponibilidadSection 
      title={content.title}
      subtitle={content.subtitle}
      onReservar={() => {
        window.dispatchEvent(new CustomEvent("gs-open-reserva"));
      }} 
    />
  );
}
