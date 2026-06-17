import express from "express";

import upload from "../middleware/upload";
import {
  uploadImage,
  uploadPdf,
} from "../controllers/uploadController";
const router = express.Router();

router.post(
  "/image",
  upload.single("image"),
  uploadImage
);
router.post(
  "/pdf",
  upload.single("pdf"),
  uploadPdf
);

export default router;