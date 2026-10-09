import { Router } from "express";
import taskController from "../controllers/task.controller.js";
const router = Router();
import {
  validateTaskCreate,
  validateTaskId,
  validateTaskUpdate,
} from "../middlewares/validators/task.validators.js";
import check from "../middlewares/auth.js";

router.post("/", check.auth, validateTaskCreate(), taskController.addTask);
router
  .route("/:id")
  .get(check.auth, validateTaskId(), taskController.getTask)
  .delete(check.auth, validateTaskId(), taskController.deleteTask)
  .put(check.auth, validateTaskUpdate(), taskController.updateTask);

export default router;
