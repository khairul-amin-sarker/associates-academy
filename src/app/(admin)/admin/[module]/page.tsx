import { notFound } from "next/navigation";
import { CirclePlus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const modules = {
  pages: ["Pages", "Published, draft ও archived page manage করুন"], media: ["Media Library", "Validated public/private upload ও usage references"], leads: ["Form & Leads", "Contact, workshop ও campaign leads"], courses: ["Courses & Learning", "Product, course, batch, module ও resource"], students: ["Students & Batches", "Learner, enrollment ও batch operations"], certificates: ["Certificates", "Issue, revoke ও public verification registry"], ebook: ["eBook", "Digital product, file access ও delivery"], workshop: ["Workshop", "Session, registration, reminder ও join access"], orders: ["Orders & PayStation", "Order, payment attempt ও verified fulfillment"], coupons: ["Coupons", "Rules, limits ও redemption audit"], refunds: ["Refunds", "Verified refund workflow"], analytics: ["Campaign Intelligence", "First-party funnel, Meta ও GA4 reporting"], reports: ["Reports & Insights", "Revenue, learning ও campaign rollups"], "email-logs": ["Email Logs", "Outbox, delivery, retry ও suppression"], integrations: ["Integrations", "PayStation, Meta, GA4, Resend ও Sentry health"], settings: ["Settings", "Brand, analytics retention ও system preferences"],
} as const;

type Props = { params: Promise<{ module: string }> };

export default async function AdminModulePage({ params }: Props) {
  const { module } = await params;
  const config = modules[module as keyof typeof modules];
  if (!config) notFound();
  const [title, description] = config;
  return <div><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><Badge variant="outline">ADMIN MODULE</Badge><h1 className="font-heading mt-3 text-4xl font-extrabold">{title}</h1><p className="mt-2 text-muted-foreground">{description}</p></div><Button><CirclePlus />নতুন item</Button></div><Card className="mt-6 py-0"><CardContent className="p-5"><div className="relative max-w-md"><Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search or filter" /></div><div className="mt-5 grid min-h-72 place-items-center rounded-xl border border-dashed bg-muted/25 text-center"><div><p className="font-heading text-2xl font-bold">Fresh database workspace</p><p className="mt-2 max-w-md text-sm text-muted-foreground">নতুন data তৈরি হলে role-safe table, filters, detail sheet ও audited actions এখানে দেখা যাবে।</p></div></div></CardContent></Card></div>;
}
