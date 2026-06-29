import { Request } from "express";

import { ValidationRule } from "../middleware/validation.middleware";

export const fullNameRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.fullName?.trim()) {
    return "Full name is required";
  }

  return null;
};

export const headlineRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.headline?.trim()) {
    return "Headline is required";
  }

  return null;
};

export const shortBioRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.shortBio?.trim()) {
    return "Short bio is required";
  }

  return null;
};

export const aboutMeRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.aboutMe?.trim()) {
    return "About Me is required";
  }

  return null;
};