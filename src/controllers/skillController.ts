import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createSkill = async (
  req: Request,
  res: Response
) => {
  try {
    const {
  name,
  categoryId,
  level,
  icon,
  displayOrder,
  featured,
} = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({
        message: "Name and category are required.",
      });
    }

    const skill = await prisma.skill.create({
  data: {
    name,
    categoryId: Number(categoryId),
    level,
    icon,
    displayOrder,
    featured,
  },
  include: {
    category: true,
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
      await prisma.skill.findMany({
        include: {
          category: true,
        },
        orderBy: {
          name: "asc",
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
      level,
      icon,
      displayOrder,
      featured,
      categoryId,
    } = req.body;

    const skill = await prisma.skill.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        level,
        icon,
        displayOrder,
        featured,
        categoryId: Number(categoryId),
      },
      include: {
        category: true,
      },
    });

    res.status(200).json(skill);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update skill",
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
      message: "Skill deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete skill",
    });
  }
};