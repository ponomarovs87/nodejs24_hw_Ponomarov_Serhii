const yup = require("yup");

const nameRegex = /^[a-zA-Zа-яА-Я]+$/;

const userCreateSchema = yup.object({
  fullName: yup
    .string()
    .required("Полное имя обязательно")
    .test(
      "is-valid-fullName",
      "Полное имя должно состоять из имени и фамилии, каждое из которых должно быть минимум из 2х символов",
      (value) => {
        if (!value) return false;
        const nameParts = value.trim().split(" ");
        if (nameParts.length !== 2) return false;
        return nameParts.every((part) =>
          nameRegex.test(part)
        );
      }
    )
    .transform((value) =>
      value
        .split(" ")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        )
        .join(" ")
    ),
  email: yup
    .string()
    .required("email обязателен")
    .email("неправильный формат почты")
    .test(
      "is-valid-email",
      "адрес поты быть верно написан например : example@mail.com",
      (value) => {
        const [localPart, domain] = value.split("@");
        return (
          localPart.length >= 2 &&
          domain &&
          domain.includes(".")
        );
      }
    ),
  birthDate: yup
    .date()
    .required("Дата рождения обязательна")
    .transform((value, originalValue) => {
      return new Date(originalValue);
    })
    .test(
      "is-valid-birthdate",
      "Дата рождения должна быть в формате 'YYYY-MM-DD'",
      (value) => {
        return !isNaN(value.getTime());
      }
    )
    .max(
      new Date(),
      "Дата рождения не может быть в будущем"
    ),
});

const userCreateValidator = async (req, res, next) => {
  try {
    req.body = await userCreateSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
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
    return res.status(400).render("addNewUser", {
      layout: "layout",
      formData: req.body,
      errors,
    });
  }
};

module.exports = {
  userCreateValidator,
};
