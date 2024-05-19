const express = require("express");
const {
  userCreateValidator,
} = require("../middleware/validation/user-validation");
const router = express.Router();

router.post("/user", userCreateValidator, (req, res) => {
  res.status(201).send({ answer: "User created" });
});

router.get("/about", (req, res) => {
  res.send("About page");
});

router.get("/healthcheck", (req, res) => {
  res.send("healthcheck passed");
});

module.exports = router;
