"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-navy/10 bg-[#f8f3eb]/92 backdrop-blur-xl">
      <div className="section-shell flex h-[76px] items-center justify-between gap-6">
        <BrandLogo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="প্রধান নেভিগেশন">
          {navItems.map((item) => <Button key={item.href} variant="ghost" asChild className="clicky text-[15px] font-semibold"><Link href={item.href}>{item.label}</Link></Button>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" asChild className="clicky border-brand-navy/20"><Link href="/auth">লগইন</Link></Button>
          <Button asChild className="clicky shadow-md shadow-brand-navy/15"><Link href="/courses">কোর্স দেখুন</Link></Button>
        </div>
        <Sheet>
          <SheetTrigger asChild className="lg:hidden"><Button variant="outline" size="icon" aria-label="মেনু খুলুন"><Menu /></Button></SheetTrigger>
          <SheetContent side="right" className="bg-brand-cream px-5">
            <SheetHeader className="px-0"><SheetTitle className="sr-only">মেনু</SheetTitle><BrandLogo /></SheetHeader>
            <nav className="mt-8 grid gap-2" aria-label="মোবাইল নেভিগেশন">
              {navItems.map((item) => <Button key={item.href} variant="ghost" asChild className="h-12 justify-start text-base"><Link href={item.href}>{item.label}</Link></Button>)}
              <div className="my-3 h-px bg-brand-navy/10" />
              <Button variant="outline" asChild><Link href="/auth">লগইন</Link></Button>
              <Button asChild><Link href="/courses">কোর্স দেখুন</Link></Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
