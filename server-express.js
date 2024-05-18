require("dotenv").config();
const { server } = require("config");

const express = require("express");
const morgan = require("morgan");

const logger = require("./utils/logger")("Server-Express");

const app = express();

const accessLogger = morgan(":date :method :url :status");
const accessLogger2 = morgan("combined");

app.use(accessLogger2);
app.use(accessLogger);
app.use((req, _res, next) => {
  logger.error("123");
  next();
});

app.listen(server.port, () => {
  logger.info(`listening on ${server.port}`);
});

app.get("/healthcheck", (req, res) => {
  logger.info(`${server.host}:${server.port}/healthcheck`);
  res.send("healthcheck passed");
});
