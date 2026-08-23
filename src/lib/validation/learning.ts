import { z } from "zod";

const httpsUrl = z
  .url()
  .refine((value) => new URL(value).protocol === "https:", {
    message: "Secure HTTPS link দিন",
  });

function googleHost(hostname: string, prefix: string) {
  return hostname === prefix || hostname.endsWith(`.${prefix}`);
}

export const googleMeetUrlSchema = httpsUrl.refine(
  (value) => googleHost(new URL(value).hostname, "meet.google.com"),
  "শুধু Google Meet link ব্যবহার করুন",
);

export const googleCalendarUrlSchema = httpsUrl.refine(
  (value) => googleHost(new URL(value).hostname, "calendar.google.com"),
  "শুধু Google Calendar link ব্যবহার করুন",
);

const optionalTrimmed = z
  .string()
  .trim()
  .max(500)
  .optional()
  .transform((value) => value || null);

export const batchSchema = z.object({
  courseId: z.coerce.number().int().positive(),
  name: z.string().trim().min(2).max(160),
  startsAt: z.string().datetime().optional().or(z.literal("")),
  endsAt: z.string().datetime().optional().or(z.literal("")),
  isPublished: z.boolean(),
});

export const learningModuleSchema = z.object({
  courseId: z.coerce.number().int().positive(),
  title: z.string().trim().min(2).max(200),
  description: optionalTrimmed,
  position: z.coerce.number().int().min(0),
  recordingUrl: optionalTrimmed.pipe(httpsUrl.nullable()),
  isPreview: z.boolean(),
  isPublished: z.boolean(),
});

export const classSessionSchema = z
  .object({
    batchId: z.coerce.number().int().positive(),
    moduleId: z.coerce.number().int().positive(),
    startsAt: z.string().datetime(),
    endsAt: z.string().datetime(),
    meetUrl: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || null)
      .pipe(googleMeetUrlSchema.nullable()),
    calendarUrl: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || null)
      .pipe(googleCalendarUrlSchema.nullable()),
    isPublished: z.boolean(),
  })
  .refine((value) => new Date(value.endsAt) >= new Date(value.startsAt), {
    message: "Class ending time start-এর আগে হতে পারে না",
    path: ["endsAt"],
  });

export const moduleResourceSchema = z.object({
  moduleId: z.coerce.number().int().positive(),
  title: z.string().trim().min(2).max(180),
  bucketId: z.literal("course-files"),
  objectPath: z
    .string()
    .trim()
    .min(3)
    .max(500)
    .regex(/^\d+\/.+/, "Course file path invalid"),
  mimeType: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((value) => value || null),
  position: z.coerce.number().int().min(0),
  isPublished: z.boolean(),
});

export const courseResourceSchema = moduleResourceSchema
  .omit({ moduleId: true })
  .extend({ courseId: z.coerce.number().int().positive() });

export const moduleProgressSchema = z.object({
  enrollmentId: z.coerce.number().int().positive(),
  moduleId: z.coerce.number().int().positive(),
  completed: z.boolean(),
});
