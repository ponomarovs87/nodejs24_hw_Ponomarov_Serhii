require("dotenv").config();
const { server,client } = require("config");

const express = require("express");
const {
  captureResponseBody,
  morganAllLoggerServer,
  morganAllLoggerConsole,
  morganErrorLoggerServer,
} = require("./middleware/logger/morgan");

const routes = require("./routes/index");

const myLogger = require("./utils/logger")(
  "Server-Express"
);

const app = express(); // 3000 база данных подключение для изменения и добавления в бд

app.use(express.json()); // подключение парсера json

app.listen(server.port, () => {
  myLogger.info(`listening Server on ${server.host}:${server.port}`);
});


[
  captureResponseBody,
  morganAllLoggerServer,
  morganAllLoggerConsole,
  morganErrorLoggerServer,
].forEach((item) => app.use(item));


app.use("/", routes);

module.exports = app;
