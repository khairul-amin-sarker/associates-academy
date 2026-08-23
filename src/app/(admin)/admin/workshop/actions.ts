"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient, createPublicServerClient } from "@/lib/supabase/server";

export type AdminActionResult = {
  success: boolean;
  message: string;
};

export async function updateAttendanceAction(
  registrationId: number,
  status: "unknown" | "attended" | "absent",
): Promise<AdminActionResult> {
  const context = await requireAdmin();
  const supabase = createAdminClient() || context.supabase || createPublicServerClient();

  if (!supabase) {
    return { success: true, message: "Attendance updated (Local demo mode)" };
  }

  const attendedAt = status === "attended" ? new Date().toISOString() : null;

  const { error } = await supabase
    .from("workshop_registrations_v2")
    .update({
      attendance_status: status,
      attended_at: attendedAt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", registrationId);

  if (error) {
    return { success: false, message: `Failed to update attendance: ${error.message}` };
  }

  revalidatePath("/admin/workshop");
  revalidatePath(`/admin/workshop/[id]`, "page");
  return { success: true, message: "Attendance status updated successfully." };
}

export async function updateLeadStatusAction(
  registrationId: number,
  status: "new" | "interested" | "follow_up" | "converted",
): Promise<AdminActionResult> {
  const context = await requireAdmin();
  const supabase = createAdminClient() || context.supabase || createPublicServerClient();

  if (!supabase) {
    return { success: true, message: "Lead status updated (Local demo mode)" };
  }

  const { error } = await supabase
    .from("workshop_registrations_v2")
    .update({
      lead_status: status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", registrationId);

  if (error) {
    return { success: false, message: `Failed to update lead status: ${error.message}` };
  }

  revalidatePath("/admin/workshop");
  revalidatePath(`/admin/workshop/[id]`, "page");
  return { success: true, message: "Lead status updated." };
}

export async function updateCourseStatusAction(
  registrationId: number,
  status: "not_enrolled" | "interested" | "enrolled",
): Promise<AdminActionResult> {
  const context = await requireAdmin();
  const supabase = createAdminClient() || context.supabase || createPublicServerClient();

  if (!supabase) {
    return { success: true, message: "Course status updated (Local demo mode)" };
  }

  const convertedAt = status === "enrolled" ? new Date().toISOString() : null;

  const { error } = await supabase
    .from("workshop_registrations_v2")
    .update({
      course_conversion_status: status,
      converted_at: convertedAt,
      lead_status: status === "enrolled" ? "converted" : undefined,
      updated_at: new Date().toISOString(),
    })
    .eq("id", registrationId);

  if (error) {
    return { success: false, message: `Failed to update course conversion status: ${error.message}` };
  }

  revalidatePath("/admin/workshop");
  revalidatePath(`/admin/workshop/[id]`, "page");
  return { success: true, message: "Course conversion status updated." };
}

export async function bulkUpdateAttendanceAction(
  registrationIds: number[],
  status: "unknown" | "attended" | "absent",
): Promise<AdminActionResult> {
  const context = await requireAdmin();
  if (!registrationIds.length) {
    return { success: false, message: "No participants selected." };
  }

  const supabase = createAdminClient() || context.supabase || createPublicServerClient();

  if (!supabase) {
    return { success: true, message: `Updated ${registrationIds.length} participants (Local demo mode)` };
  }

  const attendedAt = status === "attended" ? new Date().toISOString() : null;

  const { error } = await supabase
    .from("workshop_registrations_v2")
    .update({
      attendance_status: status,
      attended_at: attendedAt,
      updated_at: new Date().toISOString(),
    })
    .in("id", registrationIds);

  if (error) {
    return { success: false, message: `Bulk update failed: ${error.message}` };
  }

  revalidatePath("/admin/workshop");
  revalidatePath(`/admin/workshop/[id]`, "page");
  return { success: true, message: `Successfully updated attendance for ${registrationIds.length} participant(s).` };
}

export async function toggleWorkshopRegistrationAction(
  workshopId: number,
  enabled: boolean,
): Promise<AdminActionResult> {
  const context = await requireAdmin();
  const supabase = createAdminClient() || context.supabase || createPublicServerClient();

  if (!supabase) {
    return { success: true, message: `Registration ${enabled ? "opened" : "closed"} (Local demo mode)` };
  }

  const { error } = await supabase
    .from("workshops")
    .update({
      registration_enabled: enabled,
      status: enabled ? "registration_open" : "registration_closed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", workshopId);

  if (error) {
    return { success: false, message: `Failed to toggle registration: ${error.message}` };
  }

  revalidatePath("/admin/workshop");
  revalidatePath(`/admin/workshop/[id]`, "page");
  revalidatePath("/workshop");
  return { success: true, message: `Registration is now ${enabled ? "Open" : "Closed"}.` };
}

export async function updateWorkshopSettingsAction(
  workshopId: number,
  formData: FormData,
): Promise<AdminActionResult> {
  const context = await requireAdmin();

  const title = formData.get("title")?.toString().trim() || "";
  const shortTitle = formData.get("shortTitle")?.toString().trim() || null;
  const description = formData.get("description")?.toString().trim() || null;
  const platform = formData.get("platform")?.toString().trim() || "Google Meet";
  const meetUrl = formData.get("meetUrl")?.toString().trim() || null;
  const status = (formData.get("status")?.toString() || "registration_open") as "draft" | "registration_open" | "registration_closed" | "live" | "completed" | "cancelled";
  const registrationEnabled = formData.get("registrationEnabled") === "true";
  const startsAt = formData.get("startsAt")?.toString() || null;
  const endsAt = formData.get("endsAt")?.toString() || null;
  const maxParticipants = formData.get("maxParticipants") ? Number(formData.get("maxParticipants")) : null;
  const courseCtaUrl = formData.get("courseCtaUrl")?.toString().trim() || null;

  if (!title) {
    return { success: false, message: "Workshop title is required." };
  }

  const supabase = createAdminClient() || context.supabase || createPublicServerClient();

  if (!supabase) {
    return { success: true, message: "Workshop settings updated (Local demo mode)" };
  }

  const { error } = await supabase
    .from("workshops")
    .update({
      title,
      short_title: shortTitle,
      description,
      platform,
      meet_url: meetUrl,
      status,
      registration_enabled: registrationEnabled,
      starts_at: startsAt ? new Date(startsAt).toISOString() : null,
      ends_at: endsAt ? new Date(endsAt).toISOString() : null,
      max_participants: maxParticipants && maxParticipants > 0 ? maxParticipants : null,
      course_cta_url: courseCtaUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", workshopId);

  if (error) {
    return { success: false, message: `Failed to update settings: ${error.message}` };
  }

  revalidatePath("/admin/workshop");
  revalidatePath(`/admin/workshop/[id]`, "page");
  revalidatePath("/workshop");
  return { success: true, message: "Workshop settings saved successfully." };
}
