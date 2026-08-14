import { StudentDashboard } from "@/components/dashboard/student-dashboard";
import { requireUser } from "@/lib/auth";

export default async function DashboardPage() {
  const context = await requireUser();
  let paid = false;
  if (context.supabase) {
    const { data } = await context.supabase.from("enrollments").select("id").eq("user_id", context.userId).eq("status", "active").limit(1);
    paid = Boolean(data?.length);
  }
  return <StudentDashboard paid={paid} />;
}
