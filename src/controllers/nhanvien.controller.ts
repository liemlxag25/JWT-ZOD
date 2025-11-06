import { Request, Response } from "express";
import {
  getAllNhanVien,
  getNhanVienById,
  createNhanVien,
  updateNhanVien,
  deleteNhanVien,
} from "../services/nhanvien.service";

export const listNhanVien = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const nhanviens = await getAllNhanVien();
  res.render("nhanvien/list", { title: "Employee List", user, nhanviens });
};

export const getAddNhanVien = (req: Request, res: Response) => {
  const user = (req as any).user;
  res.render("nhanvien/add", { title: "Add Employee", user });
};

export const postAddNhanVien = async (req: Request, res: Response) => {
  await createNhanVien(req.body);
  res.redirect("/nhanvien");
};

export const getEditNhanVien = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const nhanvien = await getNhanVienById(req.params.id);
  if (!nhanvien) return res.redirect("/nhanvien");
  res.render("nhanvien/edit", { title: "Edit Employee", user, nhanvien });
};


export const postEditNhanVien = async (req: Request, res: Response) => {
  await updateNhanVien(req.params.id, req.body);
  res.redirect("/nhanvien");
};

export const deleteNhanVienById = async (req: Request, res: Response) => {
  await deleteNhanVien(req.params.id);
  res.redirect("/nhanvien");
};
