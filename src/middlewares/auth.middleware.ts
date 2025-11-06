import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "../validations/auth.validation";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect("/login");

  const decoded = verifyToken(token);
  if (!decoded) return res.redirect("/login");

  (req as any).user = decoded;
  next();
};

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.redirect("/login");
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.clearCookie("token");
    return res.redirect("/login");
  }

  (req as any).user = decoded;
  next();
};
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = registerSchema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).render("register", {
      title: "Register",
      error: error.message,
    });
  }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = loginSchema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).render("login", {
      title: "Login",
      error: error.message,
    });
  }
};

