import { Router } from "express";

import {
  getProfile,
  updateProfile,
} from "../controllers/profileController";
import { validate } from "../middleware/validation.middleware";

import {
  fullNameRequired,
  headlineRequired,
  shortBioRequired,
  aboutMeRequired,
} from "../validators/profile.validator";

import {
  authenticateAdmin,
} from "../middleware/authMiddleware";

const router = Router();

router.get(
  "/",
  getProfile
);

router.put(
  "/",
  authenticateAdmin,
  validate(
    fullNameRequired,
    headlineRequired,
    shortBioRequired,
    aboutMeRequired
  ),
  updateProfile
);

export default router;