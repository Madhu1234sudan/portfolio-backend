import { Request, Response } from "express";
import { ResearchService } from "../services/research.service";
const researchService = new ResearchService();
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

    const research =
  await researchService.createResearch({
    title,
    abstract,
    description,
    researchImage,
    pdfUrl,
    githubUrl,
    publicationUrl,
    tags,
    featured,
  });

    return res.status(201).json(
      research
    );

  } catch (error) {

    throw error;

  }
};

export const getResearch = async (
  req: Request,
  res: Response
) => {
  try {

   const research =
  await researchService.getResearch();

    return res.status(200).json(
      research
    );

  } catch (error) {

    throw error;

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
  await researchService.updateResearch(
    Number(id),
    {
      title,
      abstract,
      description,
      researchImage,
      pdfUrl,
      githubUrl,
      publicationUrl,
      tags,
      featured,
    }
  );
    return res.status(200).json(
      updatedResearch
    );

  } catch (error) {

    throw error;

  }
};

export const deleteResearch = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = req.params;

    await researchService.deleteResearch(
  Number(id)
);
    return res.status(200).json({
      message: "Research deleted successfully",
    });

  } catch (error) {

    throw error;

  }
};