import { z } from "zod";

const phone = z.string().trim().min(8).max(20);

const paymentCustomerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  phone,
  // The legacy eBook checkout predates the course enrollment fields. Keep its
  // established three-field contract working while the course form requires
  // this value through the stricter schema below.
  whatsappNumber: phone.optional(),
  occupation: z.string().trim().max(100).optional(),
  city: z.string().trim().max(100).optional(),
});

export const checkoutCustomerSchema = paymentCustomerSchema.extend({
  whatsappNumber: phone,
  occupation: z.string().trim().min(1).max(100),
  city: z.string().trim().min(1).max(100),
});

export const checkoutRequestSchema = z.object({
  productSlug: z.string().trim().min(2).max(100),
  couponCode: z.string().trim().max(40).optional(),
  customer: paymentCustomerSchema,
});

export const guestCourseCheckoutRequestSchema = z.object({
  productSlug: z.string().trim().min(2).max(100),
  checkoutRequestId: z.uuid(),
  couponCode: z.string().trim().max(40).optional(),
  customer: checkoutCustomerSchema,
});

export const checkoutQuoteSchema = z.object({
  productSlug: z.string().trim().min(2).max(100),
  couponCode: z.string().trim().min(1).max(40),
  email: z.email().optional(),
});

export const couponSchema = z
  .object({
    id: z.coerce.number().int().positive().optional(),
    productId: z.coerce.number().int().positive(),
    code: z
      .string()
      .trim()
      .min(3)
      .max(40)
      .regex(/^[A-Z0-9_-]+$/, "কুপন code-এ A–Z, 0–9, _ ও - ব্যবহার করুন"),
    discountType: z.enum(["fixed", "percent"]),
    discountValue: z.coerce.number().positive(),
    maxRedemptions: z.coerce.number().int().positive().nullable(),
    maxRedemptionsPerUser: z.coerce.number().int().positive(),
    startsAt: z.string().datetime().nullable(),
    endsAt: z.string().datetime().nullable(),
    isActive: z.boolean(),
  })
  .superRefine((value, context) => {
    if (value.discountType === "percent" && value.discountValue > 100) {
      context.addIssue({
        code: "custom",
        path: ["discountValue"],
        message: "Percent discount 100-এর বেশি হতে পারে না",
      });
    }
    if (value.startsAt && value.endsAt && value.endsAt < value.startsAt) {
      context.addIssue({
        code: "custom",
        path: ["endsAt"],
        message: "শেষের সময় শুরুর সময়ের পরে হতে হবে",
      });
    }
  });

export type CheckoutCustomer = z.infer<typeof checkoutCustomerSchema>;
