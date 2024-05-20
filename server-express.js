require("dotenv").config();
const { server } = require("config");

const express = require("express");
const {
  captureResponseBody,
  morganAllLogger,
  morganAllLoggerConsole,
  morganErrorLogger,
} = require("./middleware/logger/morgan");

const routes = require("./routes/index");

const myLogger = require("./utils/logger")(
  "Server-Express"
);

const app = express();

app.use(express.json()); // подключение парсера json

app.listen(server.port, () => {
  myLogger.info(`listening on ${server.port}`);
});

[
  captureResponseBody,
  morganAllLogger,
  morganAllLoggerConsole,
  morganErrorLogger,
].forEach((item) => app.use(item));

app.use("/", routes);

module.exports = app;
