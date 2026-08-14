"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={250}>
        {children}
        <Toaster richColors position="top-center" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
