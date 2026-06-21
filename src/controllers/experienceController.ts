import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      company,
      position,
      location,
      startDate,
      endDate,
      currentlyWorking,
      description,
      companyLogo,
      displayOrder,
    } = req.body;
    if (!company?.trim()) {
  return res.status(400).json({
    message: "Company is required.",
  });
}

if (!position?.trim()) {
  return res.status(400).json({
    message: "Position is required.",
  });
}

if (!startDate) {
  return res.status(400).json({
    message: "Start Date is required.",
  });
}

if (!description?.trim()) {
  return res.status(400).json({
    message: "Description is required.",
  });
}
const parsedStartDate = new Date(startDate);

if (isNaN(parsedStartDate.getTime())) {
  return res.status(400).json({
    message: "Invalid Start Date.",
  });
}

    const experience =
      await prisma.experience.create({
        data: {
          company,
          position,
          location,
          startDate: parsedStartDate,
          endDate: endDate
            ? new Date(endDate)
            : null,
          currentlyWorking,
          description,
          companyLogo,
          displayOrder,
        },
      });

    res.status(201).json(experience);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create experience",
    });
  }
};

export const getExperiences = async (
  req: Request,
  res: Response
) => {
  try {
    const experiences =
      await prisma.experience.findMany({
        orderBy: {
          displayOrder: "asc",
        },
      });

    res.status(200).json(experiences);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch experiences",
    });
  }
};

export const updateExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      company,
      position,
      location,
      startDate,
      endDate,
      currentlyWorking,
      description,
      companyLogo,
      displayOrder,
    } = req.body;
    const parsedStartDate = new Date(startDate);

if (isNaN(parsedStartDate.getTime())) {
  return res.status(400).json({
    message: "Invalid Start Date.",
  });
}

    const experience =
      await prisma.experience.update({
        where: {
          id: Number(id),
        },
        data: {
          company,
          position,
          location,
          startDate: parsedStartDate,
          endDate: endDate
            ? new Date(endDate)
            : null,
          currentlyWorking,
          description,
          companyLogo,
          displayOrder,
        },
      });

    res.status(200).json(experience);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update experience",
    });
  }
};

export const deleteExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.experience.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Experience deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete experience",
    });
  }
};