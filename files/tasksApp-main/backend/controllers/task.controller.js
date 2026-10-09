import { matchedData } from "express-validator";
import Task from "../models/task.model.js";

const getTask = async (req, res) => {
  const { id } = matchedData(req, { locations: ["params"] });

  const task = await Task.findOne({ where: { id }, include: "Project" });

  if (!task)
    return res.status(404).json({ success: false, message: "Task not found" });

  if (task.Project.userId != req.user.id)
    return res.status(404).json({
      success: false,
      message: "You are not authorized to access this",
    });

  return res
    .status(200)
    .json({ success: true, message: "Task found successfully", task });
};

const addTask = async (req, res) => {
  const { name, projectId } = matchedData(req, { locations: ["body"] });

  const task = await Task.create({ name, projectId });

  return res
    .status(200)
    .json({ success: true, message: "Task created successfully", task });
};

const deleteTask = async (req, res) => {
  const { id } = matchedData(req, { locations: ["params"] });

  const task = await Task.findOne({ where: { id }, include: "Project" });

  if (!task)
    return res
      .status(404)
      .json({ success: false, message: "Task does not exist" });

  if (task.Project.userId != req.user.id)
    return res.status(404).json({
      success: false,
      message: "You are not authorized to access this",
    });

  await Task.destroy({ where: { id } });

  return res
    .status(200)
    .json({ success: true, message: "Task removed successfully" });
};

const updateTask = async (req, res) => {
  const { id } = matchedData(req, { locations: ["params"] });
  const { done } = matchedData(req, { locations: ["body"] });

  const task = await Task.findOne({ where: { id }, include: "Project" });

  if (!task)
    return res.status(404).json({ success: false, message: "Task not found" });

  if (task.Project.userId != req.user.id)
    return res.status(404).json({
      success: false,
      message: "You are not authorized to access this",
    });

  task.done = done;
  await task.save();

  return res
    .status(200)
    .json({ success: true, message: "Task updated successfully", task });
};

export default {
  getTask,
  addTask,
  deleteTask,
  updateTask,
};
