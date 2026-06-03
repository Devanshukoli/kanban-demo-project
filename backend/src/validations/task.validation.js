import Joi from "joi";

export const createTaskSchema =
  Joi.object({
    title: Joi.string()
      .required(),

    description: Joi.string()
      .allow(""),

    priority: Joi.string()
      .valid(
        "LOW",
        "MEDIUM",
        "HIGH"
      ),

    assignedTo: Joi.string()
      .hex()
      .length(24)
      .allow(null),

    projectId: Joi.string()
      .hex()
      .length(24)
      .required(),
  });

export const updateTaskSchema =
  Joi.object({
    title: Joi.string(),

    description: Joi.string(),

    status: Joi.string().valid(
      "TODO",
      "IN_PROGRESS",
      "DONE"
    ),

    priority: Joi.string().valid(
      "LOW",
      "MEDIUM",
      "HIGH"
    ),

    assignedTo: Joi.string()
      .hex()
      .length(24)
      .allow(null),
  }).min(1);