import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background"><header className="border-b bg-white/85 backdrop-blur"><div className="section-shell flex h-18 items-center justify-between"><BrandLogo /><div className="flex items-center gap-2"><Button variant="ghost" asChild><Link href="/profile">Profile</Link></Button><Button variant="outline" asChild><Link href="/">Website</Link></Button></div></div></header><main className="section-shell py-8 sm:py-12">{children}</main></div>;
}
