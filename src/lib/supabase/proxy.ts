import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";
import { getSupabaseConfig, hasSupabaseConfig } from "./config";

export async function updateSession(request: NextRequest) {
  if (!hasSupabaseConfig()) return NextResponse.next({ request });
  let response = NextResponse.next({ request });
  const { url, key } = getSupabaseConfig();
  const supabase = createServerClient<Database>(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        Object.entries(headers ?? {}).forEach(([header, value]) =>
          response.headers.set(header, value),
        );
      },
    },
  });
  await supabase.auth.getClaims();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
