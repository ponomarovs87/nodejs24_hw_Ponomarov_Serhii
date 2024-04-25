const { useTheme, colors,backgroundColors } = require("./colors/node-colors");

function info(titleText, msg) {
  console.log(
    useTheme(`${titleText} :`, colors.yellow),
    useTheme(msg, backgroundColors.bgBlue)
  );
}

function warn(titleText, msg) {
  console.warn(
    useTheme(`${titleText} :`, backgroundColors.bgYellow),
    useTheme(msg, backgroundColors.bgMagenta)
  );
}

function error(titleText, msg) {
  console.error(
    useTheme(`${titleText} :`, backgroundColors.bgYellow),
    useTheme(msg, backgroundColors.bgRed)
  );
}

function getLogger(titleText) {
  return {
    info: (...args) => info(titleText, args),
    warn: (...args) => warn(titleText, args),
    error: (...args) => error(titleText, args),
  };
}

module.exports = getLogger;
