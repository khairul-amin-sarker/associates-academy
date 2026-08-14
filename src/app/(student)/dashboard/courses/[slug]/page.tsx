import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarPlus, Download, ExternalLink, LockKeyhole, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";

type Props = { params: Promise<{ slug: string }> };

export default async function CourseWorkspacePage({ params }: Props) {
  const { slug } = await params;
  if (slug !== "income-tax-working-framework") notFound();
  const context = await requireUser();
  let entitled = false;
  if (context.supabase) {
    const { data } = await context.supabase.from("enrollments").select("id, products!inner(slug)").eq("user_id", context.userId).eq("status", "active").eq("products.slug", slug).maybeSingle();
    entitled = Boolean(data);
  }
  return <div><Badge className={entitled ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>{entitled ? "Full access" : "Locked preview"}</Badge><h1 className="font-heading mt-4 text-4xl font-extrabold">Fundamentals of Income Tax Act, 2023</h1><p className="mt-2 text-muted-foreground">Module, recording, Meet, Calendar ও resource access</p><div className="mt-8 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]"><div className="space-y-3">{["Act structure & taxability", "Heads of Income", "Total income & tax computation", "TDS compliance", "Return preparation", "Assessment & appeal"].map((title, index) => <Card key={title} className={!entitled && index > 0 ? "select-none opacity-50 blur-[2px]" : ""}><CardContent className="flex items-center gap-4 p-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-navy text-brand-gold">{entitled || index === 0 ? <PlayCircle className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}</span><div><p className="font-heading text-lg font-bold">Module {index + 1}</p><p className="text-sm text-muted-foreground">{title}</p></div></CardContent></Card>)}</div><div className="space-y-4"><Card><CardHeader><CardTitle className="font-heading">Live class</CardTitle></CardHeader><CardContent className="space-y-2"><Button className="w-full" disabled={!entitled}><ExternalLink />Google Meet</Button><Button className="w-full" variant="outline" disabled={!entitled}><CalendarPlus />Add to Calendar</Button></CardContent></Card><Card><CardHeader><CardTitle className="font-heading">Resources</CardTitle></CardHeader><CardContent>{entitled ? <Button variant="outline" className="w-full"><Download />Module files</Button> : <div className="text-center"><LockKeyhole className="mx-auto text-brand-gold" /><p className="mt-2 text-sm text-muted-foreground">Enrollment ছাড়া private file signed URL তৈরি হবে না।</p><Button asChild className="mt-4"><Link href="/checkout?product=income-tax-working-framework">Enroll now</Link></Button></div>}</CardContent></Card></div></div></div>;
}
