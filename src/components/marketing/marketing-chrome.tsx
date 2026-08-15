"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export function MarketingChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/ebook" || pathname.startsWith("/ebook/")) {
    return children;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
