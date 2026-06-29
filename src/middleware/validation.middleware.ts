import { Request, Response, NextFunction } from "express";

export type ValidationRule = (
  req: Request
) => string | null;

export const validate =
  (...rules: ValidationRule[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errors: string[] = [];

    for (const rule of rules) {
      const error = rule(req);

      if (error) {
        errors.push(error);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    next();
  };