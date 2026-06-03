import express from "express";

import {
  register,
  login,
} from "../controllers/auth.controller.js";

import protect from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;