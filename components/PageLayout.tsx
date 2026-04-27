"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ReservationModal } from "@/components/reservation/ReservationModal";
import { GiftModal } from "@/components/reservation/GiftModal";

type Props = {
  children: React.ReactNode;
};

/**
 * Shared layout for Page Builder pages.
 * Includes global elements like ThemeToggle and Reservation/Gift modals.
 */
export function PageLayout({ children }: Props) {
  const [reservaOpen, setReservaOpen] = useState(false);
  const [regalarOpen, setRegalarOpen] = useState(false);

  // We can pass open triggers via window events or a context if needed,
  // but for now, the "Reservar" buttons in blocks can just be <a> tags to #reservar
  // and we can listen for that or use a simple globally accessible state.

  return (
    <>
      <ThemeToggle variant="public" />
      
      {children}

      <ReservationModal open={reservaOpen} onClose={() => setReservaOpen(false)} />
      <GiftModal open={regalarOpen} onClose={() => setRegalarOpen(false)} />
      
      {/* Script to handle "Reservar" and "Regalar" clicks from any block */}
      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('click', (e) => {
          const target = e.target.closest('a');
          if (!target) return;
          const href = target.getAttribute('href');
          if (href === '#reservar') {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('gs-open-reserva'));
          }
          if (href === '#regalar') {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('gs-open-regalo'));
          }
        });
      `}} />

      <OpenEventHandlers 
        onReserva={() => setReservaOpen(true)} 
        onRegalo={() => setRegalarOpen(true)} 
      />
    </>
  );
}

function OpenEventHandlers({ onReserva, onRegalo }: { onReserva: () => void, onRegalo: () => void }) {
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.addEventListener('gs-open-reserva', onReserva);
    // @ts-ignore
    window.addEventListener('gs-open-regalo', onRegalo);
  }
  return null;
}
