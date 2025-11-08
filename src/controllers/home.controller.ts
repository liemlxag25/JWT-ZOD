import { Request, Response } from "express";

export const getHome = (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.render("login", { title: "Đăng nhập", user: null });
  }
  res.render("home", { title: "Trang chủ", user });
};
