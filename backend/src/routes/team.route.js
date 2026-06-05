import express from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  createTeam,
  getTeamById,
  getMyTeam,
} from "../controllers/team.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createTeamSchema,
  idParamSchema,
} from "../validations/team.validation.js";

const router = express.Router();

router.use(protect);

router.post("/", validate(createTeamSchema), createTeam);

router.get("/my-team",  getMyTeam);

router.get("/:id", validate({ params: idParamSchema }), getTeamById);

export default router;