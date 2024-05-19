require("dotenv").config();
const { server } = require("config");

const express = require("express");
const morganLogger = require("./middleware/logger/morgan");

const myLogger = require("./utils/logger")(
  "Server-Express"
);

const app = express();

app.use(morganLogger);

app.listen(server.port, () => {
  myLogger.info(`listening on ${server.port}`);
});

app.get("/healthcheck", (req, res) => {
  myLogger.info(
    `${server.host}:${server.port}/healthcheck`
  );
  res.send("healthcheck passed");
});
