import express from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  createTeam,
  getTeamById,
  getMyTeam,
} from "../controllers/team.controller.js";

const router = express.Router();

router.post("/", protect, createTeam);

router.get("/my-team", protect, getMyTeam);

router.get("/:id", protect, getTeamById);

export default router;