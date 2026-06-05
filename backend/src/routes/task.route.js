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
import {
  createTaskSchema,
  updateTaskSchema,
  idParamSchema,
  projectIdParamSchema,
} from "../validations/task.validation.js";

const router = express.Router();

router.use(protect);

router.post("/", validate(createTaskSchema), createTask);

router.get(
  "/project/:projectId",
  validate({ params: projectIdParamSchema }),
  getTasksByProject
);

router.get("/:id", validate({ params: idParamSchema }), getTaskById);

router.patch(
  "/:id",
  validate({ params: idParamSchema, body: updateTaskSchema }),
  updateTask
);

router.delete("/:id", validate({ params: idParamSchema }), deleteTask);

export default router;