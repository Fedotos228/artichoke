import { z } from "zod"

export const RequestCallFormSchema = z.object({
  phone: z
    .string()
    .min(6, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^\+?[0-9\s\-\(\)]{6,20}$/, "Enter a valid phone number")
    .transform((val) => val.replace(/\D/g, ""))
    .refine((digitsOnly) => digitsOnly.length >= 8 && digitsOnly.length <= 15, {
      message: "Phone number does not seem valid",
    }),
})