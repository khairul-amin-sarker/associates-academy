import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({ compact = false, inverted = false, className }: { compact?: boolean; inverted?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("focus-ring clicky inline-flex items-center gap-3 rounded-lg", className)} aria-label="Associates Academy হোম">
      <Image src="/brand/logo.png" width={compact ? 44 : 54} height={compact ? 44 : 54} alt="Associates Academy logo" priority className="h-11 w-11 object-contain sm:h-[54px] sm:w-[54px]" />
      {!compact && (
        <span className={cn("leading-none", inverted ? "text-white" : "text-brand-navy")}>
          <span className="font-heading block text-lg font-bold tracking-[0.02em] sm:text-xl">Associates Academy</span>
          <span className={cn("mt-1 block text-[10px] font-semibold tracking-[0.18em] uppercase", inverted ? "text-white/65" : "text-brand-indigo")}>Tax · VAT · Legal Compliance</span>
        </span>
      )}
    </Link>
  );
}
