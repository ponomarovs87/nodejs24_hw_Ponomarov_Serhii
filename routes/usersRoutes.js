const express = require("express");
const usersRoutes = express.Router();

const {
  userIdValidator,
} = require("../middleware/validation/userId-validation");
const { userCreateValidator } = require("../middleware/validation/user-validation");

usersRoutes.get("/", (_req, res) => {
  res.send({ answer: [] });
});

usersRoutes.get("/:userId", userIdValidator, (req, res) => {
  res.send(req.params);
});

usersRoutes.post("/", userCreateValidator, (req, res) => {
  res.status(201).send({ answer: "User created" });
});

usersRoutes.delete(
  "/:userId",
  userIdValidator,
  (_req, res) => {
    res.sendStatus(204);
  }
);

module.exports = usersRoutes;
