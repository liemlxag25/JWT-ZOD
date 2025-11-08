import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { catchAsync } from "../utils/catchAsync";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect("/login");

  const decoded = verifyToken(token);
  if (!decoded) return res.redirect("/login");

  req.user = decoded;
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

  req.user = decoded;
  next();
};

export const validateRegister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body = registerSchema.parse(req.body);
    next();
  }
);

export const validateLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body = loginSchema.parse(req.body);
    next();
  }
);

