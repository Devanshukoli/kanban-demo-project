import express from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", createTask);

router.get(
  "/project/:projectId",
  getTasksByProject
);

router.get("/:id", getTaskById);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;