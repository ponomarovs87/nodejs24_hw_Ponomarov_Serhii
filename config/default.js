const useConsoleColors = process.env.COLORS_ENABLED === "1";

module.exports = {
  useConsoleColors,
  logLevel: process.env.LOG_LEVEL || "warn",
  onlyLastLogs: process.env.ONLY_LAST_LOGS || false,
};
