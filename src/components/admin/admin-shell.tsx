"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Boxes, CircleDollarSign, FileText, Images, LayoutDashboard, Mail, Menu, MonitorCog, NotebookTabs, PanelTop, ReceiptText, Settings, ShieldCheck, Tag, Users, Video } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const groups = [
  { label: "Command center", items: [["Overview", "/admin", LayoutDashboard]] },
  { label: "Content & website", items: [["Website Studio", "/admin/website-studio", MonitorCog], ["Pages", "/admin/pages", PanelTop], ["Media Library", "/admin/media", Images], ["Form & Leads", "/admin/leads", Mail]] },
  { label: "Academy operations", items: [["Courses & Learning", "/admin/courses", BookOpen], ["Students & Batches", "/admin/students", Users], ["Certificates", "/admin/certificates", ShieldCheck], ["eBook", "/admin/ebook", FileText], ["Workshop", "/admin/workshop", Video]] },
  { label: "Commerce & payments", items: [["Orders & PayStation", "/admin/orders", CircleDollarSign], ["Coupons", "/admin/coupons", Tag], ["Refunds", "/admin/refunds", ReceiptText]] },
  { label: "Marketing & analytics", items: [["Campaign Intelligence", "/admin/analytics", BarChart3], ["Reports & Insights", "/admin/reports", NotebookTabs], ["Email Logs", "/admin/email-logs", Mail]] },
  { label: "System", items: [["Integrations", "/admin/integrations", Boxes], ["Settings", "/admin/settings", Settings]] },
] as const;

function SidebarContent() {
  const pathname = usePathname();
  return <div className="flex h-full flex-col bg-brand-navy text-white"><div className="border-b border-white/10 px-5 py-5"><BrandLogo compact inverted className="mx-auto" /><p className="font-heading mt-2 text-center text-lg font-semibold">Associates Academy</p></div><nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">{groups.map((group) => <div key={group.label} className="mb-5"><p className="mb-2 px-3 text-[10px] font-bold tracking-[0.14em] text-brand-gold uppercase">{group.label}</p><div className="space-y-1">{group.items.map(([label, href, Icon]) => { const active = href === "/admin" ? pathname === href : pathname.startsWith(href); return <Link key={href} href={href} className={cn("focus-ring clicky flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/72 hover:bg-white/8 hover:text-white", active && "border border-brand-gold/25 bg-white/12 text-white shadow-inner")}><Icon className={cn("h-[18px] w-[18px]", active ? "text-brand-gold" : "text-white/70")} />{label}</Link>; })}</div></div>)}</nav><div className="border-t border-white/10 p-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-white/12 text-sm font-bold">AO</span><div className="min-w-0"><p className="truncate text-sm font-semibold">Academy Owner</p><p className="text-xs text-white/45">Owner</p></div></div></div></div>;
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f5efe6]"><aside className="fixed inset-y-0 left-0 z-40 hidden w-[250px] lg:block"><SidebarContent /></aside><div className="lg:pl-[250px]"><header className="sticky top-0 z-30 border-b border-brand-navy/10 bg-[#f5efe6]/92 backdrop-blur-xl lg:hidden"><div className="flex h-16 items-center justify-between px-4"><BrandLogo compact /><Sheet><SheetTrigger asChild><Button variant="outline" size="icon" aria-label="Admin menu"><Menu /></Button></SheetTrigger><SheetContent side="left" className="w-[280px] border-0 p-0"><SheetHeader className="sr-only"><SheetTitle>Admin menu</SheetTitle></SheetHeader><SidebarContent /></SheetContent></Sheet></div></header><main className="mx-auto w-full max-w-[1580px] p-4 sm:p-6 xl:p-8">{children}</main></div></div>;
}
