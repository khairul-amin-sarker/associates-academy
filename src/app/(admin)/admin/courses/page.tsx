import {
  LearningManagement,
  type AdminBatch,
  type AdminCourse,
  type AdminEnrollment,
  type AdminModule,
  type AdminResource,
  type AdminSession,
} from "@/components/admin/learning-management";
import { requireAdmin } from "@/lib/auth";

export default async function AdminCoursesPage({
  studentFocus = false,
}: {
  studentFocus?: boolean;
}) {
  const context = await requireAdmin();
  if (!context.supabase) {
    return (
      <LearningManagement
        demo
        studentFocus={studentFocus}
        courses={[
          {
            id: 1,
            productId: 1,
            title: "Fundamentals of Income Tax Act, 2023",
            slug: "income-tax-working-framework",
          },
        ]}
        batches={[]}
        modules={[]}
        sessions={[]}
        resources={[]}
        enrollments={[]}
      />
    );
  }
  const [
    { data: courseRows },
    { data: batchRows },
    { data: moduleRows },
    { data: sessionRows },
    { data: resourceRows },
    { data: enrollmentRows },
    { data: progressRows },
  ] = await Promise.all([
    context.supabase
      .from("courses")
      .select("id,product_id,products!inner(slug,title)")
      .order("id"),
    context.supabase
      .from("batches")
      .select("id,course_id,name,starts_at,ends_at,is_published")
      .order("starts_at"),
    context.supabase
      .from("modules")
      .select(
        "id,course_id,title,description,position,recording_url,is_preview,is_published,courses!inner(product_id)",
      )
      .order("position"),
    context.supabase
      .from("class_sessions")
      .select(
        "id,batch_id,module_id,starts_at,ends_at,meet_url,calendar_url,is_published",
      )
      .order("starts_at"),
    context.supabase
      .from("module_resources")
      .select("id,module_id,title,object_path,mime_type,position,is_published")
      .order("position"),
    context.supabase
      .from("enrollments")
      .select("id,product_id,profiles(full_name)")
      .eq("status", "active")
      .order("created_at", { ascending: false }),
    context.supabase.from("module_progress").select("enrollment_id,module_id"),
  ]);
  const courses: AdminCourse[] = (courseRows ?? []).map((row) => {
    const product = row.products as unknown as { slug: string; title: string };
    return {
      id: row.id,
      productId: row.product_id,
      title: product.title,
      slug: product.slug,
    };
  });
  const batches: AdminBatch[] = (batchRows ?? []).map((row) => ({
    id: row.id,
    courseId: row.course_id,
    name: row.name,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    published: row.is_published,
  }));
  const modules: AdminModule[] = (moduleRows ?? []).map((row) => ({
    id: row.id,
    courseId: row.course_id,
    productId: (row.courses as unknown as { product_id: number }).product_id,
    title: row.title,
    description: row.description,
    position: row.position,
    recordingUrl: row.recording_url,
    preview: row.is_preview,
    published: row.is_published,
  }));
  const sessions: AdminSession[] = (sessionRows ?? []).map((row) => ({
    id: row.id,
    batchId: row.batch_id,
    moduleId: row.module_id,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    meetUrl: row.meet_url,
    calendarUrl: row.calendar_url,
    published: row.is_published,
  }));
  const resources: AdminResource[] = (resourceRows ?? []).map((row) => ({
    id: row.id,
    moduleId: row.module_id,
    title: row.title,
    path: row.object_path,
    mimeType: row.mime_type,
    position: row.position,
    published: row.is_published,
  }));
  const courseByProduct = new Map(
    courses.map((course) => [course.productId, course.id]),
  );
  const progressByEnrollment = new Map<number, number[]>();
  for (const row of progressRows ?? [])
    progressByEnrollment.set(row.enrollment_id, [
      ...(progressByEnrollment.get(row.enrollment_id) ?? []),
      row.module_id,
    ]);
  const enrollments: AdminEnrollment[] = (enrollmentRows ?? []).map((row) => ({
    id: row.id,
    learner:
      (row.profiles as unknown as { full_name: string | null } | null)
        ?.full_name ?? "Verified learner",
    courseId: courseByProduct.get(row.product_id) ?? 0,
    moduleIds: progressByEnrollment.get(row.id) ?? [],
  }));
  return (
    <LearningManagement
      studentFocus={studentFocus}
      courses={courses}
      batches={batches}
      modules={modules}
      sessions={sessions}
      resources={resources}
      enrollments={enrollments}
    />
  );
}
