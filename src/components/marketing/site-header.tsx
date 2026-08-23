"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  practicalReturnCheckoutPath,
  practicalReturnCoursePath,
} from "@/lib/content/practical-return-course";
import { navItems } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const isPracticalReturnCourse = pathname === practicalReturnCoursePath;
  const primaryHref = isPracticalReturnCourse
    ? practicalReturnCheckoutPath
    : "/courses";
  const primaryLabel = isPracticalReturnCourse
    ? "কোর্সে ভর্তি হোন"
    : "কোর্স দেখুন";

  return (
    <header className="border-border text-brand-navy sticky top-0 z-40 border-b bg-[#f1e7d6]/85 shadow-[0_8px_24px_-12px_rgb(17_24_68_/_18%)] backdrop-blur-md">
      <div className="section-shell flex h-[68px] items-center justify-between gap-4 lg:gap-5">
        <BrandLogo />
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="প্রধান নেভিগেশন"
        >
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className="clicky text-[15px] font-semibold"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Button
            variant="outline"
            asChild
            className="clicky border-brand-navy/20"
          >
            <Link href="/auth">লগইন</Link>
          </Button>
          <Button asChild className="clicky shadow-brand-navy/15 shadow-md">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon" aria-label="মেনু খুলুন">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-brand-cream px-5">
            <SheetHeader className="px-0">
              <SheetTitle className="sr-only">মেনু</SheetTitle>
              <BrandLogo />
            </SheetHeader>
            <nav className="mt-8 grid gap-2" aria-label="মোবাইল নেভিগেশন">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  asChild
                  className="h-12 justify-start text-base"
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
              <div className="bg-brand-navy/10 my-3 h-px" />
              <Button variant="outline" asChild>
                <Link href="/auth">লগইন</Link>
              </Button>
              <Button asChild>
                <Link href={primaryHref}>{primaryLabel}</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
