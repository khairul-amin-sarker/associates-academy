import { saveCoupon } from "./actions";
import { requireAdmin } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Coupon = {
  id: number;
  product_id: number | null;
  code: string;
  discount_type: "fixed" | "percent";
  discount_value: number;
  max_redemptions: number | null;
  max_redemptions_per_user: number;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
};
type Course = { id: number; title: string; slug: string };

function dateValue(value: string | null) {
  return value ? new Date(value).toISOString().slice(0, 16) : "";
}

function CouponFields({
  coupon,
  courses,
}: {
  coupon?: Coupon;
  courses: Course[];
}) {
  return (
    <>
      {coupon ? <input type="hidden" name="id" value={coupon.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`coupon-course-${coupon?.id ?? "new"}`}>Course</Label>
          <select
            id={`coupon-course-${coupon?.id ?? "new"}`}
            name="productId"
            required
            defaultValue={coupon?.product_id ?? ""}
            className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
          >
            <option value="" disabled>
              Course নির্বাচন করুন
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`coupon-code-${coupon?.id ?? "new"}`}>
            Coupon code
          </Label>
          <Input
            id={`coupon-code-${coupon?.id ?? "new"}`}
            name="code"
            required
            defaultValue={coupon?.code ?? ""}
            placeholder="SUMMER20"
            className="uppercase"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Discount type</Label>
          <select
            name="discountType"
            defaultValue={coupon?.discount_type ?? "percent"}
            className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
          >
            <option value="percent">Percent (%)</option>
            <option value="fixed">Fixed (৳)</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Discount value</Label>
          <Input
            name="discountValue"
            type="number"
            min="0.01"
            step="0.01"
            required
            defaultValue={coupon?.discount_value ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label>Per learner limit</Label>
          <Input
            name="maxRedemptionsPerUser"
            type="number"
            min="1"
            required
            defaultValue={coupon?.max_redemptions_per_user ?? 1}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Total redemption limit</Label>
          <Input
            name="maxRedemptions"
            type="number"
            min="1"
            defaultValue={coupon?.max_redemptions ?? ""}
            placeholder="Unlimited"
          />
        </div>
        <div className="space-y-2">
          <Label>Starts at</Label>
          <Input
            name="startsAt"
            type="datetime-local"
            defaultValue={dateValue(coupon?.starts_at ?? null)}
          />
        </div>
        <div className="space-y-2">
          <Label>Ends at</Label>
          <Input
            name="endsAt"
            type="datetime-local"
            defaultValue={dateValue(coupon?.ends_at ?? null)}
          />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          name="isActive"
          type="checkbox"
          defaultChecked={coupon?.is_active ?? true}
          className="accent-brand-indigo h-4 w-4"
        />
        Coupon active
      </label>
    </>
  );
}

export default async function AdminCouponsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const query = await searchParams;
  const context = await requireAdmin();
  let coupons: Coupon[] = [];
  let courses: Course[] = [];
  if (context.supabase) {
    const [{ data: couponRows }, { data: productRows }] = await Promise.all([
      context.supabase
        .from("coupons")
        .select(
          "id,product_id,code,discount_type,discount_value,max_redemptions,max_redemptions_per_user,starts_at,ends_at,is_active",
        )
        .order("created_at", { ascending: false }),
      context.supabase
        .from("products")
        .select("id,title,slug")
        .eq("product_type", "course")
        .order("title"),
    ]);
    coupons = (couponRows ?? []) as Coupon[];
    courses = (productRows ?? []) as Course[];
  }
  const courseName = new Map(
    courses.map((course) => [course.id, course.title]),
  );
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline">COMMERCE CONTROL</Badge>
        <h1 className="font-heading mt-3 text-4xl font-extrabold">
          Course coupons
        </h1>
        <p className="text-muted-foreground mt-2">
          প্রতিটি coupon একটিমাত্র course-এর জন্য। Checkout price ও redemption
          limit server-side verify হয়।
        </p>
      </div>
      {query.saved ? (
        <p
          role="status"
          className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          Coupon save হয়েছে।
        </p>
      ) : null}
      {query.error ? (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-900"
        >
          Coupon save করা যায়নি। Course, code ও date range আবার যাচাই করুন।
        </p>
      ) : null}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">নতুন coupon তৈরি করুন</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveCoupon} className="grid gap-5">
            <CouponFields courses={courses} />
            <Button className="w-fit">Coupon save করুন</Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        {coupons.length ? (
          coupons.map((coupon) => (
            <Card key={coupon.id}>
              <CardHeader className="flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="font-heading text-xl">
                    {coupon.code}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {coupon.product_id
                      ? (courseName.get(coupon.product_id) ??
                        "Unavailable course")
                      : "Course assignment প্রয়োজন"}
                  </p>
                </div>
                <Badge variant={coupon.is_active ? "default" : "secondary"}>
                  {coupon.is_active ? "Active" : "Inactive"}
                </Badge>
              </CardHeader>
              <CardContent>
                <form action={saveCoupon} className="grid gap-5">
                  <CouponFields coupon={coupon} courses={courses} />
                  <Button variant="outline" className="w-fit">
                    পরিবর্তন save করুন
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-muted-foreground p-8 text-center">
              এখনও কোনো coupon নেই।
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
