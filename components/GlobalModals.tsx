"use client";

import { usePageActions } from "@/context/PageActionsContext";
import { ReservationModal } from "./reservation/ReservationModal";
import { GiftModal } from "./reservation/GiftModal";
import { VisitBookingModal } from "./reservation/VisitBookingModal";

export function GlobalModals() {
  const { reservationOpen, giftOpen, visitOpen, closeReservation, closeGift, closeVisit } = usePageActions();

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
      <VisitBookingModal
        open={visitOpen}
        onClose={closeVisit}
      />
    </>
  );
}
