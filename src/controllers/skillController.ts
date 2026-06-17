import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createSkill = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({
        message: "Name and category are required.",
      });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        categoryId: Number(categoryId),
      },
    });

    res.status(201).json(skill);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create skill",
    });
  }
};

export const getSkills = async (
  req: Request,
  res: Response
) => {
  try {
    const skills =
      await prisma.skillCategory.findMany({
        include: {
          skills: true,
        },
        orderBy: {
          order: "asc",
        },
      });

    res.status(200).json(skills);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch skills",
    });
  }
};

export const updateSkill = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      name,
      categoryId,
    } = req.body;

    const skill =
      await prisma.skill.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          categoryId:
            Number(categoryId),
        },
      });

    res.status(200).json(skill);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to update skill",
    });
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.skill.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message:
        "Skill deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to delete skill",
    });
  }
};