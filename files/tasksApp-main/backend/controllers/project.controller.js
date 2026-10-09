import { matchedData } from "express-validator";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";

const getProject = async (req, res) => {
  const { id } = matchedData(req, { locations: ["params"] });

  const project = await Project.findByPk(id);

  if (!project)
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });

  if (project.userId != req.user.id)
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this",
    });

  return res
    .status(200)
    .json({ success: true, message: "Project found successfully", project });
};

const addProject = async (req, res) => {
  const data = matchedData(req, { locations: ["body"] });
  data.userId = req.user.id;

  const project = await Project.create(data);

  return res
    .status(200)
    .json({ success: true, message: "Project created successfully", project });
};

const deleteProject = async (req, res) => {
  const { id } = matchedData(req, { locations: ["params"] });

  const project = await Project.findByPk(id);

  if (!project)
    return res
      .status(404)
      .json({ success: false, message: "Project does not exist" });

  if (project.userId != req.user.id)
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this",
    });

  await Project.destroy({
    where: {
      id,
    },
  });

  return res
    .status(200)
    .json({ success: true, message: "Project deleted successfully" });
};

const updateProject = async (req, res) => {
  const { id } = matchedData(req, { locations: ["params"] });
  const data = matchedData(req, { locations: ["body"] });

  const project = await Project.findByPk(id);

  if (!project)
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });

  if (project.userId != req.user.id)
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this",
    });

  project.set(data);
  await project.save();

  return res
    .status(200)
    .json({ success: true, message: "Project updated successfully", project });
};

const getProjectTasks = async (req, res) => {
  const { id } = matchedData(req, { locations: ["params"] });

  const project = await Project.findByPk(id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  if (project.userId != req.user.id)
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this",
    });

  const tasks = await Task.findAll({
    where: { projectId: id },
  });

  if (!tasks.length)
    return res
      .status(404)
      .json({ success: false, message: "No tasks found", tasks });

  return res
    .status(200)
    .json({ success: true, message: "Tasks obtained successfully", tasks });
};

export default {
  getProject,
  addProject,
  deleteProject,
  updateProject,
  getProjectTasks,
};
