import prisma from "../config/prisma";

export class ResearchService {
    async createResearch(data: {
  title: string;
  abstract: string;
  description: string;
  researchImage?: string;
  pdfUrl?: string;
  githubUrl?: string;
  publicationUrl?: string;
  tags: string[];
  featured?: boolean;
}) {
  return await prisma.research.create({
    data,
  });
}
async getResearch() {
  return await prisma.research.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
async updateResearch(
  id: number,
  data: {
    title: string;
    abstract: string;
    description: string;
    researchImage?: string;
    pdfUrl?: string;
    githubUrl?: string;
    publicationUrl?: string;
    tags: string[];
    featured?: boolean;
  }
) {
  return await prisma.research.update({
    where: {
      id,
    },
    data,
  });
}
async deleteResearch(id: number) {
  return await prisma.research.delete({
    where: {
      id,
    },
  });
}
}