"use client";

import { usePageActions } from "@/context/PageActionsContext";
import { ReservationModal } from "./reservation/ReservationModal";
import { GiftModal } from "./reservation/GiftModal";

export function GlobalModals() {
  const { reservationOpen, giftOpen, closeReservation, closeGift } = usePageActions();

  return (
    <>
      <ReservationModal 
        open={reservationOpen} 
        onClose={closeReservation} 
      />
      <GiftModal 
        open={giftOpen} 
        onClose={closeGift} 
      />
    </>
  );
}
