import { NextResponse } from "next/server";
import { getVerifiedAuthContext } from "@/lib/auth";
import { claimPaidCourseOrdersForUser } from "@/lib/payments/service";

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin || !site) return process.env.NODE_ENV !== "production";
  try {
    return new URL(origin).origin === new URL(site).origin;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  const auth = await getVerifiedAuthContext();
  if (!auth)
    return NextResponse.json(
      { error: "verified_login_required" },
      { status: 401 },
    );
  try {
    const claimed = await claimPaidCourseOrdersForUser(auth.userId);
    return NextResponse.json({
      claimedCount: claimed.filter((item) => item.newly_claimed).length,
      courseSlug: claimed.find((item) => item.course_slug)?.course_slug ?? null,
    });
  } catch {
    return NextResponse.json({ error: "claim_failed" }, { status: 409 });
  }
}
