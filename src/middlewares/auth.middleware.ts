import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

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
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) (req as any).user = decoded;
  }
  next();
};
