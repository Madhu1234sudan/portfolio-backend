import { Request, Response} from "express";
import { ProjectService } from "../services/project.service";

const projectService = new ProjectService();
export const createProject = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      techStack,
      githubUrl,
      liveUrl,
      imageUrl,
      featured,
    } = req.body;

    const project =
  await projectService.createProject({
    title,
    description,
    techStack,
    githubUrl,
    liveUrl,
    imageUrl,
    featured,
  });

    return res.status(201).json(project);

  } catch (error) {
    throw error;
  }
};
export const getProjects = async (
  req: Request,
  res: Response
) => {
  try {

    const projects =
  await projectService.getProjects();

    return res.status(200).json(
      projects
    );

  } catch (error) {

    throw error;

  }
};
export const deleteProject = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = req.params;

    await projectService.deleteProject(
  Number(id)
);

    return res.status(200).json({
      message: "Project deleted successfully",
    });

  } catch (error) {

    throw error;

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

    const updatedProject =
  await projectService.updateProject(
    Number(id),
    {
      title,
      description,
      techStack,
      githubUrl,
      liveUrl,
      imageUrl,
      featured,
    }
  );

    return res.status(200).json(
      updatedProject
    );

  } catch (error) {

    throw error;

  }
};