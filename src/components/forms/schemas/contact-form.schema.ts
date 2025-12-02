import { z } from "zod"

export const ContactFormSchema = z.object({
    fullname: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }).max(50, {
      message: "Name must be at most 50 characters.",
    }),
    phone: z
      .string()
      .min(6, "Phone number is too short")
      .max(20, "Phone number is too long")
      .regex(/^\+?[0-9\s\-\(\)]{6,20}$/, "Enter a valid phone number")
      .transform((val) => val.replace(/\D/g, ""))
      .refine((digitsOnly) => digitsOnly.length >= 8 && digitsOnly.length <= 15, {
        message: "Phone number does not seem valid",
      }),
    workType: z.string().min(2, {
      message: "Work type must be at least 2 characters.",
    }),
    comment: z.string().optional(),
  })