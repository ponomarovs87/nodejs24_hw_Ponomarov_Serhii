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
srv.on("request", (req, _resp) =>
  logger.info(
    `incoming request: [${req.method}] ${req.url}`
  )
);

srv.on("request", (req, res) => {
  if (req.method !== "GET" || req.url !== "/healthcheck") {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "page not found or bad request",
      })
    );
    return;
  }

  // req.url + RegExp?
  if (req.url === "/healthcheck") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        info: `Order 66 will be done`,
        details:
          "https://www.google.com/search?q=%D1%89%D0%BA%D0%B2%D1%83%D0%BA%D0%BA+66&sca_esv=0181327e673e72d3&sca_upv=1&sxsrf=ADLYWILL6JGKcSh6VSNElknmV7ye935yeA%3A1715537613865&ei=zQZBZsC5NNi4i-gP3PCEqAM&udm=&ved=0ahUKEwiA1MrQ24iGAxVY3AIHHVw4ATUQ4dUDCBA&uact=5&oq=%D1%89%D0%BA%D0%B2%D1%83%D0%BA%D0%BA+66&gs_lp=Egxnd3Mtd2l6LXNlcnAiD9GJ0LrQstGD0LrQuiA2NjIHEAAYgAQYDTIHEAAYgAQYDTIHEAAYgAQYDTIHEAAYgAQYDTIHEAAYgAQYDTIHEAAYgAQYDTIHEAAYgAQYDTIHEAAYgAQYDTIHEAAYgAQYDTIHEAAYgAQYDUixIFAAWMwacAB4AZABAJgBxQGgAckKqgEDMC45uAEDyAEA-AEBmAIJoAL8CsICCBAuGIAEGNQCwgIFEC4YgATCAgUQABiABMICFxAuGIAEGNQCGJcFGNwEGN4EGOAE2AEBwgILEAAYgAQYARgKGCrCAgkQABiABBgBGArCAg8QLhiABBgBGNEDGMcBGArCAgoQABiABBhDGIoFwgIHEAAYgAQYCsICBxAuGIAEGArCAgcQLhiABBgNmAMAugYGCAEQARgUkgcFMC44LjGgB5to&sclient=gws-wiz-serp#fpstate=ive&vld=cid:2ea6e710,vid:ko7u2NOiD5Y,st:0",
      })
    );
    return;
  }
});
