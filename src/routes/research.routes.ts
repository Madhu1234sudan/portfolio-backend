import { Router } from "express";

import {
  createResearch,
  getResearch,
  updateResearch,
  deleteResearch,
} from "../controllers/researchController";

import { authenticateAdmin } from "../middleware/authMiddleware";
import { validate } from "../middleware/validation.middleware";

import {
  researchTitleRequired,
  researchAbstractRequired,
  researchDescriptionRequired,
} from "../validators/research.validator";

const router = Router();

router.get("/", getResearch);

router.post(
  "/",
  authenticateAdmin,
  validate(
    researchTitleRequired,
    researchAbstractRequired,
    researchDescriptionRequired
  ),
  createResearch
);

router.put(
  "/:id",
  authenticateAdmin,
  validate(
    researchTitleRequired,
    researchAbstractRequired,
    researchDescriptionRequired
  ),
  updateResearch
);

router.delete(
  "/:id",
  authenticateAdmin,
  deleteResearch
);

export default router;