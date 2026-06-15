import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";

export const uploadImage = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const file = req.file;

    const result = await new Promise<any>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "portfolio-projects",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(file.buffer);
      }
    );

    return res.status(200).json({
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Image upload failed",
    });
  }
};