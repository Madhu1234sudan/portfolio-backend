import { Router } from "express";

import {
  createResearch,
  getResearch,
  updateResearch,
  deleteResearch,
} from "../controllers/researchController";

import { authenticateAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getResearch);

router.post(
  "/",
  authenticateAdmin,
  createResearch
);

router.put(
  "/:id",
  authenticateAdmin,
  updateResearch
);

router.delete(
  "/:id",
  authenticateAdmin,
  deleteResearch
);

export default router;