import { Request } from "express";
import { ValidationRule } from "../middleware/validation.middleware";

export const researchTitleRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.title?.trim()) {
    return "Research title is required";
  }

  return null;
};

export const researchAbstractRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.abstract?.trim()) {
    return "Research abstract is required";
  }

  return null;
};

export const researchDescriptionRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.description?.trim()) {
    return "Research description is required";
  }

  return null;
};