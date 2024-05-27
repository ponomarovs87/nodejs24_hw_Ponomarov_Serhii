const express = require("express");
const router = express.Router();
const formDataParser = express.urlencoded({
  extended: false,
});

const usersRoutes = require("./usersRoutes");
const { usersBase } = require("../services/users-service");
const { createUser } = require("../middleware/create-user");
const {
  renderAbstractionPage,
} = require("../middleware/renderAbstractionPage");
const {
  userCreateValidator,
} = require("../middleware/validation/user-validation");

router.get("/", (_req, res) => {
  res.render("index");
});

router.use("/users", usersRoutes);

router.get("/healthcheck", (req, res) => {
  res.send({ answer: "healthcheck passed" });
});

router.post(
  "/addNewUser",
  formDataParser,
  userCreateValidator,
  createUser
);

router.get("/:page", (req, res) => {
  const requestedPage = req.params.page;

  switch (requestedPage) {
    case "getAllUsers":
      const usersArray = usersBase.getAllUsers();
      renderAbstractionPage(req, res, requestedPage, {
        usersArray,
      });
      break;

    default:
      renderAbstractionPage(req, res, requestedPage);
      break;
  }
});

router.use((_req, res) => {
  return res.redirect("/404");
});

module.exports = router;
