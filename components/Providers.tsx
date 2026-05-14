"use client";

import { SessionProvider } from "next-auth/react";
import { PageActionsProvider } from "@/context/PageActionsContext";
import { GlobalModals } from "./GlobalModals";
import { FloatingActions } from "./FloatingActions";
import { HomeButton } from "./HomeButton";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PageActionsProvider>
        {children}
        <GlobalModals />
        <FloatingActions />
        <HomeButton />
      </PageActionsProvider>
    </SessionProvider>
  );
}
