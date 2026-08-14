import Link from "next/link";
import { ArrowRight, BookOpenText, Calculator, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/marketing/info-page";

export default function ResourcesPage() { return <InfoPage eyebrow="FREE RESOURCES" title="Tax update, guide ও professional tools"><p>এই library dashboard-managed হবে। নতুন article, আইন update, guide এবং tool publish করলে redeploy ছাড়াই এখানে দেখা যাবে।</p><div className="grid gap-4 pt-4 sm:grid-cols-3">{[[BookOpenText, "Tax Updates"], [FileText, "Practical Guides"], [Calculator, "Professional Tools"]].map(([Icon, title]) => { const IconComponent = Icon as typeof FileText; return <Card key={String(title)} className="py-0"><CardContent className="p-5"><IconComponent className="h-6 w-6 text-brand-gold" /><h2 className="font-heading mt-4 text-xl font-bold text-foreground">{String(title)}</h2><Button variant="link" className="mt-3 h-auto p-0" asChild><Link href="/courses">Learning programs<ArrowRight /></Link></Button></CardContent></Card>; })}</div></InfoPage>; }
