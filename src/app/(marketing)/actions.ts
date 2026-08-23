"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { newsletterSubscriptionSchema } from "@/lib/validation/newsletter";

export type TaxBriefActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialTaxBriefActionState: TaxBriefActionState = {
  status: "idle",
  message: "",
};

export async function subscribeToTaxBrief(
  _previousState: TaxBriefActionState,
  formData: FormData,
): Promise<TaxBriefActionState> {
  const parsed = newsletterSubscriptionSchema.safeParse({
    email: formData.get("email"),
    interests: formData.getAll("interests"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "তথ্যগুলো আবার যাচাই করুন।",
    };
  }

  if (parsed.data.website) {
    return {
      status: "success",
      message: "Associates Tax Brief-এ যুক্ত হওয়ার অনুরোধ গ্রহণ করা হয়েছে।",
    };
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return {
      status: "error",
      message: "Tax Brief registration এখন সাময়িকভাবে অনুপলব্ধ।",
    };
  }

  const now = new Date().toISOString();
  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      email: parsed.data.email,
      interests: parsed.data.interests,
      status: "subscribed",
      source: "homepage_tax_brief",
      subscribed_at: now,
      updated_at: now,
    },
    { onConflict: "email" },
  );

  if (error) {
    console.error("Tax Brief subscription failed", { code: error.code });
    return {
      status: "error",
      message: "এখন নিবন্ধন সম্পন্ন করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।",
    };
  }

  return {
    status: "success",
    message: "আপনি Associates Tax Brief-এ যুক্ত হয়েছেন।",
  };
}
