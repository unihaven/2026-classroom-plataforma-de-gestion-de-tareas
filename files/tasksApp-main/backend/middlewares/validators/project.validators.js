import { body, param } from "express-validator";
import validateResults from "../validationHandler.js";

export const validateProjectId = () => [
  param("id", "The project id is required").exists().isInt({ min: 1 }),
  (req, res, next) => validateResults(req, res, next),
];

export const validateProjectCreate = () => [
  body("name", "A name is required").exists().notEmpty().trim().escape(),
  body("priority", "Priority must be an integer (0 - 10)")
    .optional()
    .isInt({ min: 0, max: 10 }),
  body("description").optional().trim().escape(),
  (req, res, next) => validateResults(req, res, next),
];

export const validateProjectUpdate = () => [
  param("id", "The project id is required").exists().isInt({ min: 1 }),
  body("name").optional().trim().escape(),
  body("priority", "Priority must be an integer (0 - 10)")
    .optional()
    .isInt({ min: 0, max: 10 }),
  body("description").optional().trim().escape(),
  (req, res, next) => validateResults(req, res, next),
];
