"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { PageActionsProvider } from "@/context/PageActionsContext";
import { GlobalModals } from "./GlobalModals";
import { FloatingActions } from "./FloatingActions";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PageActionsProvider>
        <ThemeProvider attribute="class" defaultTheme="clandestino" enableSystem={false}>
          {children}
          <GlobalModals />
          <FloatingActions />
        </ThemeProvider>
      </PageActionsProvider>
    </SessionProvider>
  );
}



