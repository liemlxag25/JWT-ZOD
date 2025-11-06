import { Request, Response, NextFunction } from "express";
import { nhanVienCreateSchema, nhanVienUpdateSchema } from "../validations/nhanvien.validation";
import { ZodError } from "zod";

// Validate create employee
export const validateNhanVienCreate = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = nhanVienCreateSchema.parse({
      ten: req.body.ten,
      tuoi: Number(req.body.tuoi),
      chucvu: req.body.chucvu,
      luong: Number(req.body.luong),
      diachi: req.body.diachi,
    });
    next();
  } catch (error: unknown) {
    let messages: string[] = [];

    if (error instanceof ZodError) {
      messages = (error as ZodError).issues.map((e) => e.message);
    } else if (error instanceof Error) {
      messages = [error.message];
    } else {
      messages = ["Lỗi không xác định"];
    }

    return res.status(400).render("nhanvien/add", {
      title: "Thêm nhân viên",
      errors: messages,
      user: (req as any).user,
    });
  }
};

// Validate update employee
export const validateNhanVienUpdate = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = nhanVienUpdateSchema.parse({
      ten: req.body.ten,
      tuoi: Number(req.body.tuoi),
      chucvu: req.body.chucvu,
      luong: Number(req.body.luong),
      diachi: req.body.diachi,
    });
    next();
  } catch (error: unknown) {
    let messages: string[] = [];

    if (error instanceof ZodError) {
      messages = (error as ZodError).issues.map((e) => e.message);
    } else if (error instanceof Error) {
      messages = [error.message];
    } else {
      messages = ["Lỗi không xác định"];
    }

    const nhanvien = {
      _id: req.params.id, 
      ...req.body,        
    };

    return res.status(400).render("nhanvien/edit", {
      title: "Chỉnh sửa nhân viên",
      errors: messages,
      user: (req as any).user,
      nhanvien,
    });
  }
};
