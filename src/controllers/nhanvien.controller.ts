// src/controllers/nhanvien.controller.ts
import { Request, Response } from "express";
import {
  getAllNhanVien,
  getNhanVienById,
  createNhanVien,
  updateNhanVien,
  deleteNhanVien,
} from "../services/nhanvien.service";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";

export const listNhanVien = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const nhanviens = await getAllNhanVien();
  res.render("nhanvien/list", { title: "Employee List", user, nhanviens });
});

export const getAddNhanVien = (req: Request, res: Response) => {
  const user = req.user;
  res.render("nhanvien/add", { title: "Add Employee", user });
};

export const postAddNhanVien = catchAsync(async (req: Request, res: Response) => {
  await createNhanVien(req.body);
  res.redirect("/nhanvien");
});

export const getEditNhanVien = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const nhanvien = await getNhanVienById(req.params.id);
  if (!nhanvien) throw new AppError("Employee doesn't exist", 404);
  res.render("nhanvien/edit", { title: "Edit employee", user, nhanvien });
});

export const postEditNhanVien = catchAsync(async (req: Request, res: Response) => {
  const updated = await updateNhanVien(req.params.id, req.body);
  if (!updated) throw new AppError("Update failed", 400);
  res.redirect("/nhanvien");
});

export const deleteNhanVienById = catchAsync(async (req: Request, res: Response) => {
  await deleteNhanVien(req.params.id);
  res.redirect("/nhanvien");
});
