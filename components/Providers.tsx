"use client";

import { PageActionsProvider } from "@/context/PageActionsContext";
import { GlobalModals } from "./GlobalModals";
import { FloatingActions } from "./FloatingActions";
import { HomeButton } from "./HomeButton";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PageActionsProvider>
      {children}
      <GlobalModals />
      <FloatingActions />
      <HomeButton />
    </PageActionsProvider>
  );
}
