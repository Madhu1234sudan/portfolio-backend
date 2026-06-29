import { Request } from "express";

import { ValidationRule } from "../middleware/validation.middleware";

export const skillNameRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.name?.trim()) {
    return "Skill name is required";
  }

  return null;
};

export const skillCategoryRequired: ValidationRule = (
  req: Request
) => {
  if (
    req.body.categoryId === undefined ||
    req.body.categoryId === null
  ) {
    return "Skill category is required";
  }

  return null;
};