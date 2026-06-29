import prisma from "../config/prisma";

export class SkillService {
   async createSkill(data: {
  name: string;
  level?: number;
  icon?: string;
  order?: number;
  featured?: boolean;
  categoryId: number;
}) {
  return await prisma.skill.create({
    data,
    include: {
      category: true,
    },
  });
}
async getSkills() {
  return await prisma.skill.findMany({
    include: {
      category: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
async updateSkill(
  id: number,
  data: {
    name: string;
    level?: number;
    icon?: string;
    order?: number;
    featured?: boolean;
    categoryId: number;
  }
) {
  return await prisma.skill.update({
    where: {
      id,
    },
    data,
    include: {
      category: true,
    },
  });
}
async deleteSkill(id: number) {
  return await prisma.skill.delete({
    where: {
      id,
    },
  });
}
}