import express from "express";

import {
  loginAdmin,
  forgotPassword,
  resetPassword,
  getCurrentAdmin,
} from "../controllers/authController";

import { authenticateAdmin } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/login", loginAdmin);
router.get(
  "/me",
  authenticateAdmin,
  getCurrentAdmin
);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;