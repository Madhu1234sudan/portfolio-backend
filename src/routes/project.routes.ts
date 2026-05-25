import express from "express";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";

import { authenticateAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  authenticateAdmin,
  createProject
);

router.get("/", getProjects);

router.put(
  "/:id",
  authenticateAdmin,
  updateProject
);

router.delete(
  "/:id",
  authenticateAdmin,
  deleteProject
);

export default router;