import prisma from "../config/prisma";

export class ProjectService {
    async createProject(data: {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}) {
  return await prisma.project.create({
    data,
  });
}
async getProjects() {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
async updateProject(
  id: number,
  data: {
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    featured?: boolean;
  }
) {
  return await prisma.project.update({
    where: {
      id,
    },
    data,
  });
}
async deleteProject(id: number) {
  return await prisma.project.delete({
    where: {
      id,
    },
  });
}
}