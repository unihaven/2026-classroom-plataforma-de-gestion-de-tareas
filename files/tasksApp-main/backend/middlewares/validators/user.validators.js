import { body } from "express-validator";
import validateResults from "../validationHandler.js";

export const validateUserRegister = () => [
  body("name", "The user  name is required")
    .exists()
    .isLength({ min: 3, max: 25 })
    .trim()
    .escape(),
  body("email", "A valid email address is required")
    .exists()
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  body("password", "A strong password is required")
    .exists()
    .isStrongPassword()
    .trim()
    .escape(),
  (req, res, next) => validateResults(req, res, next),
];

export const validateUserLogIn = () => [
  body("email", "A valid email address is required")
    .exists()
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  body("password", "A strong password is required")
    .exists()
    .isStrongPassword()
    .trim()
    .escape(),
  (req, res, next) => validateResults(req, res, next),
];
