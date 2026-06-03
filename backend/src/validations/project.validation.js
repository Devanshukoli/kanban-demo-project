import Joi from "joi";

export const createProjectSchema =
  Joi.object({
    name: Joi.string()
      .min(3)
      .max(100)
      .required(),

    description: Joi.string()
      .allow(""),
  });