import { Request } from "express";

import { ValidationRule } from "../middleware/validation.middleware";

export const companyRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.company?.trim()) {
    return "Company name is required";
  }

  return null;
};

export const positionRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.position?.trim()) {
    return "Position is required";
  }

  return null;
};



export const startDateRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.startDate) {
    return "Start date is required";
  }

  return null;
};

export const currentlyWorkingRequired: ValidationRule = (
  req: Request
) => {
  if (
    typeof req.body.currentlyWorking !==
    "boolean"
  ) {
    return "Currently working status is required";
  }

  return null;
};
export const descriptionRequired: ValidationRule = (
  req: Request
) => {
  if (!req.body.description?.trim()) {
    return "Description is required";
  }

  return null;
};