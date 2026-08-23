import { AdminOverview } from "@/components/admin/admin-overview";
import { requireAdmin } from "@/lib/auth";

export default async function AdminPage() {
  const context = await requireAdmin();
  const demo = !context.supabase;
  const metrics = demo
    ? {
        revenue: 784560,
        enrollments: 156,
        conversion: 4.62,
        pendingPayments: 28,
        orders: 437,
      }
    : {
        revenue: 0,
        enrollments: 0,
        conversion: 0,
        pendingPayments: 0,
        orders: 0,
      };
  let recentPurchase:
    | { customerName: string; title: string; invoice: string; amount: number }
    | undefined;
  if (context.supabase) {
    const [{ data: orders }, { count: enrollments }, { count: pending }] =
      await Promise.all([
        context.supabase.from("orders").select("total_amount,status"),
        context.supabase
          .from("enrollments")
          .select("id", { count: "exact", head: true })
          .eq("status", "active"),
        context.supabase
          .from("orders")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending"),
      ]);
    metrics.revenue = (orders ?? [])
      .filter((order) => order.status === "paid")
      .reduce((sum, order) => sum + Number(order.total_amount), 0);
    metrics.enrollments = enrollments ?? 0;
    metrics.pendingPayments = pending ?? 0;
    metrics.orders = orders?.length ?? 0;
    metrics.conversion = metrics.orders
      ? (metrics.enrollments / metrics.orders) * 100
      : 0;
    const { data: latestOrder } = await context.supabase
      .from("orders")
      .select("id,invoice_number,total_amount,customer_snapshot")
      .eq("status", "paid")
      .order("paid_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (latestOrder) {
      const { data: item } = await context.supabase
        .from("order_items")
        .select("title_snapshot")
        .eq("order_id", latestOrder.id)
        .order("id")
        .limit(1)
        .maybeSingle();
      const customer =
        latestOrder.customer_snapshot &&
        typeof latestOrder.customer_snapshot === "object" &&
        !Array.isArray(latestOrder.customer_snapshot)
          ? latestOrder.customer_snapshot
          : {};
      recentPurchase = {
        customerName:
          typeof customer.name === "string"
            ? customer.name
            : "Verified learner",
        title: item?.title_snapshot ?? "Academy program",
        invoice: latestOrder.invoice_number,
        amount: Number(latestOrder.total_amount),
      };
    }
  }
  const dateLabel = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
  return (
    <AdminOverview
      dateLabel={dateLabel}
      demo={demo}
      metrics={metrics}
      recentPurchase={recentPurchase}
      integrationStatus={{
        meta: Boolean(
          process.env.META_CAPI_ACCESS_TOKEN &&
          process.env.META_MARKETING_ACCESS_TOKEN,
        ),
        ga4: Boolean(
          process.env.GA4_API_SECRET && process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
        ),
        paystation:
          process.env.PAYSTATION_MODE === "live"
            ? Boolean(
                process.env.PAYSTATION_LIVE_MERCHANT_ID &&
                  process.env.PAYSTATION_LIVE_PASSWORD,
              )
            : Boolean(
                process.env.PAYSTATION_SANDBOX_MERCHANT_ID &&
                  process.env.PAYSTATION_SANDBOX_PASSWORD,
              ),
      }}
    />
  );
}
