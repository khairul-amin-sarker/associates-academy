import { CertificateManagement, type AdminCertificate } from "@/components/admin/certificate-management";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient, createPublicServerClient } from "@/lib/supabase/server";

export const revalidate = 0; // Always fresh in admin console

export default async function AdminCertificatesPage() {
  const context = await requireAdmin();
  const supabase = context.supabase || createAdminClient() || createPublicServerClient();

  let certificates: AdminCertificate[] = [];
  let courseOptions: string[] = [];

  if (supabase) {
    const [{ data: certRows }, { data: productRows }] = await Promise.all([
      supabase
        .from("certificates")
        .select("id, verification_code, student_name, course_name, batch_name, instructor_name, status, issued_at, created_at")
        .order("id", { ascending: false }),
      supabase
        .from("products")
        .select("title")
        .eq("product_type", "course")
        .order("title"),
    ]);

    certificates = (certRows ?? []) as AdminCertificate[];
    courseOptions = (productRows ?? []).map((p) => p.title);
  }

  return (
    <CertificateManagement
      initialCertificates={certificates}
      courseOptions={courseOptions}
    />
  );
}
