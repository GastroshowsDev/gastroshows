"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/client";

export type ReservationRealtimeEvent = {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: Record<string, unknown> | null;
  old: Record<string, unknown> | null;
};

type ReservationEventHandler = (event: ReservationRealtimeEvent) => void;

/**
 * Realtime only: reads change notifications from Supabase.
 * Writes must always happen through Next.js API + Prisma.
 */
export function subscribeToReservationChanges(
  onEvent: ReservationEventHandler,
  onSubscribeStatus?: (status: string) => void,
): RealtimeChannel | null {
  let supabase: ReturnType<typeof createClient>;
  try {
    supabase = createClient();
  } catch {
    // Supabase env vars not configured — realtime unavailable, page still works
    onSubscribeStatus?.("CLOSED");
    return null;
  }

  const channelName = `reservations-realtime-${Math.random().toString(36).slice(2)}`;
  const channel = supabase
    .channel(channelName)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "Reservation",
      },
      (payload) => {
        onEvent({
          eventType: payload.eventType,
          new: payload.new as Record<string, unknown> | null,
          old: payload.old as Record<string, unknown> | null,
        });
      },
    )
    .subscribe((status) => {
      onSubscribeStatus?.(status);
    });

  return channel;
}

export function unsubscribeFromReservationChanges(channel: RealtimeChannel | null) {
  if (!channel) return;
  try {
    const supabase = createClient();
    void supabase.removeChannel(channel);
  } catch {
    // nothing to clean up
  }
}
