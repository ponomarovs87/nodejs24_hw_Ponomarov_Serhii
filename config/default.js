const useConsoleColors = process.env.COLORS_ENABLED === "1";

module.exports = {
  server: {
    host: "http://localhost",
    port: process.env.SERVER_PORT || 3000,
  },
  logger: {
    useConsoleColors,
    logLevel: process.env.LOG_LEVEL || "warn",
    useOnlyLastLogs: process.env.ONLY_LAST_LOGS || false,
  },
};
