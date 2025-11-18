
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof AppError) {
    const viewName = req.path.replace("/", "") || "home";
    return res.status(err.statusCode).render(viewName, {
      title: "App Error",
      error: err.message,
      user: null,
    });
  }else if (err instanceof ZodError) {
    let errorMessages: string[] = [];
    const viewName = req.path.replace("/", "") || "home";
    errorMessages = err.issues.map((e) => e.message);

    return res.status(400).render(viewName, {
        title: "Format Error",
        error: errorMessages,
        user: null,
      });
  }

  res.status(500).render("login", {
    title: "System Error",
    error: "Have some thing wrong, please try again later.",
    user : null,
  });
};
