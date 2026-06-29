import prisma from "../config/prisma";

export class SkillCategoryService {
    async createCategory(data: {
  title: string;
  icon?: string;
  order?: number;
}) {
  return await prisma.skillCategory.create({
    data,
  });
}
async getCategories() {
  return await prisma.skillCategory.findMany({
    include: {
      skills: true,
    },
    orderBy: {
      order: "asc",
    },
  });
}
async updateCategory(
  id: number,
  data: {
    title: string;
    icon?: string;
    order?: number;
  }
) {
  return await prisma.skillCategory.update({
    where: {
      id,
    },
    data,
  });
}
async deleteCategory(id: number) {
  return await prisma.skillCategory.delete({
    where: {
      id,
    },
  });
}
}