import { z } from "zod";

export const homeContentSchema = z.object({
  eyebrow: z.string().trim().min(3).max(100),
  title: z.string().trim().min(15).max(180),
  description: z.string().trim().min(30).max(500),
  primaryCta: z.string().trim().min(2).max(40),
  secondaryCta: z.string().trim().min(2).max(40),
  founderName: z.string().trim().min(2).max(100),
  founderTitle: z.string().trim().min(5).max(140),
  founderBio: z.string().trim().min(20).max(600),
});

export type HomeContentInput = z.infer<typeof homeContentSchema>;
