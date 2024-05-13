require("dotenv").config();
const http = require("http");

const { serverPort, serverHost } = require("config");
const logger = require("./utils/logger")("server");

const srv = http.createServer();

srv.listen(serverPort);

srv.on("listening", () =>
  logger.info(
    `start on ${serverHost}:${serverPort}\n endpoint healthcheck : ${serverHost}:${serverPort}/healthcheck`
  )
);

srv.on("request", (req, res) => {
  if (req.method === "GET" && req.url === "/healthcheck") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        answer: `healthcheck passed`,
      })
    );
    logger.info(
      `[${req.method}] ${req.url} ${res.statusCode}`
    );
    return;
  }
  if (req.method === "GET" && req.url === "/order66") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        answer: `Yes my Lord, order 66 will be done`,
      })
    );
    logger.info(
      `[${req.method}] ${req.url} ${res.statusCode}`
    );
    return;
  }
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      error: "page not found",
    })
  );
  logger.warn(
    `[${req.method}] ${req.url} ${res.statusCode}`
  );
  return;
});
