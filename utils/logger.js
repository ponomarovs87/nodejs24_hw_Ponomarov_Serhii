const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
};

function info(titleText, msg) {
  console.log(colors.yellow, `${titleText}:`, colors.blue, msg, colors.reset);
}

function warn(titleText, msg) {
  console.warn(
    colors.yellow,
    `${titleText}:`,
    colors.magenta,
    msg,
    colors.reset
  );
}

function error(titleText, msg) {
  console.error(colors.yellow, `${titleText}:`, colors.red, msg, colors.reset);
}

function getLogger(titleText) {
  return {
    info: (msg) => info(titleText, msg),
    warn: (msg) => warn(titleText, msg),
    error: (msg) => error(titleText, msg),
  };
}

module.exports = getLogger;
