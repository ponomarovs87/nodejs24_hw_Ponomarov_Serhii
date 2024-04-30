const {
  setTheme,
  colors,
} = require("./colors/node-colors");
const {
  useConsoleColors,
  logLevel,
} = require("../config/default");

function useConfigRuleEnableColor(textColor) {
  if (!useConsoleColors) {
    textColor = null;
  }
  return textColor;
}

function useConfigRuleShow(...enableText) {
  if (!enableText || !enableText.includes(logLevel)) {
    return false;
  }
  return true;
}

function showMessage(
  logFunction,
  titleText,
  msg,
  titleColor,
  enableRules
) {
  if (!useConfigRuleShow(...enableRules)) return;
  titleColor = useConfigRuleEnableColor(titleColor);
  logFunction(
    setTheme(`${titleText} :`, titleColor),
    ...msg
  );
}

function info(titleText, msg) {
  showMessage(console.log, titleText, msg, colors.blue, [
    "info",
  ]);
}

function warn(titleText, msg) {
  showMessage(
    console.warn,
    titleText,
    msg,
    colors.magenta,
    ["info", "warn"]
  );
}

function error(titleText, msg) {
  showMessage(console.error, titleText, msg, colors.red, [
    "info",
    "warn",
    "error",
  ]);
}

function getLogger(titleText) {
  return {
    info: (...args) => info(titleText, args),
    warn: (...args) => warn(titleText, args),
    error: (...args) => error(titleText, args),
  };
}

module.exports = getLogger;
