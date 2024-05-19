require("dotenv").config();
const { server } = require("config");

const express = require("express");
const morganLogger = require("./middleware/logger/morgan");

const routes = require("./routes/index");

const myLogger = require("./utils/logger")(
  "Server-Express"
);

const app = express();

app.use(express.json());// подключение парсера json

app.listen(server.port, () => {
  myLogger.info(`listening on ${server.port}`);
});

app.use(morganLogger); //подключение логгера моргана

app.use("/", routes);
