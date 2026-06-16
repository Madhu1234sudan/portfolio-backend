import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const profile =
      await prisma.profile.findFirst();

    res.status(200).json(profile);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch profile",
    });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const existingProfile =
      await prisma.profile.findFirst();

    if (!existingProfile) {
      const profile =
        await prisma.profile.create({
          data: req.body,
        });

      return res
        .status(201)
        .json(profile);
    }

    const updatedProfile =
      await prisma.profile.update({
        where: {
          id: existingProfile.id,
        },
        data: req.body,
      });

    res.status(200).json(
      updatedProfile
    );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to update profile",
    });
  }
};