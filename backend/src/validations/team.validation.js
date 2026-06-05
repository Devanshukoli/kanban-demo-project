import Joi from "joi";

const objectId = Joi.string().hex().length(24);

export const idParamSchema = Joi.object({
  id: objectId.required().messages({
    "string.hex": "Invalid ID format",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
});

export const createTeamSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required(),

  description: Joi.string()
    .max(500)
    .allow(""),
});