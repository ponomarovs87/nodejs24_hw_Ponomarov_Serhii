const useConsoleColors = process.env.COLORS_ENABLED === "1";

module.exports = {
  serverHost: "http://localhost",
  serverPort: process.env.SERVER_PORT || 3000,
  useConsoleColors,
  logLevel: process.env.LOG_LEVEL || "warn",
  useOnlyLastLogs: process.env.ONLY_LAST_LOGS || false,
};
