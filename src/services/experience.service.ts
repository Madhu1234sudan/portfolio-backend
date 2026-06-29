import prisma from "../config/prisma";

export class ExperienceService {
    async createExperience(data: {
  company: string;
  position: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  currentlyWorking: boolean;
  description: string;
  companyLogo?: string;
  displayOrder?: number;
}) {
  return await prisma.experience.create({
    data,
  });
}
async getExperiences() {
  return await prisma.experience.findMany({
    orderBy: {
      startDate: "desc",
    },
  });
}
async updateExperience(
  id: number,
  data: {
  company: string;
  position: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  currentlyWorking: boolean;
  description: string;
  companyLogo?: string;
  displayOrder?: number;
}
) {
  return await prisma.experience.update({
    where: {
      id,
    },
    data,
  });
}
async deleteExperience(id: number) {
  return await prisma.experience.delete({
    where: {
      id,
    },
  });
}
}