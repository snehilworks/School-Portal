import { z } from "zod";

export const studentSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must be a valid @gmail.com address",
    }),
    password: z.string().min(1),
    phone: z.number().optional(), // Optional field
    dob: z.date().optional(), // Optional field
    gender: z.string().optional(), // Optional field
    guardianName: z.string().optional(), // Optional field
    guardianPhone: z.number().optional(), // Optional field
    class: z.string().optional(), // Optional field
    section: z.string().optional(), // Optional field
    admission: z.boolean().default(false) // Default value of false
});
