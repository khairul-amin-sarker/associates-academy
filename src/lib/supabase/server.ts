import "server-only";

import { createServerClient } from "@supabase/ssr";
import { createClient as createBaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";
import { getSupabaseConfig, hasSupabaseConfig } from "./config";

export async function createClient() {
  const cookieStore = await cookies();
  const { url, key } = getSupabaseConfig();
  return createServerClient<Database>(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Components cannot write cookies; src/proxy.ts refreshes them.
        }
      },
    },
  });
}

export function createPublicServerClient() {
  const { url, key } = getSupabaseConfig();
  return createBaseClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createBaseClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export { hasSupabaseConfig };
