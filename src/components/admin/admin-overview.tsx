import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Eye,
  FilePenLine,
  Megaphone,
  Radio,
  RefreshCcw,
  ShoppingCart,
  Users,
} from "lucide-react";
import { FunnelVisualization } from "@/components/admin/funnel-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Metrics = {
  revenue: number;
  enrollments: number;
  conversion: number;
  pendingPayments: number;
  orders: number;
};

type RecentPurchase = {
  customerName: string;
  title: string;
  invoice: string;
  amount: number;
};

export function AdminOverview({
  dateLabel,
  demo,
  metrics,
  recentPurchase,
  integrationStatus,
}: {
  dateLabel: string;
  demo: boolean;
  metrics: Metrics;
  recentPurchase?: RecentPurchase;
  integrationStatus: { meta: boolean; ga4: boolean; paystation: boolean };
}) {
  const purchase = demo
    ? {
        customerName: "Farjana Akter",
        title: "VAT Practitioner Course",
        invoice: "AA-DEMO-1540",
        amount: 4950,
      }
    : recentPurchase;
  const attentionItems = demo
    ? [
        [
          CreditCard,
          "Payment review অপেক্ষমাণ",
          "২৮টি order যাচাই করা দরকার",
          "৳ ৮৯,৭৫০",
        ],
        [Users, "নতুন enrollment", "শেষ ২৪ ঘণ্টায় নতুন learner", "১৫৬ জন"],
        [ShoppingCart, "PayStation checkout", "৪২টি checkout অসম্পূর্ণ", "৪২"],
        [
          Megaphone,
          "Active campaign insight",
          "Campaign attention প্রয়োজন",
          "২টি",
        ],
        [Bell, "Unreplied messages", "নতুন support reply প্রয়োজন", "১৮টি"],
      ]
    : [
        [
          CreditCard,
          "Payment review অপেক্ষমাণ",
          "Pending order verification",
          metrics.pendingPayments.toLocaleString("bn-BD"),
        ],
        [
          Users,
          "Active enrollment",
          "বর্তমানে active learner access",
          metrics.enrollments.toLocaleString("bn-BD"),
        ],
        [
          ShoppingCart,
          "Total orders",
          "সকল recorded checkout",
          metrics.orders.toLocaleString("bn-BD"),
        ],
        [
          Megaphone,
          "Campaign insight",
          "Meta integration connect করলে data আসবে",
          "০",
        ],
        [
          Bell,
          "Support inbox",
          "External inbox integration configured নয়",
          "০",
        ],
      ];
  const stats = [
    [
      CreditCard,
      "Verified revenue (BDT)",
      `৳ ${metrics.revenue.toLocaleString("bn-BD")}`,
      demo ? "গতকাল থেকে ২২.১%" : "All-time verified total",
    ],
    [
      Users,
      "Paid enrollment",
      `${metrics.enrollments.toLocaleString("bn-BD")} জন`,
      demo ? "গতকাল থেকে ৫০%" : "Current active access",
    ],
    [
      Clock3,
      "Checkout conversion",
      `${metrics.conversion.toFixed(2)}%`,
      "First-party verified",
    ],
    [
      CircleDollarSign,
      "Payment review",
      `${metrics.pendingPayments.toLocaleString("bn-BD")}`,
      `${metrics.orders.toLocaleString("bn-BD")} মোট order`,
    ],
  ] as const;
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-muted-foreground text-sm">
            {dateLabel} · আজকের academy summary
          </p>
          <h1 className="font-heading mt-1 text-3xl font-extrabold sm:text-4xl">
            শুভ সকাল, Academy Owner
          </h1>
          {demo ? (
            <Badge variant="outline" className="mt-2">
              Local visual demo data
            </Badge>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarDays />
            আজ
          </Button>
          <Button asChild>
            <Link href="/admin/courses">নতুন কোর্স</Link>
          </Button>
          <Button variant="outline" size="icon" aria-label="Notifications">
            <Bell />
          </Button>
        </div>
      </div>

      <section className="paper-grid bg-brand-navy overflow-hidden rounded-[1.35rem] p-5 text-white sm:p-6">
        <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          {stats.map(([Icon, label, value, note]) => (
            <div key={label} className="px-2 py-5 first:pt-0 sm:px-5 sm:py-2">
              <div className="flex items-start gap-4">
                <span className="text-brand-gold grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-white/65">{label}</p>
                  <p className="font-heading mt-1 text-2xl font-bold">
                    {value}
                  </p>
                  <p className="mt-2 text-xs text-white/45">{note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
        <Card className="py-0">
          <CardHeader className="border-b p-5">
            <CardTitle className="font-heading flex items-center gap-2">
              <CircleAlert className="text-brand-gold h-5 w-5" />
              আজ যা দেখবেন
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {attentionItems.map(([Icon, title, text, value]) => {
              const IconComponent = Icon as typeof Bell;
              return (
                <Link
                  href="/admin/orders"
                  key={String(title)}
                  className="group hover:bg-muted/50 flex items-center gap-4 border-b p-4 last:border-0"
                >
                  <span className="bg-brand-cream text-brand-indigo grid h-10 w-10 place-items-center rounded-full">
                    <IconComponent className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{String(title)}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {String(text)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">{String(value)}</span>
                  <ArrowRight className="text-muted-foreground h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
            <div className="p-3">
              <Button variant="outline" className="w-full">
                সব notification দেখুন
                <ArrowRight />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="flex-row items-center justify-between border-b p-5">
            <div>
              <CardTitle className="font-heading">
                First-party journey funnel
              </CardTitle>
              <p className="text-muted-foreground mt-1 text-xs">
                Meta Ads → verified purchase · clicks এবং sessions আলাদা
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/analytics">সব campaign</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <div className="bg-muted/60 mb-2 grid grid-cols-3 gap-2 rounded-xl p-3 text-center text-xs">
              <div>
                <p className="font-heading text-lg font-bold">
                  {demo ? "২৬,৭৪০" : "০"}
                </p>
                <p className="text-muted-foreground">Meta ad clicks</p>
              </div>
              <div>
                <p className="font-heading text-lg font-bold">
                  {demo ? "১২,৮৪০" : "০"}
                </p>
                <p className="text-muted-foreground">Landing sessions</p>
              </div>
              <div>
                <p className="font-heading text-lg font-bold">
                  {demo ? "৫২৩" : "০"}
                </p>
                <p className="text-muted-foreground">Purchases</p>
              </div>
            </div>
            <FunnelVisualization demo={demo} />
            <p className="text-muted-foreground border-t pt-3 text-xs">
              Conversion GA4, first-party events ও PayStation verification-এর
              মিলিত evidence থেকে গণনা হবে।
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr_1.1fr]">
        <Card className="py-0">
          <CardHeader className="flex-row items-center justify-between border-b p-5">
            <CardTitle className="font-heading">Website status</CardTitle>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle2 />
              Production synced
            </Badge>
          </CardHeader>
          <CardContent className="p-5 text-sm">
            <dl className="space-y-3">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Live site</dt>
                <dd className="font-semibold">associatesacademy.com.bd</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Latest publish</dt>
                <dd>{demo ? "আজ, ১০:২৮ AM" : "Published snapshot active"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Draft changes</dt>
                <dd>{demo ? "১টি" : "০টি"}</dd>
              </div>
            </dl>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button asChild>
                <Link href="/admin/website-studio">
                  <FilePenLine />
                  Page edit
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <Eye />
                  Live preview
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="py-0">
          <CardHeader className="border-b p-5">
            <CardTitle className="font-heading flex items-center gap-2">
              <Radio className="text-brand-gold h-5 w-5" />
              পরবর্তী live class
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            {demo ? (
              <>
                <Badge variant="outline">আগস্ট ১৪ · শুক্রবার</Badge>
                <p className="font-heading mt-4 text-xl font-bold">
                  Taxation in Bangladesh: Advanced
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Tax Pro — Batch 08
                </p>
                <div className="bg-muted/60 mt-4 grid grid-cols-2 rounded-xl p-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">সময়</p>
                    <p className="font-semibold">৮:০০ PM</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">সময়কাল</p>
                    <p className="font-semibold">২ ঘণ্টা</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  Class room যান
                  <ArrowRight />
                </Button>
              </>
            ) : (
              <div className="rounded-xl border border-dashed p-5 text-center">
                <CalendarDays className="text-muted-foreground mx-auto h-6 w-6" />
                <p className="mt-3 font-semibold">
                  কোনো live class schedule নেই
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Batch module-এ class schedule করলে এখানে দেখা যাবে।
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="py-0">
          <CardHeader className="border-b p-5">
            <CardTitle className="font-heading flex items-center gap-2">
              <ShoppingCart className="text-brand-gold h-5 w-5" />
              সাম্প্রতিক verified purchase
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            {purchase ? (
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-green-100 font-bold text-green-800">
                  {purchase.customerName.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{purchase.customerName}</p>
                  <p className="text-muted-foreground text-xs">
                    {purchase.title}
                  </p>
                  <p className="text-muted-foreground mt-1 font-mono text-xs">
                    {purchase.invoice}
                  </p>
                </div>
                <p className="font-heading text-success text-xl font-bold">
                  ৳ {purchase.amount.toLocaleString("bn-BD")}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed p-5 text-center">
                <ShoppingCart className="text-muted-foreground mx-auto h-6 w-6" />
                <p className="mt-3 font-semibold">এখনও verified purchase নেই</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  PayStation verification সম্পন্ন হলে latest purchase এখানে দেখা
                  যাবে।
                </p>
              </div>
            )}
            <div className="mt-5 border-t pt-4 text-right">
              <Button variant="link" asChild>
                <Link href="/admin/orders">
                  সব purchase দেখুন
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="py-0">
        <CardContent className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-[auto_1fr_1fr_1fr_auto]">
          <div className="font-heading flex items-center gap-2 px-2 font-bold">
            <RefreshCcw className="h-5 w-5" />
            Integration status
          </div>
          {[
            ["Meta CAPI", integrationStatus.meta],
            ["GA4", integrationStatus.ga4],
            ["PayStation", integrationStatus.paystation],
          ].map(([name, connected]) => (
            <div
              key={String(name)}
              className="flex items-center justify-between rounded-xl border bg-white p-3"
            >
              <span className="font-semibold">{String(name)}</span>
              <Badge
                variant="outline"
                className={connected ? "text-success" : "text-amber-700"}
              >
                {connected ? "Active" : "Not connected"}
              </Badge>
            </div>
          ))}
          <Button variant="ghost" asChild>
            <Link href="/admin/integrations">
              সব integration
              <ArrowRight />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
