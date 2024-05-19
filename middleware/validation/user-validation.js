const yup = require('yup');

// Регулярное выражение для проверки, что каждое слово содержит как минимум 2 символа и есть как минимум два слова
const nameRegex = /^(?=.*\b\w{2,}\b.*\b\w{2,}\b).*$/;

const userCreateSchema = yup.object({
  username: yup.string()
    .required('Полное имя обязательно')
    .matches(nameRegex, 'Полное имя должно быть минимум из имени и фамилии, каждое из которых должно быть минимум из 2х символов')
    .transform((value) => 
      value.split(' ')
           .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
           .join(' ')
    ),
  email: yup.string()
    .required('email обязателен')
    .email('неправильный формат почты')
    .test('is-valid-email', 'адрес поты должен быть минимум из 2х символов', (value) => {
      const [localPart, domain] = value.split('@');
      return localPart.length >= 2 && domain && domain.includes('.');
    }),
});

const userCreateValidator = async (req, res, next) => {
  try {
    req.body = await userCreateSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
    next();
  } catch (err) {
    let errors = {};
    err.inner.forEach(error => {
      errors[error.path] = error.message;
    });
    res.status(400).send({ errors,...req.body });
  }
};


module.exports = {
    userCreateValidator
};
