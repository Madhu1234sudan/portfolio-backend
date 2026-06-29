import express from "express";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";
import { validate } from "../middleware/validation.middleware";

import {
  projectTitleRequired,
  projectDescriptionRequired,
  projectTechStackRequired,
  githubUrlRequired,
  liveUrlRequired,
  projectImageRequired,
} from "../validators/project.validator";

import { authenticateAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  authenticateAdmin,
  validate(
    projectTitleRequired,
    projectDescriptionRequired,
    projectTechStackRequired,
    githubUrlRequired,
    liveUrlRequired,
    projectImageRequired
  ),
  createProject
);

router.get("/", getProjects);

router.put(
  "/:id",
  authenticateAdmin,
  validate(
    projectTitleRequired,
    projectDescriptionRequired,
    projectTechStackRequired,
    githubUrlRequired,
    liveUrlRequired,
    projectImageRequired
  ),
  updateProject
);

router.delete(
  "/:id",
  authenticateAdmin,
  deleteProject
);

export default router;