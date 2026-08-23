import { z } from "zod";

export const newsletterInterests = [
  "income-tax",
  "vat",
  "corporate-compliance",
  "courses-workshops",
] as const;

export const newsletterSubscriptionSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("সঠিক email address লিখুন").max(320)),
  interests: z
    .array(z.enum(newsletterInterests))
    .min(1, "কমপক্ষে একটি interest নির্বাচন করুন")
    .max(newsletterInterests.length)
    .transform((values) => [...new Set(values)]),
  website: z.string().max(200).optional(),
});

export type NewsletterSubscriptionInput = z.infer<
  typeof newsletterSubscriptionSchema
>;
