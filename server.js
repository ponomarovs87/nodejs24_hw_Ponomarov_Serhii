require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");

const logger = require("./utils/logger")("server");

const port = 3000;

const srv = http.createServer();

srv.listen(port);
logger.info();

srv.on("listening", () =>
  logger.info(
    `start on http://localhost:${port}\n endpoint order 66 : http://localhost:${port}/healthcheck`
  )
);

srv.on("request", (req, res) => {
  if (req.url === "/healthcheck") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        answer: `healthcheck passed`,
        info: `Yes my Lord, order 66 will be done`,
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
      error: "page not found or bad request",
    })
  );
  logger.warn(
    `[${req.method}] ${req.url} ${res.statusCode}`
  );
  return;
});
