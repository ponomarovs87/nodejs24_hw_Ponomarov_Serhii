const yup = require("yup");

const onlyNumbersRegex = /^\d+$/;

//todo пофиксить [DELETE] /users/91.0 204 должно быть 400

const userIdSchema = yup.object({
  userId: yup
    .number()
    .label("userId")
    .typeError("Поле должно содержать только цифры")
    .integer("Поле должно быть целым числом")
    .positive("значение должно быть позитивным и более 0"),
});

const userIdValidator = async (req, res, next) => {
  try {
    await userIdSchema.validate(req.params, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    let errors = {};
    err.inner.forEach((error) => {
      if (!errors[error.path]) {
        errors[error.path] = [];
      }
      errors[error.path].push(error.message);
    });
    res.status(400).send({ errors });
  }
};

module.exports = {
  userIdValidator,
};
