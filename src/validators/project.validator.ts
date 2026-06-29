import { Request } from "express";

import { ValidationRule } from "../middleware/validation.middleware";

export const projectTitleRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.title?.trim()) {
    return "Project title is required";
  }

  return null;
};

export const projectDescriptionRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.description?.trim()) {
    return "Project description is required";
  }

  return null;
};

export const projectTechStackRequired: ValidationRule = (
  req: Request
) => {
  if (
    !Array.isArray(req.body.techStack) ||
    req.body.techStack.length === 0
  ) {
    return "At least one technology is required";
  }

  return null;
};

export const githubUrlRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.githubUrl?.trim()) {
    return "GitHub URL is required";
  }

  return null;
};

export const liveUrlRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.liveUrl?.trim()) {
    return "Live URL is required";
  }

  return null;
};

export const projectImageRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.imageUrl?.trim()) {
    return "Project image is required";
  }

  return null;
};