const express = require("express");
const router = express.Router();
const formDataParser = express.urlencoded({
  extended: false,
});

const usersRoutes = require("./usersRoutes");
const { usersBase } = require("../services/users-service");
const { createUser } = require("../middleware/create-user");

router.get("/", (_req, res) => {
  res.render("index");
});

router.use("/users", usersRoutes);

router.get("/healthcheck", (req, res) => {
  res.send({ answer: "healthcheck passed" });
});

router.use("/healthcheck", (req, res) => {
  res.status(404).send({ errors: "page not found" });
});

router.post(
  "/addNewUser",
  formDataParser,
  createUser
);


router.get("/:page", (req, res) => {
  const usersArray = usersBase.getAllUsers();
  const requestedPage = req.params.page;
  res.render(requestedPage, { usersArray }, (err, html) => {
    if (err) {
      return res.redirect("/404");
    }
    res.send(html);
  });
});

router.use((_req,res)=>{
  return res.redirect("/404")
})

module.exports = router;
