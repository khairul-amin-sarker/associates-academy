import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentReconciliationPanel } from "@/components/admin/payment-reconciliation-panel";
import { requireAdmin } from "@/lib/auth";

type RecentOrder = {
  invoice_number: string;
  payment_state: string;
  total_amount: number;
  created_at: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date(value));
}

export default async function AdminOrdersPage() {
  const context = await requireAdmin();
  let pendingCount = 0;
  let recentOrders: RecentOrder[] = [];

  if (context.supabase) {
    const [{ count }, { data }] = await Promise.all([
      context.supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .in("payment_state", ["pending_payment", "processing", "failed"]),
      context.supabase
        .from("orders")
        .select("invoice_number,payment_state,total_amount,created_at")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);
    pendingCount = count ?? 0;
    recentOrders = (data ?? []) as RecentOrder[];
  }

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline">ORDERS &amp; PAYSTATION</Badge>
        <h1 className="font-heading text-brand-navy mt-3 text-4xl font-extrabold">
          Payment verification desk
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl leading-7">
          Live checkout, invoice status, recovery এবং verified fulfillment একই
          database-owned workflow থেকে পরিচালনা করুন।
        </p>
      </div>

      <PaymentReconciliationPanel
        pendingCount={pendingCount}
        ownerEnabled={context.role === "owner"}
      />

      <Card className="border-brand-navy/10 bg-white py-0 shadow-sm">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-brand-indigo text-xs font-bold tracking-[0.14em] uppercase">
                Recovery reference
              </p>
              <h2 className="font-heading text-brand-navy mt-1 text-2xl font-bold">
                সাম্প্রতিক invoice
              </h2>
            </div>
            <span className="text-muted-foreground text-sm">
              সর্বশেষ {recentOrders.length.toLocaleString("bn-BD")}টি
            </span>
          </div>

          {recentOrders.length ? (
            <>
              <div className="border-brand-navy/10 mt-5 hidden overflow-hidden rounded-2xl border md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-navy text-white">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Invoice</th>
                      <th className="px-4 py-3 font-semibold">State</th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-brand-navy/10 divide-y">
                    {recentOrders.map((order) => (
                      <tr key={order.invoice_number}>
                        <td className="text-brand-navy px-4 py-3 font-mono text-xs font-semibold">
                          {order.invoice_number}
                        </td>
                        <td className="px-4 py-3">{order.payment_state}</td>
                        <td className="px-4 py-3 font-semibold">
                          ৳{Number(order.total_amount).toLocaleString("bn-BD")}
                        </td>
                        <td className="text-muted-foreground px-4 py-3">
                          {formatDate(order.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 space-y-3 md:hidden">
                {recentOrders.map((order) => (
                  <article
                    key={order.invoice_number}
                    className="border-brand-navy/10 bg-brand-cream/35 rounded-2xl border p-4"
                  >
                    <p className="text-brand-navy font-mono text-xs font-semibold break-all">
                      {order.invoice_number}
                    </p>
                    <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <dt className="text-muted-foreground text-xs">State</dt>
                        <dd className="mt-1 font-medium">
                          {order.payment_state}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground text-xs">
                          Amount
                        </dt>
                        <dd className="mt-1 font-semibold">
                          ৳{Number(order.total_amount).toLocaleString("bn-BD")}
                        </dd>
                      </div>
                    </dl>
                    <p className="text-muted-foreground mt-3 text-xs">
                      {formatDate(order.created_at)}
                    </p>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="border-brand-navy/15 bg-brand-cream/30 mt-5 rounded-2xl border border-dashed px-5 py-12 text-center">
              <p className="font-heading text-brand-navy text-xl font-bold">
                এখনো কোনো order নেই
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                প্রথম checkout শুরু হলে invoice reference এখানে দেখা যাবে।
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
