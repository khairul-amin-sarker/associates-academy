import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({
  compact = false,
  inverted = false,
  className,
}: {
  compact?: boolean;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "focus-ring clicky -mx-2 inline-flex min-h-11 items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-white/35",
        className,
      )}
      aria-label="Associates Academy হোম"
    >
      <Image
        src="/brand/logo.png"
        width={compact ? 44 : 48}
        height={compact ? 44 : 48}
        alt="Associates Academy logo"
        priority
        className="h-9 w-9 object-contain sm:h-11 sm:w-11"
      />
      {!compact && (
        <span
          className={cn(
            "leading-none",
            inverted ? "text-white" : "text-brand-navy",
          )}
        >
          <span className="font-heading block text-base font-bold tracking-[0.02em] sm:text-xl">
            Associates Academy
          </span>
          <span
            className={cn(
              "mt-1 block text-[10px] font-medium",
              inverted ? "text-white/65" : "text-brand-indigo",
            )}
          >
            Professional Learning
          </span>
        </span>
      )}
    </Link>
  );
}
