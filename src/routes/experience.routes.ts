import { Router } from "express";

import {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController";
import { validate } from "../middleware/validation.middleware";

import {
  companyRequired,
  positionRequired,
  startDateRequired,
  currentlyWorkingRequired,
  descriptionRequired,
} from "../validators/experience.validator";

import { authenticateAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getExperiences);

router.post(
  "/",
  authenticateAdmin,
  validate(
  companyRequired,
  positionRequired,
  startDateRequired,
  currentlyWorkingRequired,
  descriptionRequired
),
  createExperience
);

router.put(
  "/:id",
  authenticateAdmin,
  validate(
    companyRequired,
    positionRequired,
 
    descriptionRequired
  ),
  updateExperience
);

router.delete(
  "/:id",
  authenticateAdmin,
  deleteExperience
);

export default router;