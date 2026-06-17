import { Router } from "express";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/skillCategoryController";

import { authenticateAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getCategories);

router.post(
  "/",
  authenticateAdmin,
  createCategory
);

router.put(
  "/:id",
  authenticateAdmin,
  updateCategory
);

router.delete(
  "/:id",
  authenticateAdmin,
  deleteCategory
);

export default router;