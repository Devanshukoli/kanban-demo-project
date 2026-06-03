import express from "express";
import protect from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import isAdminOrManager from "../middlewares/isAdminOrManager.middleware.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { createProjectSchema } from "../validations/project.validation.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(isAdminOrManager, validate(createProjectSchema), createProject)
  .get(getProjects);

router.route("/:id")
  .get(getProjectById)
  .patch(isAdminOrManager, updateProject)
  .delete(isAdmin, deleteProject);

export default router;