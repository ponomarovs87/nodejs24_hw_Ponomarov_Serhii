require("dotenv").config();
const path = require("path");
process.env["MY_CONFIG"] = path.join(
  __dirname,
  "config",
  "default.js"
);
require(process.env.MY_CONFIG);
const logger = require(process.env.MY_LOGGER)("main");
const { fileSync } = require("./file_sync");

logger.info("the script is running!");
logger.warn("the script is running!");
logger.error("the script is running!");

fileSync.start();

logger.info(
  "Конец асинхронного кода"
);

setTimeout(() => {
  logger.info("асинхронного код через 1 миллисекунду");
}, 1);

setTimeout(() => {
  logger.info("асинхронного код через 1 секунду");
}, 1000);
