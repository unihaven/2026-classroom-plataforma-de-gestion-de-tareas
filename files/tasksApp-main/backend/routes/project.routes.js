import { Router } from "express";
import projectController from "../controllers/project.controller.js";
const router = Router();
import {
  validateProjectCreate,
  validateProjectId,
  validateProjectUpdate,
} from "../middlewares/validators/project.validators.js";
import check from "../middlewares/auth.js";

router.post(
  "/create",
  check.auth,
  validateProjectCreate(),
  projectController.addProject,
);

router
  .route("/:id")
  .get(check.auth, validateProjectId(), projectController.getProject)
  .put(check.auth, validateProjectUpdate(), projectController.updateProject)
  .delete(check.auth, validateProjectId(), projectController.deleteProject);

router.get(
  "/:id/tasks",
  check.auth,
  validateProjectId(),
  projectController.getProjectTasks,
);

export default router;
