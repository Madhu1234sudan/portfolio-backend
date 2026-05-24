import express from "express";
import {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../controllers/project.controller";

const router = express.Router();

router.post("/", createProject);

router.get("/", getProjects);

router.delete("/:id", deleteProject);

router.put("/:id", updateProject)

export default router