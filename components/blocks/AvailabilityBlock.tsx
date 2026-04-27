"use client";

import { DisponibilidadSection } from "@/components/home/DisponibilidadSection";

/**
 * Availability block — renders the live availability calendar.
 * This is a special block that doesn't have editable content;
 * it pulls data from the availability API automatically.
 */
export function AvailabilityBlock() {
  return <DisponibilidadSection onReservar={() => {/* TODO: open modal or navigate */}} />;
}
