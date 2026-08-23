"use server";

import { redirect } from "next/navigation";
import type { Route } from "next";
import { getVerifiedAuthContext } from "@/lib/auth";
import { claimPaidCourseOrdersForUser } from "@/lib/payments/service";

export async function claimPaidCourses() {
  const auth = await getVerifiedAuthContext();
  if (!auth?.supabase) redirect("/auth?next=/payment/recovery");
  let data;
  try {
    data = await claimPaidCourseOrdersForUser(auth.userId);
  } catch {
    redirect("/payment/recovery?error=claim_failed" as Route);
  }
  const claimed = data.find((item) => item.course_slug);
  if (claimed) redirect(`/dashboard/courses/${claimed.course_slug}`);
  redirect("/dashboard");
}
