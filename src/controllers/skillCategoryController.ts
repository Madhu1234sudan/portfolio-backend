import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, order } = req.body;;

    if (!title) {
      return res.status(400).json({
        message: "Category name is required.",
      });
    }

    const category =
      await prisma.skillCategory.create({
        data: {
          title,
          order,
        },
      });

    res.status(201).json(category);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create category",
    });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const categories =
      await prisma.skillCategory.findMany({
        include: {
          skills: true,
        },
        orderBy: {
          order: "asc",
        },
      });

    res.status(200).json(categories);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch categories",
    });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const { title, order } = req.body;

    const category =
      await prisma.skillCategory.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          order,
        },
      });

    res.status(200).json(category);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update category",
    });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.skillCategory.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Category deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete category",
    });
  }
};