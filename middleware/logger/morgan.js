const morgan = require("morgan");
const createRotationLogStream = require("./rotatingLogStream");

function captureResponseBody(req, res, next) {
  const originalSend = res.send;
  res.send = function (body) {
    res.body = body;
    originalSend.call(this, body);
  };
  next();
}

morgan.token("body", (req, res) => res.body || "");

const logMassageFormat = "':date' [:method] :url :status";

const morganAllLoggerConsole = morgan(logMassageFormat);

const morganAllLoggerServer = morgan(logMassageFormat, {
  stream: createRotationLogStream("server/info",),
});

const morganErrorLoggerServer = morgan(
  `${logMassageFormat} \n:body`,
  {
    stream: createRotationLogStream("server/error",),
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  }
);
const morganAllLoggerClient = morgan(logMassageFormat, {
  stream: createRotationLogStream("client/info",),
});

const morganErrorLoggerClient = morgan(
  `${logMassageFormat} \n:body`,
  {
    stream: createRotationLogStream("client/error",),
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  }
);

module.exports = {
  captureResponseBody,
  morganAllLoggerServer,
  morganAllLoggerConsole,
  morganErrorLoggerServer,
  morganAllLoggerClient,
  morganErrorLoggerClient,
};
