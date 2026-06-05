const validate = (schemas) => {
  return (req, res, next) => {
    const targetSchemas = typeof schemas?.validate === "function"
      ? { body: schemas }
      : schemas;

    for (const key of ["body", "params", "query"]) {
      if (targetSchemas[key]) {
        const { error, value } = targetSchemas[key].validate(req[key], {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) {
          return res.status(400).json({
            success: false,
            errors: error.details.map(
              (detail) => detail.message
            ),
          });
        }

        req[key] = value;
      }
    }

    next();
  };
};

export default validate;