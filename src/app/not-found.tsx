import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() { return <main className="grid min-h-screen place-items-center bg-background p-6 text-center"><div><p className="font-mono text-sm text-brand-gold">404</p><h1 className="font-heading mt-3 text-5xl font-extrabold">Page পাওয়া যায়নি</h1><p className="mt-3 text-muted-foreground">Link পরিবর্তন হয়েছে অথবা content আর available নেই।</p><Button asChild className="mt-6"><Link href="/">Homepage-এ ফিরুন</Link></Button></div></main>; }
