const morgan = require("morgan");
const createRotationLogStream = require("./rotatingLogStream");

function captureResponseBody(req, res, next) {
  const originalSend = res.send;
  res.send = function(body) {
    res.body = body;
    originalSend.call(this, body);
  };
  next();
}

morgan.token('body', (req, res) => res.body || '');

const logMassageFormat = "':date' [:method] :url :status";

const morganAllLoggerConsole = morgan(logMassageFormat);

const morganAllLogger = morgan(logMassageFormat, {
  stream: createRotationLogStream("info"),
});

const morganErrorLogger = morgan(`${logMassageFormat} \n:body`, {
  stream: createRotationLogStream("error"),
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});

module.exports = {
  captureResponseBody,
  morganAllLogger, 
  morganAllLoggerConsole, 
  morganErrorLogger
}
