import { z } from "zod";

/**
 * Normalizes a Bangladeshi mobile number into standard 11-digit 01XXXXXXXXX format.
 * Strips whitespace, hyphens, parentheses, and leading country codes (+88 / 88).
 */
export function normalizeBdMobileNumber(input: string): string {
  if (!input) return "";
  let cleaned = input.trim().replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+88")) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith("88") && cleaned.length === 13) {
    cleaned = cleaned.slice(2);
  }
  return cleaned;
}

export function isValidBdMobileNumber(mobile: string): boolean {
  const normalized = normalizeBdMobileNumber(mobile);
  // Standard BD mobile: 11 digits starting with 01[3-9]
  return /^01[3-9]\d{8}$/.test(normalized);
}

export const workshopIntentEnum = z.enum([
  "own-return-do",
  "own-return-understand",
  "tax-profession",
  "accounts-finance-profession",
  "tax-practice-start",
  "other",
]);

export type WorkshopIntent = z.infer<typeof workshopIntentEnum>;

export const workshopRegistrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "আপনার পূর্ণ নাম লিখুন (কমপক্ষে ২ অক্ষর)")
    .max(120, "নাম ১২০ অক্ষরের মধ্যে লিখুন"),
  mobile: z
    .string()
    .trim()
    .min(1, "১১ ডিজিটের মোবাইল নম্বর লিখুন")
    .transform((val) => normalizeBdMobileNumber(val))
    .refine((val) => isValidBdMobileNumber(val), {
      message: "সঠিক বাংলাদেশ মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)",
    }),
  email: z
    .string()
    .trim()
    .min(1, "ইমেইল অ্যাড্রেস লিখুন")
    .email("সঠিক ইমেইল অ্যাড্রেস দিন")
    .max(254, "ইমেইল ২৫৪ অক্ষরের মধ্যে লিখুন")
    .toLowerCase(),
  profession: z
    .string()
    .trim()
    .min(2, "আপনার পেশা বা পদবি লিখুন")
    .max(120, "পেশা/পদবি ১২০ অক্ষরের মধ্যে লিখুন"),
  workshopIntent: workshopIntentEnum,
  // Hidden tracking & attribution metadata
  utmSource: z.string().trim().max(100).optional().default(""),
  utmMedium: z.string().trim().max(100).optional().default(""),
  utmCampaign: z.string().trim().max(100).optional().default(""),
  utmContent: z.string().trim().max(100).optional().default(""),
  utmTerm: z.string().trim().max(100).optional().default(""),
  utmAudience: z.string().trim().max(100).optional().default(""),
  landingPageUrl: z.string().trim().max(500).optional().default(""),
  referrer: z.string().trim().max(500).optional().default(""),
  registeredAt: z.string().trim().max(100).optional(),
  workshopId: z.string().trim().max(100).optional().default("free-return-workshop-2026-08-26"),
  // Honeypot anti-spam
  website: z.string().trim().max(100).optional().default(""),
});

export type WorkshopRegistrationInput = z.input<typeof workshopRegistrationSchema>;
export type WorkshopRegistrationData = z.output<typeof workshopRegistrationSchema>;
