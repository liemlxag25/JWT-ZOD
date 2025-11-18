import { Request, Response, NextFunction } from "express";
import { nhanVienCreateSchema, nhanVienUpdateSchema } from "../validations/nhanvien.validation";

export const validateNhanVienCreate = (req: Request, res: Response, next: NextFunction) => {
    req.body = nhanVienCreateSchema.parse({
      ten: req.body.ten,
      tuoi: Number(req.body.tuoi),
      chucvu: req.body.chucvu,
      luong: Number(req.body.luong),
      diachi: req.body.diachi,
    });
    next();
};

export const validateNhanVienUpdate = (req: Request, res: Response, next: NextFunction) => {
    req.body = nhanVienUpdateSchema.parse({
      ten: req.body.ten,
      tuoi: Number(req.body.tuoi),
      chucvu: req.body.chucvu,
      luong: Number(req.body.luong),
      diachi: req.body.diachi,
    });
    next();
    const nhanvien = {
      _id: req.params.id, 
      ...req.body,        
    };
};

