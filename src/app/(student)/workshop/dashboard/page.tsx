import { CalendarDays, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";

export default async function WorkshopDashboard() {
  await requireUser();
  return <div><h1 className="font-heading text-4xl font-extrabold">Workshop dashboard</h1><p className="mt-2 text-muted-foreground">Registration, schedule ও live access</p><Card className="mt-8 max-w-2xl"><CardHeader><CardTitle className="font-heading flex items-center gap-2"><Video className="text-brand-gold" />Upcoming workshop</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">কোনো published workshop session পাওয়া যায়নি। Admin schedule publish করলে এখানে live join ও calendar action দেখা যাবে।</p><Button className="mt-5" disabled><CalendarDays />Schedule pending</Button></CardContent></Card></div>;
}
