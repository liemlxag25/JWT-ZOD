import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validations/auth.validation";
import { registerUser, loginUser } from "../services/auth.service";

export const getLogin = (req: Request, res: Response) => {
  res.render("login", { title: "Đăng nhập", user: (req as any).user });
};

export const getRegister = (req: Request, res: Response) => {
  res.render("register", { title: "Đăng ký", user: (req as any).user });
};

export const postRegister = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    await registerUser(data.username, data.password);
    res.redirect("/login");
  } catch (error: any) {
    res.status(400).render("register", { title: "Đăng ký", error: error.message });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const token = await loginUser(data.username, data.password);
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.redirect("/");
  } catch (error: any) {
    res.status(400).render("login", { title: "Đăng nhập", error: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/login");
};
