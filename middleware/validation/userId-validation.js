const yup = require("yup");

const userIdSchema = yup.number().label('userId')
  .typeError('Should be a number')
  .integer('Should be an integer')
  .positive('Should be more than 0');

const userIdValidator = async (req, res, next) => {
  try {
    await userIdSchema.validate(req.params.userId, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const errors = err.inner.reduce((acc, error) => {
      if (!acc[error.params.label]) {
        acc[error.params.label] = [];
      }

      acc[error.params.label].push(error.message);

      return acc;
    }, {});

    res.status(400).send({ errors });
  }
};

module.exports = {
  userIdValidator,
};
