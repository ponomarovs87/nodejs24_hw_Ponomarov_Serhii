const express = require("express");
const usersRoutes = express.Router();

const {
  userIdValidator,
} = require("../middleware/validation/userId-validation");

usersRoutes.get("/", (_req, res) => {
  res.send({ answer: [] });
});

usersRoutes.get("/:userId", userIdValidator, (req, res) => {
  res.send(req.params);
});

usersRoutes.delete(
  "/:userId",
  userIdValidator,
  (_req, res) => {
    res.sendStatus(204);
  }
);

module.exports = usersRoutes;
