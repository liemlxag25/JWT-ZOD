import { Request, Response } from "express";
import {
  getAllNhanVien,
  getNhanVienById,
  createNhanVien,
  updateNhanVien,
  deleteNhanVien,
} from "../services/nhanvien.service";

import {
  nhanVienCreateSchema,
  nhanVienUpdateSchema,
} from "../validations/nhanvien.validation";
import { ZodError, ZodIssue } from "zod";


export const listNhanVien = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const nhanviens = await getAllNhanVien();
  res.render("nhanvien/list", { title: "Danh sách nhân viên", user, nhanviens });
};

export const getAddNhanVien = (req: Request, res: Response) => {
  const user = (req as any).user;
  res.render("nhanvien/add", { title: "Thêm nhân viên", user });
};

export const postAddNhanVien = async (req: Request, res: Response) => {
  try {
    const parsedData = nhanVienCreateSchema.parse({
      ten: req.body.ten,
      tuoi: Number(req.body.tuoi),
      chucvu: req.body.chucvu,
      luong: Number(req.body.luong),
      diachi: req.body.diachi,
    });

    await createNhanVien(parsedData);
    res.redirect("/nhanvien");
  } catch (error: unknown) {
    let messages: string[] = [];

    if (error instanceof ZodError) {
      messages = (error as ZodError).issues.map((e) => e.message);
    } else if (error instanceof Error) {
      messages = [error.message];
    } else {
      messages = ["Lỗi không xác định"];
    }

    res.status(400).render("nhanvien/add", {
      title: "Thêm nhân viên",
      errors: messages,
      user: (req as any).user,
    });
  }
};

export const getEditNhanVien = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const nhanvien = await getNhanVienById(req.params.id);
  if (!nhanvien) return res.redirect("/nhanvien");
  res.render("nhanvien/edit", { title: "Chỉnh sửa nhân viên", user, nhanvien });
};

export const postEditNhanVien = async (req: Request, res: Response) => {
  try {
    const parsedData = nhanVienUpdateSchema.parse({
      ten: req.body.ten,
      tuoi: Number(req.body.tuoi),
      chucvu: req.body.chucvu,
      luong: Number(req.body.luong),
      diachi: req.body.diachi,
    });

    await updateNhanVien(req.params.id, parsedData);
    res.redirect("/nhanvien");
  } catch (error: unknown) {
    let messages: string[] = [];

    if (error instanceof ZodError) {
      messages = (error as ZodError).issues.map((e) => e.message);
    } else if (error instanceof Error) {
      messages = [error.message];
    } else {
      messages = ["Lỗi không xác định"];
    }

    const nhanvien = await getNhanVienById(req.params.id);
    res.status(400).render("nhanvien/edit", {
      title: "Chỉnh sửa nhân viên",
      errors: messages,
      user: (req as any).user,
      nhanvien,
    });
  }
};

export const deleteNhanVienById = async (req: Request, res: Response) => {
  await deleteNhanVien(req.params.id);
  res.redirect("/nhanvien");
};
