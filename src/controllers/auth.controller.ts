import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";

export const getLogin = (req: Request, res: Response) => {
  res.render("login", { title: "Login", user: req.user });
};

export const getRegister = (req: Request, res: Response) => {
  res.render("register", { title: "Register", user: req.user });
};

export const postRegister = catchAsync(
  async (req: Request, res: Response) => {
    await registerUser(req.body.username, req.body.password);
    res.redirect("/login");
  }
);

export const postLogin = catchAsync(async (req: Request, res: Response) => {
  const token = await loginUser(req.body.username, req.body.password);
  res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.redirect("/");
});

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/login");
};
