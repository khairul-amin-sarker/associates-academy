"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/auth";

const profileSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(20),
  whatsapp_number: z.string().trim().min(8).max(20),
  occupation: z.string().trim().max(100),
  city: z.string().trim().max(100),
});

export async function saveProfile(formData: FormData) {
  const parsed = profileSchema.safeParse({
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    whatsapp_number: formData.get("whatsapp_number"),
    occupation: formData.get("occupation"),
    city: formData.get("city"),
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
