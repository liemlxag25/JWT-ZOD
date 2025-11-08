// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  if (!(err instanceof AppError)) {
    error = new AppError((err as Error).message || "Something went wrong", 500);
  }

  const appError = error as AppError;

  if (req.originalUrl.startsWith("/api")) {
    res.status(appError.statusCode).json({
      status: "error",
      message: appError.message,
    });
  } else {
    let view = "home"; 
    if (req.originalUrl.includes("/login")) view = "login";
    else if (req.originalUrl.includes("/register")) view = "register";

    res.status(appError.statusCode).render(view, {
      title: view === "login" ? "Login" : "Register",
      error: appError.message,
      user: req.user || null,
    });
  }
};
