import { Router } from "express";
import userController from "../controllers/user.controller.js";
import {
  validateUserLogIn,
  validateUserRegister,
} from "../middlewares/validators/user.validators.js";
import check from "../middlewares/auth.js";

const router = Router();

router.post("/register", validateUserRegister(), userController.register);
router.post("/logIn", validateUserLogIn(), userController.logIn);
router.get("/projects", check.auth, userController.getUserProjects);

export default router;
