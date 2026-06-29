import { Request, Response } from "express";
import prisma from "../config/prisma";
import { SkillService } from "../services/skill.service";
const skillService = new SkillService();
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
      order,
      featured,
    } = req.body;

    const skill = await skillService.createSkill({
  name,
  level,
  icon,
  order,
  featured,
  categoryId,
});
    return res.status(201).json(
      skill
    );

  } catch (error) {

    throw error;

  }
};
export const getSkills = async (
  req: Request,
  res: Response
) => {
  try {

    const skills = await skillService.getSkills();

    return res.status(200).json(
      skills
    );

  } catch (error) {

    throw error;

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
      order,
      featured,
      categoryId,
    } = req.body;

    const updatedSkill =
  await skillService.updateSkill(
    Number(id),
    {
      name,
      level,
      icon,
      order,
      featured,
      categoryId,
    }
  );
    return res.status(200).json(
  updatedSkill
);

  } catch (error) {

    throw error;

  }
};
export const deleteSkill = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = req.params;

    await skillService.deleteSkill(
  Number(id)
);

    return res.status(200).json({
      message: "Skill deleted successfully",
    });

  } catch (error) {

    throw error;

  }
};