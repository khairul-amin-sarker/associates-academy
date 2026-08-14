import { WebsiteStudioForm } from "@/components/admin/website-studio-form";
import { Badge } from "@/components/ui/badge";
import { defaultHomeContent } from "@/lib/content/defaults";
import { requireAdmin } from "@/lib/auth";

export default async function WebsiteStudioPage() {
  const context = await requireAdmin();
  let initial = defaultHomeContent;
  if (context.supabase) {
    const { data } = await context.supabase.from("pages").select("draft_content,published_content").eq("slug", "home").maybeSingle();
    initial = { ...initial, ...((data?.draft_content ?? data?.published_content ?? {}) as Partial<typeof initial>) };
  }
  return <div><Badge variant="outline">STRUCTURED CMS</Badge><h1 className="font-heading mt-3 text-4xl font-extrabold">Website Studio</h1><p className="mt-2 text-muted-foreground">Text, CTA, SEO, media এবং section content safely update করুন—redeploy ছাড়া।</p><div className="mt-6"><WebsiteStudioForm initial={initial} /></div></div>;
}
