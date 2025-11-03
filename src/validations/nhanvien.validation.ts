// src/validations/nhanvien.validation.ts
import { z } from "zod";

export const nhanVienCreateSchema = z.object({
  ten: z.string().min(8, "Tên phải có ít nhất 8 ký tự"),
  tuoi: z.number().refine((n) => n > 0 && n < 150, "Tuổi không hợp lệ"),
  chucvu: z.string().min(1, "Chức vụ không được trống"),
  luong: z.number().refine((n) => n >= 0, "Lương phải >= 0"),
  diachi: z.string().min(1, "Địa chỉ không được trống"),
});

export const nhanVienUpdateSchema = nhanVienCreateSchema;

export type NhanVienAddInput = z.infer<typeof nhanVienCreateSchema>;
export type NhanVienEditInput = z.infer<typeof nhanVienUpdateSchema>;
