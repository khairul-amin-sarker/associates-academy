import { StudentDashboard } from "@/components/dashboard/student-dashboard";
import { requireUser } from "@/lib/auth";
import { getDashboardWorkspaces } from "@/lib/learning/workspace";

export default async function DashboardPage() {
  const context = await requireUser();
  return (
    <StudentDashboard workspaces={await getDashboardWorkspaces(context)} />
  );
}
