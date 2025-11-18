import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect("/login");

  const decoded = verifyToken(token);
  if (!decoded) return res.redirect("/login");

  req.user = {
    id: decoded.sub,
    role: decoded.role,
  };

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
  req.user = {
    id: decoded.sub,
    role: decoded.role,
  };
  next();
};

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  req.body = registerSchema.parse(req.body);
  if (req.body.password !== req.body.confirmPassword) {
    throw new AppError("Passwords do not match");
  }
  next();
};


export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  req.body = loginSchema.parse(req.body);
  next();
};

