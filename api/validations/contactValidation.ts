import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(4),
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must be a valid @gmail.com address",
    }),
  message: z.string().min(4).max(256),
});
