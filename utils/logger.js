const fs = require("fs");
const path = require("path");
const {
  setTheme,
  colors,
} = require("./colors/node-colors");
const {
  useConsoleColors,
  logLevel,
  onlyLastLogs,
} = require(process.env.MY_CONFIG);

const logFolderPath = path.join(__dirname, "../logs");
if (!fs.existsSync(logFolderPath)) {
  fs.mkdirSync(logFolderPath);
}

let streamFlag = onlyLastLogs ? "w" : "a";

// console.log("инициализация Логгера");

const infoStream = fs.createWriteStream(
  path.join(logFolderPath, "info.log"),
  { flags: streamFlag, encoding: "utf8" }
);

//encoding:'utf8' параметр по умолчанию по этому не передан во второе
const errorStream = fs.createWriteStream(
  path.join(logFolderPath, "errors.log"),
  { flags: streamFlag }
);

process.once("beforeExit", () => {
  // getLogger("logger").info(`Логи сохранены`);
  infoStream.end();
  errorStream.end();
});

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

function streamWrite(runnerInfo, titleText, msg, stream) {
  const message = `[${new Date()
    .toISOString()
    .slice(0, 19)
    .replace(
      "T",
      " "
    )}]\n'${runnerInfo}': ${titleText}: ${msg.join("\n")}`;
  stream.write(`${message}\n`);
}

function info(titleText, msg) {
  streamWrite("info", titleText, msg, infoStream);
  showMessage(console.log, titleText, msg, colors.blue, [
    "info",
  ]);
}

function warn(titleText, msg) {
  streamWrite("warn", titleText, msg, errorStream);
  showMessage(
    console.warn,
    titleText,
    msg,
    colors.magenta,
    ["info", "warn"]
  );
}

function error(titleText, msg) {
  streamWrite("error", titleText, msg, errorStream);
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
