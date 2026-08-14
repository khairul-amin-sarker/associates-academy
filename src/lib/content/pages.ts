import "server-only";

import { unstable_cache } from "next/cache";
import { defaultHomeContent, type HomePageContent } from "./defaults";
import { createPublicServerClient, hasSupabaseConfig } from "@/lib/supabase/server";

async function loadHomeContent(): Promise<HomePageContent> {
  if (!hasSupabaseConfig()) return defaultHomeContent;
  const supabase = createPublicServerClient();
  const { data, error } = await supabase.from("pages").select("published_content").eq("slug", "home").eq("status", "published").maybeSingle();
  if (error || !data?.published_content) return defaultHomeContent;
  return { ...defaultHomeContent, ...(data.published_content as Partial<HomePageContent>) };
}

export const getHomeContent = unstable_cache(loadHomeContent, ["home-page-content"], { tags: ["page:home"], revalidate: 3600 });
