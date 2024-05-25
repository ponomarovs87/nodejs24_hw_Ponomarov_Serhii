require("dotenv").config();
const { server,client } = require("config");

const express = require("express");
const {
  captureResponseBody,
  morganAllLoggerServer,
  morganAllLoggerConsole,
  morganErrorLoggerServer,
  morganAllLoggerClient,
  morganErrorLoggerClient,
} = require("./middleware/logger/morgan");

const routes = require("./routes/index");

const myLogger = require("./utils/logger")(
  "Server-Express"
);

const app = express();
const clientApp = express();

app.use(express.json()); // подключение парсера json

app.listen(server.port, () => {
  myLogger.info(`listening on ${server.host}:${server.port}`);
});

clientApp.listen(client.port, () => {
  myLogger.info(`client listening on ${client.host}:${client.port}`);
});

[
  captureResponseBody,
  morganAllLoggerServer,
  morganAllLoggerConsole,
  morganErrorLoggerServer,
].forEach((item) => app.use(item));

[
  captureResponseBody,
  morganAllLoggerClient,
  morganAllLoggerConsole,
  morganErrorLoggerClient,
].forEach((item) => clientApp.use(item));

app.use("/", routes);

clientApp.get("/",(req,res)=>{
  res.status(200).send({answer:`hi it's port 3001`})
})

module.exports = app;
