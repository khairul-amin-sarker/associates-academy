import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { claimPaidCourseOrdersForUser } from "@/lib/payments/service";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const requested = url.searchParams.get("next");
  const next = requested?.startsWith("/") ? requested : "/dashboard";
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data } = await supabase.auth.getUser();
      if (data.user?.id && data.user.email_confirmed_at) {
        await claimPaidCourseOrdersForUser(data.user.id).catch(() => null);
      }
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }
  return NextResponse.redirect(new URL("/auth?error=callback", url.origin));
}
