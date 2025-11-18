import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(4, "The username must have at least 4 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters."),
});

export const loginSchema = z.object({
  username: z.string().nonempty("Username cannot be empty."),
  password: z.string().nonempty("Password cannot be empty."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
