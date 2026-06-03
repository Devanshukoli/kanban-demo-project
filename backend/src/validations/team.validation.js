import Joi from "joi";

export const createTeamSchema =
  Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),

    description: Joi.string()
      .max(500)
      .allow(""),
  });