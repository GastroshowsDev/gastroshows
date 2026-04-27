"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type PageActionsContextType = {
  openReservation: () => void;
  openGift: () => void;
  closeReservation: () => void;
  closeGift: () => void;
  reservationOpen: boolean;
  giftOpen: boolean;
  isActionValid: (action: string) => boolean;
};

const PageActionsContext = createContext<PageActionsContextType | undefined>(undefined);

export function PageActionsProvider({ children }: { children: ReactNode }) {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  const openReservation = () => setReservationOpen(true);
  const openGift = () => setGiftOpen(true);
  const closeReservation = () => setReservationOpen(false);
  const closeGift = () => setGiftOpen(false);

  const isActionValid = (action: string | undefined) => {
    if (!action) return false;
    const normalized = action.toLowerCase().trim().replace("#", "");
    return ["reservar", "reserbar", "regalar"].includes(normalized) || action.startsWith("/") || action.startsWith("http");
  };

  return (
    <PageActionsContext.Provider 
      value={{ 
        openReservation, 
        openGift, 
        closeReservation, 
        closeGift, 
        reservationOpen, 
        giftOpen, 
        isActionValid 
      }}
    >
      {children}
    </PageActionsContext.Provider>
  );
}

export function usePageActions() {
  const context = useContext(PageActionsContext);
  if (!context) {
    throw new Error("usePageActions must be used within a PageActionsProvider");
  }
  return context;
}
