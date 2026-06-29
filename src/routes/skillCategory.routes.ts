import { Router } from "express";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/skillCategoryController";

import { authenticateAdmin } from "../middleware/authMiddleware";
import { validate } from "../middleware/validation.middleware";

import {
  skillCategoryTitleRequired,
} from "../validators/skillCategory.validator";

const router = Router();

router.get("/", getCategories);

router.post(
  "/",
  authenticateAdmin,
  validate(
    skillCategoryTitleRequired
  ),
  createCategory
);

router.put(
  "/:id",
  authenticateAdmin,
  validate(
    skillCategoryTitleRequired
  ),
  updateCategory
);

router.delete(
  "/:id",
  authenticateAdmin,
  deleteCategory
);

export default router;