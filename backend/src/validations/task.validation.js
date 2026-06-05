import Joi from "joi";

const objectId = Joi.string().hex().length(24);

export const idParamSchema = Joi.object({
  id: objectId.required().messages({
    "string.hex": "Invalid ID format",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
});

export const projectIdParamSchema = Joi.object({
  projectId: objectId.required().messages({
    "string.hex": "Invalid project ID format",
    "string.length": "Project ID must be 24 characters long",
    "any.required": "Project ID is required",
  }),
});

export const createTaskSchema = Joi.object({
  title: Joi.string()
    .required(),

  description: Joi.string()
    .allow(""),

  priority: Joi.string()
    .valid("LOW", "MEDIUM", "HIGH"),

  assignedTo: Joi.string()
    .hex()
    .length(24)
    .allow(null),

  projectId: Joi.string()
    .hex()
    .length(24)
    .required(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string(),

  description: Joi.string(),

  status: Joi.string().valid("TODO", "IN_PROGRESS", "DONE"),

  priority: Joi.string().valid("LOW", "MEDIUM", "HIGH"),

  assignedTo: Joi.string()
    .hex()
    .length(24)
    .allow(null),
}).min(1);