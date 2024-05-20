const morgan = require("morgan");
const createRotationLogStream = require("./rotatingLogStream");

const logMassageFormat = "':date' [:method] :url :status";

const morganAllLoggerConsole = morgan(logMassageFormat);

const morganAllLogger = morgan(logMassageFormat, {
  stream: createRotationLogStream("info"),
});

const morganErrorLogger = morgan(logMassageFormat, {
  stream: createRotationLogStream("error"),
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});

module.exports = {
  morganAllLogger, 
  morganAllLoggerConsole, 
  morganErrorLogger
}
