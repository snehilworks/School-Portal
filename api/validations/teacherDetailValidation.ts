import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(1), // Minimum length of 1 character (required)
  email: z.string().email().min(1), // Minimum length of 1 character with email format (required)
  password: z.string().min(1), // Minimum length of 1 character (required)
  subjects: z.array(z.string().min(1)), // Array of strings with minimum length of 1 character (required)
  phone: z.number().optional(), // Optional number
  classTeacher: z.boolean().default(false), // Boolean with default value of false
  classes: z.array(z.string()) // Array of strings
});
