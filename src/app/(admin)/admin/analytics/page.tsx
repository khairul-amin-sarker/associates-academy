import {
  Activity,
  BadgeCheck,
  ChartNoAxesCombined,
  MousePointerClick,
  ScrollText,
  ShoppingCart,
} from "lucide-react";
import { ManualSyncButton } from "@/components/admin/manual-sync-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireAdmin } from "@/lib/auth";

const trackedEvents = [
  "page_view",
  "scroll_depth",
  "cta_click",
  "checkout_started",
  "verified_purchase",
] as const;

export default async function AnalyticsPage() {
  const context = await requireAdmin();
  const demo = !context.supabase;
  let eventCounts = Object.fromEntries(
    trackedEvents.map((name) => [name, 0]),
  ) as Record<(typeof trackedEvents)[number], number>;
  let campaigns: Array<{
    campaign_id: string;
    campaign_name: string | null;
    impressions: number;
    clicks: number;
    spend: number;
    attributed_purchases: number;
    day: string;
  }> = [];
  let integrations: Array<{
    integration_key: string;
    status: string;
    completed_at: string | null;
    error_message: string | null;
  }> = [];
  if (context.supabase) {
    const [{ data: events }, { data: campaignRows }, { data: runRows }] =
      await Promise.all([
        context.supabase
          .from("analytics_events")
          .select("event_name")
          .order("occurred_at", { ascending: false })
          .limit(10000),
        context.supabase
          .from("ad_campaign_metrics")
          .select(
            "campaign_id,campaign_name,impressions,clicks,spend,attributed_purchases,day",
          )
          .order("day", { ascending: false })
          .limit(20),
        context.supabase
          .from("integration_runs")
          .select("integration_key,status,completed_at,error_message")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);
    eventCounts = Object.fromEntries(
      trackedEvents.map((name) => [
        name,
        (events ?? []).filter((event) => event.event_name === name).length,
      ]),
    ) as typeof eventCounts;
    campaigns = campaignRows ?? [];
    integrations = runRows ?? [];
  } else {
    eventCounts = {
      page_view: 12840,
      scroll_depth: 7840,
      cta_click: 1480,
      checkout_started: 842,
      verified_purchase: 523,
    };
    campaigns = [
      {
        campaign_id: "demo-campaign",
        campaign_name: "Income Tax Batch Launch",
        impressions: 186400,
        clicks: 26740,
        spend: 48350,
        attributed_purchases: 312,
        day: "2026-08-14",
      },
    ];
  }
  const cards = [
    [Activity, "Page views", eventCounts.page_view],
    [ScrollText, "Scroll milestones", eventCounts.scroll_depth],
    [MousePointerClick, "CTA clicks", eventCounts.cta_click],
    [ShoppingCart, "Checkout starts", eventCounts.checkout_started],
    [BadgeCheck, "Verified purchases", eventCounts.verified_purchase],
  ] as const;
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="outline">FIRST-PARTY + EXTERNAL</Badge>
          <h1 className="font-heading mt-3 text-4xl font-extrabold">
            Campaign Intelligence
          </h1>
          <p className="text-muted-foreground mt-2">
            Website journey, verified payment, GA4 ও Meta campaign data—একই
            command center-এ।
          </p>
          {demo ? (
            <Badge className="mt-2" variant="secondary">
              Local visual demo data
            </Badge>
          ) : null}
        </div>
        <ManualSyncButton />
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([Icon, label, value]) => (
          <Card key={label}>
            <CardContent className="p-5">
              <Icon className="text-brand-gold h-5 w-5" />
              <p className="text-muted-foreground mt-4 text-xs">
                {label} · captured
              </p>
              <p className="font-heading mt-1 text-3xl font-bold">
                {value.toLocaleString("bn-BD")}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="py-0">
          <CardHeader className="border-b p-5">
            <CardTitle className="font-heading flex items-center gap-2">
              <ChartNoAxesCombined className="text-brand-gold h-5 w-5" />
              Meta campaign metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Impressions</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Spend</TableHead>
                  <TableHead>Purchases</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.length ? (
                  campaigns.map((row) => (
                    <TableRow key={`${row.campaign_id}-${row.day}`}>
                      <TableCell className="font-semibold">
                        {row.campaign_name ?? row.campaign_id}
                      </TableCell>
                      <TableCell>{row.day}</TableCell>
                      <TableCell>
                        {row.impressions.toLocaleString("bn-BD")}
                      </TableCell>
                      <TableCell>
                        {row.clicks.toLocaleString("bn-BD")}
                      </TableCell>
                      <TableCell>
                        ৳ {row.spend.toLocaleString("bn-BD")}
                      </TableCell>
                      <TableCell>
                        {row.attributed_purchases.toLocaleString("bn-BD")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-muted-foreground h-32 text-center"
                    >
                      Meta Marketing API connect করলে daily campaign rows এখানে
                      আসবে।
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="py-0">
          <CardHeader className="border-b p-5">
            <CardTitle className="font-heading">Integration health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-5">
            {integrations.length ? (
              integrations.map((run, index) => (
                <div
                  key={`${run.integration_key}-${index}`}
                  className="flex items-center justify-between rounded-xl border p-3"
                >
                  <div>
                    <p className="font-semibold">
                      {run.integration_key.toUpperCase()}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {run.completed_at
                        ? new Date(run.completed_at).toLocaleString("bn-BD")
                        : "Pending"}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      run.status === "success"
                        ? "text-success"
                        : "text-amber-700"
                    }
                  >
                    {run.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed p-5 text-center">
                <p className="font-semibold">
                  External reporting not connected
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  First-party analytics independently active থাকবে।
                </p>
              </div>
            )}
            <div className="bg-muted/50 text-muted-foreground rounded-xl p-4 text-xs">
              <p className="text-foreground font-semibold">Retention</p>
              <p className="mt-1">
                Raw events: 13 months · Daily rollups: retained
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
