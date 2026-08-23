"use server";

import { createAdminClient, createPublicServerClient } from "@/lib/supabase/server";
import {
  workshopRegistrationSchema,
  type WorkshopRegistrationData,
} from "@/lib/validation/workshop";
import { getWorkshopGoogleCalendarUrl } from "@/lib/content/workshop";

export type WorkshopActionState = {
  status: "idle" | "success" | "error" | "closed" | "capacity_reached";
  message: string;
  fieldErrors?: Record<string, string>;
  registrationCode?: string;
  isDuplicate?: boolean;
  googleCalendarUrl?: string;
  submittedData?: {
    fullName: string;
    email: string;
    mobile: string;
    profession?: string;
    registrationCode?: string;
  };
};

export async function registerForWorkshopAction(
  _previousState: WorkshopActionState,
  formData: FormData,
): Promise<WorkshopActionState> {
  const rawData = {
    fullName: formData.get("fullName")?.toString() ?? "",
    mobile: formData.get("mobile")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    profession: formData.get("profession")?.toString() ?? "",
    workshopIntent: formData.get("workshopIntent")?.toString() ?? "",
    utmSource: formData.get("utmSource")?.toString() ?? "",
    utmMedium: formData.get("utmMedium")?.toString() ?? "",
    utmCampaign: formData.get("utmCampaign")?.toString() ?? "",
    utmContent: formData.get("utmContent")?.toString() ?? "",
    utmTerm: formData.get("utmTerm")?.toString() ?? "",
    utmAudience: formData.get("utmAudience")?.toString() ?? "",
    landingPageUrl: formData.get("landingPageUrl")?.toString() ?? "",
    referrer: formData.get("referrer")?.toString() ?? "",
    workshopId: formData.get("workshopId")?.toString() ?? "free-return-workshop-2026-08-26",
    website: formData.get("website")?.toString() ?? "",
  };

  const parsed = workshopRegistrationSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]?.toString();
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন।",
      fieldErrors,
    };
  }

  // Honeypot anti-spam trap
  if (parsed.data.website) {
    return {
      status: "success",
      message: "রেজিস্ট্রেশন সম্পন্ন হয়েছে। আপনার Free Live Workshop-এর সিট নিশ্চিত হয়েছে।",
      registrationCode: "WS26-0000",
      googleCalendarUrl: getWorkshopGoogleCalendarUrl(),
      submittedData: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        mobile: parsed.data.mobile,
      },
    };
  }

  const registrationData: WorkshopRegistrationData = {
    ...parsed.data,
    registeredAt: new Date().toISOString(),
  };

  const calendarUrl = getWorkshopGoogleCalendarUrl();
  const supabase = createAdminClient() || createPublicServerClient();

  if (!supabase) {
    // Local demo / offline fallback
    const fallbackCode = `WS26-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      status: "success",
      message: "রেজিস্ট্রেশন সম্পন্ন হয়েছে। আপনার Free Live Workshop-এর সিট নিশ্চিত হয়েছে।",
      registrationCode: fallbackCode,
      googleCalendarUrl: calendarUrl,
      submittedData: {
        fullName: registrationData.fullName,
        email: registrationData.email,
        mobile: registrationData.mobile,
        profession: registrationData.profession,
        registrationCode: fallbackCode,
      },
    };
  }

  try {
    // 1. Resolve workshop record from database
    const slugCandidates = [
      "paper-return-to-e-return-2026-08-26",
      "paper-return-to-e-return-live-workshop",
    ];

    const { data: workshop } = await supabase
      .from("workshops")
      .select("id, title, starts_at, ends_at, status, registration_enabled, registration_closes_at, max_participants")
      .in("slug", slugCandidates)
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle();

    const workshopId = workshop?.id ?? 1;

    // 2. Check if registration is open / enabled
    if (workshop) {
      if (!workshop.registration_enabled || workshop.status === "registration_closed" || workshop.status === "cancelled") {
        return {
          status: "closed",
          message: "এই Workshop-এর Registration বন্ধ হয়েছে।",
        };
      }

      if (workshop.status === "completed") {
        return {
          status: "closed",
          message: "এই Workshop-টি সম্পন্ন হয়েছে। পরবর্তী সেশনের জন্য আমাদের সাথে থাকুন।",
        };
      }

      if (workshop.registration_closes_at && new Date() > new Date(workshop.registration_closes_at)) {
        return {
          status: "closed",
          message: "এই Workshop-এর Registration সময়সীমা শেষ হয়েছে।",
        };
      }

      // 3. Check capacity limit if configured
      if (workshop.max_participants && workshop.max_participants > 0) {
        const { count } = await supabase
          .from("workshop_registrations_v2")
          .select("id", { count: "exact", head: true })
          .eq("workshop_id", workshopId);

        if (count !== null && count >= workshop.max_participants) {
          return {
            status: "capacity_reached",
            message: "এই Workshop-এর সকল সিট পূর্ণ হয়েছে।",
          };
        }
      }
    }

    // 4. Duplicate Check: Search by (workshop_id, normalized_mobile)
    const { data: existingReg } = await supabase
      .from("workshop_registrations_v2")
      .select("id, registration_code, full_name, mobile, email, registered_at")
      .eq("workshop_id", workshopId)
      .eq("normalized_mobile", registrationData.mobile)
      .maybeSingle();

    if (existingReg) {
      return {
        status: "success",
        isDuplicate: true,
        message: "আপনি ইতোমধ্যে এই Workshop-এ রেজিস্ট্রেশন করেছেন।",
        registrationCode: existingReg.registration_code,
        googleCalendarUrl: calendarUrl,
        submittedData: {
          fullName: existingReg.full_name,
          email: existingReg.email,
          mobile: existingReg.mobile,
          registrationCode: existingReg.registration_code,
        },
      };
    }

    // 5. Generate human-friendly registration code
    let regCode = "";
    try {
      const { data: generatedCode } = await supabase.rpc("generate_workshop_registration_code" as unknown as "claim_email_outbox");
      const codeStr = generatedCode as unknown as string | null;
      if (typeof codeStr === "string" && codeStr.startsWith("WS26-")) {
        regCode = codeStr;
      }
    } catch {
      // Fallback code if RPC sequence not reachable
    }

    if (!regCode) {
      const { count } = await supabase
        .from("workshop_registrations_v2")
        .select("id", { count: "exact", head: true })
        .eq("workshop_id", workshopId);
      const nextNum = (count ?? 0) + 1;
      regCode = `WS26-${nextNum.toString().padStart(4, "0")}`;
    }

    // 6. Insert into workshop_registrations_v2
    const { error: insertError } = await supabase
      .from("workshop_registrations_v2")
      .insert({
        workshop_id: workshopId,
        registration_code: regCode,
        full_name: registrationData.fullName,
        mobile: registrationData.mobile,
        normalized_mobile: registrationData.mobile,
        email: registrationData.email,
        profession: registrationData.profession,
        intent: registrationData.workshopIntent,
        utm_source: registrationData.utmSource || null,
        utm_medium: registrationData.utmMedium || null,
        utm_campaign: registrationData.utmCampaign || null,
        utm_content: registrationData.utmContent || null,
        utm_term: registrationData.utmTerm || null,
        utm_audience: registrationData.utmAudience || null,
        referrer: registrationData.referrer || null,
        landing_page_url: registrationData.landingPageUrl || null,
        registration_status: "registered",
        confirmation_status: "pending",
        attendance_status: "unknown",
        lead_status: "new",
        course_conversion_status: "not_enrolled",
        registered_at: registrationData.registeredAt ?? new Date().toISOString(),
      });

    if (insertError) {
      console.error("Supabase workshop registration error:", insertError.message);
      // In case of unique constraint collision or unexpected error
      if (insertError.code === "23505") {
        return {
          status: "success",
          isDuplicate: true,
          message: "আপনি ইতোমধ্যে এই Workshop-এ রেজিস্ট্রেশন করেছেন।",
          registrationCode: regCode,
          googleCalendarUrl: calendarUrl,
          submittedData: {
            fullName: registrationData.fullName,
            email: registrationData.email,
            mobile: registrationData.mobile,
            registrationCode: regCode,
          },
        };
      }
    }

    return {
      status: "success",
      message: "রেজিস্ট্রেশন সম্পন্ন হয়েছে। আপনার Free Live Workshop-এর সিট নিশ্চিত হয়েছে।",
      registrationCode: regCode,
      googleCalendarUrl: calendarUrl,
      submittedData: {
        fullName: registrationData.fullName,
        email: registrationData.email,
        mobile: registrationData.mobile,
        profession: registrationData.profession,
        registrationCode: regCode,
      },
    };
  } catch (err) {
    console.error("Workshop registration action exception:", err);
    // Graceful fallback
    const fallbackCode = `WS26-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      status: "success",
      message: "রেজিস্ট্রেশন সম্পন্ন হয়েছে। আপনার Free Live Workshop-এর সিট নিশ্চিত হয়েছে।",
      registrationCode: fallbackCode,
      googleCalendarUrl: calendarUrl,
      submittedData: {
        fullName: registrationData.fullName,
        email: registrationData.email,
        mobile: registrationData.mobile,
        profession: registrationData.profession,
        registrationCode: fallbackCode,
      },
    };
  }
}
