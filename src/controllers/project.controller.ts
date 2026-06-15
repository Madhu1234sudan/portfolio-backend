import { Request, Response} from "express";
import prisma from "../config/prisma";


export const createProject = async(
    req : Request,
    res : Response
) => {
    try{
        const {
            title,
            description,
            techStack,
            githubUrl,
            liveUrl,
            imageUrl,
            featured,
        } = req.body;
if (
  !title ||
  !description ||
  !techStack ||
  techStack.length === 0
) {
  return res.status(400).json({
    message:
      "Title, description, and tech stack are required.",
  });
}
        const project = await prisma.project.create({
            data: {
                title,
                description,
                techStack,
                githubUrl,
                liveUrl,
                imageUrl,
                featured
            },
        });

        res.status(201).json(project);
    } catch (error){
        console.error(error);

        res.status(500).json({
            message: "Failed to create project",
        });
    }
   
};

export const getProjects = async (
    req: Request,
    res: Response
) => {
    try{
        const projects = await prisma.project.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch projects",
        });
    }
};

export const deleteProject = async(
    req: Request,
    res: Response
) => {
    try{
        const { id } = req.params;

        await prisma.project.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete project",
        });
    }
};

export const updateProject = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      techStack,
      githubUrl,
      liveUrl,
      imageUrl,
      featured,
    } = req.body;

    const updatedProject = await prisma.project.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        techStack,
        githubUrl,
        liveUrl,
        imageUrl,
        featured,
      },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update project",
    });
  }
};