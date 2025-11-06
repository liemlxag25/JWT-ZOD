import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const getLogin = (req: Request, res: Response) => {
  res.render("login", { title: "Login", user: (req as any).user });
};

export const getRegister = (req: Request, res: Response) => {
  res.render("register", { title: "Register", user: (req as any).user });
};

export const postRegister = async (req: Request, res: Response) => {
  try {
    await registerUser(req.body.username, req.body.password);
    res.redirect("/login");
  } catch (error: any) {
    res.status(400).render("register", { title: "Register", error: error.message });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    const token = await loginUser(req.body.username, req.body.password);
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.redirect("/");
  } catch (error: any) {
    res.status(400).render("login", { title: "Login", error: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/login");
};
