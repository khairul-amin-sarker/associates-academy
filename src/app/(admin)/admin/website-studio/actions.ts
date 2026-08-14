"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { homeContentSchema } from "@/lib/validation/cms";

type ActionResult = { ok: boolean; message: string };

export async function saveHomeDraft(input: unknown): Promise<ActionResult> {
  const parsed = homeContentSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid page content" };
  const context = await requireAdmin();
  if (!context.supabase) return { ok: true, message: "Local preview draft validated" };
  const { error } = await context.supabase.rpc("save_page_draft", { p_slug: "home", p_content: parsed.data });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "Draft saved" };
}

export async function publishHomePage(input: unknown): Promise<ActionResult> {
  const parsed = homeContentSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid page content" };
  const context = await requireAdmin();
  if (!context.supabase) return { ok: true, message: "Local preview publish validated" };
  const { error: draftError } = await context.supabase.rpc("save_page_draft", { p_slug: "home", p_content: parsed.data });
  if (draftError) return { ok: false, message: draftError.message };
  const { error } = await context.supabase.rpc("publish_page", { p_slug: "home", p_request_id: crypto.randomUUID() });
  if (error) return { ok: false, message: error.message };
  revalidateTag("page:home", "max");
  revalidatePath("/");
  return { ok: true, message: "Page published live—no deployment needed" };
}

export async function rollbackHomePage(revisionId: string): Promise<ActionResult> {
  const context = await requireAdmin();
  if (!context.supabase) return { ok: true, message: "Local rollback preview complete" };
  const { error } = await context.supabase.rpc("rollback_page_revision", { p_revision_id: revisionId, p_request_id: crypto.randomUUID() });
  if (error) return { ok: false, message: error.message };
  revalidateTag("page:home", "max");
  revalidatePath("/");
  return { ok: true, message: "Previous revision restored" };
}
