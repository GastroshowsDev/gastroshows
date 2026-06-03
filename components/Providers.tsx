"use client";

import { PageActionsProvider } from "@/context/PageActionsContext";
import { GlobalModals } from "./GlobalModals";
import { FloatingActions } from "./FloatingActions";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PageActionsProvider>
      {children}
      <GlobalModals />
      <FloatingActions />
    </PageActionsProvider>
  );
}
