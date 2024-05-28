const { usersBase } = require("../services/users-service");

const createUser = async (req, res) => {
  const [name, surname] = req.body.fullName.split(" ");
  const birthDate = req.body.birthDate;
  const email = req.body.email;

  usersBase.createNewUser(name, surname, birthDate, email);
  res.redirect("/getAllUsers");
};

module.exports = { createUser };
