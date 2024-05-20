const express = require("express");
const router = express.Router();

const usersRoutes = require("./usersRoutes");

router.use("/users", usersRoutes);

router.get("/healthcheck", (req, res) => {
  res.send({ answer: "healthcheck passed" });
});

router.use("/healthcheck", (req, res) => {
  res.status(404).send({ errors: "page not found" });
});

module.exports = router;
