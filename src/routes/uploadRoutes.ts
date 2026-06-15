import express from "express";

import upload from "../middleware/upload";
import { uploadImage } from "../controllers/uploadController";

const router = express.Router();

router.post(
  "/image",
  upload.single("image"),
  uploadImage
);

export default router;