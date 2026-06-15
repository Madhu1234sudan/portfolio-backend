import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createResearch = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      abstract,
      description,
      researchImage,
      pdfUrl,
      githubUrl,
      publicationUrl,
      tags,
      featured,
    } = req.body;

    if (
      !title ||
      !abstract ||
      !description ||
      !tags ||
      tags.length === 0
    ) {
      return res.status(400).json({
        message:
          "Title, abstract, description and tags are required.",
      });
    }

    const research = await prisma.research.create({
      data: {
        title,
        abstract,
        description,
        researchImage,
        pdfUrl,
        githubUrl,
        publicationUrl,
        tags,
        featured,
      },
    });

    res.status(201).json(research);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create research",
    });
  }
};

export const getResearch = async (
  req: Request,
  res: Response
) => {
  try {
    const research = await prisma.research.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(research);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch research",
    });
  }
};

export const updateResearch = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      title,
      abstract,
      description,
      researchImage,
      pdfUrl,
      githubUrl,
      publicationUrl,
      tags,
      featured,
    } = req.body;

    const updatedResearch =
      await prisma.research.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          abstract,
          description,
          researchImage,
          pdfUrl,
          githubUrl,
          publicationUrl,
          tags,
          featured,
        },
      });

    res.status(200).json(updatedResearch);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update research",
    });
  }
};

export const deleteResearch = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.research.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Research deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete research",
    });
  }
};