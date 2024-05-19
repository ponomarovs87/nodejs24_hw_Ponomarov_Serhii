const express = require("express");
const router = express.Router();

const usersRoutes = require("./usersRoutes");
// const {
  // userCreateValidator,
// } = require("../middleware/validation/user-validation");

//! опционально в таске было написанное с s но s другим шрифтом
// router.post("/user", userCreateValidator, (req, res) => {
//   res.status(201).send({ answer: "User created" });
// });

router.use("/users", usersRoutes);

router.get("/healthcheck", (req, res) => {
  res.send({ answer: "healthcheck passed" });
});

router.use("/healthcheck", (req, res) => {
  res.status(404).send({ errors: "page not found" });
});

module.exports = router;
