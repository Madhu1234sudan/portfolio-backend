import { Router } from "express";

import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController";
import { validate } from "../middleware/validation.middleware";

import {
  skillNameRequired,
  skillCategoryRequired,
} from "../validators/skill.validator";

import { authenticateAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getSkills);

router.post(
  "/",
  authenticateAdmin,
  validate(
    skillNameRequired,
    skillCategoryRequired
  ),
  createSkill
);

router.put(
  "/:id",
  authenticateAdmin,
  validate(
    skillNameRequired,
    skillCategoryRequired
  ),
  updateSkill
);

router.delete(
  "/:id",
  authenticateAdmin,
  deleteSkill
);

export default router;