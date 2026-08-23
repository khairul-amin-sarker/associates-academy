"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  batchSchema,
  classSessionSchema,
  courseResourceSchema,
  learningModuleSchema,
  moduleProgressSchema,
  moduleResourceSchema,
} from "@/lib/validation/learning";

function checked(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function input(formData: FormData, key: string) {
  return typeof formData.get(key) === "string" ? String(formData.get(key)) : "";
}

function refreshLearningViews() {
  revalidatePath("/admin/courses");
  revalidatePath("/admin/students");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/courses/[slug]", "page");
}

export async function saveBatch(formData: FormData) {
  const parsed = batchSchema.safeParse({
    courseId: input(formData, "courseId"),
    name: input(formData, "name"),
    startsAt: input(formData, "startsAt")
      ? new Date(input(formData, "startsAt")).toISOString()
      : "",
    endsAt: input(formData, "endsAt")
      ? new Date(input(formData, "endsAt")).toISOString()
      : "",
    isPublished: checked(formData, "isPublished"),
  });
  if (!parsed.success) return;
  const context = await requireAdmin();
  if (!context.supabase) return;
  const id = input(formData, "id");
  const values = {
    course_id: parsed.data.courseId,
    name: parsed.data.name,
    starts_at: parsed.data.startsAt || null,
    ends_at: parsed.data.endsAt || null,
    is_published: parsed.data.isPublished,
  };
  if (/^\d+$/.test(id))
    await context.supabase.from("batches").update(values).eq("id", Number(id));
  else await context.supabase.from("batches").insert(values);
  refreshLearningViews();
}

export async function saveLearningModule(formData: FormData) {
  const parsed = learningModuleSchema.safeParse({
    courseId: input(formData, "courseId"),
    title: input(formData, "title"),
    description: input(formData, "description"),
    position: input(formData, "position"),
    recordingUrl: input(formData, "recordingUrl"),
    isPreview: checked(formData, "isPreview"),
    isPublished: checked(formData, "isPublished"),
  });
  if (!parsed.success) return;
  const context = await requireAdmin();
  if (!context.supabase) return;
  const id = input(formData, "id");
  const values = {
    course_id: parsed.data.courseId,
    title: parsed.data.title,
    description: parsed.data.description,
    position: parsed.data.position,
    recording_url: parsed.data.recordingUrl,
    is_preview: parsed.data.isPreview,
    is_published: parsed.data.isPublished,
  };
  if (/^\d+$/.test(id))
    await context.supabase.from("modules").update(values).eq("id", Number(id));
  else await context.supabase.from("modules").insert(values);
  refreshLearningViews();
}

export async function saveClassSession(formData: FormData) {
  const parsed = classSessionSchema.safeParse({
    batchId: input(formData, "batchId"),
    moduleId: input(formData, "moduleId"),
    startsAt: input(formData, "startsAt")
      ? new Date(input(formData, "startsAt")).toISOString()
      : "",
    endsAt: input(formData, "endsAt")
      ? new Date(input(formData, "endsAt")).toISOString()
      : "",
    meetUrl: input(formData, "meetUrl"),
    calendarUrl: input(formData, "calendarUrl"),
    isPublished: checked(formData, "isPublished"),
  });
  if (!parsed.success) return;
  const context = await requireAdmin();
  if (!context.supabase) return;
  const { data: batch } = await context.supabase
    .from("batches")
    .select("course_id")
    .eq("id", parsed.data.batchId)
    .maybeSingle();
  const { data: module } = await context.supabase
    .from("modules")
    .select("course_id")
    .eq("id", parsed.data.moduleId)
    .maybeSingle();
  if (!batch || !module || batch.course_id !== module.course_id) return;
  const id = input(formData, "id");
  const values = {
    batch_id: parsed.data.batchId,
    module_id: parsed.data.moduleId,
    starts_at: parsed.data.startsAt,
    ends_at: parsed.data.endsAt,
    meet_url: parsed.data.meetUrl,
    calendar_url: parsed.data.calendarUrl,
    is_published: parsed.data.isPublished,
  };
  if (/^\d+$/.test(id))
    await context.supabase
      .from("class_sessions")
      .update(values)
      .eq("id", Number(id));
  else await context.supabase.from("class_sessions").insert(values);
  refreshLearningViews();
}

export async function saveModuleResource(formData: FormData) {
  const parsed = moduleResourceSchema.safeParse({
    moduleId: input(formData, "moduleId"),
    title: input(formData, "title"),
    bucketId: "course-files",
    objectPath: input(formData, "objectPath"),
    mimeType: input(formData, "mimeType"),
    position: input(formData, "position"),
    isPublished: checked(formData, "isPublished"),
  });
  if (!parsed.success) return;
  const context = await requireAdmin();
  if (!context.supabase) return;
  const id = input(formData, "id");
  const values = {
    module_id: parsed.data.moduleId,
    title: parsed.data.title,
    bucket_id: parsed.data.bucketId,
    object_path: parsed.data.objectPath,
    mime_type: parsed.data.mimeType,
    position: parsed.data.position,
    is_published: parsed.data.isPublished,
  };
  if (/^\d+$/.test(id))
    await context.supabase
      .from("module_resources")
      .update(values)
      .eq("id", Number(id));
  else await context.supabase.from("module_resources").insert(values);
  refreshLearningViews();
}

export async function saveCourseResource(formData: FormData) {
  const parsed = courseResourceSchema.safeParse({
    courseId: input(formData, "courseId"), title: input(formData, "title"),
    bucketId: "course-files", objectPath: input(formData, "objectPath"),
    mimeType: input(formData, "mimeType"), position: input(formData, "position"),
    isPublished: checked(formData, "isPublished"),
  });
  if (!parsed.success) return;
  const context = await requireAdmin();
  if (!context.supabase) return;
  const id = input(formData, "id");
  const values = { course_id: parsed.data.courseId, title: parsed.data.title, bucket_id: parsed.data.bucketId, object_path: parsed.data.objectPath, mime_type: parsed.data.mimeType, position: parsed.data.position, is_published: parsed.data.isPublished };
  if (/^\d+$/.test(id)) await context.supabase.from("course_resources").update(values).eq("id", Number(id));
  else await context.supabase.from("course_resources").insert(values);
  refreshLearningViews();
}

export async function setModuleProgress(formData: FormData) {
  const parsed = moduleProgressSchema.safeParse({
    enrollmentId: input(formData, "enrollmentId"),
    moduleId: input(formData, "moduleId"),
    completed: input(formData, "completed") === "true",
  });
  if (!parsed.success) return;
  const context = await requireAdmin();
  if (!context.supabase) return;
  if (parsed.data.completed)
    await context.supabase
      .from("module_progress")
      .upsert(
        {
          enrollment_id: parsed.data.enrollmentId,
          module_id: parsed.data.moduleId,
          marked_by: context.userId,
        },
        { onConflict: "enrollment_id,module_id" },
      );
  else
    await context.supabase
      .from("module_progress")
      .delete()
      .eq("enrollment_id", parsed.data.enrollmentId)
      .eq("module_id", parsed.data.moduleId);
  refreshLearningViews();
}
