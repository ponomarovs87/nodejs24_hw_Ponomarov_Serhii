const { useTheme, styles } = require("./colors/node-colors");

function info(titleText, msg) {
  console.log(
    useTheme(`${titleText} :`, styles.backgroundColors.bgYellow),
    useTheme(msg, styles.backgroundColors.bgBlue)
  );
}

function warn(titleText, msg) {
  console.warn(
    useTheme(`${titleText} :`, styles.backgroundColors.bgYellow),
    useTheme(msg, styles.backgroundColors.bgMagenta)
  );
}

function error(titleText, msg) {
  console.error(
    useTheme(`${titleText} :`, styles.backgroundColors.bgYellow),
    useTheme(msg, styles.backgroundColors.bgRed)
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
