"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/auth";

const profileSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(20),
});

export async function saveProfile(formData: FormData) {
  const parsed = profileSchema.safeParse({
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
  });
  if (!parsed.success) redirect("/profile?error=invalid-profile");

  const context = await requireUser();
  if (context.supabase) {
    const { error } = await context.supabase
      .from("profiles")
      .update(parsed.data)
      .eq("id", context.userId);
    if (error) redirect("/profile?error=save-failed");
  }
  redirect("/profile?saved=1");
}
