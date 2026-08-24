"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function issueCertificate(formData: FormData) {
  const context = await requireAdmin();
  if (!context.supabase) return { error: "Database not connected" };

  const verificationCode = String(formData.get("verification_code") || "").trim().toUpperCase();
  const studentName = String(formData.get("student_name") || "").trim();
  const courseName = String(formData.get("course_name") || "").trim();
  const batchName = String(formData.get("batch_name") || "").trim() || "Batch 1";
  const instructorName = String(formData.get("instructor_name") || "").trim() || "Mohammad Khairul Amin Sarker";
  const issuedAt = String(formData.get("issued_at") || "").trim() || new Date().toISOString().slice(0, 10);
  const status = String(formData.get("status") || "valid").trim();

  if (!verificationCode || !studentName || !courseName) {
    return { error: "Verification code, student name, and course name are required." };
  }

  const { error } = await context.supabase.from("certificates").insert({
    verification_code: verificationCode,
    student_name: studentName,
    course_name: courseName,
    batch_name: batchName,
    instructor_name: instructorName,
    issued_at: issuedAt,
    status: status,
  });

  if (error) {
    return { error: error.message || "Failed to issue certificate." };
  }

  revalidatePath("/admin/certificates");
  revalidatePath("/verify");
  return { success: true };
}

export async function toggleCertificateStatus(id: number, currentStatus: string) {
  const context = await requireAdmin();
  if (!context.supabase) return { error: "Database not connected" };

  const newStatus = currentStatus === "valid" ? "revoked" : "valid";
  const { error } = await context.supabase
    .from("certificates")
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return { error: error.message || "Failed to update certificate status." };
  }

  revalidatePath("/admin/certificates");
  revalidatePath("/verify");
  return { success: true, newStatus };
}
