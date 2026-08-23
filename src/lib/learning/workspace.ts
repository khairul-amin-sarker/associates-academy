import "server-only";

import type { requireUser } from "@/lib/auth";
import { calculateProgress } from "@/lib/learning/progress";

type AuthContext = Awaited<ReturnType<typeof requireUser>>;

export type LearningResource = {
  id: number;
  title: string;
  mimeType: string | null;
};
export type CourseResource = LearningResource;
export type CourseCertificate = {
  id: number;
  available: boolean;
};
export type LearningSession = {
  id: number;
  moduleId: number;
  startsAt: string;
  endsAt: string;
  meetUrl: string | null;
  calendarUrl: string | null;
};
export type LearningModule = {
  id: number;
  title: string;
  description: string | null;
  position: number;
  recordingUrl: string | null;
  completed: boolean;
  resources: LearningResource[];
  session: LearningSession | null;
};
export type CourseWorkspace = {
  slug: string;
  title: string;
  enrolled: boolean;
  demo: boolean;
  progress: number;
  completedCount: number;
  moduleCount: number;
  modules: LearningModule[];
  nextSession: LearningSession | null;
  courseResources: CourseResource[];
  certificate: CourseCertificate | null;
};

const demoModules: LearningModule[] = [
  ["আয়কর আইনের ভূমিকা ও মৌলিক কাঠামো", "Role & Basic Structure of Law"],
  ["করযোগ্যতা ও আবাসিক মর্যাদা", "Taxability & Residential Status"],
  ["আয়ের খাতসমূহ ও করযোগ্য আয় পরিগণনা", "Heads of Income & Computation"],
  [
    "মোট আয়, রেয়াত, করহার ও সারচার্জ",
    "Total Income, Rebate, Rates & Surcharge",
  ],
  ["উৎসে কর কর্তন (TDS) ও অগ্রিম কর", "Tax Deduction at Source & Advance Tax"],
  ["রিটার্ন, নিরীক্ষণ, আপিল ও জরিমানা", "Return, Assessment, Appeal & Penalty"],
].map(([title, description], index) => ({
  id: index + 1,
  title,
  description,
  position: index + 1,
  recordingUrl: null,
  completed: index < 2,
  resources: [],
  session: null,
}));

const demoSession: LearningSession = {
  id: 1,
  moduleId: 3,
  startsAt: "2026-08-30T14:00:00.000Z",
  endsAt: "2026-08-30T16:00:00.000Z",
  meetUrl: "https://meet.google.com/preview-demo",
  calendarUrl: "https://calendar.google.com/calendar/u/0/r/eventedit",
};

function demoWorkspace(slug: string): CourseWorkspace | null {
  if (slug !== "income-tax-working-framework") return null;
  const modules = demoModules.map((module) =>
    module.id === demoSession.moduleId
      ? { ...module, session: demoSession }
      : module,
  );
  return {
    slug,
    title: "Fundamentals of Income Tax Act, 2023",
    enrolled: true,
    demo: true,
    progress: calculateProgress(2, modules.length),
    completedCount: 2,
    moduleCount: modules.length,
    modules,
    nextSession: demoSession,
    courseResources: [],
    certificate: null,
  };
}

type CourseRow = {
  id: number;
  product_id: number;
  products: { slug: string; title: string } | null;
};
type EnrollmentRow = { id: number; batch_id: number | null };

export async function getCourseWorkspace(
  context: AuthContext,
  slug: string,
): Promise<CourseWorkspace | null> {
  if (!context.supabase) return demoWorkspace(slug);

  const { data: courseData } = await context.supabase
    .from("courses")
    .select("id,product_id,products!inner(slug,title)")
    .eq("products.slug", slug)
    .maybeSingle();
  const course = courseData as unknown as CourseRow | null;
  if (!course?.products) return null;

  const { data: enrollmentData } = await context.supabase
    .from("enrollments")
    .select("id,batch_id")
    .eq("user_id", context.userId)
    .eq("product_id", course.product_id)
    .eq("status", "active")
    .maybeSingle();
  const enrollment = enrollmentData as EnrollmentRow | null;
  const enrolled = Boolean(enrollment);

  const { data: moduleData } = await context.supabase
    .from("modules")
    .select(
      "id,title,description,position,recording_url,module_resources(id,title,mime_type,is_published)",
    )
    .eq("course_id", course.id)
    .eq("is_published", true)
    .order("position");
  const modules = (moduleData ?? []) as unknown as Array<{
    id: number;
    title: string;
    description: string | null;
    position: number;
    recording_url: string | null;
    module_resources: Array<{
      id: number;
      title: string;
      mime_type: string | null;
      is_published: boolean;
    }> | null;
  }>;

  const moduleIds = modules.map((module) => module.id);
  const [{ data: progressData }, { data: sessionData }, { data: courseResourceData }, { data: certificateData }] = await Promise.all([
    enrolled && moduleIds.length
      ? context.supabase
          .from("module_progress")
          .select("module_id")
          .eq("enrollment_id", enrollment!.id)
      : Promise.resolve({ data: [] as Array<{ module_id: number }> }),
    enrolled && enrollment?.batch_id && moduleIds.length
      ? context.supabase
          .from("class_sessions")
          .select("id,module_id,starts_at,ends_at,meet_url,calendar_url")
          .eq("batch_id", enrollment.batch_id)
          .eq("is_published", true)
          .order("starts_at")
      : Promise.resolve({
          data: [] as Array<{
            id: number;
            module_id: number;
            starts_at: string;
            ends_at: string;
            meet_url: string | null;
            calendar_url: string | null;
          }>,
        }),
    enrolled
      ? context.supabase
          .from("course_resources")
          .select("id,title,mime_type,is_published")
          .eq("course_id", course.id)
          .eq("is_published", true)
          .order("position")
      : Promise.resolve({ data: [] as Array<{ id: number; title: string; mime_type: string | null }> }),
    context.supabase
      .from("certificates")
      .select("id,bucket_id,object_path,status")
      .eq("user_id", context.userId)
      .eq("course_name", course.products.title)
      .maybeSingle(),
  ]);
  const completedIds = new Set(
    (progressData ?? []).map((row) => row.module_id),
  );
  const sessions = (sessionData ?? []).map((session) => ({
    id: session.id,
    moduleId: session.module_id,
    startsAt: session.starts_at,
    endsAt: session.ends_at,
    meetUrl: session.meet_url,
    calendarUrl: session.calendar_url,
  }));
  const now = Date.now();
  const nextSession =
    sessions.find((session) => new Date(session.endsAt).getTime() >= now) ??
    null;

  const mappedModules = modules.map((module) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    position: module.position,
    recordingUrl: enrolled ? module.recording_url : null,
    completed: completedIds.has(module.id),
    resources: enrolled
      ? (module.module_resources ?? [])
          .filter((resource) => resource.is_published)
          .map((resource) => ({
            id: resource.id,
            title: resource.title,
            mimeType: resource.mime_type,
          }))
      : [],
    session: sessions.find((session) => session.moduleId === module.id) ?? null,
  }));
  return {
    slug,
    title: course.products.title,
    enrolled,
    demo: false,
    progress: calculateProgress(completedIds.size, mappedModules.length),
    completedCount: completedIds.size,
    moduleCount: mappedModules.length,
    modules: mappedModules,
    nextSession,
    courseResources: (courseResourceData ?? []).map((resource) => ({
      id: resource.id,
      title: resource.title,
      mimeType: resource.mime_type,
    })),
    certificate: certificateData
      ? { id: certificateData.id, available: Boolean(certificateData.bucket_id && certificateData.object_path) }
      : null,
  };
}

export async function getDashboardWorkspaces(context: AuthContext) {
  if (!context.supabase)
    return [demoWorkspace("income-tax-working-framework")!];
  const { data } = await context.supabase
    .from("enrollments")
    .select("products!inner(slug)")
    .eq("user_id", context.userId)
    .eq("status", "active");
  const slugs = (data ?? [])
    .map((row) => (row.products as unknown as { slug: string } | null)?.slug)
    .filter((slug): slug is string => Boolean(slug));
  return (
    await Promise.all(slugs.map((slug) => getCourseWorkspace(context, slug)))
  ).filter((workspace): workspace is CourseWorkspace => Boolean(workspace));
}
