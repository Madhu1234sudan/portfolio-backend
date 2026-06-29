import { Request } from "express";
import { ValidationRule } from "../middleware/validation.middleware";

export const skillCategoryTitleRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.title?.trim()) {
    return "Skill category title is required";
  }

  return null;
};