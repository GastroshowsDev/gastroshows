"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { PageActionsProvider } from "@/context/PageActionsContext";

type Props = {
  children: React.ReactNode;
};

/**
 * Shared layout for Page Builder pages.
 * Includes global elements like ThemeToggle and Reservation/Gift modals.
 */
export function PageLayout({ children }: Props) {
  return (
    <PageActionsProvider>
      <ThemeToggle variant="public" />
      {children}
    </PageActionsProvider>
  );
}
