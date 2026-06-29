import { Request, Response } from "express";
import { SkillCategoryService } from "../services/skillCategory.service";
const skillCategoryService = new SkillCategoryService();
export const createCategory = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      title,
      icon,
      order,
    } = req.body;

    const category =
  await skillCategoryService.createCategory({
  title,
  icon,
  order: order,
});

    return res.status(201).json(
      category
    );

  } catch (error) {

    throw error;

  }
};
export const getCategories = async (
  req: Request,
  res: Response
) => {
  try {

    const categories =
  await skillCategoryService.getCategories();

    return res.status(200).json(
      categories
    );

  } catch (error) {

    throw error;

  }
};

export const updateCategory = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = req.params;

    const {
      title,
      icon,
      order,
    } = req.body;

    const category =
  await skillCategoryService.updateCategory(
    Number(id),
    {
      title,
      icon,
      order,
    }
  );

    return res.status(200).json(
      category
    );

  } catch (error) {

    throw error;

  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = req.params;

    await skillCategoryService.deleteCategory(
  Number(id)
);

    return res.status(200).json({
      message: "Category deleted successfully",
    });

  } catch (error) {

    throw error;

  }
};