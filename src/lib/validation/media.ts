import { z } from "zod";

export const allowedMedia = {
  "cms-public": { max: 10 * 1024 * 1024, mimes: ["image/jpeg", "image/png", "image/webp", "image/avif"] },
  "course-files": { max: 50 * 1024 * 1024, mimes: ["application/pdf", "application/zip", "image/jpeg", "image/png"] },
  ebooks: { max: 50 * 1024 * 1024, mimes: ["application/pdf"] },
  certificates: { max: 10 * 1024 * 1024, mimes: ["application/pdf", "image/png", "image/jpeg"] },
} as const;

export const signedUploadSchema = z.object({ bucket: z.enum(["cms-public", "course-files", "ebooks", "certificates"]), originalName: z.string().min(1).max(180), mimeType: z.string().max(100), sizeBytes: z.number().int().positive(), scopeId: z.string().regex(/^\d+$/).optional() });
