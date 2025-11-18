// src/validations/nhanvien.validation.ts
import { z } from "zod";

export const nhanVienCreateSchema = z.object({
  ten: z.string().min(8, "Name must have at least 8 characters."),
  tuoi: z.number().refine((n) => n > 0 && n < 150, "Invalid age."),
  chucvu: z.string().min(1, "Position cannot be empty."),
  luong: z.number().refine((n) => n >= 0, "Salary must be greater than or equal to 0."),
  diachi: z.string().min(1, "Address cannot be empty."),
});

export const nhanVienUpdateSchema = nhanVienCreateSchema;

export type NhanVienAddInput = z.infer<typeof nhanVienCreateSchema>;
export type NhanVienEditInput = z.infer<typeof nhanVienUpdateSchema>;
