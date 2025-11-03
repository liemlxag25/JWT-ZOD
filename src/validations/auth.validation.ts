import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(4, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

export const loginSchema = z.object({
  username: z.string().nonempty("Tên đăng nhập không được trống"),
  password: z.string().nonempty("Mật khẩu không được trống"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
