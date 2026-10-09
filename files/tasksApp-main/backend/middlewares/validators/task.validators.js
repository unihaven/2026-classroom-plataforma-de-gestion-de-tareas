import { body, param } from "express-validator";
import validateResults from "../validationHandler.js";

export const validateTaskId = () => [
  param("id", "The task id is required").exists().isInt({ min: 1 }),
  (req, res, next) => validateResults(req, res, next),
];

export const validateTaskCreate = () => [
  body("projectId", "The project id is required").exists().isInt({ min: 1 }),
  body("name", "The task name is required").exists().notEmpty().trim().escape(),
  (req, res, next) => validateResults(req, res, next),
];

export const validateTaskUpdate = () => [
  param("id", "The task id is required").exists().isInt({ min: 1 }),
  body(
    "done",
    "Specify whether the task is marked as done or not (true or false)",
  )
    .exists()
    .isBoolean(),
  (req, res, next) => validateResults(req, res, next),
];
