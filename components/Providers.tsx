"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { PageActionsProvider } from "@/context/PageActionsContext";
import { GlobalModals } from "./GlobalModals";
import { FloatingActions } from "./FloatingActions";
import { HomeButton } from "./HomeButton";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="clandestino" 
        themes={["clandestino", "revelado"]}
        enableSystem={false}
        disableTransitionOnChange
      >
        <PageActionsProvider>
          {children}
          <GlobalModals />
          <FloatingActions />
          <HomeButton />
        </PageActionsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
