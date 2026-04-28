"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { PageActionsProvider } from "@/context/PageActionsContext";
import { GlobalModals } from "./GlobalModals";
import { FloatingActions } from "./FloatingActions";
import { PageTransition } from "./PageTransition";
import { Suspense } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PageActionsProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <GlobalModals />
          <FloatingActions />
          <Suspense fallback={null}>
            <PageTransition />
          </Suspense>
        </ThemeProvider>
      </PageActionsProvider>
    </SessionProvider>
  );
}


