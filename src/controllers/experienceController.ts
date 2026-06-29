import { Request, Response } from "express";
import prisma from "../config/prisma";
import { ExperienceService } from "../services/experience.service";

const experienceService = new ExperienceService();
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
let parsedEndDate: Date | null = null;

if (endDate) {
  parsedEndDate = new Date(endDate);

  if (isNaN(parsedEndDate.getTime())) {
    return res.status(400).json({
      message: "Invalid End Date.",
    });
  }
}
  
    const experience =
  await experienceService.createExperience({
  company,
  position,
  location,
  startDate: parsedStartDate,
endDate: parsedEndDate ?? undefined,
  currentlyWorking,
  description,
  companyLogo,
  displayOrder,
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
  await experienceService.getExperiences();

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
    const id = Number(req.params.id);

if (isNaN(id)) {
  return res.status(400).json({
    message: "Invalid experience ID.",
  });
}

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
let parsedEndDate: Date | null = null;

if (endDate) {
  parsedEndDate = new Date(endDate);

  if (isNaN(parsedEndDate.getTime())) {
    return res.status(400).json({
      message: "Invalid End Date.",
    });
  }
}
const existingExperience =
  await prisma.experience.findUnique({
    where: { id },
  });

if (!existingExperience) {
  return res.status(404).json({
    message: "Experience not found.",
  });
}
    const updatedExperience =
  await experienceService.updateExperience(
    Number(id),
    {
      company,
      position,
      location,
      startDate: parsedStartDate,
      endDate: parsedEndDate ?? undefined,
      currentlyWorking,
      description,
      companyLogo,
      displayOrder,
    }
  );

    return res.status(200).json(updatedExperience);

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
    const id = Number(req.params.id);

if (isNaN(id)) {
  return res.status(400).json({
    message: "Invalid experience ID.",
  });
}
const existingExperience =
  await prisma.experience.findUnique({
    where: { id },
  });

if (!existingExperience) {
  return res.status(404).json({
    message: "Experience not found.",
  });
}
    await experienceService.deleteExperience(
  Number(id)
);

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