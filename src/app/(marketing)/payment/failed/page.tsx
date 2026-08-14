import Link from "next/link";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function PaymentFailed() { return <section className="grid min-h-[60vh] place-items-center px-4 py-14 text-center"><div className="max-w-lg"><CircleX className="mx-auto h-14 w-14 text-destructive" /><h1 className="font-heading mt-5 text-4xl font-extrabold">Payment verify হয়নি</h1><p className="mt-3 text-muted-foreground">আপনার account থেকে টাকা কাটা হলে invoice সহ support-এ যোগাযোগ করুন। Browser result নয়, provider status-ই final।</p><Button asChild className="mt-7"><Link href="/checkout">আবার চেষ্টা করুন</Link></Button></div></section>; }
