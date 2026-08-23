import "server-only";

import { redirect } from "next/navigation";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";

export type AppRole = "student" | "admin" | "owner";

function localDemoContext(role: AppRole) {
  return {
    userId: "00000000-0000-0000-0000-000000000001",
    email: "owner@localhost",
    role,
    supabase: null,
  };
}

export async function getAuthContext() {
  if (!hasSupabaseConfig()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (error || !userId) return null;
  const { data: roleRow } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();
  return {
    userId,
    email: typeof data.claims.email === "string" ? data.claims.email : null,
    role: (roleRow?.role ?? "student") as AppRole,
    supabase,
  };
}

export async function getVerifiedAuthContext() {
  const context = await getAuthContext();
  if (!context?.supabase) return context;
  const { data, error } = await context.supabase.auth.getUser();
  const user = data.user;
  if (
    error ||
    !user ||
    user.id !== context.userId ||
    !user.email ||
    !user.email_confirmed_at
  )
    return null;
  return { ...context, email: user.email.trim().toLowerCase() };
}

export async function requireUser(nextPath = "/dashboard") {
  const context = await getAuthContext();
  if (
    !context &&
    process.env.NODE_ENV === "development" &&
    process.env.LOCAL_DEMO_ADMIN === "true"
  )
    return localDemoContext("student");
  if (!context) redirect(`/auth?next=${encodeURIComponent(nextPath)}`);
  return context;
}

export async function requireAdmin() {
  const context = await getAuthContext();
  if (
    !context &&
    process.env.NODE_ENV === "development" &&
    process.env.LOCAL_DEMO_ADMIN === "true"
  )
    return localDemoContext("owner");
  if (!context) redirect("/auth?next=/admin");
  if (context.role !== "admin" && context.role !== "owner")
    redirect("/dashboard");
  return context;
}

export async function requireOwner() {
  const context = await requireAdmin();
  if (context.role !== "owner") redirect("/admin");
  return context;
}
