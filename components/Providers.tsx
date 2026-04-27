"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { PageActionsProvider } from "@/context/PageActionsContext";
import { GlobalModals } from "./GlobalModals";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PageActionsProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <GlobalModals />
        </ThemeProvider>
      </PageActionsProvider>
    </SessionProvider>
  );
}
