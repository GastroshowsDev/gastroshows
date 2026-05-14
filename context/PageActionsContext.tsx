"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type PageActionsContextType = {
  openReservation: (date?: string) => void;
  openGift: () => void;
  openVisit: () => void;
  closeReservation: () => void;
  closeGift: () => void;
  closeVisit: () => void;
  reservationOpen: boolean;
  reservationDate: string | null;
  giftOpen: boolean;
  visitOpen: boolean;
  isActionValid: (action: string) => boolean;
};

const PageActionsContext = createContext<PageActionsContextType | undefined>(undefined);

export function PageActionsProvider({ children }: { children: ReactNode }) {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationDate, setReservationDate] = useState<string | null>(null);
  const [giftOpen, setGiftOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);

  const openReservation = (date?: string) => {
    if (date) setReservationDate(date);
    setReservationOpen(true);
  };
  const openGift = () => setGiftOpen(true);
  const openVisit = () => setVisitOpen(true);
  
  const closeReservation = () => {
    setReservationOpen(false);
    setReservationDate(null);
  };
  const closeGift = () => setGiftOpen(false);
  const closeVisit = () => setVisitOpen(false);

  const isActionValid = (action: string | undefined) => {
    if (!action) return false;
    const normalized = action.toLowerCase().trim().replace("#", "");
    const keywords = ["reservar", "reserbar", "regalar", "visita", "eventos"];
    return keywords.includes(normalized) || action.startsWith("/") || action.startsWith("http") || action.startsWith("#");
  };


  return (
    <PageActionsContext.Provider 
      value={{ 
        openReservation, 
        openGift, 
        openVisit,
        closeReservation, 
        closeGift, 
        closeVisit,
        reservationOpen, 
        reservationDate,
        giftOpen, 
        visitOpen,
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
