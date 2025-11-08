import { Request, Response, NextFunction } from "express";
import { nhanVienCreateSchema, nhanVienUpdateSchema } from "../validations/nhanvien.validation";
import { ZodError } from "zod";

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
      messages = ["ERROR UNKNOWN"];
    }

    return res.status(400).render("nhanvien/add", {
      title: "Add New Employee",
      errors: messages,
      user: req.user,
    });
  }
};

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
      messages = ["ERROR UNKNOWN"];
    }

    const nhanvien = {
      _id: req.params.id, 
      ...req.body,        
    };

    return res.status(400).render("nhanvien/edit", {
      title: "Edit Employee",
      errors: messages,
      user: req.user,
      nhanvien,
    });
  }
};
