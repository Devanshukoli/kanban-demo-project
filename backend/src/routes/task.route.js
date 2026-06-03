import express from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../validations/task.validation.js";

const router = express.Router();

router.use(protect);

router.post("/", validate(createTaskSchema), createTask);

router.get(
  "/project/:projectId",
  getTasksByProject
);

router.get("/:id", getTaskById);

router.patch("/:id", validate(updateTaskSchema), updateTask);

router.delete("/:id", deleteTask);

export default router;