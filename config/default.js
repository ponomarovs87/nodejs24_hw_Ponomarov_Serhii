const path = require("path");

const useConsoleColors = process.env.COLORS_ENABLED === "1";

// пути хотя странно просто мутируем глобальную переменную среды и потом с ее вытаскиваем данные
const defaultDir = path.join(__dirname,"../");
process.env["MY_LOGGER"] = path.join(
  defaultDir,
  "utils",
  "logger.js"
);

module.exports = {
  useConsoleColors,
  logLevel: process.env.LOG_LEVEL || "warn",
  onlyLastLogs: process.env.ONLY_LAST_LOGS || false,
};
