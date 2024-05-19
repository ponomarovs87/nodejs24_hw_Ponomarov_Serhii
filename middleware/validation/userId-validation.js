const yup = require("yup");

const onlyNumbersRegex = /^\d+$/;

const userIdSchema = yup.object({
    userId: yup
      .string()
      .required('Поле обязательно')
      .matches(onlyNumbersRegex, 'Поле должно содержать только цифры')
      .test('is-integer', 'Поле должно быть целым числом', (value) => Number.isInteger(Number(value)))
      .test('is-positive', 'значение должно быть позитивным и более 0', (value) => parseFloat(value) > 0),
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
