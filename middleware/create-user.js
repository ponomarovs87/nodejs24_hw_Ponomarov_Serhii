const {
  userCreateValidator,
} = require("./validation/user-validation");
const { usersBase } = require("../services/users-service");

const createUser = async (req, res) => {
  console.log();
  try {
    await userCreateValidator(req, res, async () => {
      const name = req.body.fullName.split(" ")[0];
      const surname = req.body.fullName.split(" ")[1];
      const birthDate = req.body.birthDate;
      const email = req.body.email;

      usersBase.createNewUser(
        name,
        surname,
        birthDate,
        email
      );
      res.redirect("/getAllUsers");
    });
  } catch (error) {
    return res.render("addNewUser", {
      layout: "layout",
      formData: req.body,
      errors: error.errors,
    });
  }
};

module.exports = { createUser };
