"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <SiteNav />
      <div style={{ paddingTop: "120px" }}>
        {children}
      </div>
      <Footer />
    </>
  );
}
